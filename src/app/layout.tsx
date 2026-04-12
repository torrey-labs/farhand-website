import type { Metadata } from "next";
import { Inter, DM_Sans, Playfair_Display } from "next/font/google";
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

// Playfair Display is an elegant serif close to Bespoke Serif
const serifDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-display",
});

export const metadata: Metadata = {
  title: {
    default: "FARHAND | Your field service partner",
    template: "%s | Farhand",
  },
  description: "AI-guided technicians install & service your robots & machinery at your client sites. On-demand field service across every zip code in the US.",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://farhand.live"),
  openGraph: {
    title: "Farhand — Your field service partner",
    description: "On-demand technicians guided by AI to service your machines like your own guys. Every zip code in the US.",
    url: "https://farhand.live",
    siteName: "Farhand",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhand — Your field service partner",
    description: "On-demand technicians guided by AI to service your machines like your own guys.",
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
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="nfla0sjkkzg556b9nwgktdftfas5gk" />
        <link rel="alternate" type="application/rss+xml" title="Farhand Blog" href="/rss.xml" />
        {/* Google Analytics 4 — replace G-XXXXXXXXXX with your GA4 measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Farhand",
              "url": "https://farhand.live",
              "description": "AI-guided technicians install & service your robots & machinery at your client sites.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var s = document.createElement('script');
                s.setAttribute('nowprocket', '');
                s.setAttribute('nitro-exclude', '');
                s.src = 'https://dashboard.searchatlas.com/scripts/dynamic_optimization.js';
                s.dataset.uuid = 'c3ddc202-592a-4afa-b651-4fdef43e7e20';
                s.id = 'sa-dynamic-optimization-loader';
                document.head.appendChild(s);
              })();
            `
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${serifDisplay.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
