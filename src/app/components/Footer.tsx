import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="rounded-2xl bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm">
            UniGPA
          </span>
          <p className="mt-4 text-sm text-slate-400">
            UniGPA helps students calculate their semester and cumulative performance accurately using official grading scales from universities across Bangladesh.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <a href="#about" className="transition hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#universities" className="transition hover:text-white">
                Universities
              </a>
            </li>
            <li>
              <Link href="/calculator" className="transition hover:text-white">
                Calculator
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>hello@unigpa.com</li>
            <li>+880 1234-567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Social Media
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <Link href="https://www.facebook.com" className="transition hover:text-white">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com" className="transition hover:text-white">
                Instagram
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com" className="transition hover:text-white">
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 UniGPA. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#privacy" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#terms" className="transition hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
