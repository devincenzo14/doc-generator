import { DocumentType, AnyDocumentData } from "@/types";
import { generateDocNumber, todayISO, createId } from "./utils";

function baseMeta(prefix: string) {
  return { docNumber: generateDocNumber(prefix), date: todayISO(), notes: "" };
}

function emptyClient() {
  return { name: "", email: "", phone: "", address: "", company: "" };
}

function emptyItem() {
  return { id: createId(), description: "", quantity: 1, unitPrice: 0, amount: 0 };
}

export function getDefaultData(type: DocumentType): AnyDocumentData {
  switch (type) {
    case "invoice":
      return {
        clientInfo: emptyClient(),
        items: [emptyItem()],
        totals: { subtotal: 0, tax: 0, taxRate: 0, discount: 0, total: 0 },
        preparedBy: "",
        metadata: { ...baseMeta("INV"), dueDate: "" },
      };
    case "receipt":
      return {
        clientInfo: emptyClient(),
        paymentAmount: 0,
        paymentMethod: "Cash",
        referenceNumber: "",
        receivedBy: "",
        preparedBy: "",
        metadata: baseMeta("RCT"),
      };
    case "quotation":
      return {
        clientInfo: emptyClient(),
        items: [emptyItem()],
        totals: { subtotal: 0, tax: 0, taxRate: 0, discount: 0, total: 0 },
        preparedBy: "",
        metadata: { ...baseMeta("QUO"), validityDate: "" },
      };
    case "purchase-order":
      return {
        supplierInfo: emptyClient(),
        items: [emptyItem()],
        totals: { subtotal: 0, tax: 0, taxRate: 0, discount: 0, total: 0 },
        preparedBy: "",
        approvedBy: "",
        metadata: { ...baseMeta("PO"), orderDate: todayISO() },
      };
    case "delivery-receipt":
      return {
        clientInfo: emptyClient(),
        items: [emptyItem()],
        deliveredBy: "",
        receivedBy: "",
        metadata: baseMeta("DR"),
      };
    case "contract":
      return {
        partyA: "",
        partyB: "",
        scopeOfWork: "",
        paymentTerms: "",
        duration: "",
        startDate: todayISO(),
        metadata: baseMeta("CTR"),
      };
    case "nda":
      return {
        partyA: "",
        partyB: "",
        confidentialityTerms: "",
        duration: "",
        metadata: baseMeta("NDA"),
      };
    case "terms-conditions":
      return {
        businessName: "",
        serviceDescription: "",
        rules: "",
        limitations: "",
        metadata: baseMeta("TC"),
      };
    case "privacy-policy":
      return {
        businessName: "",
        websiteUrl: "",
        dataCollected: "",
        dataUsage: "",
        contactEmail: "",
        metadata: baseMeta("PP"),
      };
    case "resume":
      return {
        personalInfo: { name: "", email: "", phone: "", address: "", summary: "" },
        workExperience: [],
        skills: [],
        education: [],
        metadata: baseMeta("RES"),
      };
    case "cover-letter":
      return {
        personalInfo: { name: "", email: "", phone: "" },
        jobRole: "",
        company: "",
        description: "",
        metadata: baseMeta("CL"),
      };
    case "proposal":
      return {
        clientInfo: emptyClient(),
        projectDescription: "",
        pricing: "",
        timeline: "",
        metadata: baseMeta("PRP"),
      };
    case "scope-of-work":
      return {
        clientInfo: emptyClient(),
        deliverables: "",
        timeline: "",
        responsibilities: "",
        metadata: baseMeta("SOW"),
      };
    case "client-onboarding":
      return {
        clientInfo: emptyClient(),
        welcomeMessage: "",
        processOutline: "",
        requirements: "",
        metadata: baseMeta("COB"),
      };
    case "sales-report":
      return {
        reportPeriod: "",
        items: [{ id: createId(), product: "", quantity: 0, revenue: 0 }],
        totalRevenue: 0,
        preparedBy: "",
        metadata: baseMeta("SR"),
      };
    case "expense-report":
      return {
        reportPeriod: "",
        expenses: [{ id: createId(), description: "", category: "", amount: 0, date: todayISO() }],
        totalExpenses: 0,
        preparedBy: "",
        approvedBy: "",
        metadata: baseMeta("ER"),
      };
    case "inventory-summary":
      return {
        items: [{ id: createId(), product: "", sku: "", quantity: 0, unitCost: 0, totalValue: 0 }],
        totalValue: 0,
        metadata: baseMeta("INV-S"),
      };
    case "attendance-report":
      return {
        reportPeriod: "",
        records: [{ id: createId(), name: "", present: 0, absent: 0, late: 0 }],
        metadata: baseMeta("ATT"),
      };
    case "analytics-summary":
      return {
        reportPeriod: "",
        metrics: [{ id: createId(), label: "", value: "", change: "" }],
        summary: "",
        metadata: baseMeta("ANA"),
      };
    case "custom-report":
      return {
        title: "",
        sections: [{ id: createId(), heading: "", content: "" }],
        metadata: baseMeta("RPT"),
      };
    default:
      return {
        clientInfo: emptyClient(),
        items: [emptyItem()],
        totals: { subtotal: 0, tax: 0, taxRate: 0, discount: 0, total: 0 },
        metadata: baseMeta("DOC"),
      };
  }
}
