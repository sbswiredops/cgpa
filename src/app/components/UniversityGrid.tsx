import Link from "next/link";

type University = {
  name: string;
  shortName: string;
};

const universities: University[] = [
  { name: "American International University-Bangladesh", shortName: "AIUB" },
  { name: "BRAC University", shortName: "BRAC" },
  { name: "North South University", shortName: "NSU" },
  { name: "Independent University, Bangladesh", shortName: "IUB" },
  { name: "East West University", shortName: "EWU" },
  { name: "United International University", shortName: "UIU" },
  { name: "Ahsanullah University of Science and Technology", shortName: "AUST" },
  { name: "Dhaka University", shortName: "DU" },
];

export default function UniversityGrid() {
  return (
    <section className="bg-slate-50 py-16" id="universities">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Supported Universities
            </h2>
            <p className="mt-2 max-w-xl text-base text-slate-600">
              We continuously update grading scales to reflect each institution’s official policies. Select a university to start using its calculator instantly.
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
          {universities.map((university) => (
            <article
              key={university.shortName}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {university.shortName}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {university.name}
                </h3>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-slate-500">Official scale ready</span>
                <Link
                  href="/calculator"
                  className="rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
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
