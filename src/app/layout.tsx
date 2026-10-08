import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";

// GitHub's own face for everything a visitor reads; its width axis gives
// the display voice. JetBrains Mono only where the content is code or a trace.
const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
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
THESIS: Artur's shipped products run live as glass app windows floating in a dusk-lit room; the visitor walks a spatial workspace instead of scanning a static grid of project cards.
OWN-WORLD: Layered Serra Fluminense ridgelines under an indigo-to-ember sky; frosted glass windows with lit rims, 34px corners and grabber pills; each product's accent glowing inside its own window; warm-white pills; Mona Sans across widths, JetBrains Mono only for traces.
STORY: The visitor watches the products work (an AI chat failing over between LLMs, OCR reading a medicine box, a franchise dashboard settling royalties), learns he ships end to end with AI in production, then emails him or takes the CV.
FIRST VIEWPORT: Headline and actions on the left over the sky; four live windows arced across the right two-thirds at staggered depths, Vivi largest in front; ridges below; the pointer tilts the room.
FORM: Spatial workspace, candidate 1 of 7, seed 87648a41.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080f",
  colorScheme: "dark",
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
    <html lang="en" className={`${mona.variable} ${mono.variable}`}>
      <body className="min-h-dvh overflow-x-clip bg-night text-ink">
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
