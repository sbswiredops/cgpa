import type { UniversityInfo } from "../../data/universities";

type GradeToPercentageProps = {
  university: UniversityInfo | null;
};

export default function GradeToPercentage({ university }: GradeToPercentageProps) {
  const ranges = university?.numericRanges ?? null;
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Grade ↔ Percentage Mapping</h2>
              <p className="mt-1 text-sm text-slate-600">Derived from the selected university’s policy.</p>
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3">Grade</th>
                  <th scope="col" className="px-4 py-3">Point</th>
                  <th scope="col" className="px-4 py-3">Percentage</th>
                  <th scope="col" className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {(university?.gradingScale ?? []).map((g) => {
                  const nr = ranges?.find((r) => r.grade === g.grade) ?? null;
                  const pct = nr ? `${nr.min} - ${nr.max}` : "—";
                  return (
                    <tr key={g.grade} className="transition hover:bg-blue-50/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{g.grade}</td>
                      <td className="px-4 py-3">{g.point.toFixed(2)}</td>
                      <td className="px-4 py-3">{pct}</td>
                      <td className="px-4 py-3">{g.description ?? ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
