import type { CalculationSnapshot } from "./types";

type ResultsProps = {
  currentGpa: number | null;
  currentCredits: number;
  cumulativeGpa: number | null;
  totalCredits: number;
  includePrevious: boolean;
  gradeInterpretation: string;
  previousCredits: number;
  lastSavedMessage: string | null;
  lastSnapshot: CalculationSnapshot | null;
};

const instructions = [
  "Add each course with accurate credit hours.",
  "Toggle previous records if you have prior CGPA.",
  "Use Save to store a quick snapshot of your current inputs.",
  "Reset anytime to begin a fresh calculation.",
];

export default function Results({
  currentGpa,
  currentCredits,
  cumulativeGpa,
  totalCredits,
  includePrevious,
  gradeInterpretation,
  previousCredits,
  lastSavedMessage,
  lastSnapshot,
}: ResultsProps) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Results</h2>
      <p className="mt-2 text-sm text-slate-500">
        Values update instantly as you adjust your course list.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-blue-50 px-4 py-5 text-slate-900 shadow-sm transition-all">
          <p className="text-xs uppercase tracking-wide text-blue-600">Current Semester</p>
          <p className="mt-2 text-3xl font-semibold">
            {currentGpa !== null ? currentGpa.toFixed(2) : "--"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Based on {currentCredits.toFixed(2)} credit hours this semester.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-slate-900 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Cumulative</p>
          <p className="mt-2 text-2xl font-semibold">
            {cumulativeGpa !== null ? cumulativeGpa.toFixed(2) : "--"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Total credits considered: {totalCredits.toFixed(2)}.
          </p>
          {includePrevious && (
            <p className="mt-1 text-xs text-slate-500">
              Previous record credits included: {previousCredits.toFixed(2)}.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white px-4 py-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-blue-600">Interpretation</p>
          <p className="mt-2 text-sm text-slate-700">{gradeInterpretation}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">How to use</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {instructions.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lastSnapshot && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
          <p className="font-semibold">{lastSavedMessage ?? "Calculation saved."}</p>
          <p className="mt-1 text-xs text-emerald-600">
            Cumulative CGPA: {lastSnapshot.cumulativeGpa !== null ? lastSnapshot.cumulativeGpa.toFixed(2) : "--"} · Current GPA: {lastSnapshot.currentGpa.toFixed(2)} · Credits: {lastSnapshot.totalCredits.toFixed(2)}
          </p>
        </div>
      )}
    </aside>
  );
}
