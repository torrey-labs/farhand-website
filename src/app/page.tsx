import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedOn from '@/components/FeaturedOn';
import Problem from '@/components/Problem';
import Relay from '@/components/Relay';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import { coreFaqs } from '@/data/faqs';

export default function Home() {
  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <FeaturedOn
        logos={[
          { src: '/press/arm-institute.png', alt: 'ARM Institute', height: 64 },
          { src: '/press/field-service-next-west.png', alt: 'Field Service Next West', height: 36 },
        ]}
      />
      <div id="problem">
        <Problem />
      </div>
      <Relay />
      <FAQSection
        faqs={coreFaqs}
        subtitle="Everything you need to know about AI-guided field service."
      />
      <NewsletterSignup />
      <Footer />
    </main>
  );
}
