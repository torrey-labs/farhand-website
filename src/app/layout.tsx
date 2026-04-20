import type { Metadata } from "next";
import { Inter, DM_Sans, Fraunces } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
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
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://farhand.live"),
  openGraph: {
    title: "Farhand — Your field service partner",
    description: "On-demand Field Service Engineers guided by AI to service your machines like your own guys. Every zip code in the US.",
    url: "https://farhand.live",
    siteName: "Farhand",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhand — Your field service partner",
    description: "On-demand Field Service Engineers guided by AI to service your machines like your own guys.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${serifDisplay.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <meta name="facebook-domain-verification" content="nfla0sjkkzg556b9nwgktdftfas5gk" />
        {/* Google Search Console — paste verification code here after signup */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}
        {/* Bing Webmaster Tools — paste verification code here after signup */}
        {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
        )}
        <link rel="alternate" type="application/rss+xml" title="Farhand Blog" href="/rss.xml" />
        {/* Google Analytics 4 — NEXT_PUBLIC_GA4_MEASUREMENT_ID set in Vercel env */}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');
            `,
              }}
            />
          </>
        )}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Farhand",
              "url": "https://farhand.live",
              "description": "AI-guided Field Service Engineers install & service your robots & machinery at your client sites.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-857-498-9778",
                "email": "aaryan@farhand.live",
                "contactType": "sales",
              },
              "sameAs": [
                "https://www.linkedin.com/company/farhand-robotics/home"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "United States"
              },
              "serviceType": ["Robot Field Service", "AI-Guided Maintenance", "Industrial Equipment Repair", "Medical Equipment Service"]
            })
          }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
