import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove the X-Powered-By header (minor info-leak, no SEO value)
  poweredByHeader: false,

  // Gzip / Brotli at the Next layer — Vercel already does this at the edge, but
  // this helps self-hosted previews + any non-Vercel runtime.
  compress: true,

  // Tree-shake big component libraries to keep the client bundle small.
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "@phosphor-icons/react",
    ],
  },

  // Signature assets moved to a separate Vercel project (farhand-signatures)
  // so signatures keep rendering even if this website is down. These redirects
  // forward any pasted-URL hits on this host (legacy, before cofounders re-paste)
  // to the new resilient host. Once everyone's re-pasted, these can be removed.
  async redirects() {
    return [
      // Domain migration: farhand.live -> farhand.ai (canonical).
      // Both domains are aliases of the same Vercel project, but Next.js
      // matches on the Host header so this only fires when the request
      // came in on farhand.live. SEO juice consolidates onto farhand.ai.
      {
        source: "/:path*",
        has: [{ type: "host", value: "farhand.live" }],
        destination: "https://farhand.ai/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.farhand.live" }],
        destination: "https://farhand.ai/:path*",
        permanent: true,
      },
      // Signature assets moved to a separate Vercel project so signatures
      // keep rendering even if this website is down. Forwards any pasted-URL
      // hits on this host (legacy, before cofounders re-paste) to the new
      // resilient host. Once everyone's re-pasted, these can be removed.
      {
        source: "/email-signature/:path*",
        destination: "https://farhand-signature.vercel.app/email-signature/:path*",
        permanent: true,
      },
      {
        source: "/logo-w-type-light.png",
        destination: "https://farhand-signature.vercel.app/logo-w-type-light.png",
        permanent: true,
      },
    ];
  },

  // Long-lived cache for static/immutable assets served from /public.
  // Vercel already sets these headers for built assets, but explicit is safer
  // when routing through Cloudflare or custom previews.
  async headers() {
    return [
      {
        source: "/:path*.:ext(png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/opengraph-image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/twitter-image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // HSTS: browsers enforce HTTPS for 2 years, include subdomains + preload list
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Cross-origin isolation — mitigates Spectre-class attacks on our own origin
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // Public marketing content — images, OG cards, logos — must be embeddable
          // in external contexts (Gmail image proxy, Slack previews, LinkedIn posts).
          // `same-site` broke Gmail signatures and OG-card fetches with ERR_BLOCKED_BY_RESPONSE.NotSameSite.
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Content Security Policy — reflects the only third parties we actually load:
          // GA4 (googletagmanager + google-analytics), Vercel Analytics + Speed Insights,
          // Cal.com embed, LinkedIn Insight, Meta Pixel (both stubbed), Google Fonts.
          // `'unsafe-inline'` on script-src is required for Next.js inlined JSON-LD blocks;
          // `'unsafe-eval'` is needed by the framer-motion spring solver in dev + prod.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "form-action 'self' https://forms.hsforms.com https://cal.com",
              "frame-ancestors 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
              "img-src 'self' data: blob: https: https://www.google-analytics.com https://*.vercel.com https://*.googleusercontent.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://vercel.live https://app.cal.com https://cal.com https://connect.facebook.net https://snap.licdn.com",
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live https://api.cal.com https://connect.facebook.net https://px.ads.linkedin.com https://*.google.com",
              "frame-src 'self' https://app.cal.com https://cal.com https://www.youtube-nocookie.com https://vercel.live",
              "media-src 'self' blob:",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // Next.js Image optimizer config — AVIF + WebP, long cache.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [],
  },
};

export default nextConfig;
