import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedOn from '@/components/FeaturedOn';
import CoverageMap from '@/components/CoverageMap';
import Problem from '@/components/Problem';
import Relay from '@/components/Relay';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { coreFaqs } from '@/data/faqs';

export default function Home() {
  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      <Navigation />
      <Hero />

      {/* Signature tagline — short section under the hero */}
      <section className="bg-background py-6 md:py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-sm md:text-base text-light-gray/70 leading-relaxed">
            Designed by SF-based roboticists
            <br />
            For the robots of{' '}
            <span className="line-through opacity-50">tomorrow</span>{' '}
            <span className="text-accent">today</span>
          </p>
        </div>
      </section>

      <FeaturedOn
        logos={[
          { src: '/press/arm-institute.svg', alt: 'ARM Institute', height: 44 },
          {
            src: '/press/field-service-next-west.png',
            alt: 'Field Service Next West',
            height: 44,
            filter: 'brightness(0) invert(1)',
            href: 'https://fieldserviceusa.wbresearch.com/',
            title: 'Field Service Next West — WBR\'s 2026 service & support conference',
          },
        ]}
      />

      <div id="problem">
        <Problem />
      </div>

      <Relay />

      <CoverageMap />

      <FAQSection
        faqs={coreFaqs}
        subtitle="Everything you need to know about AI-guided field service."
      />

      <Footer />
    </main>
  );
}
