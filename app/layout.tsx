import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";
import { Noto_Sans_Bengali } from "next/font/google";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali"],
  weight: ["400", "500"],
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
      className={`${geist.variable} ${libreBaskerville.variable} ${notoSansBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface-0 text-text-primary font-[family-name:var(--font-geist)]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
