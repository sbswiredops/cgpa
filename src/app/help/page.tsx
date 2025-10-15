export default function HelpPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">Help / FAQ</h1>
        <div className="mt-6 space-y-4">
          <details className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-800">What if I retake a course?</summary>
            <p className="mt-2 text-sm text-slate-700">
              Policies vary. Some universities keep the last attempt only, others keep the highest attempt.
              Our calculator exposes policy flags when available (e.g., "last attempt wins"). Accurate enforcement requires course identifiers across attempts.
            </p>
          </details>
          <details className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-800">How do Pass/Fail or Withdrawn grades affect GPA?</summary>
            <p className="mt-2 text-sm text-slate-700">
              Administrative grades like Pass (P) or Withdraw (W) usually do not contribute to GPA. They may or may not count as attempted credits.
              When the university rules mark them as non-attempted, they are excluded from the denominator.
            </p>
          </details>
          <details className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-800">Why is my numeric score not changing the grade?</summary>
            <p className="mt-2 text-sm text-slate-700">
              Numeric-to-letter mapping is applied only if your selected university provides official ranges.
              Otherwise, the letter grade you choose determines the grade point.
            </p>
          </details>
          <details className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-800">How do I save or share my results?</summary>
            <p className="mt-2 text-sm text-slate-700">
              Use the Save button to store a snapshot locally (browser only). Use Export/Share to print a PDF or copy a shareable link containing your inputs.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
