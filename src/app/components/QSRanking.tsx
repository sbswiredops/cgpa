import Link from "next/link";
import { qsUniversities } from "../data/qs-ranking";

export default function QSRanking() {
  const featured = qsUniversities.slice(0, 8);

  return (
    <section className="bg-white" id="qs-ranking">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600 shadow-sm">
              QS Rankings
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Explore QS profiles of top private universities
            </h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              View official QS profiles to learn about global standing, subject rankings, and methodology. Links open on the QS TopUniversities website.
            </p>
          </div>
          <Link
            href="/calculator"
            className="rounded-2xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Use Calculator
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((u) => (
            <article
              key={u.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    {u.shortName}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{u.name}</h3>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  QS Profile
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <a
                  href={u.qsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-transparent px-3 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  View on QS
                </a>
                <Link
                  href="/calculator"
                  className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
                >
                  Start
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
