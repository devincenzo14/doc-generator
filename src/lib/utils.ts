export function generateDocNumber(prefix: string = "DOC"): string {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `${prefix}-${y}${m}-${seq}`;
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  const localeMap: Record<string, string> = {
    USD: "en-US", EUR: "de-DE", GBP: "en-GB", JPY: "ja-JP",
    CAD: "en-CA", AUD: "en-AU", CHF: "de-CH", CNY: "zh-CN",
    INR: "en-IN", BRL: "pt-BR", MXN: "es-MX", KRW: "ko-KR",
    SGD: "en-SG", HKD: "en-HK", SEK: "sv-SE", NOK: "nb-NO",
    DKK: "da-DK", NZD: "en-NZ", ZAR: "en-ZA", PHP: "en-PH",
  };
  const locale = localeMap[currency] || "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function createId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function calculateTotals(
  items: { quantity: number; unitPrice: number }[],
  taxRate: number = 0,
  discount: number = 0
) {
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax - discount;
  return { subtotal, tax, taxRate, discount, total };
}
