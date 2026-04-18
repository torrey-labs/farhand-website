import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Robotics Labs',
  description:
    'Farhand is the applications arm for robotics foundation-model labs. Run by roboticists. Nationwide technician network. We fill every gap around your model — hardware, software, integration, field operations, and customer service.',
  alternates: { canonical: '/for/robotics-labs' },
  openGraph: {
    title: 'An applications arm for robotics foundation-model labs',
    description:
      'We learn from you. Then we fill every gap around your model — hardware, software, integration, field operations, and customer service.',
    url: 'https://farhand.live/for/robotics-labs',
    siteName: 'Farhand',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'An applications arm for robotics foundation-model labs',
    description:
      'We learn from you. Then we fill every gap around your model — hardware, software, integration, field operations, and customer service.',
  },
};

export default function RoboticsLabsPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* Minimal header — just wordmark, no nav */}
      <header className="py-8 px-6">
        <div className="container max-w-[900px]">
          <Link href="/" className="inline-block">
            <p className="text-accent font-medium text-sm tracking-[0.15em] uppercase">
              Farhand · For Robotics Labs
            </p>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-8 pb-12 md:pb-16">
        <div className="container max-w-[900px]">
          <h1
            className="mb-8 max-w-[820px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
          >
            An applications arm for robotics foundation-model labs.
          </h1>
          <h2 className="max-w-[780px] font-normal">
            We learn from you. Then we fill every gap around your model — hardware, software, integration, field operations, and customer service.
          </h2>
        </div>
      </section>

      {/* Letter body */}
      <section className="pb-16 md:pb-20">
        <div className="container max-w-[900px]">
          <p className="text-light-gray leading-relaxed mb-6 max-w-[720px]">
            We&apos;ve been watching what teams like yours are building. The models are getting real — generalist manipulation, humanoid control, long-horizon mobile work. The hard part was never going to stay the model. It moves outward: to hardware you don&apos;t own, integrations you don&apos;t want to write, customer sites where nobody reads a README, and service calls at 2 a.m. in a factory in Ohio.
          </p>
          <p className="text-light-gray leading-relaxed mb-6 max-w-[720px]">
            There is a long distance between a checkpoint and ten thousand robots doing useful work in the wild. That distance is a different company. It is hands, trucks, installers, failure modes, retrofits, PLCs, safety reviews, firmware rollouts, and a phone number a customer can call. It is the part of the stack labs are not trying to be — and probably shouldn&apos;t try to be.
          </p>
          <p className="text-light-gray leading-relaxed max-w-[720px]">
            We&apos;d like to be that company, for you. Under your guidance. We will learn your model, build application tools around it so your deployments are simple, integrate whatever hardware it runs on, install it at customer sites, and service those customers after. We already do this for robot and machine OEMs in every US zip code. We&apos;d like to do it for foundation-model labs next.
          </p>
        </div>
      </section>

      {/* Three pillars */}
      <section className="pb-16 md:pb-20 border-t border-border pt-16 md:pt-20">
        <div className="container max-w-[900px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h3 className="mb-3 text-foreground" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 400 }}>
                Run by roboticists.
              </h3>
              <p className="text-light-gray leading-relaxed">
                Farhand is built and led by robotics engineers. Your model is the instrument. We&apos;re the hands.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-foreground" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 400 }}>
                Nationwide technician network.
              </h3>
              <p className="text-light-gray leading-relaxed">
                We already service robots and industrial machines across every US zip code. Same infrastructure can deploy, maintain, and collect data for your robots.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-foreground" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 400 }}>
                Application tools, built around you.
              </h3>
              <p className="text-light-gray leading-relaxed">
                We will build the deployment tooling — task editors, teleop capture, eval harnesses, rollout and rollback, telemetry — that turns your checkpoint into something a customer can actually run. Calibrated to your model, not a generic integrator&apos;s.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we take off your plate */}
      <section className="pb-16 md:pb-20 border-t border-border pt-16 md:pt-20">
        <div className="container max-w-[900px]">
          <h3 className="mb-8 text-foreground" style={{ fontWeight: 300 }}>
            What we take off your plate.
          </h3>
          <ul className="space-y-4 max-w-[720px]">
            <li className="text-light-gray leading-relaxed">
              <span className="text-foreground">Hardware</span> — bring-up, integration, retrofits, safety reviews.
            </li>
            <li className="text-light-gray leading-relaxed">
              <span className="text-foreground">Software</span> — deployment stack, eval harnesses, rollout and rollback, observability.
            </li>
            <li className="text-light-gray leading-relaxed">
              <span className="text-foreground">Installation</span> — on-site commissioning at customer locations.
            </li>
            <li className="text-light-gray leading-relaxed">
              <span className="text-foreground">Service</span> — ongoing maintenance, escalations, first-line field response.
            </li>
            <li className="text-light-gray leading-relaxed">
              <span className="text-foreground">Data</span> — in-the-wild collection, under your guidance, on real customer sites.
            </li>
          </ul>
        </div>
      </section>

      {/* How we'd work together */}
      <section className="pb-16 md:pb-20 border-t border-border pt-16 md:pt-20">
        <div className="container max-w-[900px]">
          <h3 className="mb-8 text-foreground" style={{ fontWeight: 300 }}>
            How we&apos;d work together.
          </h3>
          <ol className="space-y-5 max-w-[720px] list-none">
            <li className="text-light-gray leading-relaxed flex gap-4">
              <span className="text-accent font-medium shrink-0">01</span>
              <span>You teach us your model — what it does well, what it doesn&apos;t, how you want it used.</span>
            </li>
            <li className="text-light-gray leading-relaxed flex gap-4">
              <span className="text-accent font-medium shrink-0">02</span>
              <span>We build the application stack around it — tooling, integrations, hardware. Customized to you.</span>
            </li>
            <li className="text-light-gray leading-relaxed flex gap-4">
              <span className="text-accent font-medium shrink-0">03</span>
              <span>We deploy and service at customer sites. Everything we see in the field flows back to you.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Closing + signature */}
      <section className="pb-20 md:pb-28 border-t border-border pt-16 md:pt-20">
        <div className="container max-w-[900px]">
          <p className="text-light-gray leading-relaxed mb-6 max-w-[720px]">
            If any of this is interesting, I&apos;d like to hear what you&apos;re working on and whether there&apos;s a shape here that helps you. No pitch deck, no partner tiers — just a direct conversation between a roboticist and whoever at your lab cares about where the model actually runs.
          </p>
          <p className="text-light-gray leading-relaxed mb-12 max-w-[720px]">
            Write to me directly:{' '}
            <a
              href="mailto:aaryan@farhand.live?subject=Farhand%20%C2%B7%20Applications%20arm%20for%20robotics%20labs"
              className="text-accent"
            >
              aaryan@farhand.live
            </a>
            .
          </p>

          <div className="mt-8">
            <img
              src="/aaryan-signature.svg"
              alt="Aaryan Agrawal"
              className="h-20 md:h-24 w-auto text-foreground mb-4"
              style={{ color: 'var(--color-foreground)' }}
            />
            <p className="text-foreground font-normal m-0">Aaryan Agrawal</p>
            <p className="text-light-gray text-sm m-0">Founder, Farhand</p>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container max-w-[900px] flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <p className="text-foreground font-medium">Farhand</p>
            <p className="text-light-gray text-sm mt-1">AI-guided field service for robotics &amp; machinery.</p>
          </div>
          <div className="text-sm text-light-gray text-left sm:text-right">
            <p><a href="mailto:aaryan@farhand.live" className="text-accent">aaryan@farhand.live</a></p>
            <p className="mt-1">(857) 498-9778</p>
            <p className="mt-1"><a href="https://farhand.live" className="text-accent">farhand.live</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
