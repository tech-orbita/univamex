import type { Metadata } from "next";
import { FacebookPixel } from "@/components/facebook-pixel";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RouteScrollReset } from "@/components/route-scroll-reset";
import { FloatingWhatsApp } from "@/components/whatsapp-button";
import {
  absoluteUrl,
  canonicalUrl,
  metadataBaseUrl,
  seoConfig,
} from "@/data/seo";
import { siteConfig, socialLinks } from "@/data/site";
import "./globals.css";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: canonicalUrl("/"),
    logo: canonicalUrl(seoConfig.squareLogo),
    image: canonicalUrl(seoConfig.socialImage),
    description: seoConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: socialLinks.map(({ href }) => href),
    areaServed: seoConfig.areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ecatepec de Morelos",
      addressRegion: "Estado de México",
      addressCountry: "MX",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "Admisiones",
      email: siteConfig.email,
      areaServed: "MX",
      availableLanguage: "es-MX",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Oferta académica UNIVAMEX",
      itemListElement: [
        "Bachillerato",
        "Licenciatura",
        "Maestría",
        "Doctorado",
      ].map((level) => ({
        "@type": "OfferCatalog",
        name: level,
        url: canonicalUrl("/oferta-academica"),
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: canonicalUrl("/"),
    inLanguage: "es-MX",
    description: seoConfig.description,
    publisher: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.fullName,
    },
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  applicationName: siteConfig.name,
  category: "education",
  title: {
    default: seoConfig.title,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: seoConfig.squareLogo,
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: seoConfig.squareLogo,
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
  openGraph: {
    title: seoConfig.socialTitle,
    description: seoConfig.socialDescription,
    url: canonicalUrl("/"),
    siteName: siteConfig.name,
    images: [
      {
        url: seoConfig.socialImage,
        width: 1200,
        height: 630,
        alt: "UNIVAMEX, bachilleratos, licenciaturas y posgrados en Ecatepec",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.socialTitle,
    description: seoConfig.socialDescription,
    images: [seoConfig.socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    other: {
      "facebook-domain-verification": "9vup6ff09wu5opvkumee7nabqqf7xq",
    },
  },
  other: {
    "llms-txt": absoluteUrl("/llms.txt"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className="h-full scroll-smooth antialiased"
    >
      <body className="flex min-h-full flex-col">
        <RouteScrollReset />
        <FacebookPixel pixelId="27722412507444476" />
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <div className="contents" id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <FloatingWhatsApp />   
      </body>
    </html>
  );
}



