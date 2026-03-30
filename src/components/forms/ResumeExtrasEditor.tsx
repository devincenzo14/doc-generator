"use client";

import React from "react";
import { WorkExperience, Education } from "@/types";
import { createId } from "@/lib/utils";

interface ResumeExtrasEditorProps {
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  onChangeWork: (items: WorkExperience[]) => void;
  onChangeEducation: (items: Education[]) => void;
  onChangeSkills: (skills: string[]) => void;
}

export default function ResumeExtrasEditor({
  workExperience,
  education,
  skills,
  onChangeWork,
  onChangeEducation,
  onChangeSkills,
}: ResumeExtrasEditorProps) {
  // --- Work Experience ---
  const addWork = () => {
    onChangeWork([
      ...workExperience,
      { id: createId(), company: "", role: "", startDate: "", endDate: "", description: "" },
    ]);
  };
  const updateWork = (i: number, field: keyof WorkExperience, value: string) => {
    const updated = [...workExperience];
    updated[i] = { ...updated[i], [field]: value };
    onChangeWork(updated);
  };
  const removeWork = (i: number) => onChangeWork(workExperience.filter((_, idx) => idx !== i));

  // --- Education ---
  const addEdu = () => {
    onChangeEducation([...education, { id: createId(), institution: "", degree: "", year: "" }]);
  };
  const updateEdu = (i: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[i] = { ...updated[i], [field]: value };
    onChangeEducation(updated);
  };
  const removeEdu = (i: number) => onChangeEducation(education.filter((_, idx) => idx !== i));

  // --- Skills ---
  const [skillInput, setSkillInput] = React.useState("");
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChangeSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };
  const removeSkill = (i: number) => onChangeSkills(skills.filter((_, idx) => idx !== i));

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200";

  return (
    <div className="space-y-6">
      {/* Work Experience */}
      <fieldset className="space-y-3">
        <legend className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Work Experience
        </legend>
        {workExperience.map((w, i) => (
          <div key={w.id} className="border border-slate-200/80 rounded-xl p-4 space-y-2.5 relative group">
            <button
              type="button"
              onClick={() => removeWork(i)}
              className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
            >
              ×
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <input className={inputCls} placeholder="Company" value={w.company} onChange={(e) => updateWork(i, "company", e.target.value)} />
              <input className={inputCls} placeholder="Role" value={w.role} onChange={(e) => updateWork(i, "role", e.target.value)} />
              <input className={inputCls} type="date" placeholder="Start" value={w.startDate} onChange={(e) => updateWork(i, "startDate", e.target.value)} />
              <input className={inputCls} type="date" placeholder="End" value={w.endDate} onChange={(e) => updateWork(i, "endDate", e.target.value)} />
            </div>
            <textarea className={inputCls + " resize-y"} rows={2} placeholder="Description" value={w.description} onChange={(e) => updateWork(i, "description", e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={addWork} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors">
          + Add Experience
        </button>
      </fieldset>

      {/* Education */}
      <fieldset className="space-y-3">
        <legend className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Education
        </legend>
        {education.map((e, i) => (
          <div key={e.id} className="border border-slate-200/80 rounded-xl p-4 relative group">
            <button type="button" onClick={() => removeEdu(i)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100">×</button>
            <div className="grid grid-cols-3 gap-2.5">
              <input className={inputCls} placeholder="Institution" value={e.institution} onChange={(ev) => updateEdu(i, "institution", ev.target.value)} />
              <input className={inputCls} placeholder="Degree" value={e.degree} onChange={(ev) => updateEdu(i, "degree", ev.target.value)} />
              <input className={inputCls} placeholder="Year" value={e.year} onChange={(ev) => updateEdu(i, "year", ev.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEdu} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors">
          + Add Education
        </button>
      </fieldset>

      {/* Skills */}
      <fieldset className="space-y-3">
        <legend className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Skills
        </legend>
        <div className="flex gap-2">
          <input
            className={inputCls}
            placeholder="Add a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
          />
          <button type="button" onClick={addSkill} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-[0.98]">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-blue-100">
              {s}
              <button type="button" onClick={() => removeSkill(i)} className="text-blue-400 hover:text-red-500 transition-colors">×</button>
            </span>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
