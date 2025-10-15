export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">About / How it works</h1>
        <p className="mt-3 text-slate-600">
          This calculator uses each university’s official grading scale to convert course grades
          to grade points, multiplies them by credit hours, and computes weighted averages for GPA and CGPA.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Formulas</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-700">
            <li>
              Semester GPA = (sum of grade point × credit hours) ÷ (sum of credit hours). Some universities exclude
              failing grades from the denominator; this is supported when rules are provided.
            </li>
            <li>
              Cumulative CGPA = (previous quality points + current quality points) ÷ (previous credits + current credits).
            </li>
            <li>
              Numeric scores map to letter grades only when the university provides a score → grade policy.
            </li>
          </ul>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Rounding</h2>
          <p className="mt-2 text-sm text-slate-700">
            Results are shown to two decimal places on screen for readability. Internally, calculations use full precision.
            Always verify institutional rounding rules when submitting official forms.
          </p>
        </div>
      </section>
    </main>
  );
}
