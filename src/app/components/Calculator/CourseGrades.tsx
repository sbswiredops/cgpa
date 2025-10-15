"use client";

import { useEffect } from "react";
import type { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import type { CalculatorFormValues } from "./types";

const MAX_COURSES = 12;

type CourseGradesProps = {
  form: UseFormReturn<CalculatorFormValues>;
  fields: FieldArrayWithId<CalculatorFormValues, "courses", "id">[];
  onAddCourse: () => void;
  onRemoveCourse: (index: number) => void;
  gradeOptions: string[];
  onSaveCalculation: () => void;
  onResetAll: () => void;
  saveMessage: string | null;
};

export default function CourseGrades({
  form,
  fields,
  onAddCourse,
  onRemoveCourse,
  gradeOptions,
  onSaveCalculation,
  onResetAll,
  saveMessage,
}: CourseGradesProps) {
  const {
    register,
    watch,
    resetField,
    formState: { errors },
  } = form;

  const includePrevious = watch("includePrevious");

  useEffect(() => {
    if (!includePrevious) {
      resetField("previousCgpa");
      resetField("previousCredits");
    }
  }, [includePrevious, resetField]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Course Grades</h2>
      <p className="mt-2 text-sm text-slate-500">
        Enter each course’s credit hours and grade to calculate your semester
        CGPA.
      </p>

      {gradeOptions.length === 0 && (
        <div
          role="alert"
          className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          Please select a university to load its grading scale before entering
          courses.
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <input
          id="includePrevious"
          type="checkbox"
          className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          {...register("includePrevious")}
        />
        <label
          htmlFor="includePrevious"
          className="text-sm font-medium text-slate-700"
        >
          Include Previous Academic Record
        </label>
      </div>

      {includePrevious && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="previousCgpa"
            >
              Previous CGPA
            </label>
            <input
              id="previousCgpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="e.g. 3.45"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              {...register("previousCgpa", {
                valueAsNumber: true,
                min: { value: 0, message: "Must be 0 or higher" },
                max: { value: 4, message: "Cannot exceed 4.0" },
              })}
            />
            {errors.previousCgpa && (
              <p className="mt-1 text-xs text-red-500">
                {errors.previousCgpa.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="previousCredits"
            >
              Previous Total Credit Hours
            </label>
            <input
              id="previousCredits"
              type="number"
              step="0.5"
              min="0"
              placeholder="e.g. 45"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              {...register("previousCredits", {
                valueAsNumber: true,
                min: { value: 0, message: "Must be 0 or higher" },
              })}
            />
            {errors.previousCredits && (
              <p className="mt-1 text-xs text-red-500">
                {errors.previousCredits.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-all"
          >
            <div className="flex flex-col gap-4">
              {/* Top row: Credit Hours + Grade */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor={`courseCredits-${index}`}
                  >
                    Credit Hours
                  </label>
                  <input
                    id={`courseCredits-${index}`}
                    type="number"
                    step="0.5"
                    min="0"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    defaultValue={
                      typeof (field as any).credits === "number" &&
                      !Number.isNaN((field as any).credits)
                        ? (field as any).credits
                        : typeof (field as any).credits === "string"
                        ? (field as any).credits
                        : ""
                    }
                    {...register(`courses.${index}.credits` as const, {
                      valueAsNumber: true,
                      min: {
                        value: 0.25,
                        message: "Enter at least 0.25 credit hours",
                      },
                    })}
                  />
                  {errors.courses?.[index]?.credits && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.courses[index]?.credits?.message as string}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor={`courseGrade-${index}`}
                  >
                    Grade
                  </label>
                  <select
                    id={`courseGrade-${index}`}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    defaultValue={(field as any).grade ?? ""}
                    {...register(`courses.${index}.grade` as const, {
                      required: "Select a grade",
                    })}
                  >
                    <option value="">Select grade</option>
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                  {errors.courses?.[index]?.grade && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.courses[index]?.grade?.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Second row: Numeric Score */}
              <div>
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor={`courseScore-${index}`}
                >
                  Numeric Score (optional)
                </label>
                <input
                  id={`courseScore-${index}`}
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  placeholder="e.g. 85"
                  className="mt-2 w-full max-w-xs rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  defaultValue={
                    typeof (field as any).score === "number" &&
                    !Number.isNaN((field as any).score)
                      ? (field as any).score
                      : typeof (field as any).score === "string"
                      ? (field as any).score
                      : ""
                  }
                  {...register(`courses.${index}.score` as const, {
                    valueAsNumber: true,
                    min: { value: 0, message: "Score must be 0 or higher" },
                    max: { value: 100, message: "Score cannot exceed 100" },
                  })}
                />
                {errors.courses?.[index]?.score && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.courses[index]?.score?.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              {fields.length > 1 && (
                <button
                  type="button"
                  className="text-sm font-semibold text-red-600 transition hover:text-red-800"
                  onClick={() => onRemoveCourse(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-2xl border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          onClick={onAddCourse}
          disabled={fields.length >= MAX_COURSES}
        >
          Add Course
        </button>
        <button
          type="button"
          className="rounded-2xl border border-red-200 px-5 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:border-red-300 hover:text-red-800"
          onClick={onResetAll}
        >
          Reset All
        </button>
        <button
          type="button"
          className="rounded-2xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          onClick={onSaveCalculation}
        >
          Save Calculation
        </button>
        {fields.length >= MAX_COURSES && (
          <p className="text-xs text-slate-500">
            Maximum of {MAX_COURSES} courses supported.
          </p>
        )}
      </div>
      {saveMessage && (
        <p className="mt-4 text-sm font-semibold text-emerald-600">
          {saveMessage}
        </p>
      )}
    </div>
  );
}
