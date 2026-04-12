import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
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
      <div id="problem">
        <Problem />
      </div>
      <Relay />
      <FAQSection
        faqs={coreFaqs}
        subtitle="Everything you need to know about AI-guided field service."
      />
      <Footer />
    </main>
  );
}
