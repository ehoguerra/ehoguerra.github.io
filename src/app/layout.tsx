import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// One family, three voices: the width axis gives expanded nameplates,
// normal reading text and condensed data from the same face.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const SITE_URL = "https://arturguerra.com";
const TITLE = "Artur Guerra — Full Stack Developer & AI Engineer";
const DESCRIPTION =
  "I build real products end to end: multi-tenant SaaS, healthtech and LLM systems running in production, from architecture to deploy.";

/* Impeccable direction contract. Kept as an HTML comment in the built
   markup so the finish review can audit the render against it.
   Static, author-written string: no user input reaches it. */
const CONTRACT = `<!--
THESIS: The site is Artur's production line. Scrolling runs his build process station by station until real products ship. It refuses the dark glowing-blob developer hero and the card-grid resume.
OWN-WORLD: Daylight assembly hall: concrete-grey floor, graphite ink, safety-yellow line and fields; machined alloy plates with screws, black belt rubber, status lamps; Archivo expanded for nameplates, normal for reading.
STORY: A founder or recruiter watches a product get built (architecture, data, API, AI, interface, tests, ship), sees the systems that left the line with real numbers, then emails Artur or takes the CV.
FIRST VIEWPORT: Left: the claim "I build real products end to end." with email and CV actions; right: the 3D line receding diagonally with the finished product at its end; yellow floor line running out of frame.
FORM: Production line, candidate 3 of 7, seed d74f41d2.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e2e3de",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Artur Guerra",
  keywords: [
    "Full Stack Developer",
    "AI Engineer",
    "LLM",
    "SaaS",
    "Python",
    "FastAPI",
    "React",
    "Next.js",
    "React Native",
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
      jobTitle: "Full Stack Developer & AI Engineer",
      email: "mailto:arturpvguerra@gmail.com",
      sameAs: [
        "https://github.com/ehoguerra",
        "https://www.linkedin.com/in/artur-guerra-dev/",
      ],
      knowsAbout: [
        "Full Stack Development",
        "Systems Architecture",
        "LLM Orchestration",
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
    <html lang="en" className={`${archivo.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip bg-floor text-ink">
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
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
