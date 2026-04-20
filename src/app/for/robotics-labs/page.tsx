import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Robotics Frontier Labs',
  description:
    'Farhand is the applications arm for robotics frontier labs. We learn from you and help apply your models at scale.',
  alternates: { canonical: '/for/robotics-labs' },
  openGraph: {
    title: 'An applications arm for robotics frontier labs',
    description: 'We learn from you and help apply your models at scale.',
    url: 'https://farhand.live/for/robotics-labs',
    siteName: 'Farhand',
    type: 'article',
    publishedTime: '2026-04-18',
    authors: ['Aaryan Agrawal'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'An applications arm for robotics frontier labs',
    description: 'We learn from you and help apply your models at scale.',
  },
};

const PAPER_GRAIN_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/>
    </svg>`
  );

type PillarProps = {
  title: string;
  body: string;
  href?: string;
};

function Pillar({ title, body, href }: PillarProps) {
  const inner = (
    <>
      <h3
        className="mb-2 text-foreground"
        style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.2rem)', fontWeight: 500 }}
      >
        {title}
        {href && <span className="text-accent ml-1.5 text-sm">↗</span>}
      </h3>
      <p
        className="text-light-gray leading-snug text-sm md:text-base m-0"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {body}
      </p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block hover:opacity-80 transition-opacity"
      >
        {inner}
      </Link>
    );
  }
  return <div>{inner}</div>;
}

export default function RoboticsLabsPage() {
  return (
    <main className="bg-background min-h-screen relative">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `url("${PAPER_GRAIN_SVG}")`,
          backgroundSize: '240px 240px',
          opacity: 0.035,
          mixBlendMode: 'screen',
        }}
      />

      <style>{`
        [data-dropcap]::first-letter {
          font-family: var(--font-serif);
          font-style: normal;
          font-weight: 500;
          font-size: 3.2em;
          float: left;
          line-height: 0.95;
          padding-right: 0.12em;
          padding-top: 0.1em;
          color: var(--color-foreground);
        }
      `}</style>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-4 md:py-5 px-6">
          <div className="container max-w-[900px] flex items-center justify-between">
            <Link href="/" className="inline-block">
              <p className="text-accent font-medium text-sm tracking-[0.15em]">
                Farhand
              </p>
            </Link>
            <p className="text-light-gray/60 text-xs md:text-sm tracking-[0.22em]">
              April 2026
            </p>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-4 md:pt-8 pb-3 md:pb-6">
          <div className="container max-w-[900px]">
            <div className="w-24 h-px bg-border mb-4 md:mb-6" aria-hidden="true" />
            <h1
              className="mb-3 max-w-[780px]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(1.85rem, 5vw, 44px)',
                lineHeight: 1.15,
              }}
            >
              An applications arm for robotics frontier labs.
            </h1>
            <p
              className="text-light-gray/70 text-sm md:text-base mb-4"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              by Aaryan Agrawal · Farhand
            </p>
            <h2
              className="max-w-[720px] font-normal"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 2.3vw, 1.4rem)',
                lineHeight: 1.4,
              }}
            >
              We learn from you and help apply your models at scale.
            </h2>
          </div>
        </section>

        {/* Letter body — one tight paragraph */}
        <section className="pb-6 md:pb-10">
          <div className="container max-w-[900px]">
            <p
              data-dropcap
              className="text-light-gray text-base md:text-lg max-w-[720px] m-0"
              style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.6 }}
            >
              The models are getting real. The hard part moves outward — to hardware, integrations, and service calls you don&apos;t want to own. We&apos;d like to handle it all. Under your guidance.
            </p>
          </div>
        </section>

        {/* Three pillars */}
        <section className="py-6 md:py-10 border-t border-border">
          <div className="container max-w-[900px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
              <Pillar
                title="Built by roboticists."
                body="Your model is the instrument. We're the hands."
              />
              <Pillar
                title="Nationwide tech network."
                body="2,100+ techs in every US zip code."
                href="/"
              />
              <Pillar
                title="Tools built around you."
                body="Learns your robots. Guides your techs. Every call logs back."
                href="/relay"
              />
            </div>
          </div>
        </section>

        {/* Closing + signature */}
        <section className="py-6 md:py-10 border-t border-border">
          <div className="container max-w-[900px]">
            <p
              className="text-light-gray text-base md:text-lg mb-4 max-w-[720px]"
              style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.6 }}
            >
              If any of this is interesting,{' '}
              <a
                href="mailto:aaryan@farhand.live?subject=Farhand%20%C2%B7%20Applications%20arm%20for%20robotics%20labs"
                className="text-accent"
              >
                drop your email here
              </a>
              .
            </p>

            <div className="mt-4">
              <img
                src="/aaryan-signature.svg"
                alt="Aaryan Agrawal"
                className="h-12 md:h-16 w-auto mb-3"
              />
              <p className="text-foreground font-normal m-0 text-sm md:text-base">
                Aaryan Agrawal
              </p>
              <p className="text-light-gray text-xs md:text-sm m-0">
                Founder, Farhand · April 2026
              </p>
            </div>

            {/* Footnote */}
            <div className="mt-6 md:mt-10 pt-4 border-t border-border max-w-[720px]">
              <p
                className="text-xs text-light-gray/55 leading-relaxed m-0"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                <sup className="mr-1">1</sup>
                Farhand — SF-based, field service for robots. Nationwide Field Service Engineers and AI tooling. Written for BD and applications teams at frontier labs.
              </p>
            </div>
          </div>
        </section>

        {/* Minimal footer */}
        <footer className="py-5 px-6 border-t border-border">
          <div className="container max-w-[900px] flex flex-col sm:flex-row justify-between items-start gap-3">
            <p className="text-light-gray/60 text-xs tracking-[0.22em]">
              Farhand · April 2026
            </p>
            <div className="text-xs text-light-gray/60 text-left sm:text-right space-x-3">
              <a href="mailto:aaryan@farhand.live" className="text-accent">aaryan@farhand.live</a>
              <span>·</span>
              <a href="https://farhand.live" className="text-accent">farhand.live</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
