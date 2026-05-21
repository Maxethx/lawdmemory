import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toast";
import { SignupDialog } from "@/components/ui/SignupDialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LawdMemory — Persistent Memory for AI Engineering Teams",
  description:
    "Transform repositories into living organizational intelligence. Give your AI agents the memory they need to reason across commits, incidents, and architecture decisions.",
  keywords: ["AI memory", "engineering knowledge graph", "AI agents", "developer tools", "repository intelligence"],
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
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
        <Toaster />
        <SignupDialog />
      </body>
    </html>
  );
}
