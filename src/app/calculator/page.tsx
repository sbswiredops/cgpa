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
    { credits: "", grade: "", score: undefined },
    { credits: "", grade: "", score: undefined },
    { credits: "", grade: "", score: undefined },
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
    append({ credits: "", grade: "", score: "" });
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
              {selectedUniversity.calculationGuide && (
                <details className="rounded-2xl border border-slate-200 bg-white p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800">
                    Calculation guide
                  </summary>
                  <div className="mt-2 text-sm text-slate-600 whitespace-pre-line">
                    {selectedUniversity.calculationGuide}
                  </div>
                </details>
              )}
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
        {/* Suggest Improvements feedback card */}
        <section className="mx-auto max-w-4xl px-4 pt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">
              Suggest Improvements
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Have suggestions for improving this GPA calculator? Found an issue
              with a university's grading scheme? Let us know!
            </p>

            <form className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Your Feedback *
                </label>
                <textarea
                  placeholder="Please share your suggestions or report issues"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm h-28 resize-none focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
