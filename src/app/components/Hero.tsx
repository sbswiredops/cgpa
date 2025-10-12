import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white" id="about">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-4 py-16 lg:flex-row lg:py-24">
        <div className="w-full lg:max-w-lg">
          <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600 shadow-sm">
            Modern CGPA Tools
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Calculate Your University CGPA Easily!
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Instantly compute your GPA using your university’s official grading scale. Save time, stay on track, and understand exactly where you stand each semester.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/calculator"
              className="flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start Calculating
            </Link>
            <a
              href="#contact"
              className="flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
            >
              Talk to the Team
            </a>
          </div>
        </div>
        <div className="w-full max-w-xl">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                UniGPA Snapshot
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live Preview
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Selected University</span>
                  <span className="font-semibold text-slate-900">NSU</span>
                </div>
                <div className="mt-4 flex justify-between text-xs text-slate-500">
                  <span>Credits</span>
                  <span>Grade</span>
                  <span>Point</span>
                </div>
                <div className="mt-2 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                    <span>3</span>
                    <span>A</span>
                    <span>3.75</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                    <span>1.5</span>
                    <span>B+</span>
                    <span>3.50</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                    <span>3</span>
                    <span>A+</span>
                    <span>4.00</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Current Estimate</p>
                <p className="mt-2 text-4xl font-semibold text-slate-900">3.87</p>
                <p className="mt-1 text-sm text-slate-500">Projected cumulative CGPA based on current inputs.</p>
              </div>
            </div>
            <div className="absolute -right-16 bottom-8 hidden h-32 w-32 rounded-full bg-blue-100/60 blur-2xl lg:block" />
            <div className="absolute -left-10 top-10 hidden h-32 w-32 rounded-full bg-blue-200/50 blur-3xl lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
