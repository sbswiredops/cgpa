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
import { computeGpa } from "../../lib/gpa";
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
    { credits: "", grade: "", score: "" },
    { credits: "", grade: "", score: "" },
    { credits: "", grade: "", score: "" },
  ],
};

export default function CalculatorPage() {
  const [selectedUniversityId, setSelectedUniversityId] = useState(
    defaultUniversity.id
  );
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [lastSnapshot, setLastSnapshot] = useState<CalculationSnapshot | null>(
    null
  );

  const selectedUniversity = useMemo(
    () =>
      universities.find(
        (university) => university.id === selectedUniversityId
      ) ?? defaultUniversity,
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
    const entries = selectedUniversity.gradingScale.map(
      (item) => [item.grade, item.point] as const
    );
    return new Map(entries);
  }, [selectedUniversity]);

  useEffect(() => {
    const allowedGrades = new Set(
      selectedUniversity.gradingScale.map((scale) => scale.grade)
    );
    const currentCourses = getValues("courses");
    currentCourses.forEach((course, index) => {
      if (course.grade && !allowedGrades.has(course.grade)) {
        setValue(`courses.${index}.grade`, "", {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    });
  }, [selectedUniversity, getValues, setValue]);

  const gradeOptions = useMemo(
    () => selectedUniversity.gradingScale.map((item) => item.grade),
    [selectedUniversity]
  );

  const {
    currentGpa,
    cumulativeGpa,
    currentCredits,
    totalCredits,
    interpretation,
  } = useMemo(
    () =>
      computeGpa(
        courses,
        gradeMap,
        includePrevious,
        previousCgpa,
        previousCredits,
        selectedUniversity.numericRanges,
        selectedUniversity.rules
      ),
    [
      courses,
      gradeMap,
      includePrevious,
      previousCgpa,
      previousCredits,
      selectedUniversity.numericRanges,
      selectedUniversity.rules,
    ]
  );

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
    const snapshot: CalculationSnapshot = {
      currentCredits,
      currentGpa: currentGpa ?? 0,
      cumulativeGpa: cumulativeGpa,
      totalCredits,
      savedAt: new Date(),
      university: selectedUniversity,
    };
    setLastSnapshot(snapshot);
    const savedTime = snapshot.savedAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSaveMessage(
      `Saved at ${savedTime} for ${selectedUniversity.shortName}.`
    );
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
              previousCredits={
                typeof previousCredits === "number" &&
                !Number.isNaN(previousCredits)
                  ? previousCredits
                  : 0
              }
              lastSavedMessage={saveMessage}
              lastSnapshot={lastSnapshot}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
