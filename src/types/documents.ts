// ============================================================
// Core document types for the Auto Document Generator
// ============================================================

// --- Shared / Reusable Types ---

export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  company?: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Totals {
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  total: number;
}

export interface DocumentMetadata {
  docNumber: string;
  date: string;
  dueDate?: string;
  notes?: string;
}

// --- Template Types ---

export type TemplateStyle = "minimal" | "corporate" | "modern";

export interface TemplateConfig {
  style: TemplateStyle;
  primaryColor: string;
  showLogo: boolean;
  companyName: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  currency?: string;
}

// --- Document Type Enum ---

export type DocumentType =
  // Phase 1 - Basic Business
  | "invoice"
  | "receipt"
  | "quotation"
  | "purchase-order"
  | "delivery-receipt"
  // Phase 2 - Legal
  | "contract"
  | "nda"
  | "terms-conditions"
  | "privacy-policy"
  // Phase 3 - Personal
  | "resume"
  | "cover-letter"
  // Phase 4 - Freelancer
  | "proposal"
  | "scope-of-work"
  | "client-onboarding"
  // Phase 5 - Small Business
  | "sales-report"
  | "expense-report"
  | "inventory-summary"
  // Phase 6 - Reports
  | "attendance-report"
  | "analytics-summary"
  | "custom-report";

export interface DocumentTypeInfo {
  type: DocumentType;
  label: string;
  description: string;
  category: string;
  icon: string;
}

// --- Phase 1: Basic Business Document Data ---

export interface InvoiceData {
  clientInfo: ClientInfo;
  items: LineItem[];
  totals: Totals;
  metadata: DocumentMetadata;
}

export interface ReceiptData {
  clientInfo: ClientInfo;
  paymentAmount: number;
  paymentMethod: string;
  referenceNumber: string;
  metadata: DocumentMetadata;
  items?: LineItem[];
}

export interface QuotationData {
  clientInfo: ClientInfo;
  items: LineItem[];
  totals: Totals;
  metadata: DocumentMetadata & { validityDate: string };
}

export interface PurchaseOrderData {
  supplierInfo: ClientInfo;
  items: LineItem[];
  totals: Totals;
  metadata: DocumentMetadata & { orderDate: string };
}

export interface DeliveryReceiptData {
  clientInfo: ClientInfo;
  items: LineItem[];
  deliveredBy: string;
  receivedBy: string;
  metadata: DocumentMetadata;
}

// --- Phase 2: Legal Document Data ---

export interface ContractData {
  partyA: string;
  partyB: string;
  scopeOfWork: string;
  paymentTerms: string;
  duration: string;
  startDate: string;
  metadata: DocumentMetadata;
}

export interface NDAData {
  partyA: string;
  partyB: string;
  confidentialityTerms: string;
  duration: string;
  metadata: DocumentMetadata;
}

export interface TermsConditionsData {
  businessName: string;
  serviceDescription: string;
  rules: string;
  limitations: string;
  metadata: DocumentMetadata;
}

export interface PrivacyPolicyData {
  businessName: string;
  websiteUrl: string;
  dataCollected: string;
  dataUsage: string;
  contactEmail: string;
  metadata: DocumentMetadata;
}

// --- Phase 3: Personal Document Data ---

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  workExperience: WorkExperience[];
  skills: string[];
  education: Education[];
  metadata: DocumentMetadata;
}

export interface CoverLetterData {
  personalInfo: { name: string; email: string; phone: string };
  jobRole: string;
  company: string;
  description: string;
  metadata: DocumentMetadata;
}

// --- Phase 4: Freelancer Document Data ---

export interface ProposalData {
  clientInfo: ClientInfo;
  projectDescription: string;
  pricing: string;
  timeline: string;
  metadata: DocumentMetadata;
}

export interface ScopeOfWorkData {
  clientInfo: ClientInfo;
  deliverables: string;
  timeline: string;
  responsibilities: string;
  metadata: DocumentMetadata;
}

export interface ClientOnboardingData {
  clientInfo: ClientInfo;
  welcomeMessage: string;
  processOutline: string;
  requirements: string;
  metadata: DocumentMetadata;
}

// --- Phase 5: Small Business Document Data ---

export interface SalesReportData {
  reportPeriod: string;
  items: { id: string; product: string; quantity: number; revenue: number }[];
  totalRevenue: number;
  metadata: DocumentMetadata;
}

export interface ExpenseReportData {
  reportPeriod: string;
  expenses: { id: string; description: string; category: string; amount: number; date: string }[];
  totalExpenses: number;
  metadata: DocumentMetadata;
}

export interface InventorySummaryData {
  items: { id: string; product: string; sku: string; quantity: number; unitCost: number; totalValue: number }[];
  totalValue: number;
  metadata: DocumentMetadata;
}

// --- Phase 6: Reports ---

export interface AttendanceReportData {
  reportPeriod: string;
  records: { id: string; name: string; present: number; absent: number; late: number }[];
  metadata: DocumentMetadata;
}

export interface AnalyticsSummaryData {
  reportPeriod: string;
  metrics: { id: string; label: string; value: string; change: string }[];
  summary: string;
  metadata: DocumentMetadata;
}

export interface CustomReportData {
  title: string;
  sections: { id: string; heading: string; content: string }[];
  metadata: DocumentMetadata;
}

// --- Union type for all document data ---

export type AnyDocumentData =
  | InvoiceData
  | ReceiptData
  | QuotationData
  | PurchaseOrderData
  | DeliveryReceiptData
  | ContractData
  | NDAData
  | TermsConditionsData
  | PrivacyPolicyData
  | ResumeData
  | CoverLetterData
  | ProposalData
  | ScopeOfWorkData
  | ClientOnboardingData
  | SalesReportData
  | ExpenseReportData
  | InventorySummaryData
  | AttendanceReportData
  | AnalyticsSummaryData
  | CustomReportData;

// --- Form Field Definitions ---

export type FieldType = "text" | "email" | "number" | "date" | "textarea" | "select";

export interface FormFieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  section?: string;
}

// --- User / Auth types ---

export type UserTier = "free" | "paid";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
  downloadsThisMonth: number;
  savedDocuments: string[];
}
