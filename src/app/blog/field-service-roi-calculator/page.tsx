import BlogPost from '@/components/BlogPost';
import ArticleSchema from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata = {
  title: 'How to Calculate Field Service ROI in 2026',
  description: 'A practical framework for calculating field service ROI: truck roll costs, first-time fix rates, downtime savings, and the AI multiplier.',
};

export default function Post() {
  return (
    <>
      <ArticleSchema slug="field-service-roi-calculator" />
      <BlogPost
      title="How to Calculate Field Service ROI in 2026"
      date="April 12, 2026"
      category="Insights"
    >
      <p>
        Field service leaders know the category is expensive. What they struggle to articulate — to CFOs, to boards, to procurement — is the return. Here&apos;s a framework for calculating field service ROI that actually holds up in a budget meeting.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>Start with the truck roll</h2>
      <p>
        The industry-standard figure for a single truck roll is <strong>$500 to $1,000</strong>, depending on region and equipment. Aquant benchmarks put it at <strong>$732 on average</strong> once you include labor, vehicle, parts staging, and dispatch overhead. Multiply that by your annual visit count and you have your denominator.
      </p>
      <p>
        Now layer in the <strong>1 in 7 unnecessary visits</strong> that Aquant&apos;s 2025-2026 field service report identifies. For a fleet doing 10,000 visits per year, that&apos;s ~1,430 truck rolls — roughly <strong>$1M per year</strong> — that never needed to happen.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>The first-time fix multiplier</h2>
      <p>
        A failed first visit doesn&apos;t cost 1x — it costs 3x. Service Council data shows a failed first visit adds <strong>2 more visits and 14 extra days</strong> to resolution. If your first-time fix rate is 53% (bottom quartile) vs 86% (top quartile), you&apos;re paying 1.6x more per resolved ticket.
      </p>
      <p>
        For a <Link href="/for/fleet-operators" style={{ color: 'var(--accent-green)' }}>fleet operator</Link> with 5,000 annual tickets, moving from 53% → 86% saves roughly <strong>$2.4M per year</strong> in repeat-visit labor alone.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>Downtime is the iceberg</h2>
      <p>
        Truck rolls are visible. Downtime is the part under the water. Siemens pegs the global cost of unplanned downtime at <strong>$1.4 trillion annually</strong>. For a single automotive plant, one hour of line-down can exceed <strong>$2.3M</strong>. Every hour you shave off mean-time-to-repair is direct margin.
      </p>
      <p>
        When calculating ROI, don&apos;t just count service costs. Count the production hours you recovered. For <Link href="/for/facilities" style={{ color: 'var(--accent-green)' }}>facilities</Link> running high-throughput lines, the downtime savings often dwarf the service savings by 5-10x.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>The AI multiplier</h2>
      <p>
        Service Council&apos;s 2025 State of AI report shows organizations deploying AI-guided workflows see <strong>39% faster resolution</strong>, <strong>21% accuracy gains</strong>, and first-time fix rates climbing 20+ points. Those aren&apos;t independent improvements — they compound.
      </p>
      <p>
        The <Link href="/services/robots" style={{ color: 'var(--accent-green)' }}>AI-guided service</Link> ROI formula looks like this: (truck rolls avoided × cost per roll) + (repeat visits eliminated × cost per visit) + (downtime hours recovered × cost per hour) − (platform cost). For most mid-sized fleets, the payback window is 4-6 months.
      </p>

      <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>Build the case</h2>
      <p>
        Don&apos;t walk into a budget meeting with a line item. Walk in with a model: current state costs, target state costs, and the path between them. At <Link href="/" style={{ color: 'var(--accent-green)' }}>Farhand</Link>, we help service leaders build these models from their own data — truck rolls, fix rates, downtime hours — so the ROI is defensible, not theoretical.
      </p>

      <p style={{ fontSize: '14px', opacity: 0.5, marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        Sources: Aquant 2025-2026 Field Service Benchmark, Siemens True Cost of Downtime 2024, Service Council 2025 State of AI, IFR World Robotics.
      </p>
    </BlogPost>
  </>
  );
}
