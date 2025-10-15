export default function BlogPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">Blog / Updates</h1>
        <p className="mt-3 text-slate-600">Product updates, academic calculators, and guides.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Semester Planner and What-if Tool</h2>
            <p className="mt-2 text-sm text-slate-700">Plan terms, visualize GPA trends, and forecast your CGPA.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">University-specific Grading Policies</h2>
            <p className="mt-2 text-sm text-slate-700">We’ve added numeric ranges and policy flags for many universities in Bangladesh.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
