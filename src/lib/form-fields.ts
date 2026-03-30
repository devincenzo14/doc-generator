import { DocumentType, FormFieldDef } from "@/types";

// ---- Shared field groups ----

const clientInfoFields: FormFieldDef[] = [
  { name: "clientInfo.name", label: "Client Name", type: "text", required: true, section: "Client Information" },
  { name: "clientInfo.email", label: "Client Email", type: "email", section: "Client Information" },
  { name: "clientInfo.phone", label: "Client Phone", type: "text", section: "Client Information" },
  { name: "clientInfo.address", label: "Client Address", type: "textarea", section: "Client Information" },
  { name: "clientInfo.company", label: "Company", type: "text", section: "Client Information" },
];

const metadataFields: FormFieldDef[] = [
  { name: "metadata.docNumber", label: "Document #", type: "text", required: true, section: "Details" },
  { name: "metadata.date", label: "Date", type: "date", required: true, section: "Details" },
  { name: "metadata.notes", label: "Notes", type: "textarea", section: "Details" },
];

// ---- Per-document field definitions ----

const invoiceFields: FormFieldDef[] = [
  ...clientInfoFields,
  ...metadataFields,
  { name: "metadata.dueDate", label: "Due Date", type: "date", section: "Details" },
];

const receiptFields: FormFieldDef[] = [
  ...clientInfoFields,
  ...metadataFields,
  { name: "paymentAmount", label: "Payment Amount", type: "number", required: true, section: "Payment" },
  {
    name: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: [
      { label: "Cash", value: "Cash" },
      { label: "Credit Card", value: "Credit Card" },
      { label: "Bank Transfer", value: "Bank Transfer" },
      { label: "Check", value: "Check" },
      { label: "PayPal", value: "PayPal" },
      { label: "Other", value: "Other" },
    ],
    section: "Payment",
  },
  { name: "referenceNumber", label: "Reference Number", type: "text", section: "Payment" },
];

const quotationFields: FormFieldDef[] = [
  ...clientInfoFields,
  ...metadataFields,
  { name: "metadata.validityDate", label: "Valid Until", type: "date", section: "Details" },
];

const purchaseOrderFields: FormFieldDef[] = [
  { name: "supplierInfo.name", label: "Supplier Name", type: "text", required: true, section: "Supplier Information" },
  { name: "supplierInfo.email", label: "Supplier Email", type: "email", section: "Supplier Information" },
  { name: "supplierInfo.phone", label: "Supplier Phone", type: "text", section: "Supplier Information" },
  { name: "supplierInfo.address", label: "Supplier Address", type: "textarea", section: "Supplier Information" },
  ...metadataFields,
  { name: "metadata.orderDate", label: "Order Date", type: "date", section: "Details" },
];

const deliveryReceiptFields: FormFieldDef[] = [
  ...clientInfoFields,
  ...metadataFields,
  { name: "deliveredBy", label: "Delivered By", type: "text", required: true, section: "Delivery" },
  { name: "receivedBy", label: "Received By", type: "text", required: true, section: "Delivery" },
];

const contractFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "partyA", label: "Party A (Your name / company)", type: "text", required: true, section: "Parties" },
  { name: "partyB", label: "Party B (Other party)", type: "text", required: true, section: "Parties" },
  { name: "scopeOfWork", label: "Scope of Work", type: "textarea", required: true, section: "Terms" },
  { name: "paymentTerms", label: "Payment Terms", type: "textarea", required: true, section: "Terms" },
  { name: "duration", label: "Duration", type: "text", required: true, section: "Terms" },
  { name: "startDate", label: "Start Date", type: "date", section: "Terms" },
];

const ndaFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "partyA", label: "Party A", type: "text", required: true, section: "Parties" },
  { name: "partyB", label: "Party B", type: "text", required: true, section: "Parties" },
  { name: "confidentialityTerms", label: "Confidentiality Terms", type: "textarea", required: true, section: "Terms" },
  { name: "duration", label: "Duration", type: "text", required: true, section: "Terms" },
];

const termsConditionsFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "businessName", label: "Business Name", type: "text", required: true, section: "Business" },
  { name: "serviceDescription", label: "Service Description", type: "textarea", required: true, section: "Business" },
  { name: "rules", label: "Rules", type: "textarea", required: true, section: "Content" },
  { name: "limitations", label: "Limitations", type: "textarea", required: true, section: "Content" },
];

const privacyPolicyFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "businessName", label: "Business Name", type: "text", required: true, section: "Business" },
  { name: "websiteUrl", label: "Website URL", type: "text", required: true, section: "Business" },
  { name: "dataCollected", label: "What data do you collect?", type: "textarea", required: true, section: "Policy" },
  { name: "dataUsage", label: "How is data used?", type: "textarea", required: true, section: "Policy" },
  { name: "contactEmail", label: "Contact Email", type: "email", required: true, section: "Policy" },
];

const resumeFields: FormFieldDef[] = [
  { name: "personalInfo.name", label: "Full Name", type: "text", required: true, section: "Personal Info" },
  { name: "personalInfo.email", label: "Email", type: "email", required: true, section: "Personal Info" },
  { name: "personalInfo.phone", label: "Phone", type: "text", section: "Personal Info" },
  { name: "personalInfo.address", label: "Address", type: "text", section: "Personal Info" },
  { name: "personalInfo.summary", label: "Professional Summary", type: "textarea", section: "Personal Info" },
];

const coverLetterFields: FormFieldDef[] = [
  { name: "personalInfo.name", label: "Your Name", type: "text", required: true, section: "Personal Info" },
  { name: "personalInfo.email", label: "Your Email", type: "email", required: true, section: "Personal Info" },
  { name: "personalInfo.phone", label: "Your Phone", type: "text", section: "Personal Info" },
  { name: "jobRole", label: "Job Role", type: "text", required: true, section: "Job Details" },
  { name: "company", label: "Company", type: "text", required: true, section: "Job Details" },
  { name: "description", label: "Letter Body", type: "textarea", required: true, section: "Content" },
];

const proposalFields: FormFieldDef[] = [
  ...clientInfoFields,
  ...metadataFields,
  { name: "projectDescription", label: "Project Description", type: "textarea", required: true, section: "Proposal" },
  { name: "pricing", label: "Pricing", type: "textarea", required: true, section: "Proposal" },
  { name: "timeline", label: "Timeline", type: "textarea", required: true, section: "Proposal" },
];

const scopeOfWorkFields: FormFieldDef[] = [
  ...clientInfoFields,
  ...metadataFields,
  { name: "deliverables", label: "Deliverables", type: "textarea", required: true, section: "Scope" },
  { name: "timeline", label: "Timeline", type: "textarea", required: true, section: "Scope" },
  { name: "responsibilities", label: "Responsibilities", type: "textarea", required: true, section: "Scope" },
];

const clientOnboardingFields: FormFieldDef[] = [
  ...clientInfoFields,
  ...metadataFields,
  { name: "welcomeMessage", label: "Welcome Message", type: "textarea", section: "Onboarding" },
  { name: "processOutline", label: "Process Outline", type: "textarea", section: "Onboarding" },
  { name: "requirements", label: "Requirements from Client", type: "textarea", section: "Onboarding" },
];

const salesReportFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "reportPeriod", label: "Report Period", type: "text", required: true, section: "Report" },
];

const expenseReportFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "reportPeriod", label: "Report Period", type: "text", required: true, section: "Report" },
];

const inventorySummaryFields: FormFieldDef[] = [...metadataFields];

const attendanceReportFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "reportPeriod", label: "Report Period", type: "text", required: true, section: "Report" },
];

const analyticsSummaryFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "reportPeriod", label: "Report Period", type: "text", required: true, section: "Report" },
  { name: "summary", label: "Summary / Notes", type: "textarea", section: "Report" },
];

const customReportFields: FormFieldDef[] = [
  ...metadataFields,
  { name: "title", label: "Report Title", type: "text", required: true, section: "Report" },
];

// ---- Registry ----

export const FORM_FIELDS: Record<DocumentType, FormFieldDef[]> = {
  invoice: invoiceFields,
  receipt: receiptFields,
  quotation: quotationFields,
  "purchase-order": purchaseOrderFields,
  "delivery-receipt": deliveryReceiptFields,
  contract: contractFields,
  nda: ndaFields,
  "terms-conditions": termsConditionsFields,
  "privacy-policy": privacyPolicyFields,
  resume: resumeFields,
  "cover-letter": coverLetterFields,
  proposal: proposalFields,
  "scope-of-work": scopeOfWorkFields,
  "client-onboarding": clientOnboardingFields,
  "sales-report": salesReportFields,
  "expense-report": expenseReportFields,
  "inventory-summary": inventorySummaryFields,
  "attendance-report": attendanceReportFields,
  "analytics-summary": analyticsSummaryFields,
  "custom-report": customReportFields,
};

// Which document types support line-item tables
export const DOCS_WITH_ITEMS: DocumentType[] = [
  "invoice",
  "receipt",
  "quotation",
  "purchase-order",
  "delivery-receipt",
  "sales-report",
  "expense-report",
  "inventory-summary",
  "attendance-report",
  "analytics-summary",
  "custom-report",
];
