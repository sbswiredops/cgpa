export type GradeScale = {
  grade: string;
  point: number;
  description?: string;
};

export type UniversityInfo = {
  id: string;
  name: string;
  shortName: string;
  gradingScale: GradeScale[];
  /** Optional numeric score ranges mapping to letter grades (min/max inclusive) */
  numericRanges?: { grade: string; min: number; max: number }[];
  /** Optional free-form calculation guide or notes for the university (markdown-friendly) */
  calculationGuide?: string;
  /** Optional calculation rules (per-university policies) */
  rules?: {
    /** Exclude failing/non-contributing grades (point === 0) from GPA denominator */
    excludeFailFromDenominator?: boolean;
    /** Minimum grade (letter) considered as 'earned' credit. Example: 'D' */
    earnedGradeMin?: string;
    /** Degree requirement CGPA threshold (optional) */
    degreeRequirementCgpa?: number;
    /** Which grades count as attempted credits (whitelist). If provided, only these grades are considered for credits attempted. */
    attemptGrades?: string[];
    /** If true, when a course is retaken the last attempt's grade is used (informational; requires course ids to enforce) */
    lastAttemptWins?: boolean;
    /** Optional probation CGPA threshold (e.g. 1.5 means CGPA < 1.5 puts student on probation) */
    probationCgpa?: number;
    /** Number of consecutive semesters allowed on probation before dismissal */
    probationConsecutiveSemestersAllowed?: number;
    /** If student first-semester CGPA is below this threshold, they may be asked to withdraw */
    firstSemesterWithdrawThreshold?: number;
    /** Semester number by which a higher CGPA is required to continue (e.g. 6) */
    continuationRequirementSemester?: number;
    /** Required CGPA at continuationRequirementSemester to continue (e.g. 2.0) */
    continuationRequirementCgpa?: number;
  };
  /** Optional era-specific mappings (for universities that changed grading policy over time) */
  eraMappings?: Array<{
    /** Human friendly name for the era/policy */
    name: string;
    /** Optional effective start date (ISO yyyy-mm-dd) for this era */
    effectiveFrom?: string;
    /** Optional effective end date (ISO yyyy-mm-dd) for this era */
    effectiveTo?: string;
    gradingScale?: GradeScale[];
    numericRanges?: { grade: string; min: number; max: number }[];
    note?: string;
  }>;
};

const standardScale: GradeScale[] = [
  { grade: "A+", point: 4 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "D", point: 2 },
  { grade: "F", point: 0 },
];

const bracScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "97 - 100 — Exceptional" },
  { grade: "A", point: 4.0, description: "90 - <97 — Excellent" },
  { grade: "A-", point: 3.7, description: "85 - <90" },
  { grade: "B+", point: 3.3, description: "80 - <85" },
  { grade: "B", point: 3.0, description: "75 - <80 — Good" },
  { grade: "B-", point: 2.7, description: "70 - <75" },
  { grade: "C+", point: 2.3, description: "65 - <70" },
  { grade: "C", point: 2.0, description: "60 - <65 — Fair" },
  { grade: "C-", point: 1.7, description: "57 - <60" },
  { grade: "D+", point: 1.3, description: "55 - <57" },
  { grade: "D", point: 1.0, description: "52 - <55 — Poor" },
  { grade: "D-", point: 0.7, description: "50 - <52" },
  { grade: "F", point: 0.0, description: "<50 — Failure" },
];

const ewuScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
  // Special/administrative
  { grade: "F*", point: 0.0, description: "Failure" },
  { grade: "U*", point: 0.0, description: "Unsatisfactory" },
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "P", point: 0.0, description: "Pass" },
  { grade: "R", point: 0.0, description: "Repeat/Retake" },
  { grade: "S", point: 0.0, description: "Satisfactory" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
];

const nsuScale: GradeScale[] = [
  { grade: "A", point: 4, description: "93 and above — Excellent" },
  { grade: "A-", point: 3.7, description: "90 - 92" },
  { grade: "B+", point: 3.3, description: "87 - 89" },
  { grade: "B", point: 3.0, description: "83 - 86 — Good" },
  { grade: "B-", point: 2.7, description: "80 - 82" },
  { grade: "C+", point: 2.3, description: "77 - 79" },
  { grade: "C", point: 2.0, description: "73 - 76 — Average" },
  { grade: "C-", point: 1.7, description: "70 - 72" },
  { grade: "D+", point: 1.3, description: "67 - 69" },
  { grade: "D", point: 1.0, description: "60 - 66 — Poor" },
  { grade: "F", point: 0.0, description: "Below 60 — Failure" },
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
];

const iubScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "4.0" },
  { grade: "A", point: 4.0, description: "90% and above — Excellent" },
  { grade: "A-", point: 3.7, description: "85% to less than 90% — Excellent" },
  { grade: "B+", point: 3.3, description: "80% to less than 85% — Good" },
  { grade: "B", point: 3.0, description: "75% to less than 80% — Good" },
  { grade: "B-", point: 2.7, description: "70% to less than 75% — Good" },
  { grade: "C+", point: 2.3, description: "65% to less than 70% — Passing" },
  { grade: "C", point: 2.0, description: "60% to less than 65% — Passing" },
  { grade: "C-", point: 1.7, description: "55% to less than 60% — Passing" },
  { grade: "D+", point: 1.3, description: "50% to less than 55% — Deficient Passing" },
  { grade: "D", point: 1.0, description: "45% to less than 50% — Deficient Passing" },
  { grade: "D-", point: 0.7, description: "<45 (or 50-<52 in some variants) — Minimal Passing" },
  { grade: "F", point: 0.0, description: "Less than 45% — Failing" },
  // Special / administrative grades
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
  { grade: "Y", point: 0.0, description: "Audit" },
  { grade: "O", point: 0.0, description: "Administrative Withdrawal" },
  { grade: "Z", point: 0.0, description: "No Grade Received" },
  { grade: "P", point: 0.0, description: "Pass" },
  { grade: "S", point: 0.0, description: "Satisfactory" },
  { grade: "U", point: 0.0, description: "Unsatisfactory" },
  { grade: "T", point: 0.0, description: "Repeated (Credit Not Allowed)" },
  { grade: "R", point: 0.0, description: "Repeated (Credit Allowed)" },
  { grade: "E", point: 0.0, description: "Examination" },
];

const uiuScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "Highest — Exceptional" },
  { grade: "A", point: 4.0, description: "Exceptional performance" },
  { grade: "A-", point: 3.7, description: "Excellent" },
  { grade: "B+", point: 3.3, description: "Very Good" },
  { grade: "B", point: 3.0, description: "Good" },
  { grade: "B-", point: 2.7, description: "Above Average" },
  { grade: "C+", point: 2.3, description: "Average" },
  { grade: "C", point: 2.0, description: "Below Average" },
  { grade: "C-", point: 1.7, description: "Poor" },
  { grade: "D+", point: 1.33, description: "Minimal Pass" },
  { grade: "D", point: 1.0, description: "Pass" },
  { grade: "F", point: 0.0, description: "Fail" },
];

// Numeric ranges for UIU (used to map numeric score -> letter grade)
const uiuNumericRanges = [
  { grade: "A+", min: 90, max: 100 },
  { grade: "A", min: 85, max: 89.999 },
  { grade: "A-", min: 80, max: 84.999 },
  { grade: "B+", min: 75, max: 79.999 },
  { grade: "B", min: 70, max: 74.999 },
  { grade: "B-", min: 65, max: 69.999 },
  { grade: "C+", min: 60, max: 64.999 },
  { grade: "C", min: 55, max: 59.999 },
  { grade: "C-", min: 50, max: 54.999 },
  { grade: "D+", min: 47, max: 49.999 },
  { grade: "D", min: 40, max: 46.999 },
  { grade: "F", min: 0, max: 39.999 },
];

const austScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% or above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
];

// Numeric ranges for AUST (min/max inclusive). Used to map numeric score -> letter grade.
const austNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// Manarat International University grading scale and numeric ranges (UGC-approved mapping)
const manaratScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
  // Administrative / other grades
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
  { grade: "R", point: 0.0, description: "Repeat" },
];

const manaratNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// Generic Bangladesh (UGC-style) grading scale and numeric ranges
const bangladeshScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Below 40% — Failure" },
  // Administrative grades
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdraw" },
  { grade: "X", point: 0.0, description: "Absent From Examination" },
];

const bangladeshNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// Sylhet International University grading scale / numeric ranges (UGC-aligned)
const siuScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
  // Administrative
  { grade: "I", point: 0.0, description: "Incomplete" },
];

const siuNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// DIU grading scale (as provided)
const diuScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "C-", point: 2.0 },
  { grade: "D+", point: 1.75 },
  { grade: "D", point: 1.5 },
  { grade: "F", point: 0.0 },
];

// AUB grading scale (matches mapping provided by user)
const aubScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "D", point: 2.0 },
  { grade: "F", point: 0.0 },
];

// Pundra University grading scale and numeric ranges
const pundraScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Below 40% — Failure" },
  // administrative grades
  { grade: "I", point: 0.0, description: "Incomplete" },
  { grade: "W", point: 0.0, description: "Withdrawal" },
  { grade: "R", point: 0.0, description: "Repeat" },
];

const pundraNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// CWU grading scale (same mapping as DIU / standard 4.0 variant)
const cwuScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "D", point: 2.0 },
  { grade: "F", point: 0.0 },
];

// IUBAT grading scale (matches provided mapping)
const iubatScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 3.75 },
  { grade: "A-", point: 3.5 },
  { grade: "B+", point: 3.25 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.75 },
  { grade: "C+", point: 2.5 },
  { grade: "C", point: 2.25 },
  { grade: "D", point: 2.0 },
  { grade: "F", point: 0.0 },
];

// IIUC grading scale and numeric ranges (UGC uniform mapping)
const iiucScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80-100 — Excellent" },
  { grade: "A", point: 3.75, description: "75-79 — Very Good" },
  { grade: "A-", point: 3.5, description: "70-74" },
  { grade: "B+", point: 3.25, description: "65-69 — Good" },
  { grade: "B", point: 3.0, description: "60-64" },
  { grade: "B-", point: 2.75, description: "55-59 — Satisfactory" },
  { grade: "C+", point: 2.5, description: "50-54" },
  { grade: "C", point: 2.25, description: "45-49 — Pass" },
  { grade: "D", point: 2.0, description: "40-44" },
  { grade: "F", point: 0.0, description: "0-39 — Fail" },
];

const iiucNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// WUB follows the UGC uniform mapping; reuse IIUC scale and ranges
const wubScale: GradeScale[] = iiucScale;
const wubNumericRanges = iiucNumericRanges;

// SMUCT follows the UGC mapping as well
const smuctScale: GradeScale[] = iiucScale;
const smuctNumericRanges = iiucNumericRanges;

// UAP grading scale (UGC uniform mapping with E/I administrative grades)
const uapScale: GradeScale[] = [
  { grade: "A+", point: 4.0, description: "80% and above" },
  { grade: "A", point: 3.75, description: "75% to less than 80%" },
  { grade: "A-", point: 3.5, description: "70% to less than 75%" },
  { grade: "B+", point: 3.25, description: "65% to less than 70%" },
  { grade: "B", point: 3.0, description: "60% to less than 65%" },
  { grade: "B-", point: 2.75, description: "55% to less than 60%" },
  { grade: "C+", point: 2.5, description: "50% to less than 55%" },
  { grade: "C", point: 2.25, description: "45% to less than 50%" },
  { grade: "D", point: 2.0, description: "40% to less than 45%" },
  { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
  { grade: "E", point: 0.0, description: "Exemption (administrative)" },
  { grade: "I", point: 0.0, description: "Incomplete (administrative)" },
];

const uapNumericRanges = [
  { grade: "A+", min: 80, max: 100 },
  { grade: "A", min: 75, max: 79.999 },
  { grade: "A-", min: 70, max: 74.999 },
  { grade: "B+", min: 65, max: 69.999 },
  { grade: "B", min: 60, max: 64.999 },
  { grade: "B-", min: 55, max: 59.999 },
  { grade: "C+", min: 50, max: 54.999 },
  { grade: "C", min: 45, max: 49.999 },
  { grade: "D", min: 40, max: 44.999 },
  { grade: "F", min: 0, max: 39.999 },
];

// Presidency University legacy scale (pre-Summer 2014) and numeric ranges
const presidencyLegacyScale: GradeScale[] = [
  { grade: "A+", point: 4.0 },
  { grade: "A", point: 4.0 },
  { grade: "A-", point: 3.7 },
  { grade: "B+", point: 3.3 },
  { grade: "B", point: 3.0 },
  { grade: "B-", point: 2.7 },
  { grade: "C+", point: 2.3 },
  { grade: "C", point: 2.0 },
  { grade: "C-", point: 1.7 },
  { grade: "D+", point: 1.3 },
  { grade: "D", point: 1.0 },
  { grade: "F", point: 0.0 },
];

const presidencyLegacyNumericRanges = [
  { grade: "A+", min: 90, max: 100 },
  { grade: "A", min: 90, max: 100 },
  { grade: "A-", min: 85, max: 89.999 },
  { grade: "B+", min: 80, max: 84.999 },
  { grade: "B", min: 75, max: 79.999 },
  { grade: "B-", min: 70, max: 74.999 },
  { grade: "C+", min: 65, max: 69.999 },
  { grade: "C", min: 60, max: 64.999 },
  { grade: "C-", min: 55, max: 59.999 },
  { grade: "D+", min: 52, max: 54.999 },
  { grade: "D", min: 50, max: 51.999 },
  { grade: "F", min: 0, max: 49.999 },
];

export const universities: UniversityInfo[] = [
  {
    id: "aiub",
    name: "American International University-Bangladesh",
    shortName: "AIUB",
    gradingScale: standardScale,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "globalub",
    name: "Global University Bangladesh",
    shortName: "GlobalUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawn" },
      { grade: "R", point: 0.0, description: "Repeat" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Global University Bangladesh grading (UGC-aligned 4.0 scale):\nA+ 80%+ = 4.00\nA 75-79.99 = 3.75\nA- 70-74.99 = 3.50\nB+ 65-69.99 = 3.25\nB 60-64.99 = 3.00\nB- 55-59.99 = 2.75\nC+ 50-54.99 = 2.50\nC 45-49.99 = 2.25\nD 40-44.99 = 2.00\nF <40 = 0.00\n\nMinimum CGPA to graduate: 2.50. Falling below 2.50 results in academic probation; unresolved probation may lead to dismissal.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.5,
      probationCgpa: 2.5,
    },
  },
  {
    id: "rstu",
    name: "Rajshahi Science & Technology University (Natore)",
    shortName: "RSTU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "90% and above" },
      { grade: "A", point: 3.5, description: "80% - 89%" },
      { grade: "B+", point: 3.0, description: "70% - 79%" },
      { grade: "B", point: 2.5, description: "60% - 69%" },
      { grade: "C", point: 2.0, description: "50% - 59%" },
      { grade: "F", point: 0.0, description: "Below 50% — Fail" },
    ],
    numericRanges: [
      { grade: "A+", min: 90, max: 100 },
      { grade: "A", min: 80, max: 89.999 },
      { grade: "B+", min: 70, max: 79.999 },
      { grade: "B", min: 60, max: 69.999 },
      { grade: "C", min: 50, max: 59.999 },
      { grade: "F", min: 0, max: 49.999 },
    ],
    calculationGuide: `RSTU (Natore) grading summary:\n\nA+ = 90% and above -> 4.00\nA = 80% - 89% -> 3.50\nB+ = 70% - 79% -> 3.00\nB = 60% - 69% -> 2.50\nC = 50% - 59% -> 2.00\nF = Below 50% -> 0.00\n\nMinimum CGPA to graduate: 2.50.\nGPA = (Σ (grade point × credit hours)) / (Σ credit hours).`,
    rules: {
      attemptGrades: ["A+", "A", "B+", "B", "C", "F"],
      earnedGradeMin: "C",
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "sfmu",
    name: "Brahmaputra International University",
    shortName: "SFMU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80.000 - 100.000" },
      { grade: "A", point: 3.75, description: "75.000 - 79.000" },
      { grade: "A-", point: 3.5, description: "70.000 - 74.000" },
      { grade: "B+", point: 3.25, description: "65.000 - 69.000" },
      { grade: "B", point: 3.0, description: "60.000 - 64.000" },
      { grade: "B-", point: 2.75, description: "55.000 - 59.000" },
      { grade: "C+", point: 2.5, description: "50.000 - 54.000" },
      { grade: "C", point: 2.25, description: "45.000 - 49.000" },
      { grade: "C-", point: 2.0, description: "40.000 - 44.000" },
      { grade: "D", point: 1.0, description: "33.000 - 39.000" },
      { grade: "F", point: 0.0, description: "0.000 - 32.990 — Fail" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "C-", min: 40, max: 44.999 },
      { grade: "D", min: 33, max: 39.999 },
      { grade: "F", min: 0, max: 32.99 },
    ],
    calculationGuide: `Common Bangladesh grading (example used for SFMU):\nA+ 80.000-100.000 -> 4.00\nA 75.000-79.999 -> 3.75\nA- 70.000-74.999 -> 3.50\nB+ 65.000-69.999 -> 3.25\nB 60.000-64.999 -> 3.00\nB- 55.000-59.999 -> 2.75\nC+ 50.000-54.999 -> 2.50\nC 45.000-49.999 -> 2.25\nC- 40.000-44.999 -> 2.00\nD 33.000-39.999 -> 1.00\nF 0.000-32.999 -> 0.00\n\nNote: This is a commonly used mapping in Bangladesh. Please confirm SFMU's official grading policy on the university's website or registrar for authoritative details.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"],
      earnedGradeMin: "C-",
    },
  },
  {
    id: "rpsu",
    name: "R. P. Shaha University",
    shortName: "RPSU",
    gradingScale: [
      { grade: "A+", point: 4.0 },
      { grade: "A", point: 3.75 },
      { grade: "A-", point: 3.5 },
      { grade: "B+", point: 3.25 },
      { grade: "B", point: 3.0 },
      { grade: "B-", point: 2.75 },
      { grade: "C+", point: 2.5 },
      { grade: "C", point: 2.25 },
      { grade: "C-", point: 2.0 },
      { grade: "D", point: 1.0 },
      { grade: "F", point: 0.0 },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
      { grade: "R", point: 0.0, description: "Repeat" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "C-", min: 40, max: 44.999 },
      { grade: "D", min: 33, max: 39.999 },
      { grade: "F", min: 0, max: 32.999 },
    ],
    calculationGuide: `R. P. Shaha University grading (summary):\n\nGrade Point Scale:\nA+ = 4.00, A = 3.75, A- = 3.50, B+ = 3.25, B = 3.00, B- = 2.75, C+ = 2.50, C = 2.25, C- = 2.00, D = 1.00, F = 0.00.\n\nOther codes: I = Incomplete, W = Withdrawal, R = Repeat.\nPassing grade combinations used in some regulations: AA, BA, BB, CB, CC, DC, DD (passing); FD, FF (failing).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F", "I", "W", "R"],
      earnedGradeMin: "C-",
    },
  },
  {
    id: "timesub",
    name: "Times University, Bangladesh",
    shortName: "TimesUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Times University, Bangladesh follows the UGC-recommended 4.0 grading scale.\n\nLetter Grade\tGrade Point\tObtained Marks\nA+\t4.00\t80% and above\nA\t3.75\t75% to less than 80%\nA-\t3.50\t70% to less than 75%\nB+\t3.25\t65% to less than 70%\nB\t3.00\t60% to less than 65%\nB-\t2.75\t55% to less than 60%\nC+\t2.50\t50% to less than 55%\nC\t2.25\t45% to less than 50%\nD\t2.00\t40% to less than 45%\nF\t0.00\tLess than 40%\n\nOther grades: I = Incomplete, W = Withdrawn. Passing grade minimum: D (40% - 44.9%).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "nbiu",
    name: "North Bengal International University",
    shortName: "NBIU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `NBIU grading summary:\n\nLetter Grade -> Percentage -> Grade Point:\nA+ -> 80% and above -> 4.00\nA -> 75% to less than 80% -> 3.75\nA- -> 70% to less than 75% -> 3.50\nB+ -> 65% to less than 70% -> 3.25\nB -> 60% to less than 65% -> 3.00\nB- -> 55% to less than 60% -> 2.75\nC+ -> 50% to less than 55% -> 2.50\nC -> 45% to less than 50% -> 2.25\nD -> 40% to less than 45% -> 2.00\nF -> Less than 40% -> 0.00\n\nContinuous evaluation through quizzes, assignments, mid-terms and final exams contributes to the final grade. Students who receive 'F' must retake the course to earn credit. 'I' (Incomplete) must be cleared within 15 days of the following trimester or it will revert to 'F'.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I"],
      earnedGradeMin: "D",
      // Informational: incomplete must be cleared within 15 days or becomes F
      // This is a policy note only — enforcement requires course attempt metadata.
    },
  },
  {
    id: "uap",
    name: "University of Asia Pacific",
    shortName: "UAP",
    gradingScale: uapScale,
    numericRanges: uapNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "E", "I"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "iiuc",
    name: "International Islamic University Chittagong",
    shortName: "IIUC",
    gradingScale: iiucScale,
    numericRanges: iiucNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "wub",
    name: "World University of Bangladesh",
    shortName: "WUB",
    gradingScale: wubScale,
    numericRanges: wubNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "smuct",
    name: "Shanto-Mariam University of Creative Technology",
    shortName: "SMUCT",
    gradingScale: smuctScale,
    numericRanges: smuctNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "themillenniumuniversity",
    name: "The Millennium University",
    shortName: "TMU",
    gradingScale: iiucScale,
    numericRanges: iiucNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "brac",
    name: "BRAC University",
    shortName: "BRAC",
    gradingScale: bracScale,

    rules: {
      // BRAC considers the standard letter grades as attempted and earned per usual mapping
      attemptGrades: [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "F",
      ],
      earnedGradeMin: "D",
      // Probation and continuation policy
      probationCgpa: 1.5,
      probationConsecutiveSemestersAllowed: 2,
      firstSemesterWithdrawThreshold: 1.0,
      continuationRequirementSemester: 6,
      continuationRequirementCgpa: 2.0,
    },
  },
  {
    id: "nsu",
    name: "North South University",
    shortName: "NSU",
    gradingScale: nsuScale,

    rules: {
      // NSU counts standard letter grades as attempted credits (administrative grades like W/I do not count)
      attemptGrades: ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      // Minimum earned grade for credit to be counted as 'earned'
      earnedGradeMin: "D",
      // Degree requirement (graduation) CGPA
      degreeRequirementCgpa: 2.0,
      // NSU treats W and I as non-contributing administrative grades (so excludeFailFromDenominator remains false)
      excludeFailFromDenominator: false,
    },
  },
  {
    id: "iub",
    name: "Independent University, Bangladesh",
    shortName: "IUB",
    gradingScale: iubScale,

    rules: {
      attemptGrades: [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "F",
      ],
      earnedGradeMin: "D",
    },
  },
  {
    id: "ewu",
    name: "East West University",
    shortName: "EWU",
    gradingScale: ewuScale,
    rules: {
      // EWU: Only courses graded A+, A, A-, B+, B, B-, C+, C, D, and F are used to determine credits attempted.
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      // Passing grades are A..D (earnedGradeMin default is 'D')
      earnedGradeMin: "D",
      // Repeats: CGPA uses grade from last attempt only (informational; requires course ids to enforce)
      lastAttemptWins: true,
    },
  },
  {
    id: "uiu",
    name: "United International University",
    shortName: "UIU",
    gradingScale: uiuScale,
    numericRanges: uiuNumericRanges,
    calculationGuide: `United International University (UIU) grading summary:

Assessment weights:
- Mid-term exam: 30%
- Final exam: 50%
- Class attendance & assignments: 10%
- Class tests/quizzes/presentations: 10%

Grade point system (example): A+ 4.00, A 4.00, A- 3.70, B+ 3.30, B 3.00, B- 2.70, C+ 2.30, C 2.00, C- 1.70, D+ 1.33, D 1.00, F 0.00.

Graduation requirements:
- Most departments require a minimum CGPA of 2.00 to graduate.
- The Pharmacy department requires a minimum CGPA of 2.50 to graduate.
`,
    rules: {
      // Per UIU policy: courses with 'F' are not counted as earned credit hours (exclude from denominator)
      excludeFailFromDenominator: true,
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "aust",
    name: "Ahsanullah University of Science and Technology",
    shortName: "AUST",
    gradingScale: austScale,
    numericRanges: austNumericRanges,
  },
  {
    id: "du",
    name: "Dhaka University",
    shortName: "DU",
    gradingScale: standardScale,
  },
  {
    id: "diu",
    name: "Daffodil International University",
    shortName: "DIU",
    gradingScale: aubScale,
    rules: {
      attemptGrades: [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "F",
      ],
      earnedGradeMin: "D",
    },
  },
  {
    id: "cwu",
    name: "Central Women's University",
    shortName: "CWU",
    gradingScale: cwuScale,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "iubat",
    name: "International University of Business Agriculture and Technology",
    shortName: "IUBAT",
    gradingScale: iubatScale,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "pundra",
    name: "Pundra University of Science & Technology",
    shortName: "PUNDRA",
    gradingScale: pundraScale,
    numericRanges: pundraNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "uttara",
    name: "Uttara University",
    shortName: "Uttara",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80-100" },
      { grade: "A", point: 3.75, description: "75-79" },
      { grade: "A-", point: 3.5, description: "70-74" },
      { grade: "B+", point: 3.25, description: "65-69" },
      { grade: "B", point: 3.0, description: "60-64" },
      { grade: "B-", point: 2.75, description: "55-59" },
      { grade: "C+", point: 2.5, description: "50-54" },
      { grade: "C", point: 2.25, description: "45-49" },
      { grade: "D", point: 2.0, description: "40-44" },
      { grade: "F", point: 0.0, description: "0-39 — Failure" },
      // administrative
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
      { grade: "R", point: 0.0, description: "Repeat/Retake" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Uttara University grading mapping (as provided). Numerical scores map to letter grades; administrative codes: F = Failure, I = Incomplete, W = Withdrawal, R = Repeat/Retake. CGPA = (Σ (grade point × credit)) / (Σ credit).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "aub",
    name: "Asian University of Bangladesh",
    shortName: "AUB",
    gradingScale: aubScale,
    // Provide a short calculation guide helpful for users — based on the user's provided text
    calculationGuide: `Understanding Asian University of Bangladesh’s Grading System\n\nBefore calculating your CGPA, it's important to know how Asian University of Bangladesh (AUB) grades students. Here’s the grading scale:\n\nGrade\tGrade Point\nA+\t4.00\nA\t3.75\nA-\t3.50\nB+\t3.25\nB\t3.00\nB-\t2.75\nC+\t2.50\nC\t2.25\nD\t2.00\nF\t0.00\n\nEach course has a certain number of credit hours. This shows how much the course affects your CGPA. For example, a 4-credit-hour course impacts your CGPA more than a 3-credit-hour course. It’s important to understand this when calculating your CGPA or using an online calculator.\n\nAUB uses a weighted grading system. This means courses with more credit hours affect your CGPA more. Core subjects, which usually have more credit hours, carry more weight.\n\nFormula for Calculating CGPA Manually\nCGPA = Total Grade Points ÷ Total Credit Hours\n\nExample:\nSubject\tCredit Hours\tGrade\tGrade Point\tTotal Grade Points\nMath\t3\tA\t3.75\t11.25\nEnglish\t3\tB+\t3.25\t9.75\nProgramming\t4\tA-\t3.50\t14.00\nPhysics\t3\tB\t3.00\t9.00\nTotal Credit Hours: 3 + 3 + 4 + 3 = 13\nTotal Grade Points: 11.25 + 9.75 + 14.00 + 9.00 = 44.00\nCGPA: 44.00 ÷ 13 = 3.38\n\nThis method works well but can be slow and easy to mess up, especially with many courses. Many students prefer automated tools for faster, more accurate results.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "miu",
    name: "Manarat International University",
    shortName: "MIU",
    gradingScale: manaratScale,
    numericRanges: manaratNumericRanges,
    // Informational calculation guide could be added later if desired
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "bu",
    name: "Bangladesh University",
    shortName: "BU",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Bangladesh University grading follows the common UGC-style 4.0 scale. For more information see https://www.bu.edu.bd/`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X"],
      earnedGradeMin: "C+",
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "bubt",
    name: "Bangladesh University of Business & Technology",
    shortName: "BUBT",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Grading system at Bangladesh University of Business & Technology (BUBT):

Numerical Grade\tLetter Grade\tGrade Point
80% and above\tA+\t4.00
75% to less than 80%\tA\t3.75
70% to less than 75%\tA-\t3.50
65% to less than 70%\tB+\t3.25
60% to less than 65%\tB\t3.00
55% to less than 60%\tB-\t2.75
50% to less than 55%\tC+\t2.50
45% to less than 50%\tC\t2.25
40% to less than 45%\tD\t2.00
Less than 40%\tF\t0.00

Computation of GPA:
Every course has credit hours which act as weights. GPA for a semester = (Σ (grade point × credit hours)) / (Σ credit hours). CGPA is the weighted average across semesters.

Policy highlights:
- 'F' grade holders must repeat the course within the next 3 consecutive semesters.
- Students may apply to repeat a course to improve a grade within two weeks of result publication; the improved grade is computed in the final transcript and previous grade is marked 'R' (no effect on GPA).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
      // Improvement/retake policy: improved grade replaces previous grade on transcript for CGPA purposes
      lastAttemptWins: true,
    },
  },
  {
    id: "uits",
    name: "University of Information Technology & Sciences",
    shortName: "UITS",
    // UITS follows a UGC-style 4.0 mapping (A+ 80%+ down to D as passing; F = fail).
    // Reuse the standard Bangladesh mapping so numeric score -> letter/point mapping is consistent.
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `University of Information Technology & Sciences (UITS) grading summary:\n\nLetter grades and grade points commonly used:\nA+ = 4.00 (80% and above)\nA = 3.75 (75% to less than 80%)\nA- = 3.50 (70% to less than 75%)\nB+ = 3.25 (65% to less than 70%)\nB = 3.00 (60% to less than 65%)\nC+ = 2.50 (50% to less than 55%)\nC = 2.25 (45% to less than 50%)\nD = 2.00 (40% to less than 45%)\nF = 0.00 (Fail)\nI = Incomplete (must be cleared to avoid conversion to F).\n\nNote: Numerical marks are typically not shown on official transcripts; transcripts display letter grades and corresponding grade points (and CGPA).`,
    rules: {
      // UITS considers A+..D as passing; include administrative grades for completeness
      attemptGrades: ["A+", "A", "A-", "B+", "B", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "bgctub",
    name: "BGC Trust University Bangladesh",
    shortName: "BGC TUB",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,

    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "siu",
    name: "Sylhet International University",
    shortName: "SIU",
    gradingScale: siuScale,
    numericRanges: siuNumericRanges,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I"],
      earnedGradeMin: "D",
      // SIU's policy: F is recorded and requires repeat; many policies treat F as non-earned credit.
      excludeFailFromDenominator: true,
      // Graduation minimum CGPA (normal progress threshold)
      degreeRequirementCgpa: 2.25,
    },
  },

  // University of Development Alternative (UODA)
  {
    id: "uoda",
    name: "University of Development Alternative",
    shortName: "UODA",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "81-100 — Outstanding" },
      { grade: "A", point: 3.75, description: "76-80 — Excellent" },
      { grade: "A-", point: 3.5, description: "71-75 — Very Good" },
      { grade: "B+", point: 3.25, description: "66-70 — Moderate" },
      { grade: "B", point: 3.0, description: "61-65 — Good" },
      { grade: "B-", point: 2.75, description: "56-60 — Satisfactory" },
      { grade: "C+", point: 2.5, description: "51-55 — Average" },
      { grade: "C", point: 2.25, description: "46-50 — Fair" },
      { grade: "D", point: 2.0, description: "40-45 — Pass" },
      { grade: "F", point: 0.0, description: "Below 40 — Fail" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdraw" },
    ],
    numericRanges: [
      { grade: "A+", min: 81, max: 100 },
      { grade: "A", min: 76, max: 80.999 },
      { grade: "A-", min: 71, max: 75.999 },
      { grade: "B+", min: 66, max: 70.999 },
      { grade: "B", min: 61, max: 65.999 },
      { grade: "B-", min: 56, max: 60.999 },
      { grade: "C+", min: 51, max: 55.999 },
      { grade: "C", min: 46, max: 50.999 },
      { grade: "D", min: 40, max: 45.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "puc",
    name: "Premier University",
    shortName: "PUC",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above — A+" },
      { grade: "A", point: 3.75, description: "75% to less than 80% — A" },
      { grade: "A-", point: 3.5, description: "70% to less than 75% — A-" },
      { grade: "B+", point: 3.25, description: "65% to less than 70% — B+" },
      { grade: "B", point: 3.0, description: "60% to less than 65% — B" },
      { grade: "B-", point: 2.75, description: "55% to less than 60% — B-" },
      { grade: "C+", point: 2.5, description: "50% to less than 55% — C+" },
      { grade: "C", point: 2.25, description: "45% to less than 50% — C" },
      { grade: "D", point: 2.0, description: "40% to less than 45% — D" },
      { grade: "F", point: 0.0, description: "Less than 40% — F" },
      { grade: "I", point: 0.0, description: "Incomplete" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "fiu",
    name: "Fareast International University",
    shortName: "FIU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
      { grade: "R", point: 0.0, description: "Repeat" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Fareast International University (FIU) grading:\n\nA+ (80% and above) = 4.00\nA (75% to <80%) = 3.75\nA- (70% to <75%) = 3.50\nB+ (65% to <70%) = 3.25\nB (60% to <65%) = 3.00\nB- (55% to <60%) = 2.75\nC+ (50% to <55%) = 2.50\nC (45% to <50%) = 2.25\nD (40% to <45%) = 2.00\nF (Less than 40%) = 0.00\n\nAdministrative grades: I = Incomplete, W = Withdrawal, R = Repeat.\n\nDegree classification by CGPA:\n- First Class: CGPA >= 3.00\n- Second Class: 2.50 <= CGPA < 3.00\n- Third Class: 2.00 <= CGPA < 2.50\n\nGPA = (Σ (grade point × credit hours)) / (Σ credit hours). CGPA is the cumulative average across semesters.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "seu",
    name: "Southeast University",
    shortName: "SEU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Southeast University grading (UGC-aligned). GPA/CGPA = (Σ (grade point × credit)) / (Σ credit). Courses with D or higher count as earned credits. F is failing and should be repeated.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.25,
    },
  },
  {
    id: "stamforduniversity",
    name: "Stamford University Bangladesh",
    shortName: "Stamford",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdraw" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Stamford University grading summary:\n\n- Continuous and summative assessments contribute to the final course grade (quizzes, participation, attendance, assignments, case studies, midterm and final exams).\n- For 3-credit courses at least four class tests (best two counted); for 2-credit courses at least three class tests (best two counted).\n- After midterm, the 1st part of course is considered completed and not carried to final.\n\nGPA/CGPA calculation: GPA = (Σ (grade points × credit hours)) / (Σ credit hours).\n\nAttendance marks (added to score):\n90-100 => 10, 85-89 => 9, 80-84 => 8, 75-79 => 7, 70-74 => 6, 65-69 => 5, 60-64 => 4, 55-59 => 3, 50-54 => 2, 45-49 => 1, <45 => 0.\n\nAcademic probation: Undergraduate/graduate/postgraduate students with GPA < 2.50 will be placed on probation for one semester; failure to improve will result in dismissal.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
      probationCgpa: 2.5,
    },
  },
  {
    id: "sub",
    name: "State University of Bangladesh",
    shortName: "SUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `State University of Bangladesh uses the UGC 4.0 grading scale. CGPA is computed as the weighted average of grade points: CGPA = (Σ (grade point × credit hours)) / (Σ credit hours). Minimum CGPA required to graduate: 2.50.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "cityuniversity",
    name: "City University",
    shortName: "CityU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% - 100%" },
      { grade: "A", point: 3.75, description: "75% - 79.99%" },
      { grade: "A-", point: 3.5, description: "70% - 74.99%" },
      { grade: "B+", point: 3.25, description: "65% - 69.99%" },
      { grade: "B", point: 3.0, description: "60% - 64.99%" },
      { grade: "B-", point: 2.75, description: "55% - 59.99%" },
      { grade: "C+", point: 2.5, description: "50% - 54.99%" },
      { grade: "C", point: 2.25, description: "45% - 49.99%" },
      { grade: "D", point: 2.0, description: "40% - 44.99%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `City University follows the UGC 4.0 grading scale. Course evaluation includes final exams, terminal exams, assignments, term papers, and class tests. Failed courses (F) must be retaken; when a course is retaken the higher grade is retained on the transcript for improved grade. CGPA is calculated as CGPA = (Σ (grade point × credit)) / (Σ credit).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I"],
      earnedGradeMin: "D",
      // CityU policy: when a course is retaken, the higher grade is kept on transcript
      lastAttemptWins: false,
    },
  },
  {
    id: "primeuniversity",
    name: "Prime University",
    shortName: "PrimeU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80.00 - 100.00" },
      { grade: "A", point: 3.75, description: "75.00 - 79.99" },
      { grade: "A-", point: 3.5, description: "70.00 - 74.99" },
      { grade: "B+", point: 3.25, description: "65.00 - 69.99" },
      { grade: "B", point: 3.0, description: "60.00 - 64.99" },
      { grade: "B-", point: 2.75, description: "55.00 - 59.99" },
      { grade: "C+", point: 2.5, description: "50.00 - 54.99" },
      { grade: "C", point: 2.25, description: "45.00 - 49.99" },
      { grade: "D", point: 2.0, description: "40.00 - 44.99" },
      { grade: "F", point: 0.0, description: "0.00 - 39.99" },
      { grade: "I", point: 0.0, description: "Incomplete" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Prime University grading (summary): numeric marks map to letter grades and grade points as listed. CGPA is computed as the weighted average: CGPA = (Σ (grade point × credit hours)) / (Σ credit hours).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "nub",
    name: "Northern University Bangladesh",
    shortName: "NUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
      { grade: "X", point: 0.0, description: "Absent from final exam" },
      { grade: "Y", point: 0.0, description: "Caught for unfair means" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Northern University Bangladesh (NUB) grading summary:\n\nGPA = (Σ (grade point × credit hours)) / (Σ credit hours attempted).\n\nExample:\nCourse\tCr.Hr\tGrade\tGP\tTGP\nENG101\t3\tA+\t4.00\t12.00\nMTH101\t3\tB\t3.00\t9.00\nPHY101\t3\tC\t2.25\t6.75\nHUM101\t3\tF\t0.00\t0.00\nTotal Credit Hours: 12\nTotal Grade Points: 27.75\nGPA = 27.75 / 12 = 2.31\n\nCGPA is computed similarly using cumulative totals of grade points and credit hours earned up to that time.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X", "Y"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "southern",
    name: "Southern University Bangladesh",
    shortName: "Southern",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative/status codes
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "CR", point: 0.0, description: "Credit" },
      { grade: "W", point: 0.0, description: "Withdraw" },
      { grade: "R", point: 0.0, description: "Repeat" },
      { grade: "AU", point: 0.0, description: "Audit" },
      { grade: "S", point: 0.0, description: "Satisfactory" },
      { grade: "U", point: 0.0, description: "Unsatisfactory" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Southern University Bangladesh uses the UGC-approved 4.0 grading scale.\n\nGPA = (Σ (grade point × credit hours)) / (Σ credit hours attempted).\n\nGrade/status codes: I (Incomplete), CR (Credit), W (Withdraw), R (Repeat), AU (Audit), S (Satisfactory), U (Unsatisfactory), etc.\n\nNotes: Courses with status codes such as CR, W, AU, S, U, I are generally excluded from GPA computation per university policy. Transfer or guest students must meet transfer CGPA / credit requirements determined at admission.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "ciu",
    name: "Chittagong Independent University",
    shortName: "CIU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Numerical Score\tLetter Grade\tGrade Point
80% and above\tA+\t4.0
75% to less than 80%\tA\t3.75
70% to less than 75%\tA-\t3.5
65% to less than 70%\tB+\t3.25
60% to less than 65%\tB\t3.0
55% to less than 60%\tB-\t2.75
50% to less than 55%\tC+\t2.5
45% to less than 50%\tC\t2.25
40% to less than 45%\tD\t2.0
Less than 40%\tF\t0.0`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },

  {
    id: "baiust",
    name: "Bangladesh Army International University of Science & Technology",
    shortName: "BAIUST",
    gradingScale: [
      { grade: "A", point: 4.0, description: "Highest — 4.00" },
      { grade: "B", point: 3.0, description: "Good — 3.00" },
      { grade: "C", point: 2.0, description: "Average — 2.00" },
      { grade: "D", point: 1.0, description: "Pass — 1.00" },
      { grade: "F", point: 0.0, description: "Fail — 0.00" },
    ],
    calculationGuide: `BAIUST grading summary:\n\nFinal grades are computed by combining component marks such as assignments, mid-term examinations, and final examinations. The university uses a simple 4.00-point mapping:\nA = 4.00, B = 3.00, C = 2.00, D = 1.00, F = 0.00.\n\nGPA = (Σ (grade point × credit hours)) / (Σ credit hours).`,
    rules: {
      attemptGrades: ["A", "B", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "scholars",
    name: "The University of Scholars",
    shortName: "Scholars",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Below 40% — Failure" },
      // Administrative
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawn" },
      { grade: "R", point: 0.0, description: "Repeat" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `The University of Scholars grading summary:\n\nMarks to letter grade mapping:\nA+ (80% and above) = 4.00\nA (75% to <80%) = 3.75\nA- (70% to <75%) = 3.50\nB+ (65% to <70%) = 3.25\nB (60% to <65%) = 3.00\nB- (55% to <60%) = 2.75\nC+ (50% to <55%) = 2.50\nC (45% to <50%) = 2.25\nD (40% to <45%) = 2.00\nF (<40%) = 0.00\n\nAdministrative codes: I = Incomplete, W = Withdrawn, R = Repeat. Final transcripts display letter grades, grade points, credit hours, and CGPA. A minimum CGPA is required to graduate; students must meet semester CGPA thresholds to remain in good standing.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "cub",
    name: "Canadian University of Bangladesh",
    shortName: "CUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // administrative
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawn" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Canadian University of Bangladesh grading summary:\n\nNumeric to letter mapping follows the UGC 4.0 guidance: A+ (80%+) -> 4.00 down to D (40-44.99) -> 2.00 and F (<40) -> 0.00. GPA is the weighted average of grade points by credit hours. Earned credit requires D or above; F does not contribute to earned credits and must be repeated for core courses. Administrative grades: I = Incomplete, W = Withdrawn.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
      // CUB follows UGC guidance — minimum CGPA to graduate is typically 2.0 (program dependent)
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "npiu",
    name: "N.P.I. University of Bangladesh",
    shortName: "NPIU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "Typically 80% and above" },
      { grade: "A", point: 3.75, description: "Typically 75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "Typically 70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "Typically 65% to less than 70%" },
      { grade: "B", point: 3.0, description: "Typically 60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "Typically 55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "Typically 50% to less than 55%" },
      { grade: "C", point: 2.25, description: "Typically 45% to less than 50%" },
      { grade: "D", point: 2.0, description: "Typically 40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Below 40% — Failure" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawn" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `N.P.I. University of Bangladesh (semester system: Winter Jan-Jun, Summer Jul-Dec) grading summary:\n\nLetter grades (A+..D) map to grade points per common UGC conventions (A+ 4.00 down to D 2.00). F indicates failure (below 40%). GPA for a semester = (Σ (grade point × credit hours)) / (Σ credit hours attempted). CGPA is the cumulative weighted average across semesters. Exact percentage boundaries were not provided in the source material; the calculator uses the common UGC ranges as an assumed mapping unless you provide NPIU-specific ranges.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "nubt-khulna",
    name: "Northern University of Business & Technology, Khulna",
    shortName: "NUBT-Khulna",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative codes
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawn" },
      { grade: "X", point: 0.0, description: "Absent from final examination" },
      { grade: "Y", point: 0.0, description: "Caught for unfair means" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `NUBT Khulna grading summary:\n\nNumerical to letter mapping follows UGC-like 4.0 conventions: A+ (80%+) = 4.00 down to D (40-44.99) = 2.00 and F (<40) = 0.00. Administrative codes: I = Incomplete, W = Withdrawn, X = Absent from final exam, Y = Unfair means detected. GPA/CGPA computed as weighted averages by credit hours.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X", "Y"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "uctc",
    name: "University of Creative Technology, Chittagong",
    shortName: "UCTC",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `University of Creative Technology, Chittagong (UCTC) grading summary:\n\nUCTC follows the common Bangladesh UGC-like 4.0 mapping: A+ (4.00) down to D (2.00) as passing and F (0.00) as fail. Students with a 'D' grade may be allowed improvement attempts (retake or resit) per departmental rules; students with an 'F' must repeat the course to earn credit. GPA/CGPA are computed as weighted averages of grade points by credit hours.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "znrf",
    name: "ZNRF University of Management Sciences",
    shortName: "ZNRF",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `ZNRF University of Management Sciences grading summary:\n\nNumerical score ranges map to letter grades using the UGC-style 4.0 mapping: A+ (80%+) = 4.00 down to D (40-44.99) = 2.00 and F (<40) = 0.00. GPA/CGPA are computed as weighted averages of grade points by credit hours.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "bandarban",
    name: "Bandarban University",
    shortName: "Bandarban",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawn" },
      { grade: "R", point: 0.0, description: "Repeat" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Bandarban University uses the UGC-recommended 4.0 grading scale. Numerical marks map to letter grades and grade points as shown below:

A+ (80% and above) = 4.00
A (75% to less than 80%) = 3.75
A- (70% to less than 75%) = 3.50
B+ (65% to less than 70%) = 3.25
B (60% to less than 65%) = 3.00
B- (55% to less than 60%) = 2.75
C+ (50% to less than 55%) = 2.50
C (45% to less than 50%) = 2.25
D (40% to less than 45%) = 2.00
F (Less than 40%) = 0.00

Degree classification by CGPA:
- 1st Class: CGPA 3.00 to 4.00
- 2nd Class: CGPA 2.25 to 2.99
- 3rd Class: CGPA 2.00 to 2.24

GPA/CGPA calculation: GPA = (Σ (grade point × credit hours)) / (Σ credit hours). CGPA is the cumulative weighted average across semesters.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.25,
    },
  },
  {
    id: "uset",
    name: "The University of Skill Enrichment and Technology",
    shortName: "USET",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "90% - 100%" },
      { grade: "A", point: 3.75, description: "85% - 89%" },
      { grade: "A-", point: 3.5, description: "80% - 84%" },
      // Lower grades not fully specified in the source; include common UGC-like fallbacks
      { grade: "B+", point: 3.25, description: "75% - 79% (approx)" },
      { grade: "B", point: 3.0, description: "70% - 74% (approx)" },
      { grade: "B-", point: 2.75, description: "65% - 69% (approx)" },
      { grade: "C+", point: 2.5, description: "60% - 64% (approx)" },
      { grade: "C", point: 2.25, description: "55% - 59% (approx)" },
      { grade: "D", point: 2.0, description: "50% - 54% (approx)" },
      { grade: "F", point: 0.0, description: "Below passing threshold — Fail" },
      // Administrative / non-numeric
      { grade: "P", point: 0.0, description: "Pass (non-numeric)" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawn" },
    ],
    numericRanges: [
      { grade: "A+", min: 90, max: 100 },
      { grade: "A", min: 85, max: 89.999 },
      { grade: "A-", min: 80, max: 84.999 },
      { grade: "B+", min: 75, max: 79.999 },
      { grade: "B", min: 70, max: 74.999 },
      { grade: "B-", min: 65, max: 69.999 },
      { grade: "C+", min: 60, max: 64.999 },
      { grade: "C", min: 55, max: 59.999 },
      { grade: "D", min: 50, max: 54.999 },
      { grade: "F", min: 0, max: 49.999 },
    ],
    calculationGuide: `USET grading summary:

Letter grades and common percentage equivalents:
A+ = 4.00 (90% - 100%)
A  = 3.75 (85% - 89%)
A- = 3.50 (80% - 84%)
B+ = 3.25 (75% - 79%)
B  = 3.00 (70% - 74%)
B- = 2.75 (65% - 69%)
C+ = 2.50 (60% - 64%)
C  = 2.25 (55% - 59%)
D  = 2.00 (50% - 54%)
F  = 0.00 (Below passing threshold)

Other notations:
P = Pass (no numerical value; reported as Pass for pass/fail courses)
I = Incomplete (must be resolved through a make-up exam or additional assessment per university rules)
W = Withdrawal (recorded when a student withdraws by the deadline)

GPA calculation:
GPA = Σ(grade point × credit hours) / Σ(credit hours)

Credit system (informational):
- 1 credit ≈ 15 hours lecture
- 1 credit ≈ 30-45 hours lab work
- 1 credit ≈ 45 hours internship/project/independent study

Pass/Fail and load notes:
- Typical maximum allowed credit hours per semester: 18 (may vary by program)
- Make-up failure allowances and pass/fail policies may permit up to 6 credit hours of make-up failures under certain conditions; follow departmental rules for specifics.`,
    rules: {
      // Allow both numeric letter grades and administrative P/I/W for attempt tracking
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "P", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "ccn",
    name: "CCN University of Science & Technology",
    shortName: "CCN",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.0, description: "45% to less than 50%" },
      { grade: "D", point: 1.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative grades
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
      { grade: "R", point: 0.0, description: "Repeat/Retake" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `CCN University of Science & Technology grading summary:\n\nA+ = 4.00 (80% and above)\nA = 3.75 (75% to less than 80%)\nA- = 3.50 (70% to less than 75%)\nB+ = 3.25 (65% to less than 70%)\nB = 3.00 (60% to less than 65%)\nB- = 2.75 (55% to less than 60%)\nC+ = 2.50 (50% to less than 55%)\nC = 2.00 (45% to less than 50%)\nD = 1.00 (40% to less than 45%)\nF = 0.00 (Less than 40% — Fail)\n\nAdministrative grades: I = Incomplete, W = Withdrawal, R = Repeat/Retake.\n\nDegree requirement: Minimum CGPA to graduate = 2.50. Students with CGPA below 2.50 are placed on academic probation; if probation status persists for two consecutive semesters without improvement they may be suspended. Suspended students may be permitted to retake courses to improve grades per university policy.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.5,
      probationCgpa: 2.5,
      probationConsecutiveSemestersAllowed: 2,
    },
  },
  {
    id: "baust",
    name: "Bangladesh Army University of Science & Technology",
    shortName: "BAUST",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative codes
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
      { grade: "X", point: 0.0, description: "Absent/Other administrative" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `BAUST grading mapping (UGC-style 4.0):\nA+ 80%+ = 4.00\nA 75-79.99 = 3.75\nA- 70-74.99 = 3.50\nB+ 65-69.99 = 3.25\nB 60-64.99 = 3.00\nB- 55-59.99 = 2.75\nC+ 50-54.99 = 2.50\nC 45-49.99 = 2.25\nD 40-44.99 = 2.00\nF <40 = 0.00\n\nAdministrative grades: I = Incomplete, W = Withdrawal, X = Absent/Other administrative.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "ndub",
    name: "Notre Dame University Bangladesh",
    shortName: "NDU",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% - 100% — Outstanding" },
      { grade: "A", point: 3.75, description: "75% - 79% — Excellent" },
      { grade: "A-", point: 3.5, description: "70% - 74% — Very Good" },
      { grade: "B+", point: 3.25, description: "65% - 69% — Good" },
      { grade: "B", point: 3.0, description: "60% - 64% — Satisfactory" },
      { grade: "B-", point: 2.75, description: "55% - 59% — Fair" },
      { grade: "C+", point: 2.5, description: "50% - 54% — Average" },
      { grade: "C", point: 2.25, description: "45% - 49% — Below Average" },
      { grade: "D", point: 2.0, description: "40% - 44% — Pass" },
      { grade: "F", point: 0.0, description: "Below 40% — Fail" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Notre Dame University Bangladesh grading equivalence:\n\nEquivalence (Percentage -> Grade -> Point):\n80% - 100% -> A+ -> 4.0\n75% - 79% -> A -> 3.75\n70% - 74% -> A- -> 3.5\n65% - 69% -> B+ -> 3.25\n60% - 64% -> B -> 3.0\n55% - 59% -> B- -> 2.75\n50% - 54% -> C+ -> 2.5\n45% - 49% -> C -> 2.25\n40% - 44% -> D -> 2.0\nBelow 40% -> F -> 0.0\n\nNote: Thirty percent (30%) of marks are allotted to continuous assessment (attendance, participation, assignments, presentations, quizzes/class tests). The remaining marks are for Mid-Term and Semester Final Examination (finals conducted centrally).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "gub",
    name: "Green University of Bangladesh",
    shortName: "GUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above — Excellent" },
      { grade: "A", point: 3.75, description: "75% to less than 80% — Excellent" },
      { grade: "A-", point: 3.5, description: "70% to less than 75% — Very Good" },
      { grade: "B+", point: 3.25, description: "65% to less than 70% — Good" },
      { grade: "B", point: 3.0, description: "60% to less than 65% — Good" },
      { grade: "B-", point: 2.75, description: "55% to less than 60% — Good" },
      { grade: "C+", point: 2.5, description: "50% to less than 55% — Average" },
      { grade: "C", point: 2.25, description: "45% to less than 50% — Average" },
      { grade: "D", point: 2.0, description: "40% to less than 45% — Below Average" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failing" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `GUB follows the UGC uniform grading system.\n\nGrade points in each course = (numerical equivalent × credit hours).\nCGPA = (Σ grade points) / (Σ credit hours attempted).\n\nRetake/Repeat policy: student may repeat a failed course within next two trimesters; the higher grade will be used in CGPA calculation. I grades convert to F if not improved within two trimesters.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
      // GUB: higher grade on retake is used (as stated in policy)
      lastAttemptWins: false,
      // Probation and dismissal thresholds
      probationCgpa: 2.0,
      probationConsecutiveSemestersAllowed: 3,
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "metrouni",
    name: "Metropolitan University",
    shortName: "METROUNI",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "Highest" },
      { grade: "A", point: 3.67, description: "Excellent" },
      { grade: "B+", point: 3.33, description: "Very Good" },
      { grade: "B", point: 3.0, description: "Good" },
      { grade: "C+", point: 2.5, description: "Above Average" },
      { grade: "C", point: 2.0, description: "Average" },
      { grade: "D", point: 1.0, description: "Pass" },
      { grade: "F", point: 0.0, description: "Fail" },
      // Administrative / other notations
      { grade: "S", point: 0.0, description: "Competence (S)" },
      { grade: "NC", point: 0.0, description: "No Competence (NC)" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "B+", min: 70, max: 74.999 },
      { grade: "B", min: 65, max: 69.999 },
      { grade: "C+", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "D", min: 40, max: 49.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Metropolitan University uses a letter grading system where A+ = 4.0, A = 3.67, B+ = 3.33, etc. CGPA is calculated as the weighted average of grade points by credit hours: CGPA = (Σ (grade point × credit)) / (Σ credit). Administrative notations (S, NC, I, W) are recorded but typically excluded from GPA calculations per university policy.`,
    rules: {
      attemptGrades: ["A+", "A", "B+", "B", "C+", "C", "D", "F", "S", "NC", "I", "W"],
      earnedGradeMin: "D",
      // S/NC/I/W are administrative and excluded from GPA denominator
      excludeFailFromDenominator: true,
    },
  },
  {
    id: "zhsikder",
    name: "Z.H. Sikder University of Science & Technology",
    shortName: "ZHSikder",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Z.H. Sikder University follows the University Grants Commission (UGC) recommended grading system. Numerical marks map to letter grades and grade points as follows:

- 80% and above — A+ (4.00)
- 75% to less than 80% — A (3.75)
- 70% to less than 75% — A- (3.50)
- 65% to less than 70% — B+ (3.25)
- 60% to less than 65% — B (3.00)
- 55% to less than 60% — B- (2.75)
- 50% to less than 55% — C+ (2.50)
- 45% to less than 50% — C (2.25)
- 40% to less than 45% — D (2.00)
- Less than 40% — F (0.00)
`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "southasiauni",
    name: "University of South Asia",
    shortName: "USA",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% - 100% — OUTSTANDING" },
      { grade: "A", point: 3.75, description: "75% - 79.99% — EXCELLENT" },
      { grade: "A-", point: 3.5, description: "70% - 74.99% — VERY GOOD" },
      { grade: "B+", point: 3.25, description: "65% - 69.99% — GOOD" },
      { grade: "B", point: 3.0, description: "60% - 64.99% — SATISFACTORY" },
      { grade: "B-", point: 2.75, description: "55% - 59.99% — ABOVE AVERAGE" },
      { grade: "C+", point: 2.5, description: "50% - 54.99% — AVERAGE" },
      { grade: "C", point: 2.25, description: "45% - 49.99% — BELOW AVERAGE" },
      { grade: "D", point: 2.0, description: "40% - 44.99% — PASS" },
      { grade: "F", point: 0.0, description: "Less than 40% — FAIL" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `University of South Asia grading summary:\n\nGrade point equivalent and remarks as provided by the university. Use numericRanges to map numeric score to letter grade and corresponding grade point.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "pu",
    name: "Presidency University",
    shortName: "PU",
    // Default to the modern (post-Summer 2014) UGC-style mapping which matches
    // the Bangladesh UGC 4.0 scale used elsewhere in this file.
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Presidency University grading policy:

Pre-Summer 2014 (legacy): letter grades were assigned on a 90-100 / 85-89 / ... scale and used a slightly different grade-point mapping (A/A+ = 4.0, A- = 3.7, B+ = 3.3, etc.).

From Summer 2014 onwards: the university adopted the standardized UGC-style 4.0 mapping where A+ = 4.0 (80%+), A = 3.75 (75-<80), A- = 3.5 (70-<75), and so on. This calculator supports both eras via era mappings; when entering historical previous CGPA/credits, ensure you choose the correct era or enter previous CGPA/credits manually.

Minimum CGPA required for award of degree: 2.25

Grades not counted in CGPA: I (Incomplete), W (Withdrawn), R (Retaken) and any grade marked with an asterisk as per university policy.`,
    eraMappings: [
      {
        name: "Pre-Summer 2014 (legacy)",
        effectiveTo: "2014-05-31",
        gradingScale: presidencyLegacyScale,
        numericRanges: presidencyLegacyNumericRanges,
        note: "Legacy grading scale prior to Summer 2014. Some historical CGPA values may have been computed mixing this era with the newer era; Presidency's transcripts will reflect combined computation as described in policy.",
      },
      {
        name: "Summer 2014 onwards (modern UGC)",
        effectiveFrom: "2014-06-01",
        gradingScale: bangladeshScale,
        numericRanges: bangladeshNumericRanges,
        note: "Modern era using UGC-style 4.0 mapping (80%+ = A+).",
      },
    ],
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R", "*"],
      earnedGradeMin: "D",
      // Policy: CGPA calculation across eras may combine totals as per university practice
      degreeRequirementCgpa: 2.25,
    },
  },
  {
    id: "ulab",
    name: "University of Liberal Arts Bangladesh",
    shortName: "ULAB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "Outstanding" },
      { grade: "A", point: 4.0, description: "Superlative" },
      { grade: "A-", point: 3.8, description: "Excellent" },
      { grade: "B+", point: 3.3, description: "Very Good" },
      { grade: "B", point: 3.0, description: "Good" },
      { grade: "B-", point: 2.8, description: "Average" },
      { grade: "C+", point: 2.5, description: "Below Average" },
      { grade: "C", point: 2.2, description: "Passing" },
      { grade: "D", point: 1.5, description: "Probationary" },
      { grade: "F", point: 0.0, description: "Fail" },
      // Administrative / non-contributing
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawn" },
      { grade: "AW", point: 0.0, description: "Administrative Withdrawal" },
    ],
    calculationGuide: `ULAB grading summary:

ULAB uses a letter grading system with grade points where 4.0 is the highest grade point. Official transcripts show letter grades and grade points; numerical marks are typically not displayed on grade sheets. Administrative codes (I, W, AW) are recorded and carry 0.0 grade point.

Minimum CGPA and degree requirements may vary by program; consult departmental regulations for project/thesis grade requirements.
`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
      // Administrative grades recorded but do not contribute to earned credits
    },
  },
  {
    id: "rud",
    name: "Royal University of Dhaka",
    shortName: "RUD",
    gradingScale: standardScale,
    calculationGuide: `The Royal University of Dhaka (RUD) grading summary:

The Royal University of Dhaka uses a letter grading system with grade points. Passing grades range from A+ down to D; F is the failing grade. Student performance is evaluated through continuous assessment (class tests, attendance, assignments) together with a final semester examination. Official grade sheets do not show numerical marks — they display only letter grades, corresponding grade points, and credit hours.

Other grades:
- I (Incomplete): Awarded when a student cannot complete course requirements due to valid non-academic reasons (for example, missing a final exam).
- W (Withdrawal): Awarded when a student is permitted to withdraw from a course without penalty.

Important details:
- The grading follows UGC-style guidelines in Bangladesh.
- A minimum CGPA of 2.00 is generally required for passing/graduation (program-dependent).
- Students must achieve at least a 'C' grade in project/thesis where applicable.
- Failing a course (F) requires the student to retake or seek improvement as per university policy.
`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "adust",
    name: "Atish Dipankar University of Science & Technology",
    shortName: "ADUST",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80-100%" },
      { grade: "A", point: 3.75, description: "75-79%" },
      { grade: "A-", point: 3.5, description: "70-74%" },
      { grade: "B+", point: 3.25, description: "65-69%" },
      { grade: "B", point: 3.0, description: "60-64%" },
      { grade: "B-", point: 2.75, description: "55-59%" },
      { grade: "C+", point: 2.5, description: "50-54%" },
      { grade: "C", point: 2.25, description: "45-49%" },
      { grade: "D", point: 2.0, description: "40-44%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Fail" },
      // Admin
      { grade: "W", point: 0.0, description: "Withdrawn" },
      { grade: "I", point: 0.0, description: "Incomplete" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Atish Dipankar University of Science & Technology (ADUST) grading summary:

ADUST uses a UGC-style letter grading system mapped to a 4.0 GPA scale. Numerical marks map to letter grades as provided. Class divisions are determined by cumulative GPA as follows:
- 1st Class: GPA 3.00–4.00
- 2nd Class: GPA 2.25–2.99
- 3rd Class: GPA 1.65–2.24

Incomplete (I): given in special circumstances; the outstanding work must be completed within one semester of the grade being assigned. Grade changes must be justified and completed within one semester.
`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "W", "I"],
      earnedGradeMin: "D",
      // Class divisions provided for informational use by the UI
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "biu",
    name: "Bangladesh Islami University",
    shortName: "BIU",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Bangladesh Islami University follows the UGC uniform grading system (4.0 scale). Passing grades range from D (40%-44%) up to A+ (80% and above). F is failing. Administrative codes: I (Incomplete), W (Withdrawn), R (Repeat).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "asa",
    name: "ASA University Bangladesh",
    shortName: "ASA",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `ASA University Bangladesh follows the UGC-recommended 4.0 letter grading system. Passing grades are A+ through D; F is failing. Numerical score ranges map to letter grades as per the UGC mapping (80%+ = A+). Incomplete (I) and Withdrawn (W) are administrative codes and carry 0.0 grade point.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "eub",
    name: "European University of Bangladesh",
    shortName: "EUB",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `European University of Bangladesh (EUB) follows the UGC uniform 4.0 grading system. Letter grades A+ through D are passing; F is failing. Grade points are multiplied by course credit hours to compute GPA and CGPA. Administrative grades I (Incomplete) and W (Withdrawn) are recorded but carry 0.0 grade point.

Key points:
- Grade point equivalence follows UGC mapping (A+ 4.0 down to D 2.0, F 0.0).
- Earned grade points = grade point × credit hours; GPA/CGPA are weighted averages of earned grade points divided by credit hours attempted/completed.
- Continuous evaluation (quizzes, assignments, midterm, final) typically contributes to the course grade.
- Retake policy: students may retake courses per departmental rules (improvement/retake policy may vary by program).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "hamdarduniversity",
    name: "Hamdard University Bangladesh",
    shortName: "Hamdard",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Hamdard University Bangladesh grading mapping follows the UGC 4.0 scale:

Numerical Grade -> Letter -> Grade Point (example):
80% – 100% => A+ (4.00)
75% - <79.99% => A (3.75)
70% - <74.99% => A- (3.50)
65% - <69.99% => B+ (3.25)
60% - <64.99% => B (3.00)
55% - <59.99% => B- (2.75)
50% - <54.99% => C+ (2.50)
45% - <49.99% => C (2.25)
40% - <44.99% => D (2.00)
Less than 40% => F (0.00)
`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "buft",
    name: "BGMEA University of Fashion & Technology",
    shortName: "BUFT",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `BGMEA University of Fashion & Technology (BUFT) follows the UGC-recommended 4.0 letter grading system. Numerical marks map to letter grades and grade points per the UGC mapping (80%+ = A+). Passing grades are A+ through D; F is failing. Continuous evaluation (quizzes, assignments, midterms, final) typically contributes to the final grade.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "edelta",
    name: "East Delta University",
    shortName: "EDU",
    gradingScale: [
      { grade: "A", point: 4.0, description: "93% & Above" },
      { grade: "A-", point: 3.7, description: "89% - <93%" },
      { grade: "B+", point: 3.3, description: "86% - <89%" },
      { grade: "B", point: 3.0, description: "82% - <86%" },
      { grade: "B-", point: 2.7, description: "79% - <82%" },
      { grade: "C+", point: 2.3, description: "75% - <79%" },
      { grade: "C", point: 2.0, description: "72% - <75%" },
      { grade: "C-", point: 1.7, description: "69% - <72%" },
      { grade: "D+", point: 1.3, description: "65% - <69%" },
      { grade: "D", point: 1.0, description: "60% - <65%" },
      { grade: "F", point: 0.0, description: "<59% — Fail" },
    ],
    numericRanges: [
      { grade: "A", min: 93, max: 100 },
      { grade: "A-", min: 89, max: 92.999 },
      { grade: "B+", min: 86, max: 88.999 },
      { grade: "B", min: 82, max: 85.999 },
      { grade: "B-", min: 79, max: 81.999 },
      { grade: "C+", min: 75, max: 78.999 },
      { grade: "C", min: 72, max: 74.999 },
      { grade: "C-", min: 69, max: 71.999 },
      { grade: "D+", min: 65, max: 68.999 },
      { grade: "D", min: 60, max: 64.999 },
      { grade: "F", min: 0, max: 59.999 },
    ],
    calculationGuide: `East Delta University (EDU) grading and honors summary:

EDU uses a 4.0 GPA/CGPA system. Honors awarded based on CGPA:
- Summa Cum Laude: 3.90 - 4.00
- Magna Cum Laude: 3.75 - 3.89
- Cum Laude: awarded for the next highest CGPA band below Magna Cum Laude (unspecified exact threshold)

Academic recognition:
- Vice Chancellor's (VC's) List: perfect 4.00 CGPA
- Dean's List: CGPA 3.50 and above

Numeric to letter mapping and grade points are provided in the gradingScale and numericRanges fields.`,
    rules: {
      attemptGrades: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "neub",
    name: "North East University Bangladesh",
    shortName: "NEUB",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "Excellent" },
      { grade: "A", point: 3.75, description: "Excellent" },
      { grade: "A-", point: 3.5, description: "Excellent" },
      { grade: "B+", point: 3.25, description: "Very good" },
      { grade: "B", point: 3.0, description: "Good" },
      { grade: "B-", point: 2.75, description: "Good" },
      { grade: "C+", point: 2.5, description: "Fair" },
      { grade: "C", point: 2.25, description: "Fair" },
      { grade: "C-", point: 2.0, description: "Poor" },
      { grade: "D", point: 2.0, description: "Passing" },
      { grade: "F", point: 0.0, description: "Fail" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "C-", min: 42, max: 44.999 },
      { grade: "D", min: 40, max: 41.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `North East University Bangladesh (NEUB) grading summary:

NEUB uses a 4.0 grading scale with A+ = 4.00 down to D as the minimum passing grade and F = 0.00 as failing. For graduate admissions a minimum CGPA of 2.0 is required. Administrative codes: I (Incomplete), W (Withdrawal), R (Repeat).

GPA/CGPA calculation: GPA = (Σ (grade point × credit hours)) / (Σ credit hours attempted). CGPA is the weighted average across all semesters.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F", "I", "W", "R"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.0,
    },
  },
  {
    id: "fcub",
    name: "The First Capital University of Bangladesh",
    shortName: "FCUB",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `First Capital University of Bangladesh (FCUB) follows the UGC-recommended 4.0 letter grading system. Numerical marks map to letter grades and grade points as per UGC mapping (80%+ = A+). Passing grades include A+, A, A-, B+, B, B-, C+, C, C-, D+, and D. F is failing.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "ishakha",
    name: "Ishakha International University",
    shortName: "Ishakha",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Ishakha International University uses a 4.0 grading scale. Letter grades map to grade points as per the UGC mapping (A+ 4.00 for 80%+ down to D 2.00; F is failing). Passing grades are A+ down to D.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "exim-agri",
    name: "Exim Bank Agricultural University, Bangladesh (MBA Agribusiness)",
    shortName: "EXIM-AGRI",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C", point: 2.5, description: "50% to less than 55%" },
      { grade: "F", point: 0.0, description: "Less than 50% — Fail" },
      // Administrative
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C", min: 50, max: 54.999 },
      { grade: "F", min: 0, max: 49.999 },
    ],
    calculationGuide: `Exim Bank Agricultural University (MBA Agribusiness) grading rules:

- Numerical marks are rounded to the nearest whole number (fractions of 0.5 or above round up).
- Letter grade mapping and grade points are listed in gradingScale.
- GPA for a semester = (Σ (grade point × credit hours)) / (Σ credit hours attempted).
- CGPA = cumulative weighted average across semesters.

Repeat/clearance policy:
- A student who obtains an F in a course may be allowed to repeat the course; maximum 2 course repeats per semester and up to 6 repeats over the whole program to clear F grades.
- If a student obtains F in three or more courses in a semester the semester may be considered "crashed" and the student must re-enroll for the required credits in subsequent semesters.
`,
    rules: {
      // MBA-specific passing grades: C and above
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C", "F", "I", "W"],
      earnedGradeMin: "C",
      // program-specific behavior
      probationCgpa: 2.5,
      // clarify repeat policy informally — consumer may enforce externally
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "northwestern",
    name: "North Western University",
    shortName: "NWU",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `North Western University follows the UGC 4.0 grading system. Numerical marks map to letter grades and grade points as follows: 80%+ = A+ (4.00) down to D (2.00); below 40% = F (0.00). Administrative codes: I = Incomplete, W = Withdrawn, X = Continuous Assessment/Other administrative marks.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W", "X"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "sonargaon",
    name: "Sonargaon University",
    shortName: "SU",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Sonargaon University uses a letter grading system on the 4.00 scale (UGC-aligned). Numerical marks map to letter grades as follows: A+ (80%+ = 4.00) down to D (40-44.99 = 2.00); F is less than 40% (0.00).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
      // Academic standing policy as provided
      probationCgpa: 2.0,
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "feni",
    name: "Feni University",
    shortName: "Feni",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Feni University follows the UGC-approved 4.0 grading system and uses the same letter-to-point mapping (A+ 4.00 down to D 2.00; F 0.00). Example degree credit requirements (varies by program): BSc EEE 150.75 credits, BSc CSE 150 credits, BSc Civil 153 credits, BBA 126 credits, BA English 123 credits, LL.B 123 credits. Minimum CGPA to be eligible for a bachelor degree is typically 2.50 (may vary by program).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I"],
      earnedGradeMin: "D",
      degreeRequirementCgpa: 2.5,
    },
  },
  {
    id: "britannia",
    name: "Britannia University",
    shortName: "Britannia",
    gradingScale: bangladeshScale,
    numericRanges: bangladeshNumericRanges,
    calculationGuide: `Britannia University uses a 4.0 letter grading system (A+ to F) aligned with UGC guidance. Numerical-to-letter mapping is: A+ (80%+ = 4.00) down to D (40-44.99 = 2.00); F (<40% = 0.00). The university uses CGPA to evaluate overall performance: CGPA = Σ(grade point × credit hours) / Σ credit hours completed.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
      // Graduation/probation defaults
      degreeRequirementCgpa: 2.0,
      probationCgpa: 2.0,
    },
  },
  {
    id: "ugc-policy",
    name: "UGC-style grading policy (generic)",
    shortName: "UGC",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above — Outstanding" },
      { grade: "A", point: 3.75, description: "75% to less than 80% — Excellent" },
      { grade: "A-", point: 3.5, description: "70% to less than 75% — Very Good" },
      { grade: "B+", point: 3.25, description: "65% to less than 70% — Good" },
      { grade: "B", point: 3.0, description: "60% to less than 65% — Satisfactory" },
      { grade: "B-", point: 2.75, description: "55% to less than 60% — Above Average" },
      { grade: "C+", point: 2.5, description: "50% to less than 55% — Average" },
      { grade: "C", point: 2.25, description: "45% to less than 50% — Below Average" },
      { grade: "D", point: 2.0, description: "40% to less than 45% — Pass" },
      { grade: "F", point: 0.0, description: "Less than 40% — Fail" },
      // Administrative
      { grade: "T", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdraw" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Continuous evaluation (quizzes, tests, assignments, participation, attendance, midterm, final) is used to determine course marks which are then mapped to letter grades. GPA/CGPA is computed as: CGPA = Σ(grade point × credit hours) / Σ credit hours. Grades T = Incomplete, W = Withdraw may be recorded as administrative marks.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "T", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "buhs",
    name: "Bangladesh University of Health Sciences",
    shortName: "BUHS",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Below 40%" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdraw" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `BUHS follows a UGC-like 4.00 point system. Final course grades are determined from continuous evaluation (assignments, quizzes, exams, term papers, lab tests, attendance). GPA is the semester average of earned grade points; CGPA is the cumulative average across semesters: CGPA = Σ(grade point × credit hours) / Σ credit hours. I = Incomplete, W = Withdraw are administrative notations.`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "I", "W"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "rtm-al-kabir",
    name: "R.T.M Al-Kabir Technical University",
    shortName: "RTM-Al-Kabir",
    gradingScale: [
      { grade: "A", point: 4.0, description: "90 - 100" },
      { grade: "A-", point: 3.7, description: "85 - <90" },
      { grade: "B+", point: 3.3, description: "80 - <85" },
      { grade: "B", point: 3.0, description: "75 - <80" },
      { grade: "B-", point: 2.7, description: "70 - <75" },
      { grade: "C+", point: 2.3, description: "65 - <70" },
      { grade: "C", point: 2.0, description: "60 - <65" },
      { grade: "C-", point: 1.7, description: "57 - <60" },
      { grade: "D+", point: 1.3, description: "55 - <57" },
      { grade: "D", point: 1.0, description: "52 - <55" },
      { grade: "D-", point: 0.7, description: "50 - <52" },
      { grade: "F", point: 0.0, description: "Less than 50 — Failure" },
      // Administrative
      { grade: "P", point: 0.0, description: "Pass (no numerical value)" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "W", point: 0.0, description: "Withdrawal" },
    ],
    numericRanges: [
      { grade: "A", min: 90, max: 100 },
      { grade: "A-", min: 85, max: 89.999 },
      { grade: "B+", min: 80, max: 84.999 },
      { grade: "B", min: 75, max: 79.999 },
      { grade: "B-", min: 70, max: 74.999 },
      { grade: "C+", min: 65, max: 69.999 },
      { grade: "C", min: 60, max: 64.999 },
      { grade: "C-", min: 57, max: 59.999 },
      { grade: "D+", min: 55, max: 56.999 },
      { grade: "D", min: 52, max: 54.999 },
      { grade: "D-", min: 50, max: 51.999 },
      { grade: "F", min: 0, max: 49.999 },
    ],
    calculationGuide: `R.T.M Al-Kabir Technical University grading summary:

Numeric ranges and grade points:
90 - 100 = A (4.0) — Excellent
85 - <90 = A- (3.7)
80 - <85 = B+ (3.3)
75 - <80 = B (3.0) — Good
70 - <75 = B- (2.7)
65 - <70 = C+ (2.3)
60 - <65 = C (2.0) — Fair
57 - <60 = C- (1.7)
55 - <57 = D+ (1.3)
52 - <55 = D (1.0) — Poor
50 - <52 = D- (0.7)
<50 = F (0.0) — Failure

Grades without numerical value: P = Pass, I = Incomplete, W = Withdrawal.

Pass/Fail option:
- Students may take courses as Pass/Fail with instructor approval provided they carry at least 12 credits of regular letter-graded courses that semester. Maximum of 16 credits may be taken for credit with Pass/Fail, and no more than 4 credits of Pass/Fail may be taken in a single semester. Departments may restrict Pass/Fail for certain major courses.

Incomplete (I): assigned when a student cannot complete course requirements for unavoidable reasons; the student must appear at the first available make-up exam to replace the I with a letter grade, otherwise the I converts to F.

Withdrawal (W): assigned when a student withdraws by the deadline; late withdrawals may be graded based on performance unless exceptions are granted on medical grounds.

GPA computation:
GPA = Sum of (Grade points × Credits) / Sum of Credits attempted.
`,
    rules: {
      attemptGrades: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "P", "I", "W"],
      earnedGradeMin: "D-",
    },
  },
  {
    id: "bgmea-chattogram",
    name: "Chattogram BGMEA University of Fashion & Technology",
    shortName: "BGMEA (Chattogram)",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Chattogram BGMEA University of Fashion & Technology grading policy:\n\nNumeric -> Letter -> Grade Point:\n80% and above -> A+ -> 4.00\n75% to <80% -> A -> 3.75\n70% to <75% -> A- -> 3.50\n65% to <70% -> B+ -> 3.25\n60% to <65% -> B -> 3.00\n55% to <60% -> B- -> 2.75\n50% to <55% -> C+ -> 2.50\n45% to <50% -> C -> 2.25\n40% to <45% -> D -> 2.00\nLess than 40% -> F -> 0.00\n\nGPA = Σ(grade point × credit hours) / Σ(credit hours attempted).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
      earnedGradeMin: "D",
    },
  },
  {
    id: "teesta",
    name: "Teesta University",
    shortName: "Teesta",
    gradingScale: [
      { grade: "A+", point: 4.0, description: "80% and above" },
      { grade: "A", point: 3.75, description: "75% to less than 80%" },
      { grade: "A-", point: 3.5, description: "70% to less than 75%" },
      { grade: "B+", point: 3.25, description: "65% to less than 70%" },
      { grade: "B", point: 3.0, description: "60% to less than 65%" },
      { grade: "B-", point: 2.75, description: "55% to less than 60%" },
      { grade: "C+", point: 2.5, description: "50% to less than 55%" },
      { grade: "C", point: 2.25, description: "45% to less than 50%" },
      { grade: "D", point: 2.0, description: "40% to less than 45%" },
      { grade: "F", point: 0.0, description: "Less than 40% — Failure" },
      // Administrative / other notations
      { grade: "W", point: 0.0, description: "Withdrawal" },
      { grade: "I", point: 0.0, description: "Incomplete" },
      { grade: "S", point: 0.0, description: "Satisfactory" },
      { grade: "U", point: 0.0, description: "Unsatisfactory" },
      { grade: "R", point: 0.0, description: "Repeat/Retake" },
    ],
    numericRanges: [
      { grade: "A+", min: 80, max: 100 },
      { grade: "A", min: 75, max: 79.999 },
      { grade: "A-", min: 70, max: 74.999 },
      { grade: "B+", min: 65, max: 69.999 },
      { grade: "B", min: 60, max: 64.999 },
      { grade: "B-", min: 55, max: 59.999 },
      { grade: "C+", min: 50, max: 54.999 },
      { grade: "C", min: 45, max: 49.999 },
      { grade: "D", min: 40, max: 44.999 },
      { grade: "F", min: 0, max: 39.999 },
    ],
    calculationGuide: `Teesta University grading summary:\n\nA+ = 80% and above -> 4.00\nA = 75% to <80% -> 3.75\nA- = 70% to <75% -> 3.50\nB+ = 65% to <70% -> 3.25\nB = 60% to <65% -> 3.00\nB- = 55% to <60% -> 2.75\nC+ = 50% to <55% -> 2.50\nC = 45% to <50% -> 2.25\nD = 40% to <45% -> 2.00\nF = <40% -> 0.00\n\nOther codes: W = Withdrawal, I = Incomplete, S = Satisfactory, U = Unsatisfactory, R = Repeat/Retake.\n\nGPA = Σ(grade point × credit hours) / Σ(credit hours attempted).`,
    rules: {
      attemptGrades: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "W", "I", "S", "U", "R"],
      earnedGradeMin: "D",
    },
  },
];
