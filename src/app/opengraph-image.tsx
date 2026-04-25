import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Farhand — Your field service partner. AI-guided Field Service Engineers servicing robots and industrial machinery across every US zip code.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#08070E',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* top: wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: '#16a34a',
              boxShadow: '0 0 24px #16a34a',
            }}
          />
          <span>farhand</span>
        </div>

        {/* spacer */}
        <div style={{ flex: 1 }} />

        {/* main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}
        >
          <span>Your field service</span>
          <span style={{ color: '#16a34a' }}>partner.</span>
        </div>

        {/* subhead */}
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            fontWeight: 400,
            color: '#bcbcbc',
            lineHeight: 1.3,
            maxWidth: 960,
          }}
        >
          AI-guided Field Service Engineers. Robots &amp; industrial machinery, every US zip code.
        </div>

        {/* footer strip */}
        <div
          style={{
            marginTop: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#888',
          }}
        >
          <span>farhand.live</span>
          <span style={{ color: '#16a34a' }}>●&nbsp;&nbsp;on-demand</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
