export default function PoliciesPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">Grading Policies</h1>
        <p className="mt-3 text-slate-600">
          Grading policies are university-specific. This project ships curated mappings and notable rules (e.g., probation thresholds,
          degree requirements, numeric score ranges). Always consult your registrar or official handbook for the latest policies.
        </p>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Key policy flags supported</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-700">
            <li>Attempted credits whitelist (which grades count as attempted)</li>
            <li>Exclude failing grades from denominator</li>
            <li>Minimum earned grade to count credits</li>
            <li>Degree requirement CGPA and probation CGPA</li>
            <li>Numeric score → letter grade ranges</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
