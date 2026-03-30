"use client";

import React from "react";
import { FormFieldDef } from "@/types";

interface DynamicFormProps {
  fields: FormFieldDef[];
  data: Record<string, unknown>;
  onChange: (name: string, value: string | number) => void;
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
    } else {
      return "";
    }
  }
  return current !== undefined && current !== null ? String(current) : "";
}

export default function DynamicForm({ fields, data, onChange }: DynamicFormProps) {
  const sections = new Map<string, FormFieldDef[]>();
  for (const f of fields) {
    const sec = f.section || "General";
    if (!sections.has(sec)) sections.set(sec, []);
    sections.get(sec)!.push(f);
  }

  const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200";

  return (
    <div className="space-y-6">
      {[...sections.entries()].map(([section, sectionFields]) => (
        <fieldset key={section} className="space-y-3">
          <legend className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {section}
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sectionFields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "md:col-span-2" : ""}
              >
                <label
                  htmlFor={field.name}
                  className="block text-xs font-semibold text-slate-500 mb-1.5"
                >
                  {field.label}
                  {field.required && <span className="text-red-400 ml-0.5">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={getNestedValue(data, field.name)}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className={inputCls + " resize-y"}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={getNestedValue(data, field.name)}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    className={inputCls + " bg-white"}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={getNestedValue(data, field.name)}
                    onChange={(e) =>
                      onChange(
                        field.name,
                        field.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value
                      )
                    }
                    placeholder={field.placeholder}
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
