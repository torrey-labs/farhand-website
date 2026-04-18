import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Robotics Labs',
  description:
    'Farhand is the applications arm for robotics foundation-model labs. Run by roboticists. Nationwide technician network. We fill every gap around your model.',
  alternates: { canonical: '/for/robotics-labs' },
  openGraph: {
    title: 'An applications arm for robotics foundation-model labs',
    description:
      'We learn from you. Then we fill every gap around your model.',
    url: 'https://farhand.live/for/robotics-labs',
    siteName: 'Farhand',
    type: 'article',
    publishedTime: '2026-04-18',
    authors: ['Aaryan Agrawal'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'An applications arm for robotics foundation-model labs',
    description: 'We learn from you. Then we fill every gap around your model.',
  },
};

const SECTION_MARK =
  'text-accent text-[10px] md:text-xs tracking-[0.22em] uppercase mb-3 md:mb-4';

// Subtle paper-grain background as an inline SVG data URI (no extra file).
const PAPER_GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/>
    </svg>`
  );

export default function RoboticsLabsPage() {
  return (
    <main className="bg-background min-h-screen relative">
      {/* Paper-grain overlay */}
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

      {/* Drop-cap styling scoped to first letter inside data-dropcap */}
      <style>{`
        [data-dropcap]::first-letter {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          font-size: 4.2em;
          float: left;
          line-height: 0.9;
          padding-right: 0.08em;
          padding-top: 0.05em;
          color: var(--color-foreground);
        }
      `}</style>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-8 px-6">
          <div className="container max-w-[900px] flex items-center justify-between">
            <Link href="/" className="inline-block">
              <p className="text-accent font-medium text-sm tracking-[0.15em] uppercase">
                Farhand
              </p>
            </Link>
            <p className="text-light-gray/60 text-xs md:text-sm tracking-[0.22em] uppercase">
              April 2026
            </p>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-10 md:pt-16 pb-10 md:pb-14">
          <div className="container max-w-[900px]">
            <div className="w-24 h-px bg-border mb-10 md:mb-12" aria-hidden="true" />
            <h1
              className="mb-6 max-w-[820px]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.025em',
              }}
            >
              An applications arm for robotics foundation-model labs.
            </h1>
            <p
              className="text-light-gray/70 text-base md:text-lg mb-8"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              by Aaryan Agrawal · Farhand
            </p>
            <h2
              className="max-w-[760px] font-normal"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              We learn from you. Then we fill every gap around your model.
            </h2>
          </div>
        </section>

        {/* Letter body */}
        <section className="pb-14 md:pb-20">
          <div className="container max-w-[900px]">
            <p
              data-dropcap
              className="text-light-gray leading-[1.75] text-lg md:text-xl mb-6 max-w-[720px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              We&apos;ve been watching what teams like yours are building. The models are getting real. The hard part moves outward — to hardware you don&apos;t own, integrations you don&apos;t want to write, and service calls at 2 a.m. in an Ohio factory.
            </p>
            <p
              className="text-light-gray leading-[1.75] text-lg md:text-xl max-w-[720px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              We&apos;d like to be the company that handles all of that, for you — under your guidance. We already do it for robot and machine OEMs in every US zip code. We&apos;d like to do it for foundation-model labs next.
            </p>
          </div>
        </section>

        {/* Three pillars */}
        <section className="pb-14 md:pb-20 border-t border-border pt-14 md:pt-20">
          <div className="container max-w-[900px]">
            <p className={SECTION_MARK}>§ I.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              <div>
                <h3
                  className="mb-3 text-foreground"
                  style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', fontWeight: 500 }}
                >
                  Built by roboticists.
                </h3>
                <p
                  className="text-light-gray leading-relaxed"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Your model is the instrument. We&apos;re the hands.
                </p>
              </div>
              <div>
                <h3
                  className="mb-3 text-foreground"
                  style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', fontWeight: 500 }}
                >
                  Nationwide tech network.
                </h3>
                <p
                  className="text-light-gray leading-relaxed"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  1,700+ techs across every US zip code — already deploying and servicing robots.
                </p>
              </div>
              <div>
                <h3
                  className="mb-3 text-foreground"
                  style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', fontWeight: 500 }}
                >
                  Tools built around you.
                </h3>
                <p
                  className="text-light-gray leading-relaxed"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Task editors, teleop capture, eval harnesses, rollout and rollback — calibrated to your stack.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What we take off your plate */}
        <section className="pb-14 md:pb-20 border-t border-border pt-14 md:pt-20">
          <div className="container max-w-[900px]">
            <p className={SECTION_MARK}>§ II.</p>
            <h3
              className="mb-8 text-foreground"
              style={{ fontWeight: 300, fontSize: 'clamp(1.4rem, 3vw, 1.875rem)' }}
            >
              What we take off your plate.
            </h3>
            <ul className="space-y-3 max-w-[720px]" style={{ fontFamily: 'var(--font-serif)' }}>
              <li className="text-light-gray leading-relaxed">
                <span className="text-foreground">Hardware</span> — bring-up, integration, retrofits, safety.
              </li>
              <li className="text-light-gray leading-relaxed">
                <span className="text-foreground">Software</span> — deployment stack, eval harnesses, observability.
              </li>
              <li className="text-light-gray leading-relaxed">
                <span className="text-foreground">Installation</span> — on-site commissioning.
              </li>
              <li className="text-light-gray leading-relaxed">
                <span className="text-foreground">Service</span> — maintenance, escalations, field response.
              </li>
              <li className="text-light-gray leading-relaxed">
                <span className="text-foreground">Data</span> — in-the-wild collection, under your guidance.
              </li>
            </ul>
          </div>
        </section>

        {/* Closing + signature */}
        <section className="pb-16 md:pb-24 border-t border-border pt-14 md:pt-20">
          <div className="container max-w-[900px]">
            <p className={SECTION_MARK}>§ III.</p>
            <p
              className="text-light-gray leading-[1.75] text-lg md:text-xl mb-6 max-w-[720px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              If any of this is interesting, write to me. No pitch deck, no partner tiers — just a conversation.
            </p>
            <p
              className="text-light-gray leading-[1.75] text-lg md:text-xl mb-12 max-w-[720px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              <a
                href="mailto:aaryan@farhand.live?subject=Farhand%20%C2%B7%20Applications%20arm%20for%20robotics%20labs"
                className="text-accent"
              >
                aaryan@farhand.live
              </a>
            </p>

            <div className="mt-8">
              <img
                src="/aaryan-signature.svg"
                alt="Aaryan Agrawal"
                className="h-20 md:h-24 w-auto mb-4"
              />
              <p className="text-foreground font-normal m-0">Aaryan Agrawal</p>
              <p className="text-light-gray text-sm m-0">Founder, Farhand · April 2026</p>
            </div>

            {/* Footnote */}
            <div className="mt-16 md:mt-20 pt-6 border-t border-border max-w-[720px]">
              <p
                className="text-xs text-light-gray/55 leading-relaxed"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                <sup className="mr-1">1</sup>
                Farhand — SF-based, field service for robots. Nationwide technicians and AI tooling.
                Written for BD and applications teams at foundation-model labs.
              </p>
            </div>
          </div>
        </section>

        {/* Minimal footer */}
        <footer className="py-10 px-6 border-t border-border">
          <div className="container max-w-[900px] flex flex-col sm:flex-row justify-between items-start gap-4">
            <p className="text-light-gray/60 text-xs tracking-[0.22em] uppercase">
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
