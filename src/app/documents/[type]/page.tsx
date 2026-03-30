"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  DocumentType,
  TemplateConfig,
  AnyDocumentData,
  InvoiceData,
  QuotationData,
  PurchaseOrderData,
  DeliveryReceiptData,
  ReceiptData,
  ResumeData,
  SalesReportData,
  ExpenseReportData,
  InventorySummaryData,
  AttendanceReportData,
  AnalyticsSummaryData,
  CustomReportData,
} from "@/types";
import { FORM_FIELDS, getDocumentInfo, getDefaultData, generatePDF, saveDraft, loadDraft, calculateTotals, incrementDownloadCount, getDownloadCount } from "@/lib";
import { useAuth } from "@/components/auth/AuthProvider";
import DynamicForm from "@/components/forms/DynamicForm";
import ItemTableEditor from "@/components/forms/ItemTableEditor";
import ResumeExtrasEditor from "@/components/forms/ResumeExtrasEditor";
import GenericTableEditor from "@/components/forms/GenericTableEditor";
import SectionsEditor from "@/components/forms/SectionsEditor";
import TemplateSelector from "@/components/ui/TemplateSelector";
import DocumentPreview from "@/components/preview/DocumentPreview";
import { ArrowLeft, Download, Eye, PenLine, Check } from "lucide-react";

export default function DocumentEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const docType = params.type as DocumentType;
  const docInfo = getDocumentInfo(docType);
  const previewRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<AnyDocumentData>(() => {
    const saved = loadDraft<AnyDocumentData>(docType);
    return saved || getDefaultData(docType);
  });

  const [config, setConfig] = useState<TemplateConfig>({
    style: "minimal",
    primaryColor: "#2563eb",
    showLogo: false,
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
    currency: "USD",
  });

  const [downloading, setDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const isFree = !user || user.tier === "free";
  const FREE_LIMIT = 3;

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft(docType, data);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 500);
    return () => clearTimeout(timer);
  }, [data, docType]);

  // Set nested value in data object
  const setNestedValue = useCallback(
    (name: string, value: string | number) => {
      setData((prev) => {
        const updated = JSON.parse(JSON.stringify(prev));
        const parts = name.split(".");
        let current = updated;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) current[parts[i]] = {};
          current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
        return updated;
      });
    },
    []
  );

  // Recalculate totals when items change (for docs with line items & totals)
  const updateItemsAndTotals = useCallback(
    (items: { id: string; description: string; quantity: number; unitPrice: number; amount: number }[]) => {
      setData((prev) => {
        const updated = JSON.parse(JSON.stringify(prev));
        updated.items = items;
        if ("totals" in updated) {
          const totals = calculateTotals(items, updated.totals?.taxRate || 0, updated.totals?.discount || 0);
          updated.totals = totals;
        }
        return updated;
      });
    },
    []
  );

  const handleDownload = async () => {
    if (!previewRef.current) return;

    // Check download limit for free tier
    if (isFree) {
      const count = getDownloadCount();
      if (count >= FREE_LIMIT) {
        alert(`Free tier limit reached (${FREE_LIMIT} downloads/month). Please upgrade to Pro for unlimited downloads.`);
        return;
      }
    }

    setDownloading(true);
    try {
      await generatePDF({
        element: previewRef.current,
        filename: `${docType}-${(data as { metadata: { docNumber: string } }).metadata?.docNumber || "document"}.pdf`,
      });
      incrementDownloadCount();
    } finally {
      setDownloading(false);
    }
  };

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbfc]">
        <div className="text-center animate-fade-in">
          <h1 className="text-xl font-bold text-slate-800 mb-2">Document type not found</h1>
          <button onClick={() => router.push("/")} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const fields = FORM_FIELDS[docType] || [];

  // Determine which extra editors to show
  const hasLineItems = "items" in data && Array.isArray((data as InvoiceData).items) && docType !== "sales-report" && docType !== "expense-report" && docType !== "inventory-summary" && docType !== "attendance-report" && docType !== "analytics-summary" && docType !== "custom-report";
  const isResume = docType === "resume";

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200 shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0">
            <h1 className="text-[15px] font-bold text-slate-800 truncate">{docInfo.label}</h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">Fill in the details and download as PDF</p>
          </div>
          {saved && (
            <span className="items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg font-medium hidden sm:flex">
              <Check size={12} /> Saved
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all duration-200"
          >
            {showPreview ? <><PenLine size={13} /> Edit</> : <><Eye size={13} /> Preview</>}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 sm:px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg hover:shadow-blue-200/50 disabled:opacity-50 transition-all duration-200 active:scale-[0.98]"
          >
            <Download size={13} />
            <span className="hidden sm:inline">{downloading ? "Generating..." : "Download PDF"}</span>
            <span className="sm:hidden">{downloading ? "..." : "PDF"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[calc(100vh-57px)]">
        {/* Form Panel */}
        <div className={`md:w-1/2 overflow-y-auto p-4 sm:p-6 space-y-4 ${showPreview ? "hidden md:block" : ""}`}>
          {/* Template Config */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <TemplateSelector config={config} onChange={setConfig} />
          </div>

          {/* Dynamic Form Fields */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <DynamicForm fields={fields} data={data as unknown as Record<string, unknown>} onChange={setNestedValue} />
          </div>

          {/* Line Items Editor */}
          {hasLineItems && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <ItemTableEditor
                items={(data as InvoiceData).items}
                onChange={updateItemsAndTotals}
                currency={config.currency || "USD"}
              />
              {"totals" in data && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Tax Rate (%)</label>
                    <input
                      type="number"
                      value={(data as InvoiceData).totals.taxRate}
                      onChange={(e) => {
                        const rate = parseFloat(e.target.value) || 0;
                        setData((prev) => {
                          const updated = JSON.parse(JSON.stringify(prev));
                          const totals = calculateTotals(updated.items, rate, updated.totals.discount);
                          updated.totals = totals;
                          return updated;
                        });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Discount ($)</label>
                    <input
                      type="number"
                      value={(data as InvoiceData).totals.discount}
                      onChange={(e) => {
                        const disc = parseFloat(e.target.value) || 0;
                        setData((prev) => {
                          const updated = JSON.parse(JSON.stringify(prev));
                          const totals = calculateTotals(updated.items, updated.totals.taxRate, disc);
                          updated.totals = totals;
                          return updated;
                        });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Resume extras */}
          {isResume && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <ResumeExtrasEditor
                workExperience={(data as ResumeData).workExperience}
                education={(data as ResumeData).education}
                skills={(data as ResumeData).skills}
                onChangeWork={(items) => setData((p) => ({ ...p, workExperience: items }) as ResumeData)}
                onChangeEducation={(items) => setData((p) => ({ ...p, education: items }) as ResumeData)}
                onChangeSkills={(skills) => setData((p) => ({ ...p, skills }) as ResumeData)}
              />
            </div>
          )}

          {/* Sales Report table */}
          {docType === "sales-report" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <GenericTableEditor
                title="Sales Items"
                columns={[
                  { key: "product", label: "Product", type: "text" },
                  { key: "quantity", label: "Qty", type: "number" },
                  { key: "revenue", label: "Revenue", type: "number" },
                ]}
                rows={(data as SalesReportData).items}
                onChange={(rows) =>
                  setData((p) => ({
                    ...p,
                    items: rows,
                    totalRevenue: rows.reduce((s, r) => s + (Number(r.revenue) || 0), 0),
                  }) as SalesReportData)
                }
              />
            </div>
          )}

          {/* Expense Report table */}
          {docType === "expense-report" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <GenericTableEditor
                title="Expenses"
                columns={[
                  { key: "description", label: "Description", type: "text" },
                  { key: "category", label: "Category", type: "text" },
                  { key: "amount", label: "Amount", type: "number" },
                  { key: "date", label: "Date", type: "text" },
                ]}
                rows={(data as ExpenseReportData).expenses}
                onChange={(rows) =>
                  setData((p) => ({
                    ...p,
                    expenses: rows,
                    totalExpenses: rows.reduce((s, r) => s + (Number(r.amount) || 0), 0),
                  }) as ExpenseReportData)
                }
              />
            </div>
          )}

          {/* Inventory Summary table */}
          {docType === "inventory-summary" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <GenericTableEditor
                title="Inventory Items"
                columns={[
                  { key: "product", label: "Product", type: "text" },
                  { key: "sku", label: "SKU", type: "text" },
                  { key: "quantity", label: "Qty", type: "number" },
                  { key: "unitCost", label: "Unit Cost", type: "number" },
                  { key: "totalValue", label: "Total", type: "number" },
                ]}
                rows={(data as InventorySummaryData).items}
                onChange={(rows) =>
                  setData((p) => ({
                    ...p,
                    items: rows,
                    totalValue: rows.reduce((s, r) => s + (Number(r.totalValue) || 0), 0),
                  }) as InventorySummaryData)
                }
              />
            </div>
          )}

          {/* Attendance Report table */}
          {docType === "attendance-report" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <GenericTableEditor
                title="Attendance Records"
                columns={[
                  { key: "name", label: "Name", type: "text" },
                  { key: "present", label: "Present", type: "number" },
                  { key: "absent", label: "Absent", type: "number" },
                  { key: "late", label: "Late", type: "number" },
                ]}
                rows={(data as AttendanceReportData).records}
                onChange={(rows) => setData((p) => ({ ...p, records: rows }) as AttendanceReportData)}
              />
            </div>
          )}

          {/* Analytics Summary table */}
          {docType === "analytics-summary" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <GenericTableEditor
                title="Metrics"
                columns={[
                  { key: "label", label: "Metric", type: "text" },
                  { key: "value", label: "Value", type: "text" },
                  { key: "change", label: "Change", type: "text" },
                ]}
                rows={(data as AnalyticsSummaryData).metrics}
                onChange={(rows) => setData((p) => ({ ...p, metrics: rows }) as AnalyticsSummaryData)}
              />
            </div>
          )}

          {/* Custom Report sections */}
          {docType === "custom-report" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <SectionsEditor
                sections={(data as CustomReportData).sections}
                onChange={(sections) => setData((p) => ({ ...p, sections }) as CustomReportData)}
              />
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className={`md:w-1/2 bg-gradient-to-b from-slate-50 to-slate-100/80 overflow-y-auto md:border-l border-slate-200/80 ${!showPreview ? "hidden md:block" : ""}`}>
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={14} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Preview</span>
            </div>
            <div ref={previewRef} className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden max-w-[210mm] mx-auto relative ring-1 ring-slate-200/50">
              <DocumentPreview type={docType} data={data} config={config} />
              {isFree && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-6xl font-bold text-slate-300/25 rotate-[-30deg] select-none">
                    DRAFT
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
