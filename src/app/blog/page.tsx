import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

const posts = [
  {
    slug: 'ai-guided-field-service-robots',
    title: 'AI-Guided Field Service for Robots: Why the Old Model is Broken',
    excerpt: '1 in 7 onsite service visits is completely unnecessary. A failed first visit adds 2 more visits and 14 extra days. AI changes everything.',
    date: '2026-04-10',
    category: 'Industry',
  },
  {
    slug: 'field-service-skills-gap',
    title: 'The Field Service Skills Gap Is Costing You Millions',
    excerpt: 'Bottom-performing techs cost 97% more than top performers. The skills gap between your best and worst techs is the biggest hidden cost in field service.',
    date: '2026-04-09',
    category: 'Insights',
  },
  {
    slug: 'remote-resolution-field-service',
    title: '1 in 3 Service Issues Can Be Resolved Without Sending Anyone',
    excerpt: '1 in 5 cases could be resolved remotely but still get a truck roll. AI + phone = fixed. Here\'s how remote resolution works.',
    date: '2026-04-08',
    category: 'Technology',
  },
  {
    slug: 'knowledge-preservation-field-service',
    title: 'Your Senior Tech Is Retiring. Is Their Knowledge Retiring Too?',
    excerpt: 'Capture what your senior techs know before they leave. Make it searchable. New tech performs like a 10-year veteran on day one.',
    date: '2026-04-07',
    category: 'Insights',
  },
  {
    slug: 'first-time-fix-rate-ai',
    title: 'How AI Pushes First-Time Fix Rates from 53% to 86%',
    excerpt: 'Top teams achieve 86% first-time fix rate. Bottom teams: 53%. The difference is knowledge access. AI closes the gap.',
    date: '2026-04-06',
    category: 'Technology',
  },
];

export const metadata = {
  title: 'Blog',
  description: 'Insights on AI-guided field service, robot maintenance, and the future of industrial service operations.',
};

export default function BlogPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      <Navigation />

      <section style={{ padding: 'clamp(8rem, 15vw, 12rem) 0 clamp(3rem, 8vw, 5rem)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1rem' }}>Blog</h1>
          <h2 style={{ maxWidth: '600px', margin: '0 auto' }}>
            Insights on AI-guided field service and the future of industrial operations.
          </h2>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {posts.map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}`}
              style={{
                display: 'block',
                padding: '2rem 0',
                borderBottom: '1px solid var(--border-color)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '13px', color: 'var(--accent-green)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {post.category}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--light-gray)', opacity: 0.5 }}>
                  {post.date}
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 500, marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {post.title}
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--light-gray)', opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
