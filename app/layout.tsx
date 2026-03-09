import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hugo Burton | Ingénieur Logiciel & Maker IoT",
  description: "Portfolio de Hugo Burton. Développeur et Maker passionné par l'ingénierie logicielle (C, Web) et matérielle (IoT, Impression 3D).",
  keywords: ["Hugo Burton", "développeur", "portfolio", "École 42", "IoT", "Next.js", "C", "impression 3D"],
  openGraph: {
    title: "Hugo Burton — L'alliance du Code et du Matériel",
    description: "Découvrez mes projets : de l'architecture système Unix à la domotique IoT.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
