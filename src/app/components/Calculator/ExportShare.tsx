"use client";

import { useState } from "react";

type ExportShareProps = {
  getData: () => any;
};

export default function ExportShare({ getData }: ExportShareProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      const data = getData();
      const payload = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(data)))));
      const url = `${location.origin}${location.pathname}?s=${payload}`;
      await navigator.clipboard.writeText(url);
      setCopied("Link copied");
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied("Copy failed");
      setTimeout(() => setCopied(null), 1500);
    }
  };

  const handleWebShare = async () => {
    try {
      const data = getData();
      const payload = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(data)))));
      const url = `${location.origin}${location.pathname}?s=${payload}`;
      if ((navigator as any).share) {
        await (navigator as any).share({ title: "CGPA Summary", text: "My CGPA calculation", url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied("Link copied");
        setTimeout(() => setCopied(null), 1500);
      }
    } catch {
      setCopied("Share failed");
      setTimeout(() => setCopied(null), 1500);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Export / Share</h2>
      <p className="mt-1 text-sm text-slate-600">Print as PDF, copy a shareable link, or share via your device.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-2xl border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
        >
          Print / Save PDF
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="rounded-2xl border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
        >
          Copy Share Link
        </button>
        <button
          type="button"
          onClick={handleWebShare}
          className="rounded-2xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Share
        </button>
        {copied && <span className="text-xs text-emerald-600">{copied}</span>}
      </div>
    </section>
  );
}
