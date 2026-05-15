import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Amartya Bhattacharya",
  description:
    "CS / Computer Engineering @ Northeastern University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0b0a] text-[#e5e6e5] font-[family-name:var(--font-geist)]">
        {children}
      </body>
    </html>
  );
}
