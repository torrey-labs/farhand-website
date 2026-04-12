import BlogPost from '@/components/BlogPost';
import ArticleSchema from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata = {
  title: '1 in 3 Service Issues Can Be Resolved Without Sending Anyone',
  description: '1 in 5 cases could be resolved remotely but still get a truck roll. AI + phone = fixed. Here\'s how remote resolution works.',
};

export default function Post() {
  return (
    <>
      <ArticleSchema slug="remote-resolution-field-service" />
      <BlogPost
      title="1 in 3 Service Issues Can Be Resolved Without Sending Anyone"
      date="April 8, 2026"
      category="Technology"
    >
      <p>
        <strong>1 in 5 cases could be resolved remotely but still get a truck roll.</strong> That&apos;s a fifth of all service dispatches that didn&apos;t need to happen. The technician drives to the site, diagnoses the issue, and realizes it could have been fixed over the phone with the right guidance.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>The cost of unnecessary truck rolls</h2>
      <p>
        Every truck roll costs hundreds of dollars — fuel, labor, opportunity cost, customer downtime. When <strong>14% of onsite visits are completely unnecessary</strong>, you&apos;re burning cash on logistics that add zero value.
      </p>
      <p>
        But the real cost isn&apos;t the truck roll itself. It&apos;s the delay. While your technician is driving to an issue that could have been resolved remotely, another customer with a genuine emergency waits. Response times lengthen. SLAs slip. Satisfaction drops.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>How AI enables remote resolution</h2>
      <p>
        The key to remote resolution is <strong>accurate diagnosis without physical presence</strong>. That requires knowing the exact machine, its configuration, its history, and its current symptoms. Without AI, this knowledge lives in a senior tech&apos;s head — and they&apos;re probably busy on another job.
      </p>
      <p>
        With AI-guided service, the diagnostic knowledge is always available. A customer calls in. The AI instantly pulls up the machine&apos;s full documentation, service history, and common failure patterns. The phone support agent — guided by AI — walks the customer through a resolution.
      </p>
      <p>
        <strong>1 in 3 service queries can be resolved this way.</strong> AI + phone = fixed.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>When you do need to send someone</h2>
      <p>
        Remote resolution handles the easy-to-medium cases. But when you do need boots on the ground, AI still helps. The remote triage has already identified the problem, the likely root cause, and the parts needed. The technician arrives pre-briefed. First-time fix rates jump to <strong>86%</strong>.
      </p>
      <p>
        This is how <Link href="/" style={{ color: 'var(--accent-green)' }}>Farhand</Link> operates. Every service request starts with remote triage through our <Link href="/#relay" style={{ color: 'var(--accent-green)' }}>Relay platform</Link>. We resolve what we can remotely. When on-site service is needed, our technicians arrive with full context.
      </p>
      <p>
        The result: fewer truck rolls, faster resolution, lower costs. For <Link href="/for/oems" style={{ color: 'var(--accent-green)' }}>OEMs</Link> and <Link href="/for/fleet-operators" style={{ color: 'var(--accent-green)' }}>fleet operators</Link>, this means scaling support without scaling headcount.
      </p>

      <p style={{ fontSize: '14px', opacity: 0.5, marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        Sources: Aquant 2025-2026 Field Service Benchmark Reports.
      </p>
    </BlogPost>
  </>
  );
}
