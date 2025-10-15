"use client";

import { useMemo, useState } from "react";
import type { UniversityInfo } from "../../data/universities";
import { computeGpa, type CourseInput } from "../../../lib/gpa";

export type PlannerCourse = {
  id: string;
  credits: number | "";
  grade: string;
  score?: number | "";
};

export type PlannerSemester = {
  id: string;
  name: string;
  courses: PlannerCourse[];
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

type SemesterPlannerProps = {
  university: UniversityInfo | null;
};

export default function SemesterPlanner({ university }: SemesterPlannerProps) {
  const [semesters, setSemesters] = useState<PlannerSemester[]>([{
    id: uid(),
    name: "Semester 1",
    courses: [
      { id: uid(), credits: "", grade: "", score: undefined },
      { id: uid(), credits: "", grade: "", score: undefined },
    ],
  }]);

  const gradeMap = useMemo(() => {
    const entries = (university?.gradingScale ?? []).map((g) => [g.grade, g.point] as const);
    return new Map(entries);
  }, [university]);

  const gradeOptions = useMemo(
    () => (university?.gradingScale ?? []).map((g) => g.grade),
    [university]
  );

  const addSemester = () => {
    const index = semesters.length + 1;
    setSemesters((prev) => [
      ...prev,
      { id: uid(), name: `Semester ${index}`, courses: [{ id: uid(), credits: "", grade: "", score: undefined }] },
    ]);
  };

  const removeSemester = (sid: string) => {
    setSemesters((prev) => prev.filter((s) => s.id !== sid));
  };

  const addCourse = (sid: string) => {
    setSemesters((prev) => prev.map((s) => s.id === sid
      ? { ...s, courses: [...s.courses, { id: uid(), credits: "", grade: "", score: undefined }] }
      : s
    ));
  };

  const removeCourse = (sid: string, cid: string) => {
    setSemesters((prev) => prev.map((s) => s.id === sid
      ? { ...s, courses: s.courses.filter((c) => c.id !== cid) }
      : s
    ));
  };

  const updateCourse = (sid: string, cid: string, patch: Partial<PlannerCourse>) => {
    setSemesters((prev) => prev.map((s) => s.id === sid
      ? {
          ...s,
          courses: s.courses.map((c) => (c.id === cid ? { ...c, ...patch } : c)),
        }
      : s
    ));
  };

  const perSemester = useMemo(() => {
    return semesters.map((s) => {
      const inputs: CourseInput[] = s.courses.map((c) => ({ credits: c.credits, grade: c.grade, score: c.score }));
      const r = computeGpa(
        inputs,
        gradeMap,
        false,
        undefined,
        undefined,
        university?.numericRanges,
        university?.rules
      );
      return {
        id: s.id,
        name: s.name,
        gpa: r.currentGpa,
        credits: r.currentCredits,
        qualityPoints: typeof r.currentGpa === "number" ? r.currentGpa * r.currentCredits : 0,
      };
    });
  }, [semesters, gradeMap, university?.numericRanges, university?.rules]);

  const cumulative = useMemo(() => {
    const totals = perSemester.reduce(
      (acc, s) => {
        if (typeof s.gpa === "number" && s.credits > 0) {
          acc.quality += s.gpa * s.credits;
          acc.credits += s.credits;
        }
        return acc;
      },
      { quality: 0, credits: 0 }
    );
    const cgpa = totals.credits > 0 ? totals.quality / totals.credits : null;
    return { cgpa, credits: totals.credits };
  }, [perSemester]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Semester Planner</h2>
          <p className="mt-1 text-sm text-slate-600">Plan multiple semesters, compute each term GPA and overall CGPA.</p>
        </div>
        <button
          type="button"
          onClick={addSemester}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
        >
          Add Semester
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {semesters.map((sem) => (
          <div key={sem.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={sem.name}
                onChange={(e) => setSemesters((prev) => prev.map((s) => s.id === sem.id ? { ...s, name: e.target.value } : s))}
                className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                  GPA: {typeof perSemester.find((p) => p.id === sem.id)?.gpa === "number"
                    ? perSemester.find((p) => p.id === sem.id)!.gpa!.toFixed(2)
                    : "--"}
                </span>
                {semesters.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSemester(sem.id)}
                    className="text-sm font-semibold text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {sem.courses.map((course) => (
                <div key={course.id} className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="grid gap-3 sm:grid-cols-4">
                    <div className="sm:col-span-1">
                      <label className="text-xs font-medium text-slate-700">Credit Hours</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={course.credits as any}
                        onChange={(e) => updateCourse(sem.id, course.id, { credits: e.target.value === "" ? "" : Number(e.target.value) })}
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="text-xs font-medium text-slate-700">Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(sem.id, course.id, { grade: e.target.value })}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">Select grade</option>
                        {gradeOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="text-xs font-medium text-slate-700">Numeric Score (optional)</label>
                      <input
                        type="number"
                        step={1}
                        min={0}
                        max={100}
                        value={course.score as any}
                        onChange={(e) => updateCourse(sem.id, course.id, { score: e.target.value === "" ? "" : Number(e.target.value) })}
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div className="sm:col-span-1 flex items-end justify-end">
                      <button
                        type="button"
                        onClick={() => removeCourse(sem.id, course.id)}
                        className="text-sm font-semibold text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => addCourse(sem.id)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
              >
                Add Course
              </button>
              <div className="text-xs text-slate-600">
                Credits this term: {perSemester.find((p) => p.id === sem.id)?.credits.toFixed(2) ?? "0.00"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Cumulative</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{cumulative.cgpa !== null ? cumulative.cgpa.toFixed(2) : "--"}</p>
        <p className="mt-1 text-sm text-slate-600">Total semester credits considered: {cumulative.credits.toFixed(2)}</p>
      </div>

      {/* Trend chart */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-slate-500">Trend</p>
        <Chart semesters={perSemester} />
      </div>
    </section>
  );
}

function Chart({ semesters }: { semesters: { id: string; name: string; gpa: number | null; credits: number; qualityPoints: number; }[] }) {
  const pointsGpa = semesters.map((s) => (typeof s.gpa === "number" ? s.gpa : null));
  let cumQ = 0;
  let cumC = 0;
  const pointsCgpa = semesters.map((s) => {
    if (typeof s.gpa === "number" && s.credits > 0) {
      cumQ += s.gpa * s.credits;
      cumC += s.credits;
    }
    return cumC > 0 ? cumQ / cumC : null;
  });

  const series = [pointsGpa, pointsCgpa];
  const flat = series.flat().filter((v) => typeof v === "number") as number[];
  const maxY = Math.max(4, ...flat, 0);
  const minY = Math.min(0, ...flat, 0);
  const w = 640;
  const h = 160;
  const pad = 24;
  const xFor = (i: number) => pad + (i * (w - 2 * pad)) / Math.max(1, semesters.length - 1);
  const yFor = (v: number) => h - pad - ((v - minY) / Math.max(1e-6, maxY - minY)) * (h - 2 * pad);

  const pathFor = (vals: (number | null)[]) => {
    const coords = vals
      .map((v, i) => (typeof v === "number" ? [xFor(i), yFor(v)] : null))
      .filter(Boolean) as [number, number][];
    if (coords.length === 0) return "";
    return coords.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(" ");
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-40 w-full">
      <rect x={0} y={0} width={w} height={h} fill="transparent" />
      {/* Axes */}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#e2e8f0" />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#e2e8f0" />
      {/* GPA line */}
      <path d={pathFor(pointsGpa)} stroke="#3b82f6" strokeWidth={2} fill="none" />
      {/* CGPA line */}
      <path d={pathFor(pointsCgpa)} stroke="#64748b" strokeWidth={2} fill="none" />
      {/* Points */}
      {pointsGpa.map((v, i) => (
        typeof v === "number" ? <circle key={`g${i}`} cx={xFor(i)} cy={yFor(v)} r={3} fill="#3b82f6" /> : null
      ))}
      {pointsCgpa.map((v, i) => (
        typeof v === "number" ? <circle key={`c${i}`} cx={xFor(i)} cy={yFor(v)} r={3} fill="#64748b" /> : null
      ))}
      {/* Labels */}
      {semesters.map((s, i) => (
        <text key={s.id} x={xFor(i)} y={h - 6} textAnchor="middle" className="fill-slate-500 text-[10px]">{s.name}</text>
      ))}
    </svg>
  );
}
