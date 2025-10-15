import type { UniversityInfo } from "../../data/universities";

type HonorsNoticeProps = {
  university: UniversityInfo | null;
  cgpa: number | null;
};

export default function HonorsNotice({ university, cgpa }: HonorsNoticeProps) {
  if (!university) return null;
  const rules = university.rules || {};
  const degreeMin = rules.degreeRequirementCgpa;
  const probation = rules.probationCgpa;

  const statuses: { label: string; ok: boolean | null; detail: string }[] = [];
  if (typeof degreeMin === "number") {
    const ok = typeof cgpa === "number" ? cgpa >= degreeMin : null;
    statuses.push({
      label: "On track to graduate",
      ok,
      detail: `Minimum CGPA required: ${degreeMin.toFixed(2)}`,
    });
  }
  if (typeof probation === "number") {
    const ok = typeof cgpa === "number" ? cgpa >= probation : null;
    statuses.push({
      label: "Above probation threshold",
      ok,
      detail: `Probation threshold: ${probation.toFixed(2)}`,
    });
  }

  if (statuses.length === 0) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Policy Guidance</h2>
      <p className="mt-1 text-sm text-slate-600">Based on {university.name} rules where available.</p>
      <ul className="mt-4 space-y-3">
        {statuses.map((s) => (
          <li key={s.label} className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm shadow-sm ${s.ok === false ? "border-red-200 bg-red-50 text-red-700" : s.ok === true ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
            <span className="font-semibold">{s.label}</span>
            <span className="text-slate-600">{s.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
