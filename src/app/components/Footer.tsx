import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Bangladesh Private University Hub logo"
              width={100}
              height={100}
              className="object-contain rounded"
            />
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Bangladesh Private University Hub helps students calculate their
            semester and cumulative performance accurately using official
            grading scales from universities across Bangladesh.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li></li>
            <li>
              <a href="/calculator" className="transition hover:text-white">
                Universities
              </a>
            </li>
            <li>
              <Link href="/calculator" className="transition hover:text-white">
                Calculator
              </Link>
            </li>
            <li>
              <a
                href="https://www.orbit25.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <a
                href="mailto:contact@orbit25.com"
                className="transition hover:text-white"
              >
                contact@orbit25.com
              </a>
            </li>
            <li>
              <a
                href="tel:+8801234567890"
                className="transition hover:text-white"
              >
                +880 1894051989
              </a>
            </li>
            <li>153/1 Moishanbari Road, kuratoli, kuril, Dhaka-1229</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Bangladesh Private University Hub. All rights reserved.
            Product owner:{" "}
            <a
              href="https://www.orbit25.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Orbit25
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
