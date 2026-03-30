import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DocGen — Auto Document Generator",
    template: "%s | DocGen",
  },
  description:
    "Create professional invoices, contracts, resumes, reports and 20+ document types. Fill in the form, preview live, and download as PDF — free and instant.",
  keywords: [
    "document generator",
    "invoice generator",
    "resume builder",
    "PDF creator",
    "contract template",
    "quotation maker",
    "receipt generator",
    "free document maker",
  ],
  authors: [{ name: "DocGen" }],
  creator: "DocGen",
  metadataBase: new URL("https://doc-generator-gilt.vercel.app"),
  openGraph: {
    title: "DocGen — Auto Document Generator",
    description:
      "Create professional invoices, contracts, resumes, reports and more. Preview live and download as PDF — free and instant.",
    siteName: "DocGen",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocGen — Auto Document Generator",
    description:
      "Create professional invoices, contracts, resumes, reports and more. Preview live and download as PDF.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
