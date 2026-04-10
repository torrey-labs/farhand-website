import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Relay from '@/components/Relay';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <Problem />
      <Relay />
      <Footer />
    </main>
  );
}
