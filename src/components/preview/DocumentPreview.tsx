"use client";

import React from "react";
import {
  DocumentType,
  TemplateConfig,
  InvoiceData,
  ReceiptData,
  QuotationData,
  PurchaseOrderData,
  DeliveryReceiptData,
  ContractData,
  NDAData,
  TermsConditionsData,
  PrivacyPolicyData,
  ResumeData,
  CoverLetterData,
  ProposalData,
  ScopeOfWorkData,
  ClientOnboardingData,
  SalesReportData,
  ExpenseReportData,
  InventorySummaryData,
  AttendanceReportData,
  AnalyticsSummaryData,
  CustomReportData,
  AnyDocumentData,
} from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getTheme } from "@/templates/themes";
import DocumentShell, {
  SectionHeading,
  InfoGrid,
  ItemsTable,
  TotalsBlock,
  NotesBlock,
} from "./DocumentShell";

interface DocumentPreviewProps {
  type: DocumentType;
  data: AnyDocumentData;
  config: TemplateConfig;
}

function SignatureBlock({ entries }: { entries: { label: string; name: string }[] }) {
  const filled = entries.filter((e) => e.name);
  if (filled.length === 0) return null;
  return (
    <div className={`mt-10 grid gap-10 ${filled.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
      {filled.map((e, i) => (
        <div key={i} className="text-sm">
          <div className="border-t border-gray-400 pt-2 mt-10" />
          <p className="font-medium text-gray-700">{e.name}</p>
          <p className="text-gray-400 text-xs">{e.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function DocumentPreview({ type, data, config }: DocumentPreviewProps) {
  const style = config.style;

  switch (type) {
    case "invoice":
      return <InvoicePreview data={data as InvoiceData} config={config} style={style} />;
    case "receipt":
      return <ReceiptPreview data={data as ReceiptData} config={config} style={style} />;
    case "quotation":
      return <QuotationPreview data={data as QuotationData} config={config} style={style} />;
    case "purchase-order":
      return <PurchaseOrderPreview data={data as PurchaseOrderData} config={config} style={style} />;
    case "delivery-receipt":
      return <DeliveryReceiptPreview data={data as DeliveryReceiptData} config={config} style={style} />;
    case "contract":
      return <ContractPreview data={data as ContractData} config={config} style={style} />;
    case "nda":
      return <NDAPreview data={data as NDAData} config={config} style={style} />;
    case "terms-conditions":
      return <TermsConditionsPreview data={data as TermsConditionsData} config={config} style={style} />;
    case "privacy-policy":
      return <PrivacyPolicyPreview data={data as PrivacyPolicyData} config={config} style={style} />;
    case "resume":
      return <ResumePreview data={data as ResumeData} config={config} style={style} />;
    case "cover-letter":
      return <CoverLetterPreview data={data as CoverLetterData} config={config} style={style} />;
    case "proposal":
      return <ProposalPreview data={data as ProposalData} config={config} style={style} />;
    case "scope-of-work":
      return <ScopeOfWorkPreview data={data as ScopeOfWorkData} config={config} style={style} />;
    case "client-onboarding":
      return <ClientOnboardingPreview data={data as ClientOnboardingData} config={config} style={style} />;
    case "sales-report":
      return <SalesReportPreview data={data as SalesReportData} config={config} style={style} />;
    case "expense-report":
      return <ExpenseReportPreview data={data as ExpenseReportData} config={config} style={style} />;
    case "inventory-summary":
      return <InventorySummaryPreview data={data as InventorySummaryData} config={config} style={style} />;
    case "attendance-report":
      return <AttendanceReportPreview data={data as AttendanceReportData} config={config} style={style} />;
    case "analytics-summary":
      return <AnalyticsSummaryPreview data={data as AnalyticsSummaryData} config={config} style={style} />;
    case "custom-report":
      return <CustomReportPreview data={data as CustomReportData} config={config} style={style} />;
    default:
      return <div className="p-8 text-gray-500">Preview not available</div>;
  }
}

// ——————————————————————————————————————————
// Phase 1 Previews
// ——————————————————————————————————————————

function InvoicePreview({ data, config, style }: { data: InvoiceData; config: TemplateConfig; style: string }) {
  const fmt = (n: number) => formatCurrency(n, config.currency);
  return (
    <DocumentShell config={config} title="INVOICE" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <SectionHeading style={config.style}>Bill To</SectionHeading>
          <InfoGrid items={[
            { label: "Name", value: data.clientInfo.name },
            { label: "Company", value: data.clientInfo.company || "" },
            { label: "Email", value: data.clientInfo.email },
            { label: "Phone", value: data.clientInfo.phone },
            { label: "Address", value: data.clientInfo.address },
          ]} />
        </div>
        <div>
          <SectionHeading style={config.style}>Details</SectionHeading>
          <InfoGrid items={[
            { label: "Invoice #", value: data.metadata.docNumber },
            { label: "Date", value: formatDate(data.metadata.date) },
            { label: "Due Date", value: data.metadata.dueDate ? formatDate(data.metadata.dueDate) : "" },
          ]} />
        </div>
      </div>
      <ItemsTable items={data.items} formatCurrency={fmt} />
      <TotalsBlock subtotal={data.totals.subtotal} tax={data.totals.tax} discount={data.totals.discount} total={data.totals.total} formatCurrency={fmt} />
      <SignatureBlock entries={[{ label: "Prepared By", name: data.preparedBy || "" }]} />
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function ReceiptPreview({ data, config }: { data: ReceiptData; config: TemplateConfig; style: string }) {
  const fmt = (n: number) => formatCurrency(n, config.currency);
  return (
    <DocumentShell config={config} title="RECEIPT" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <SectionHeading style={config.style}>Payment Details</SectionHeading>
      <InfoGrid items={[
        { label: "Received From", value: data.clientInfo.name },
        { label: "Company", value: data.clientInfo.company || "" },
        { label: "Amount", value: fmt(data.paymentAmount) },
        { label: "Method", value: data.paymentMethod },
        { label: "Reference #", value: data.referenceNumber },
        { label: "Date", value: formatDate(data.metadata.date) },
      ]} />
      {data.items && data.items.length > 0 && (
        <>
          <SectionHeading style={config.style}>Items</SectionHeading>
          <ItemsTable items={data.items} formatCurrency={fmt} />
        </>
      )}
      <SignatureBlock entries={[
        { label: "Received By", name: data.receivedBy || "" },
        { label: "Prepared By", name: data.preparedBy || "" },
      ]} />
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function QuotationPreview({ data, config }: { data: QuotationData; config: TemplateConfig; style: string }) {
  const fmt = (n: number) => formatCurrency(n, config.currency);
  return (
    <DocumentShell config={config} title="QUOTATION" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <SectionHeading style={config.style}>Prepared For</SectionHeading>
          <InfoGrid items={[
            { label: "Name", value: data.clientInfo.name },
            { label: "Company", value: data.clientInfo.company || "" },
            { label: "Email", value: data.clientInfo.email },
          ]} />
        </div>
        <div>
          <SectionHeading style={config.style}>Quote Details</SectionHeading>
          <InfoGrid items={[
            { label: "Quote #", value: data.metadata.docNumber },
            { label: "Date", value: formatDate(data.metadata.date) },
            { label: "Valid Until", value: data.metadata.validityDate ? formatDate(data.metadata.validityDate) : "" },
          ]} />
        </div>
      </div>
      <ItemsTable items={data.items} formatCurrency={fmt} />
      <TotalsBlock subtotal={data.totals.subtotal} tax={data.totals.tax} discount={data.totals.discount} total={data.totals.total} formatCurrency={fmt} />
      <SignatureBlock entries={[{ label: "Prepared By", name: data.preparedBy || "" }]} />
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function PurchaseOrderPreview({ data, config }: { data: PurchaseOrderData; config: TemplateConfig; style: string }) {
  const fmt = (n: number) => formatCurrency(n, config.currency);
  return (
    <DocumentShell config={config} title="PURCHASE ORDER" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <SectionHeading style={config.style}>Supplier</SectionHeading>
      <InfoGrid items={[
        { label: "Name", value: data.supplierInfo.name },
        { label: "Email", value: data.supplierInfo.email },
        { label: "Phone", value: data.supplierInfo.phone },
        { label: "Address", value: data.supplierInfo.address },
        { label: "Order Date", value: data.metadata.orderDate ? formatDate(data.metadata.orderDate) : "" },
      ]} />
      <ItemsTable items={data.items} formatCurrency={fmt} />
      <TotalsBlock subtotal={data.totals.subtotal} tax={data.totals.tax} discount={data.totals.discount} total={data.totals.total} formatCurrency={fmt} />
      <SignatureBlock entries={[
        { label: "Prepared By", name: data.preparedBy || "" },
        { label: "Approved By", name: data.approvedBy || "" },
      ]} />
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function DeliveryReceiptPreview({ data, config }: { data: DeliveryReceiptData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="DELIVERY RECEIPT" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <InfoGrid items={[
        { label: "Client", value: data.clientInfo.name },
        { label: "Delivered By", value: data.deliveredBy },
        { label: "Received By", value: data.receivedBy },
      ]} />
      <ItemsTable items={data.items.map((i) => ({ ...i, unitPrice: 0, amount: 0 }))} formatCurrency={(n: number) => formatCurrency(n, config.currency)} />
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

// ——————————————————————————————————————————
// Phase 2 Previews — Legal
// ——————————————————————————————————————————

function ContractPreview({ data, config }: { data: ContractData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="CONTRACT" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <SectionHeading style={config.style}>Parties</SectionHeading>
      <InfoGrid items={[
        { label: "Party A", value: data.partyA },
        { label: "Party B", value: data.partyB },
        { label: "Start Date", value: data.startDate ? formatDate(data.startDate) : "" },
        { label: "Duration", value: data.duration },
      ]} />
      <SectionHeading style={config.style}>Scope of Work</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.scopeOfWork || "—"}</p>
      <SectionHeading style={config.style}>Payment Terms</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.paymentTerms || "—"}</p>
      <div className="mt-12 grid grid-cols-2 gap-8 text-sm">
        <div><div className="border-t border-gray-400 pt-2 mt-16">Party A Signature</div><p className="text-gray-500">{data.partyA}</p></div>
        <div><div className="border-t border-gray-400 pt-2 mt-16">Party B Signature</div><p className="text-gray-500">{data.partyB}</p></div>
      </div>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function NDAPreview({ data, config }: { data: NDAData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="NON-DISCLOSURE AGREEMENT" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <SectionHeading style={config.style}>Parties</SectionHeading>
      <InfoGrid items={[
        { label: "Party A", value: data.partyA },
        { label: "Party B", value: data.partyB },
        { label: "Duration", value: data.duration },
      ]} />
      <SectionHeading style={config.style}>Confidentiality Terms</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.confidentialityTerms || "—"}</p>
      <div className="mt-12 grid grid-cols-2 gap-8 text-sm">
        <div><div className="border-t border-gray-400 pt-2 mt-16">Party A Signature</div><p className="text-gray-500">{data.partyA}</p></div>
        <div><div className="border-t border-gray-400 pt-2 mt-16">Party B Signature</div><p className="text-gray-500">{data.partyB}</p></div>
      </div>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function TermsConditionsPreview({ data, config }: { data: TermsConditionsData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="TERMS & CONDITIONS" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <p className="text-sm text-gray-600">Business: <strong>{data.businessName}</strong></p>
      <SectionHeading style={config.style}>Service Description</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.serviceDescription || "—"}</p>
      <SectionHeading style={config.style}>Rules</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.rules || "—"}</p>
      <SectionHeading style={config.style}>Limitations</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.limitations || "—"}</p>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function PrivacyPolicyPreview({ data, config }: { data: PrivacyPolicyData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="PRIVACY POLICY" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <InfoGrid items={[
        { label: "Business", value: data.businessName },
        { label: "Website", value: data.websiteUrl },
        { label: "Contact", value: data.contactEmail },
      ]} />
      <SectionHeading style={config.style}>Data We Collect</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.dataCollected || "—"}</p>
      <SectionHeading style={config.style}>How We Use Your Data</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.dataUsage || "—"}</p>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

// ——————————————————————————————————————————
// Phase 3 — Personal
// ——————————————————————————————————————————

function ResumePreview({ data, config }: { data: ResumeData; config: TemplateConfig; style: string }) {
  const theme = getTheme(config.style);
  return (
    <div className={`${theme.bodyFont} bg-white text-gray-900 w-full`}>
      <div className={`${theme.headerBg} ${theme.headerText} px-8 py-6 text-center`}>
        <h1 className="text-3xl font-bold">{data.personalInfo.name || "Your Name"}</h1>
        <p className="mt-1 opacity-90 text-sm">
          {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.address].filter(Boolean).join(" • ")}
        </p>
      </div>
      <div className="px-8 py-6 space-y-5">
        {data.personalInfo.summary && (
          <>
            <SectionHeading style={config.style}>Professional Summary</SectionHeading>
            <p className="text-sm text-gray-700">{data.personalInfo.summary}</p>
          </>
        )}
        {data.workExperience.length > 0 && (
          <>
            <SectionHeading style={config.style}>Work Experience</SectionHeading>
            {data.workExperience.map((w) => (
              <div key={w.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm">{w.role}{w.company ? ` — ${w.company}` : ""}</h3>
                  <span className="text-xs text-gray-500">{w.startDate} – {w.endDate || "Present"}</span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{w.description}</p>
              </div>
            ))}
          </>
        )}
        {data.education.length > 0 && (
          <>
            <SectionHeading style={config.style}>Education</SectionHeading>
            {data.education.map((e) => (
              <div key={e.id} className="flex justify-between text-sm">
                <span><strong>{e.degree}</strong> — {e.institution}</span>
                <span className="text-gray-500">{e.year}</span>
              </div>
            ))}
          </>
        )}
        {data.skills.length > 0 && (
          <>
            <SectionHeading style={config.style}>Skills</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className={`${theme.sectionBg} ${theme.accentColor} px-2 py-1 rounded text-xs font-medium`}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CoverLetterPreview({ data, config }: { data: CoverLetterData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="COVER LETTER" date={data.metadata.date}>
      <div className="text-sm space-y-4">
        <p>{formatDate(data.metadata.date)}</p>
        <p>Dear Hiring Manager,</p>
        <p>I am writing to express my interest in the <strong>{data.jobRole || "[Job Role]"}</strong> position at <strong>{data.company || "[Company]"}</strong>.</p>
        <p className="whitespace-pre-wrap">{data.description}</p>
        <p>Sincerely,</p>
        <p className="font-semibold">{data.personalInfo.name || "[Your Name]"}</p>
        <p className="text-gray-500">{data.personalInfo.email}{data.personalInfo.phone ? ` • ${data.personalInfo.phone}` : ""}</p>
      </div>
    </DocumentShell>
  );
}

// ——————————————————————————————————————————
// Phase 4 — Freelancer
// ——————————————————————————————————————————

function ProposalPreview({ data, config }: { data: ProposalData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="PROJECT PROPOSAL" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <SectionHeading style={config.style}>Prepared For</SectionHeading>
      <InfoGrid items={[
        { label: "Client", value: data.clientInfo.name },
        { label: "Company", value: data.clientInfo.company || "" },
      ]} />
      <SectionHeading style={config.style}>Project Description</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.projectDescription || "—"}</p>
      <SectionHeading style={config.style}>Pricing</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.pricing || "—"}</p>
      <SectionHeading style={config.style}>Timeline</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.timeline || "—"}</p>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function ScopeOfWorkPreview({ data, config }: { data: ScopeOfWorkData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="SCOPE OF WORK" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <SectionHeading style={config.style}>Client</SectionHeading>
      <InfoGrid items={[{ label: "Client", value: data.clientInfo.name }, { label: "Company", value: data.clientInfo.company || "" }]} />
      <SectionHeading style={config.style}>Deliverables</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.deliverables || "—"}</p>
      <SectionHeading style={config.style}>Timeline</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.timeline || "—"}</p>
      <SectionHeading style={config.style}>Responsibilities</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.responsibilities || "—"}</p>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function ClientOnboardingPreview({ data, config }: { data: ClientOnboardingData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="CLIENT ONBOARDING" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <p className="text-sm text-gray-600">Welcome, <strong>{data.clientInfo.name || "Client"}</strong>!</p>
      <SectionHeading style={config.style}>Welcome Message</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.welcomeMessage || "—"}</p>
      <SectionHeading style={config.style}>Process Outline</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.processOutline || "—"}</p>
      <SectionHeading style={config.style}>Requirements</SectionHeading>
      <p className="text-sm whitespace-pre-wrap text-gray-700">{data.requirements || "—"}</p>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

// ——————————————————————————————————————————
// Phase 5 — Small Business
// ——————————————————————————————————————————

function SalesReportPreview({ data, config }: { data: SalesReportData; config: TemplateConfig; style: string }) {
  const fmt = (n: number) => formatCurrency(n, config.currency);
  return (
    <DocumentShell config={config} title="SALES REPORT" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <InfoGrid items={[{ label: "Period", value: data.reportPeriod }]} />
      <table className="w-full text-sm">
        <thead><tr className="border-b-2 border-gray-300 text-left"><th className="py-2">Product</th><th className="py-2 text-right">Qty</th><th className="py-2 text-right">Revenue</th></tr></thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i} className="border-b border-gray-100"><td className="py-2">{item.product || "—"}</td><td className="py-2 text-right">{item.quantity}</td><td className="py-2 text-right">{fmt(item.revenue)}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="text-right font-bold">Total Revenue: {fmt(data.totalRevenue)}</div>
      <SignatureBlock entries={[{ label: "Prepared By", name: data.preparedBy || "" }]} />
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function ExpenseReportPreview({ data, config }: { data: ExpenseReportData; config: TemplateConfig; style: string }) {
  const fmt = (n: number) => formatCurrency(n, config.currency);
  return (
    <DocumentShell config={config} title="EXPENSE REPORT" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <InfoGrid items={[{ label: "Period", value: data.reportPeriod }]} />
      <table className="w-full text-sm">
        <thead><tr className="border-b-2 border-gray-300 text-left"><th className="py-2">Description</th><th className="py-2">Category</th><th className="py-2">Date</th><th className="py-2 text-right">Amount</th></tr></thead>
        <tbody>
          {data.expenses.map((e, i) => (
            <tr key={i} className="border-b border-gray-100"><td className="py-2">{e.description || "—"}</td><td className="py-2">{e.category}</td><td className="py-2">{e.date}</td><td className="py-2 text-right">{fmt(e.amount)}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="text-right font-bold">Total Expenses: {fmt(data.totalExpenses)}</div>
      <SignatureBlock entries={[
        { label: "Prepared By", name: data.preparedBy || "" },
        { label: "Approved By", name: data.approvedBy || "" },
      ]} />
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function InventorySummaryPreview({ data, config }: { data: InventorySummaryData; config: TemplateConfig; style: string }) {
  const fmt = (n: number) => formatCurrency(n, config.currency);
  return (
    <DocumentShell config={config} title="INVENTORY SUMMARY" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <table className="w-full text-sm">
        <thead><tr className="border-b-2 border-gray-300 text-left"><th className="py-2">Product</th><th className="py-2">SKU</th><th className="py-2 text-right">Qty</th><th className="py-2 text-right">Unit Cost</th><th className="py-2 text-right">Total</th></tr></thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i} className="border-b border-gray-100"><td className="py-2">{item.product || "—"}</td><td className="py-2">{item.sku}</td><td className="py-2 text-right">{item.quantity}</td><td className="py-2 text-right">{fmt(item.unitCost)}</td><td className="py-2 text-right">{fmt(item.totalValue)}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="text-right font-bold">Total Value: {fmt(data.totalValue)}</div>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

// ——————————————————————————————————————————
// Phase 6 — Reports
// ——————————————————————————————————————————

function AttendanceReportPreview({ data, config }: { data: AttendanceReportData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="ATTENDANCE REPORT" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <InfoGrid items={[{ label: "Period", value: data.reportPeriod }]} />
      <table className="w-full text-sm">
        <thead><tr className="border-b-2 border-gray-300 text-left"><th className="py-2">Name</th><th className="py-2 text-right">Present</th><th className="py-2 text-right">Absent</th><th className="py-2 text-right">Late</th></tr></thead>
        <tbody>
          {data.records.map((r, i) => (
            <tr key={i} className="border-b border-gray-100"><td className="py-2">{r.name || "—"}</td><td className="py-2 text-right">{r.present}</td><td className="py-2 text-right">{r.absent}</td><td className="py-2 text-right">{r.late}</td></tr>
          ))}
        </tbody>
      </table>
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function AnalyticsSummaryPreview({ data, config }: { data: AnalyticsSummaryData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title="ANALYTICS SUMMARY" docNumber={data.metadata.docNumber} date={data.metadata.date}>
      <InfoGrid items={[{ label: "Period", value: data.reportPeriod }]} />
      <table className="w-full text-sm">
        <thead><tr className="border-b-2 border-gray-300 text-left"><th className="py-2">Metric</th><th className="py-2 text-right">Value</th><th className="py-2 text-right">Change</th></tr></thead>
        <tbody>
          {data.metrics.map((m, i) => (
            <tr key={i} className="border-b border-gray-100"><td className="py-2">{m.label || "—"}</td><td className="py-2 text-right">{m.value}</td><td className="py-2 text-right">{m.change}</td></tr>
          ))}
        </tbody>
      </table>
      {data.summary && (
        <>
          <SectionHeading style={config.style}>Summary</SectionHeading>
          <p className="text-sm whitespace-pre-wrap text-gray-700">{data.summary}</p>
        </>
      )}
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}

function CustomReportPreview({ data, config }: { data: CustomReportData; config: TemplateConfig; style: string }) {
  return (
    <DocumentShell config={config} title={data.title || "CUSTOM REPORT"} docNumber={data.metadata.docNumber} date={data.metadata.date}>
      {data.sections.map((s) => (
        <div key={s.id}>
          {s.heading && <SectionHeading style={config.style}>{s.heading}</SectionHeading>}
          <p className="text-sm whitespace-pre-wrap text-gray-700">{s.content || "—"}</p>
        </div>
      ))}
      <NotesBlock notes={data.metadata.notes} />
    </DocumentShell>
  );
}
