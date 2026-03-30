"use client";

import React from "react";
import { TemplateStyle, TemplateConfig } from "@/types";
import { getTheme } from "@/templates/themes";
import { formatDate } from "@/lib/utils";

interface DocumentShellProps {
  config: TemplateConfig;
  title: string;
  docNumber?: string;
  date?: string;
  children: React.ReactNode;
}

export default function DocumentShell({ config, title, docNumber, date, children }: DocumentShellProps) {
  const theme = getTheme(config.style);

  return (
    <div className={`${theme.bodyFont} bg-white text-gray-900 w-full`}>
      {/* Header */}
      <div className={`${theme.headerBg} ${theme.headerText} px-8 py-6`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-2xl font-bold ${theme.headerFont}`}>{title}</h1>
            {config.companyName && (
              <p className="mt-1 opacity-90">{config.companyName}</p>
            )}
            {config.companyAddress && (
              <p className="text-sm opacity-75">{config.companyAddress}</p>
            )}
            {config.companyEmail && (
              <p className="text-sm opacity-75">{config.companyEmail}</p>
            )}
          </div>
          <div className="text-right text-sm">
            {docNumber && <p className="font-medium">{docNumber}</p>}
            {date && <p className="opacity-75">{formatDate(date)}</p>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-6 space-y-6">{children}</div>
    </div>
  );
}

// Reusable sub-components for previews

export function SectionHeading({ children, style }: { children: React.ReactNode; style: TemplateStyle }) {
  const theme = getTheme(style);
  return <h2 className={`text-lg font-semibold ${theme.accentColor} border-b ${theme.borderColor} pb-1`}>{children}</h2>;
}

export function InfoGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
      {items.filter((i) => i.value).map((item, idx) => (
        <div key={idx} className="flex">
          <span className="font-medium text-gray-600 w-32 shrink-0">{item.label}:</span>
          <span className="text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function ItemsTable({ items, formatCurrency }: { items: { description: string; quantity: number; unitPrice: number; amount: number }[]; formatCurrency: (n: number) => string }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b-2 border-gray-300 text-left">
          <th className="py-2">Description</th>
          <th className="py-2 text-right w-16">Qty</th>
          <th className="py-2 text-right w-28">Unit Price</th>
          <th className="py-2 text-right w-28">Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i} className="border-b border-gray-100">
            <td className="py-2">{item.description || "—"}</td>
            <td className="py-2 text-right">{item.quantity}</td>
            <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
            <td className="py-2 text-right font-medium">{formatCurrency(item.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function TotalsBlock({ subtotal, tax, discount, total, formatCurrency }: { subtotal: number; tax: number; discount: number; total: number; formatCurrency: (n: number) => string }) {
  return (
    <div className="flex justify-end">
      <div className="w-64 text-sm space-y-1">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
        {tax > 0 && <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>}
        {discount > 0 && <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
        <div className="flex justify-between font-bold text-base border-t pt-1"><span>Total</span><span>{formatCurrency(total)}</span></div>
      </div>
    </div>
  );
}

export function NotesBlock({ notes }: { notes?: string }) {
  if (!notes) return null;
  return (
    <div className="text-sm">
      <p className="font-medium text-gray-600 mb-1">Notes</p>
      <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
    </div>
  );
}
