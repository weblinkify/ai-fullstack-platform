import type { Metadata } from "next";
import type { ReactNode } from "react";

import Navbar from "@/components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nexora AI",
  description:
    "AI-native full-stack application platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-[#050505] text-white">
        <Navbar />

        <div id="page-scroll" className="h-[calc(100vh-73px)] overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}