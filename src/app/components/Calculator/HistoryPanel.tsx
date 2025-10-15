"use client";

import { useEffect, useState } from "react";
import type { UniversityInfo } from "../../data/universities";

export type HistoryRecord = {
  id: string;
  savedAt: number;
  universityId: string;
  universityName: string;
  summary: string;
  payload: any;
};

const STORAGE_KEY = "cgpa.history";

function loadHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

type HistoryPanelProps = {
  universities: UniversityInfo[];
  onLoadSnapshot: (record: HistoryRecord) => void;
};

export default function HistoryPanel({ universities, onLoadSnapshot }: HistoryPanelProps) {
  const [items, setItems] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  const handleDelete = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    saveHistory(next);
  };

  const handleClearAll = () => {
    setItems([]);
    saveHistory([]);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">History</h2>
        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="rounded-2xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:border-red-300 hover:text-red-800"
          >
            Clear All
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-600">Saved CGPA snapshots. Load to revisit and continue.</p>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No saved calculations yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((rec) => (
            <li key={rec.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{rec.universityName}</p>
                <p className="mt-1 text-xs text-slate-600">{new Date(rec.savedAt).toLocaleString()} · {rec.summary}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onLoadSnapshot(rec)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
                >
                  Load
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(rec.id)}
                  className="text-sm font-semibold text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
