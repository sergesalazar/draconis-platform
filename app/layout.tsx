import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Draconis Enterprise — El lugar donde puedes brillar",
    template: "%s — Draconis Enterprise",
  },
  description:
    "Empresa cultural mexicana dedicada al desarrollo, representación y producción de talento artístico, desde la cultura hip-hop hacia el teatro, la música, los medios audiovisuales y la literatura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
