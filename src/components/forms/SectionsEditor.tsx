"use client";

import React from "react";
import { createId } from "@/lib/utils";

interface Section {
  id: string;
  heading: string;
  content: string;
}

interface SectionsEditorProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
}

export default function SectionsEditor({ sections, onChange }: SectionsEditorProps) {
  const addSection = () => {
    onChange([...sections, { id: createId(), heading: "", content: "" }]);
  };
  const updateSection = (i: number, field: "heading" | "content", value: string) => {
    const updated = [...sections];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };
  const removeSection = (i: number) => {
    if (sections.length <= 1) return;
    onChange(sections.filter((_, idx) => idx !== i));
  };

  const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200";

  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sections</label>
      {sections.map((s, i) => (
        <div key={s.id} className="border border-slate-200/80 rounded-xl p-4 space-y-2.5 relative group">
          <button type="button" onClick={() => removeSection(i)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100">×</button>
          <input className={inputCls} placeholder="Section Heading" value={s.heading} onChange={(e) => updateSection(i, "heading", e.target.value)} />
          <textarea className={inputCls + " resize-y"} rows={3} placeholder="Section Content" value={s.content} onChange={(e) => updateSection(i, "content", e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addSection} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors">+ Add Section</button>
    </div>
  );
}
