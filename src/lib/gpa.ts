export type CourseInput = {
    credits?: number | string;
    grade?: string;
    score?: number | string;
};

export type ComputeResult = {
    currentGpa: number | null;
    cumulativeGpa: number | null;
    currentCredits: number;
    totalCredits: number;
    interpretation: string;
};

/**
 * Compute GPA and cumulative CGPA using the provided grade->point map and optional previous record.
 * This mirrors the previous inline logic in the calculator page but is reusable and testable.
 */
export type UniversityRules = {
    excludeFailFromDenominator?: boolean;
    earnedGradeMin?: string; // letter grade threshold to count earned credits
    degreeRequirementCgpa?: number;
};

export function computeGpa(
    courses: CourseInput[],
    gradeMap: Map<string, number>,
    includePrevious: boolean,
    previousCgpa: unknown,
    previousCredits: unknown,
    numericRanges?: { grade: string; min: number; max: number }[],
    rules?: UniversityRules
): ComputeResult {
    let qualityPoints = 0;
    let creditSum = 0; // denominator for GPA
    let earnedCredits = 0; // credits counted as earned (grade >= earnedGradeMin)

    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        const rawCredits = course.credits as any;
        // Robustly parse credits: accept numbers or numeric strings with whitespace
        const creditsParsed =
            rawCredits === undefined || rawCredits === null
                ? NaN
                : Number(String(rawCredits).trim());
        const credits = typeof creditsParsed === "number" && !Number.isNaN(creditsParsed) ? creditsParsed : NaN;
        if (!Number.isNaN(credits) && credits > 0) {
            // If a numeric score was provided and numericRanges are available, map score -> grade
            let gradeToLookup = course.grade;
            if (course.score !== undefined && course.score !== null && numericRanges) {
                const rawScore = typeof course.score === "number" ? course.score : Number(course.score);
                if (!Number.isNaN(Number(rawScore))) {
                    const matched = numericRanges.find((r) => rawScore >= r.min && rawScore <= r.max);
                    if (matched) gradeToLookup = matched.grade;
                }
            }

            const gradeKey = gradeToLookup !== undefined && gradeToLookup !== null ? String(gradeToLookup).trim() : "";
            const point = gradeMap.get(gradeKey) ?? null;
            if (point !== null) {
                // Add quality points regardless; point may be 0 for F
                qualityPoints += credits * point;

                // If rules say exclude fails from denominator and point === 0, skip adding credits
                const isFail = point === 0;
                const excludeFail = rules?.excludeFailFromDenominator === true;
                if (!(excludeFail && isFail)) {
                    creditSum += credits;
                }

                // earned credits: consider earnedGradeMin (default 'D')
                const earnedMin = rules?.earnedGradeMin ?? "D";
                const earnedMinPoint = gradeMap.get(earnedMin) ?? 0;
                if (point >= earnedMinPoint) {
                    earnedCredits += credits;
                }
            }
        }
    }

    const current = creditSum > 0 ? qualityPoints / creditSum : null;

    const prevCgpaNum = typeof previousCgpa === "number" ? previousCgpa : Number(previousCgpa);
    const prevCreditsNum = typeof previousCredits === "number" ? previousCredits : Number(previousCredits);

    const hasPrevious =
        includePrevious &&
        typeof prevCgpaNum === "number" &&
        !Number.isNaN(prevCgpaNum) &&
        typeof prevCreditsNum === "number" &&
        !Number.isNaN(prevCreditsNum) &&
        prevCreditsNum > 0;

    const previousQuality = hasPrevious ? (prevCgpaNum as number) * (prevCreditsNum as number) : 0;
    const cumulativeCreditTotal = creditSum + (hasPrevious ? (prevCreditsNum as number) : 0);
    const cumulative = cumulativeCreditTotal > 0 ? (previousQuality + qualityPoints) / cumulativeCreditTotal : null;

    const interpretationValue = cumulative ?? current;
    let message = "Add your courses to see a detailed interpretation.";
    if (typeof interpretationValue === "number") {
        if (interpretationValue >= 3.75) {
            message = "Outstanding academic standing. Keep up the excellent work!";
        } else if (interpretationValue >= 3.3) {
            message = "Strong performance with room for targeted improvements.";
        } else if (interpretationValue >= 2.5) {
            message = "Satisfactory progress. Consider meeting an advisor to plan the next steps.";
        } else {
            message = "At-risk standing. Consult your academic advisor for support.";
        }
    }

    return {
        currentGpa: current,
        cumulativeGpa: cumulative,
        currentCredits: earnedCredits,
        totalCredits: cumulativeCreditTotal,
        interpretation: message,
    };
}
