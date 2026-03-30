"use client";

import React from "react";
import { createId } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  type: "text" | "number";
}

interface GenericTableEditorProps {
  title: string;
  columns: Column[];
  rows: Record<string, unknown>[];
  onChange: (rows: Record<string, unknown>[]) => void;
}

export default function GenericTableEditor({ title, columns, rows, onChange }: GenericTableEditorProps) {
  const updateRow = (i: number, key: string, value: string) => {
    const updated = [...rows];
    const col = columns.find((c) => c.key === key);
    updated[i] = { ...updated[i], [key]: col?.type === "number" ? parseFloat(value) || 0 : value };
    onChange(updated);
  };

  const addRow = () => {
    const empty: Record<string, unknown> = { id: createId() };
    for (const col of columns) {
      empty[col.key] = col.type === "number" ? 0 : "";
    }
    onChange([...rows, empty]);
  };

  const removeRow = (i: number) => {
    if (rows.length <= 1) return;
    onChange(rows.filter((_, idx) => idx !== i));
  };

  const cellInputCls = "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200";

  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</label>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              {columns.map((col) => (
                <th key={col.key} className="py-2 px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{col.label}</th>
              ))}
              <th className="py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={String(row.id || i)} className="border-b border-slate-100 group">
                {columns.map((col) => (
                  <td key={col.key} className="py-1.5 px-2">
                    <input
                      type={col.type}
                      value={row[col.key] !== undefined ? String(row[col.key]) : ""}
                      onChange={(e) => updateRow(i, col.key, e.target.value)}
                      className={cellInputCls}
                    />
                  </td>
                ))}
                <td className="py-1.5 px-2">
                  <button type="button" onClick={() => removeRow(i)} className="text-slate-300 hover:text-red-500 text-lg transition-colors duration-200 opacity-0 group-hover:opacity-100">×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={addRow} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors">+ Add Row</button>
    </div>
  );
}
