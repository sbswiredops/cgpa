import { useMemo, useState } from "react";
import type { UniversityInfo } from "../../data/universities";

type UniversitySelectProps = {
  universities: UniversityInfo[];
  selectedId: string;
  onSelect: (universityId: string) => void;
};

export default function UniversitySelect({
  universities,
  selectedId,
  onSelect,
}: UniversitySelectProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const base = [...universities].sort((a, b) => a.name.localeCompare(b.name));
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter((u) => `${u.name} ${u.shortName}`.toLowerCase().includes(q));
  }, [search, universities]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Choose University
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Selecting a university automatically loads its official grading scale.
      </p>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Search
      </label>
      <input
        type="search"
        placeholder="Search by name or short name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      <label className="mt-4 block text-sm font-medium text-slate-700">
        University
      </label>
      <select
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        value={selectedId}
        onChange={(event) => onSelect(event.target.value)}
      >
        <option value="">Choose your university</option>
        {filtered.map((university) => (
          <option key={university.id} value={university.id}>
            {university.name}
          </option>
        ))}
      </select>
    </div>
  );
}
