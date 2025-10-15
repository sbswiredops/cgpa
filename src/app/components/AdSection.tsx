export default function AdSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Sponsored
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              University Promotion
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Promote your university's programs, intake dates, scholarships,
              and campus events to prospective students across Bangladesh.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-700">
              Ideal for:
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
              <li>Program launches & enrollments</li>
              <li>Scholarship campaigns</li>
              <li>Open days & campus visits</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Sponsored
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              Study Abroad & Agency Promotion
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Reach students interested in studying overseas. Promote visa
              support, partner universities, counselling services, and test-prep
              offerings.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-700">
              Ideal for:
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
              <li>Study-abroad agents & counsellors</li>
              <li>Test-prep centers (IELTS/TOEFL)</li>
              <li>Scholarship & pathway programs</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-sm text-slate-600">
            Interested in advertising with us?
          </p>
          <a
            href="/contact"
            className="mt-3 inline-block rounded-2xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
