import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aarav Khanal | AI Engineer",
  description: "Portfolio of Aarav Khanal - AI Engineer, Machine Learning Engineer, and Full Stack AI Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-accent-blue/30 overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
