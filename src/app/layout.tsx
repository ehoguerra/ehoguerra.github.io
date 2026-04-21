import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Artur Guerra — Full Stack Developer & Product Builder",
  description:
    "Full Stack Developer building real products end-to-end with AI, automation, and intelligent integrations. Specializing in SaaS, healthtech, and enterprise systems.",
  keywords: [
    "Full Stack Developer",
    "Product Builder",
    "AI Engineer",
    "SaaS",
    "Python",
    "FastAPI",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Artur Guerra" }],
  openGraph: {
    title: "Artur Guerra — Full Stack Developer & Product Builder",
    description:
      "Building real products end-to-end with AI, automation, and intelligent integrations.",
    type: "website",
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col overflow-x-hidden bg-[#0A0A0F] text-foreground">
        {children}
      </body>
    </html>
  );
}
