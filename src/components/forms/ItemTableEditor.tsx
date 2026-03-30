"use client";

import React from "react";
import { LineItem } from "@/types";
import { createId, formatCurrency } from "@/lib/utils";

interface ItemTableEditorProps {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
  currency?: string;
}

export default function ItemTableEditor({ items, onChange, currency = "USD" }: ItemTableEditorProps) {
  const updateItem = (index: number, field: keyof LineItem, raw: string) => {
    const updated = [...items];
    const item = { ...updated[index] };
    if (field === "description") {
      item.description = raw;
    } else if (field === "quantity" || field === "unitPrice") {
      (item as Record<string, unknown>)[field] = parseFloat(raw) || 0;
    }
    item.amount = item.quantity * item.unitPrice;
    updated[index] = item;
    onChange(updated);
  };

  const addItem = () => {
    onChange([...items, { id: createId(), description: "", quantity: 1, unitPrice: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const cellInputCls = "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200";

  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        Line Items
      </label>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="py-2 pr-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Description</th>
              <th className="py-2 px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-20">Qty</th>
              <th className="py-2 px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-28">Unit Price</th>
              <th className="py-2 px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-28">Amount</th>
              <th className="py-2 pl-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} className="border-b border-slate-100 group">
                <td className="py-1.5 pr-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(i, "description", e.target.value)}
                    placeholder="Item description"
                    className={cellInputCls}
                  />
                </td>
                <td className="py-1.5 px-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(i, "quantity", e.target.value)}
                    min={0}
                    className={cellInputCls}
                  />
                </td>
                <td className="py-1.5 px-2">
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(i, "unitPrice", e.target.value)}
                    min={0}
                    step={0.01}
                    className={cellInputCls}
                  />
                </td>
                <td className="py-1.5 px-2 text-right font-semibold text-slate-700 text-[13px]">
                  {formatCurrency(item.amount, currency)}
                </td>
                <td className="py-1.5 pl-2">
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    className="text-slate-300 hover:text-red-500 text-lg leading-none transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    title="Remove item"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
      >
        + Add Item
      </button>
    </div>
  );
}
