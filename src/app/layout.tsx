import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://arturguerra.com";
const TITLE = "Artur Guerra — Full Stack Developer & Product Builder";
const DESCRIPTION =
  "Full Stack Developer building real products end to end — multi-tenant SaaS, healthtech and automation platforms with AI integrated into every layer.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Artur Guerra — Portfolio",
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
    "Artur Guerra",
  ],
  authors: [{ name: "Artur Guerra", url: SITE_URL }],
  creator: "Artur Guerra",
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Artur Guerra",
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Artur Guerra",
      url: SITE_URL,
      jobTitle: "Full Stack Developer & Product Builder",
      email: "mailto:arturpvguerra@gmail.com",
      sameAs: [
        "https://github.com/ehoguerra",
        "https://www.linkedin.com/in/artur-guerra-dev/",
      ],
      knowsAbout: [
        "Full Stack Development",
        "Systems Architecture",
        "Applied AI",
        "Multi-tenant SaaS",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Artur Guerra Desenvolvimento de Software LTDA",
      legalName: "Artur Guerra Desenvolvimento de Software LTDA",
      taxID: "67.557.039/0001-85",
      url: SITE_URL,
      founder: { "@id": `${SITE_URL}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nova Friburgo",
        addressRegion: "RJ",
        addressCountry: "BR",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full w-full flex-col overflow-x-hidden bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
