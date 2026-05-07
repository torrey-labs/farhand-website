import type { Metadata } from "next";
import { Inter, DM_Sans, Fraunces } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

// Fraunces is a modern geometric serif — closest Google Fonts match to Bespoke Serif
const serifDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
});

export const metadata: Metadata = {
  title: {
    default: "Farhand | Your field service partner",
    template: "%s | Farhand",
  },
  description: "AI-guided Field Service Engineers install & service your robots & machinery at your client sites. On-demand field service across every zip code in the US.",
  applicationName: "Farhand",
  authors: [{ name: "Aaryan Agrawal", url: "https://farhand.ai" }],
  creator: "Farhand Robotics",
  publisher: "Farhand Robotics",
  keywords: [
    "field service",
    "AI field service",
    "industrial robots",
    "robot repair",
    "robot maintenance",
    "FANUC service",
    "ABB service",
    "KUKA service",
    "Yaskawa service",
    "industrial machinery service",
    "on-demand technicians",
    "robotics commissioning",
    "field service engineers",
    "PLC troubleshooting",
    "Relay AI",
  ],
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
  },
  metadataBase: new URL("https://farhand.ai"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Farhand — Your field service partner",
    description: "AI-guided Field Service Engineers. On-demand industrial robot & machinery service across every US zip code.",
    url: "https://farhand.ai",
    siteName: "Farhand",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhand — Your field service partner",
    description: "AI-guided Field Service Engineers. On-demand industrial robot & machinery service across every US zip code.",
    creator: "@aboutaaryan",
    site: "@far__hand",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
};

export const viewport: import("next").Viewport = {
  themeColor: "#08070E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${serifDisplay.variable} ${inter.variable}`}>
      <head>
        <meta name="facebook-domain-verification" content="nfla0sjkkzg556b9nwgktdftfas5gk" />
        {/* Google Search Console — paste verification code here after signup */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}
        {/* Bing Webmaster Tools — paste verification code here after signup */}
        {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
        )}
        {/* Preconnect hints for 3rd parties — reduces connection latency for tags below */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="alternate" type="application/rss+xml" title="Farhand Blog" href="/rss.xml" />
        {/* LinkedIn Insight Tag — NEXT_PUBLIC_LINKEDIN_PARTNER_ID set in Vercel env */}
        {process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `_linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
              }}
            />
            <script
              async
              src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
            />
          </>
        )}
        {/* Meta Pixel — NEXT_PUBLIC_META_PIXEL_ID set in Vercel env */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
        {/* Organization schema — rich-result signal for Google, Bing, LinkedIn preview */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              // Multi-typed: Organization + ProfessionalService (a LocalBusiness
              // subtype Google recognizes for service-area businesses that come
              // to the customer rather than the other way around).
              "@type": ["Organization", "ProfessionalService"],
              "@id": "https://farhand.ai/#organization",
              "name": "Farhand",
              "legalName": "XEngineering, LLC",
              "alternateName": ["Farhand Robotics", "Farhand Service"],
              "url": "https://farhand.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://farhand.ai/logo-w-type-light-on-dark.png",
                "width": 512,
                "height": 128,
              },
              "image": "https://farhand.ai/opengraph-image",
              "description": "AI-guided Field Service Engineers install & service your robots & machinery at your client sites.",
              "foundingDate": "2026",
              "founder": {
                "@type": "Person",
                "name": "Aaryan Agrawal",
                "url": "https://www.linkedin.com/in/aaaryan",
                "jobTitle": "Founder & CEO",
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "16192 Coastal Highway",
                "addressLocality": "Lewes",
                "addressRegion": "DE",
                "postalCode": "19958",
                "addressCountry": "US",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 38.7745,
                "longitude": -75.1394,
              },
              // Service-area business — not a storefront customers visit.
              // areaServed is the entire US; we dispatch from the closest hub.
              "areaServed": {
                "@type": "Country",
                "name": "United States",
                "@id": "https://www.wikidata.org/wiki/Q30",
              },
              "serviceArea": {
                "@type": "GeoShape",
                "name": "United States",
                "addressCountry": "US",
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  "opens": "00:00",
                  "closes": "23:59",
                  "description": "On-demand dispatch — emergency response 24/7 with weekday business-hours support.",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday", "Sunday"],
                  "opens": "00:00",
                  "closes": "23:59",
                  "description": "Emergency dispatch only on weekends.",
                },
              ],
              "priceRange": "$$",
              "paymentAccepted": ["Invoice", "ACH", "Wire Transfer", "Credit Card"],
              "currenciesAccepted": "USD",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-857-498-9778",
                  "email": "aaryan@farhand.live",
                  "contactType": "sales",
                  "areaServed": "US",
                  "availableLanguage": ["English"],
                },
                {
                  "@type": "ContactPoint",
                  "email": "field@farhand.live",
                  "contactType": "customer support",
                  "areaServed": "US",
                },
              ],
              "sameAs": [
                "https://www.linkedin.com/company/farhand-robotics",
                "https://x.com/far__hand",
                // Add as profiles get claimed:
                // "https://github.com/farhand-live",
                // "https://www.crunchbase.com/organization/farhand",
                // "https://www.producthunt.com/products/farhand",
                // "https://www.f6s.com/farhand",
                // "https://www.facebook.com/farhand",
                // "https://www.instagram.com/farhand",
                // "https://www.youtube.com/@farhand",
              ],
              "knowsAbout": [
                "Industrial Robotics",
                "Field Service Management",
                "FANUC",
                "ABB Robotics",
                "KUKA",
                "Yaskawa Motoman",
                "Universal Robots",
                "Rockwell Automation",
                "Siemens",
                "Mitsubishi Electric",
                "Omron",
                "Stäubli",
                "Kawasaki Robotics",
                "Mazak",
                "DMG Mori",
                "PLC Troubleshooting",
                "Industrial AI",
                "Predictive Maintenance",
                "AMRs (Autonomous Mobile Robots)",
                "AGVs (Automated Guided Vehicles)",
                "Cobots (Collaborative Robots)",
                "Humanoid Robots",
                "ASRS (Automated Storage and Retrieval Systems)",
                "Robotic Arms",
              ],
              "serviceType": [
                "Robot Field Service",
                "AI-Guided Maintenance",
                "Industrial Equipment Repair",
                "Medical Equipment Service",
                "Robot Commissioning",
                "Robot Installation",
                "Site Mapping",
                "Site Testing",
                "Break/Fix Service",
                "Customer Training",
                "Spare Parts",
                "PLC Programming",
                "Preventive Maintenance",
                "Robot Calibration",
                "Vision System Integration",
                "End-of-Arm Tooling",
                "Robot Relocation",
                "Cobot Deployment",
                "White-Labelled Field Service",
              ],
              "slogan": "Your field service partner. Every US zip code.",
              "knowsLanguage": ["English"],
            }),
          }}
        />
        {/* WebSite schema — enables Google sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://farhand.ai/#website",
              "url": "https://farhand.ai",
              "name": "Farhand",
              "description": "AI-guided Field Service Engineers for robots and industrial machinery.",
              "publisher": { "@id": "https://farhand.ai/#organization" },
              "inLanguage": "en-US",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://farhand.ai/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
