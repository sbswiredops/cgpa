"use client";

import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GradingScale from "../components/Calculator/GradingScale";
import UniversitySelect from "../components/Calculator/UniversitySelect";
import CourseGrades from "../components/Calculator/CourseGrades";
import Results from "../components/Calculator/Results";
import { universities } from "../data/universities";
import type {
  CalculatorFormValues,
  CalculationSnapshot,
} from "../components/Calculator/types";

const defaultUniversity = universities[0];

const defaultValues: CalculatorFormValues = {
  includePrevious: false,
  previousCgpa: "",
  previousCredits: "",
  courses: [
    { credits: "", grade: "" },
    { credits: "", grade: "" },
    { credits: "", grade: "" },
  ],
};

export default function CalculatorPage() {
  const [selectedUniversityId, setSelectedUniversityId] = useState(defaultUniversity.id);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [lastSnapshot, setLastSnapshot] = useState<CalculationSnapshot | null>(null);

  const selectedUniversity = useMemo(
    () => universities.find((university) => university.id === selectedUniversityId) ?? defaultUniversity,
    [selectedUniversityId]
  );

  const form = useForm<CalculatorFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const { control, reset, setValue, watch, getValues } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const courses = watch("courses");
  const includePrevious = watch("includePrevious");
  const previousCgpa = watch("previousCgpa");
  const previousCredits = watch("previousCredits");

  const gradeMap = useMemo(() => {
    const entries = selectedUniversity.gradingScale.map((item) => [item.grade, item.point] as const);
    return new Map(entries);
  }, [selectedUniversity]);

  useEffect(() => {
    const allowedGrades = new Set(selectedUniversity.gradingScale.map((scale) => scale.grade));
    const currentCourses = getValues("courses");
    currentCourses.forEach((course, index) => {
      if (course.grade && !allowedGrades.has(course.grade)) {
        setValue(`courses.${index}.grade`, "", { shouldValidate: true, shouldDirty: true });
      }
    });
  }, [selectedUniversity, getValues, setValue]);

  const gradeOptions = useMemo(
    () => selectedUniversity.gradingScale.map((item) => item.grade),
    [selectedUniversity]
  );

  const { currentGpa, cumulativeGpa, currentCredits, totalCredits, interpretation } = useMemo(() => {
    let qualityPoints = 0;
    let creditSum = 0;

    courses.forEach((course) => {
      if (typeof course.credits === "number" && !Number.isNaN(course.credits) && course.credits > 0) {
        const point = gradeMap.get(course.grade) ?? null;
        if (point !== null) {
          qualityPoints += course.credits * point;
          creditSum += course.credits;
        }
      }
    });

    const current = creditSum > 0 ? qualityPoints / creditSum : null;

    const hasPrevious =
      includePrevious &&
      typeof previousCgpa === "number" &&
      !Number.isNaN(previousCgpa) &&
      typeof previousCredits === "number" &&
      !Number.isNaN(previousCredits) &&
      previousCredits > 0;

    const previousQuality = hasPrevious ? previousCgpa * (previousCredits as number) : 0;
    const cumulativeCreditTotal = creditSum + (hasPrevious ? (previousCredits as number) : 0);
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
      currentCredits: creditSum,
      totalCredits: cumulativeCreditTotal,
      interpretation: message,
    };
  }, [courses, gradeMap, includePrevious, previousCgpa, previousCredits]);

  const handleAddCourse = () => {
    append({ credits: "", grade: "" });
  };

  const handleRemoveCourse = (index: number) => {
    remove(index);
  };

  const handleResetAll = () => {
    reset(defaultValues);
    setSaveMessage(null);
    setLastSnapshot(null);
  };

  const handleSave = () => {
    const values = getValues();
    const snapshot: CalculationSnapshot = {
      currentCredits,
      currentGpa: currentGpa ?? 0,
      cumulativeGpa: cumulativeGpa,
      totalCredits,
      savedAt: new Date(),
      university: selectedUniversity,
    };
    setLastSnapshot(snapshot);
    const savedTime = snapshot.savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setSaveMessage(`Saved at ${savedTime} for ${selectedUniversity.shortName}.`);
    setValue("includePrevious", values.includePrevious, { shouldDirty: false });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 bg-white pb-16">
        <GradingScale
          universityName={selectedUniversity.name}
          gradingScale={selectedUniversity.gradingScale}
        />
        <section className="mx-auto max-w-6xl px-4 pt-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,0.9fr)]">
            <div className="space-y-6">
              <UniversitySelect
                universities={universities}
                selectedId={selectedUniversityId}
                onSelect={setSelectedUniversityId}
              />
            </div>
            <CourseGrades
              form={form}
              fields={fields}
              onAddCourse={handleAddCourse}
              onRemoveCourse={handleRemoveCourse}
              gradeOptions={gradeOptions}
              onSaveCalculation={handleSave}
              onResetAll={handleResetAll}
              saveMessage={saveMessage}
            />
            <Results
              currentGpa={currentGpa}
              currentCredits={currentCredits}
              cumulativeGpa={cumulativeGpa}
              totalCredits={totalCredits}
              includePrevious={includePrevious}
              gradeInterpretation={interpretation}
              previousCredits={typeof previousCredits === "number" && !Number.isNaN(previousCredits) ? previousCredits : 0}
              lastSavedMessage={saveMessage}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
