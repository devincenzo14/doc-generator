import { TemplateStyle } from "@/types";

interface TemplateTheme {
  headerBg: string;
  headerText: string;
  accentColor: string;
  borderColor: string;
  sectionBg: string;
  bodyFont: string;
  headerFont: string;
}

export const TEMPLATE_THEMES: Record<TemplateStyle, TemplateTheme> = {
  minimal: {
    headerBg: "bg-white",
    headerText: "text-gray-900",
    accentColor: "text-gray-600",
    borderColor: "border-gray-300",
    sectionBg: "bg-gray-50",
    bodyFont: "font-sans",
    headerFont: "font-sans",
  },
  corporate: {
    headerBg: "bg-blue-900",
    headerText: "text-white",
    accentColor: "text-blue-700",
    borderColor: "border-blue-200",
    sectionBg: "bg-blue-50",
    bodyFont: "font-sans",
    headerFont: "font-sans",
  },
  modern: {
    headerBg: "bg-gradient-to-r from-violet-600 to-indigo-600",
    headerText: "text-white",
    accentColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    sectionBg: "bg-indigo-50",
    bodyFont: "font-sans",
    headerFont: "font-sans",
  },
};

export function getTheme(style: TemplateStyle): TemplateTheme {
  return TEMPLATE_THEMES[style];
}
