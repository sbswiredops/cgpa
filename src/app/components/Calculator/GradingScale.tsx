import type { GradeScale } from "../../data/universities";

type GradingScaleProps = {
  universityName: string;
  gradingScale: GradeScale[];
};

export default function GradingScale({
  universityName,
  gradingScale,
}: GradingScaleProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-12">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                {universityName} Grading Scale
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Reference table sourced from the university’s academic policies.
              </p>
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Grade
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Point
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {gradingScale.length === 0 ? (
                  <tr className="transition">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      —
                    </td>
                    <td className="px-4 py-3">0.00</td>
                  </tr>
                ) : (
                  gradingScale.map((item) => (
                    <tr
                      key={item.grade}
                      className="transition hover:bg-blue-50/60"
                    >
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {item.grade}
                      </td>
                      <td className="px-4 py-3">{item.point.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
