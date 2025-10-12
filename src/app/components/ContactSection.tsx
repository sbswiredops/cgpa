import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="bg-slate-50" id="contact">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center">
        <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600 shadow-sm">
          University Partnership
        </span>
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Are You a University Representative?
        </h2>
        <p className="max-w-2xl text-base text-slate-600">
          Contact us to add or customize your university’s CGPA grading scale. We collaborate closely with academic departments to ensure every calculation reflects the latest policies.
        </p>
        <Link
          href="mailto:hello@unigpa.com"
          className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
