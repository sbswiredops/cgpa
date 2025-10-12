export default function AdSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center shadow-sm">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Sponsored
          </div>
          <p className="mt-3 text-sm text-slate-500">Ad</p>
          <p className="mt-4 text-lg font-semibold text-slate-700">
            Showcase your brand to thousands of students planning their semester.
          </p>
        </div>
      </div>
    </section>
  );
}
