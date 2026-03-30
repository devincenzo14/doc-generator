"use client";

import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export interface GeneratePDFOptions {
  filename?: string;
  element: HTMLElement;
  scale?: number;
  orientation?: "portrait" | "landscape";
  format?: "a4" | "letter";
}

export async function generatePDF({
  filename = "document.pdf",
  element,
  scale = 2,
  orientation = "portrait",
  format = "a4",
}: GeneratePDFOptions): Promise<void> {
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation, format, unit: "mm" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Additional pages
  while (heightLeft > 0) {
    position = -(imgHeight - heightLeft);
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
