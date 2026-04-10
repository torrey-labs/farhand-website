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
  title: "FARHAND | Your field service partner",
  description: "AI-guided technicians install & service your robots & machinery at your client sites.",
  icons: {
    icon: "/favicon.svg",
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
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.setAttribute('nowprocket', '');
                script.setAttribute('nitro-exclude', '');
                script.type = 'text/javascript';
                script.id = 'sa-dynamic-optimization';
                script.dataset.uuid = 'c3ddc202-592a-4afa-b651-4fdef43e7e20';
                script.src = 'data:text/javascript;base64,dmFyIHNjcm1wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcm1wdCIpO3Njcm1wdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnN1ZXRBdHRyaWJ1dGUoZsgibml0cm8tZXhjbHVkZSIsiICIIkTtzY3JpCHQuc3JjID0gImh0dHBzOi8vZGFzaJVYXJkLnN1YXJjaGF0bGFzLmNvbS9zY3JpCHRuL2R5bmFtaW5fb3B0aW1pemF0aW9uLmpzIjtzy3JpCHQuZGF0YXNlc51dWlkID0gImMzZGRjMjAyLTU5MmEtNGFmYS1iNjUxLTRmZGVmNDN1N2UyMCI7c2NyAXB0LmlkID0gInNhLWR5bmFtaWmtb3B0aW1pemF0aW9uLWxvYWR1ciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpCHQpOw==';
                document.head.appendChild(script);
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
