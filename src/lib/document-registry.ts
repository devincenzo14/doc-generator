import { DocumentType, DocumentTypeInfo } from "@/types";

export const DOCUMENT_TYPES: DocumentTypeInfo[] = [
  // Phase 1 - Basic Business
  { type: "invoice", label: "Invoice", description: "Bill clients for goods or services", category: "Business", icon: "FileText" },
  { type: "receipt", label: "Receipt", description: "Confirm payment received", category: "Business", icon: "Receipt" },
  { type: "quotation", label: "Quotation / Estimate", description: "Provide cost estimates to clients", category: "Business", icon: "Calculator" },
  { type: "purchase-order", label: "Purchase Order", description: "Order goods from suppliers", category: "Business", icon: "ShoppingCart" },
  { type: "delivery-receipt", label: "Delivery Receipt", description: "Confirm delivery of goods", category: "Business", icon: "Truck" },
  // Phase 2 - Legal
  { type: "contract", label: "Contract", description: "Generate formatted contracts", category: "Legal", icon: "Scale" },
  { type: "nda", label: "NDA", description: "Non-disclosure agreement", category: "Legal", icon: "ShieldCheck" },
  { type: "terms-conditions", label: "Terms & Conditions", description: "Generate T&C for your business", category: "Legal", icon: "ScrollText" },
  { type: "privacy-policy", label: "Privacy Policy", description: "Generate privacy policies", category: "Legal", icon: "Lock" },
  // Phase 3 - Personal
  { type: "resume", label: "Resume", description: "Build a professional resume", category: "Personal", icon: "User" },
  { type: "cover-letter", label: "Cover Letter", description: "Write a compelling cover letter", category: "Personal", icon: "Mail" },
  // Phase 4 - Freelancer
  { type: "proposal", label: "Proposal", description: "Create project proposals", category: "Freelancer", icon: "Presentation" },
  { type: "scope-of-work", label: "Scope of Work", description: "Define project scope & deliverables", category: "Freelancer", icon: "ClipboardList" },
  { type: "client-onboarding", label: "Client Onboarding", description: "Welcome new clients", category: "Freelancer", icon: "Handshake" },
  // Phase 5 - Small Business
  { type: "sales-report", label: "Sales Report", description: "Summarize sales data", category: "Small Business", icon: "TrendingUp" },
  { type: "expense-report", label: "Expense Report", description: "Track business expenses", category: "Small Business", icon: "DollarSign" },
  { type: "inventory-summary", label: "Inventory Summary", description: "Export inventory overview", category: "Small Business", icon: "Package" },
  // Phase 6 - Reports
  { type: "attendance-report", label: "Attendance Report", description: "Track attendance records", category: "Reports", icon: "CalendarCheck" },
  { type: "analytics-summary", label: "Analytics Summary", description: "Summarize analytics data", category: "Reports", icon: "BarChart3" },
  { type: "custom-report", label: "Custom Report", description: "Create custom PDF reports", category: "Reports", icon: "FileSpreadsheet" },
];

export const CATEGORIES = [...new Set(DOCUMENT_TYPES.map((d) => d.category))];

export function getDocumentInfo(type: DocumentType): DocumentTypeInfo | undefined {
  return DOCUMENT_TYPES.find((d) => d.type === type);
}
