import { NextRequest } from 'next/server';

type ApolloOrg = {
  name?: string;
  website_url?: string;
  primary_domain?: string;
  linkedin_url?: string;
  industry?: string;
  estimated_num_employees?: number;
  annual_revenue?: number;
  short_description?: string;
  city?: string;
  state?: string;
  country?: string;
};

type ApolloPerson = {
  name?: string;
  title?: string;
  email?: string;
  linkedin_url?: string;
};

type EnrichmentResult = {
  org: ApolloOrg | null;
  topPeople: ApolloPerson[];
  source: 'apollo' | 'none';
  error?: string;
};

async function enrichViaApollo(company: string): Promise<EnrichmentResult> {
  const key = process.env.APOLLO_API_KEY;
  if (!key) {
    return { org: null, topPeople: [], source: 'none' };
  }
  try {
    // Apollo organizations search — returns best match for a company name.
    const orgRes = await fetch('https://api.apollo.io/v1/organizations/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': key,
      },
      body: JSON.stringify({
        q_organization_name: company,
        page: 1,
        per_page: 1,
      }),
    });

    if (!orgRes.ok) {
      return { org: null, topPeople: [], source: 'none', error: `apollo org ${orgRes.status}` };
    }
    const orgData = await orgRes.json();
    const org: ApolloOrg | null = orgData?.organizations?.[0] ?? null;

    if (!org?.primary_domain) {
      return { org, topPeople: [], source: 'apollo' };
    }

    // Find top people at that company.
    const peopleRes = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': key,
      },
      body: JSON.stringify({
        q_organization_domains: org.primary_domain,
        person_titles: ['CEO', 'Founder', 'VP Engineering', 'VP Product', 'Head of Service', 'Director'],
        page: 1,
        per_page: 5,
      }),
    });

    const peopleData = peopleRes.ok ? await peopleRes.json() : { people: [] };
    const topPeople: ApolloPerson[] = (peopleData?.people ?? []).slice(0, 5);
    return { org, topPeople, source: 'apollo' };
  } catch (err) {
    return { org: null, topPeople: [], source: 'none', error: String(err) };
  }
}

async function storeAsGitHubIssue(
  company: string,
  enrichment: EnrichmentResult,
  meta: Record<string, string>,
) {
  const token = process.env.GITHUB_TOKEN_ISSUES;
  const repo = process.env.GITHUB_ISSUES_REPO || 'AaryanAgrawal/farhand-website';
  if (!token) return { stored: false, reason: 'no GITHUB_TOKEN_ISSUES' };

  const org = enrichment.org;
  const people = enrichment.topPeople;

  const body = [
    `**Company:** ${company}`,
    org?.name && org.name !== company ? `**Apollo match:** ${org.name}` : null,
    org?.primary_domain ? `**Domain:** https://${org.primary_domain}` : null,
    org?.website_url ? `**Website:** ${org.website_url}` : null,
    org?.linkedin_url ? `**LinkedIn:** ${org.linkedin_url}` : null,
    org?.industry ? `**Industry:** ${org.industry}` : null,
    org?.estimated_num_employees ? `**Employees:** ${org.estimated_num_employees}` : null,
    org?.annual_revenue ? `**Revenue:** $${org.annual_revenue.toLocaleString()}` : null,
    [org?.city, org?.state, org?.country].filter(Boolean).length
      ? `**HQ:** ${[org?.city, org?.state, org?.country].filter(Boolean).join(', ')}`
      : null,
    org?.short_description ? `\n> ${org.short_description}\n` : null,
    people.length > 0 ? '\n## Top contacts\n' : null,
    ...people.map((p) =>
      `- **${p.name || 'Unknown'}** — ${p.title || 'unknown title'}${p.linkedin_url ? ` · [LinkedIn](${p.linkedin_url})` : ''}${p.email ? ` · ${p.email}` : ''}`,
    ),
    '\n---\n',
    `**Captured:** ${new Date().toISOString()}`,
    `**Source:** ${meta.source || 'unknown'}`,
    meta.referrer ? `**Referrer:** ${meta.referrer}` : null,
    meta.userAgent ? `**UA:** \`${meta.userAgent.slice(0, 200)}\`` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const title = `[OEM Lead] ${company}`;
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
      labels: ['oem-lead'],
    }),
  });

  if (!res.ok) {
    return { stored: false, reason: `gh ${res.status}` };
  }
  const issue = await res.json();
  return { stored: true, issueUrl: issue?.html_url };
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const company = typeof payload?.company === 'string' ? payload.company.trim() : '';
    if (!company || company.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid company' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const meta = {
      source: String(payload?.source || ''),
      referrer: String(payload?.referrer || ''),
      userAgent: String(payload?.userAgent || ''),
    };

    const enrichment = await enrichViaApollo(company);
    const storage = await storeAsGitHubIssue(company, enrichment, meta);

    // Always log for Vercel runtime logs, regardless of storage.
    console.log(
      '[oem-lead]',
      JSON.stringify({
        company,
        enrichmentSource: enrichment.source,
        orgMatch: enrichment.org?.name,
        peopleFound: enrichment.topPeople.length,
        stored: storage.stored,
        ...meta,
      }),
    );

    return new Response(
      JSON.stringify({
        ok: true,
        enriched: enrichment.source === 'apollo',
        stored: storage.stored,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    console.error('[oem-lead] error:', err);
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
