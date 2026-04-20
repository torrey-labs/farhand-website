import BlogPost from '@/components/BlogPost';
import ArticleSchema from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata = {
  title: 'Predictive Maintenance vs Preventive Maintenance: Which Wins?',
  description: 'Predictive vs preventive maintenance: the data, the tradeoffs, and which approach actually reduces cost for industrial robot fleets.',
};

export default function Post() {
  return (
    <>
      <ArticleSchema slug="predictive-vs-preventive-maintenance" />
      <BlogPost
      title="Predictive Maintenance vs Preventive Maintenance: Which Wins?"
      date="April 12, 2026"
      category="Technology"
    >
      <p>
        Every vendor pitch slide these days has a chart showing predictive maintenance crushing preventive maintenance on cost. The reality on the ground is more nuanced — and for most <Link href="/for/fleet-operators" style={{ color: 'var(--accent-green)' }}>fleet operators</Link>, the right answer is both.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>Preventive: the calendar approach</h2>
      <p>
        Preventive maintenance (PM) is time-based: every 3 months, change the filter; every 12 months, swap the encoder battery; every 3 years, re-grease the reducer. It&apos;s simple, auditable, and has kept industry running since the 1950s.
      </p>
      <p>
        Downsides: you service things that don&apos;t need it (wasted labor and parts) and you miss failures that happen between intervals. A robot gearbox that fails at month 11 on a 12-month cycle gives you exactly zero warning.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>Predictive: the condition-based approach</h2>
      <p>
        Predictive maintenance (PdM) uses sensor data — vibration, temperature, current draw, acoustic signatures — to forecast failure before it happens. Deloitte&apos;s studies cite <strong>25-30% maintenance cost reduction</strong>, <strong>70-75% fewer breakdowns</strong>, and <strong>35-45% less downtime</strong> for mature PdM programs.
      </p>
      <p>
        Those numbers are real. They&apos;re also hard-won. PdM requires instrumentation, baseline data, anomaly models, and — most importantly — Field Service Engineers who know what to do when the model fires an alert.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>Where PdM falls flat</h2>
      <p>
        We&apos;ve seen plants spend six figures on vibration sensors, then ignore 90% of the alerts because nobody trusts the model. The investment became shelfware.
      </p>
      <p>
        The gap isn&apos;t the sensors — it&apos;s the response loop. When an alert fires, the Field Service Engineer still needs the right context: which part, which procedure, which torque spec, which spare. Without that, PdM just tells you earlier that you&apos;re about to have a bad day.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>The hybrid that actually works</h2>
      <p>
        The highest-performing service orgs we work with run a hybrid:
      </p>
      <ul style={{ fontSize: '17px', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
        <li><strong>PM for wear items:</strong> grease, filters, batteries, belts — calendar-based, because the cost of over-servicing is trivial</li>
        <li><strong>PdM for high-value components:</strong> gearboxes, motors, servo drives — condition-based, because the cost of failure is catastrophic</li>
        <li><strong>AI-guided response:</strong> when either system fires, the Field Service Engineer gets step-by-step instructions from the full service manual, not a 14-character alarm code</li>
      </ul>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>What the numbers say</h2>
      <p>
        Siemens pegs global unplanned downtime at <strong>$1.4 trillion per year</strong>. Aquant&apos;s benchmarks show first-time fix rates of 53% in bottom-quartile teams vs 86% in top-quartile — and a failed first visit adds <strong>2 more visits and 14 extra days</strong>. Neither pure PM nor pure PdM closes that gap. <Link href="/services/robots" style={{ color: 'var(--accent-green)' }}>AI-guided service</Link> does.
      </p>
      <p>
        Service Council&apos;s 2025 State of AI shows AI-guided workflows deliver <strong>39% faster resolution</strong> and <strong>21% accuracy gains</strong>. Combine that with a sane PM/PdM hybrid and you&apos;re operating at the top of the benchmark, not chasing it.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>The Farhand take</h2>
      <p>
        At <Link href="/" style={{ color: 'var(--accent-green)' }}>Farhand</Link>, we don&apos;t sell sensors. We make sure that when one of your sensors — or a Field Service Engineer&apos;s gut — says something&apos;s wrong, the response is fast, informed, and right the first time. That&apos;s the only &quot;which wins&quot; that matters.
      </p>

      <p style={{ fontSize: '14px', opacity: 0.5, marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        Sources: Deloitte Predictive Maintenance studies, Siemens True Cost of Downtime 2024, Aquant 2025-2026 Benchmark, Service Council 2025 State of AI.
      </p>
    </BlogPost>
  </>
  );
}
