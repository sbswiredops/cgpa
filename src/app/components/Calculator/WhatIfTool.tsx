"use client";

import { useMemo, useState } from "react";
import type { UniversityInfo } from "../../data/universities";

type WhatIfToolProps = {
  university: UniversityInfo | null;
  baseCgpa: number | null;
  baseCredits: number;
};

export default function WhatIfTool({ university, baseCgpa, baseCredits }: WhatIfToolProps) {
  const [plannedCredits, setPlannedCredits] = useState<number | "">("");
  const [nextGpa, setNextGpa] = useState<number | "">("");
  const [targetCgpa, setTargetCgpa] = useState<number | "">("");

  const maxPoint = useMemo(() => {
    const pts = (university?.gradingScale ?? []).map((g) => g.point);
    return pts.length ? Math.max(...pts) : 4;
  }, [university]);

  const canCalcNextCgpa = typeof baseCgpa === "number" && typeof baseCredits === "number" && baseCredits >= 0 && plannedCredits !== "" && typeof plannedCredits === "number" && plannedCredits > 0 && nextGpa !== "" && typeof nextGpa === "number" && nextGpa >= 0;
  const projectedCgpa = useMemo(() => {
    if (!canCalcNextCgpa) return null;
    const total = baseCredits + (plannedCredits as number);
    const num = (baseCgpa ?? 0) * baseCredits + (nextGpa as number) * (plannedCredits as number);
    return total > 0 ? num / total : null;
  }, [canCalcNextCgpa, baseCgpa, baseCredits, plannedCredits, nextGpa]);

  const canCalcRequired = typeof baseCgpa === "number" && typeof baseCredits === "number" && baseCredits >= 0 && plannedCredits !== "" && typeof plannedCredits === "number" && plannedCredits > 0 && targetCgpa !== "" && typeof targetCgpa === "number" && targetCgpa > 0;
  const requiredNextGpa = useMemo(() => {
    if (!canCalcRequired) return null;
    const goal = targetCgpa as number;
    const total = baseCredits + (plannedCredits as number);
    const needed = (goal * total - (baseCgpa ?? 0) * baseCredits) / (plannedCredits as number);
    return Number.isFinite(needed) ? needed : null;
  }, [canCalcRequired, baseCgpa, baseCredits, plannedCredits, targetCgpa]);

  const achievableNote = useMemo(() => {
    if (requiredNextGpa === null) return null;
    if (requiredNextGpa <= maxPoint && requiredNextGpa >= 0) return "Achievable within grading scale.";
    if (requiredNextGpa > maxPoint) return `Not achievable: requires GPA > ${maxPoint.toFixed(2)} next term.`;
    return "Not meaningful given inputs.";
  }, [requiredNextGpa, maxPoint]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">What-if / Prediction</h2>
      <p className="mt-1 text-sm text-slate-600">Estimate future CGPA or required next-term GPA.</p>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-800">If I score X GPA next semester</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-slate-700">Planned Credits</label>
              <input
                type="number"
                step={0.5}
                min={0}
                value={plannedCredits as any}
                onChange={(e) => setPlannedCredits(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700">Expected Next GPA</label>
              <input
                type="number"
                step={0.01}
                min={0}
                max={maxPoint}
                value={nextGpa as any}
                onChange={(e) => setNextGpa(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-white px-3 py-3 text-sm shadow-sm">
            <p className="text-slate-500">Projected CGPA</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{projectedCgpa !== null ? projectedCgpa.toFixed(2) : "--"}</p>
            <p className="mt-1 text-xs text-slate-500">Based on current CGPA {typeof baseCgpa === "number" ? baseCgpa.toFixed(2) : "--"} over {baseCredits.toFixed(2)} credits.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-800">What minimum GPA to reach target CGPA?</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-slate-700">Planned Credits</label>
              <input
                type="number"
                step={0.5}
                min={0}
                value={plannedCredits as any}
                onChange={(e) => setPlannedCredits(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700">Target CGPA</label>
              <input
                type="number"
                step={0.01}
                min={0}
                max={maxPoint}
                value={targetCgpa as any}
                onChange={(e) => setTargetCgpa(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-white px-3 py-3 text-sm shadow-sm">
            <p className="text-slate-500">Required Next GPA</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{requiredNextGpa !== null ? requiredNextGpa.toFixed(2) : "--"}</p>
            <p className="mt-1 text-xs text-slate-600">{achievableNote ?? ""}</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">Tip: Max per-term GPA is capped by the grading scale (max {maxPoint.toFixed(2)}).</p>
    </section>
  );
}
