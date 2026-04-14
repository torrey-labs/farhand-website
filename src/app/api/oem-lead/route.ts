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

function text(s: string) {
  return { rich_text: [{ type: 'text', text: { content: s.slice(0, 2000) } }] };
}

async function storeInNotion(
  company: string,
  contactName: string,
  enrichment: EnrichmentResult,
  meta: Record<string, string>,
) {
  const token = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;
  if (!token || !databaseId) {
    return { stored: false, reason: 'missing NOTION_API_KEY or NOTION_LEADS_DATABASE_ID' };
  }

  const org = enrichment.org;
  const people = enrichment.topPeople;

  const description = org?.short_description || '';

  const topContacts = people
    .map((p) =>
      [
        p.name || 'Unknown',
        p.title ? ` — ${p.title}` : '',
        p.email ? ` · ${p.email}` : '',
        p.linkedin_url ? ` · ${p.linkedin_url}` : '',
      ].join(''),
    )
    .join('\n');

  const hq = [org?.city, org?.state, org?.country].filter(Boolean).join(', ');
  const domain = org?.primary_domain
    ? `https://${org.primary_domain}`
    : org?.website_url || null;

  const notes = [
    `Source: ${meta.source || 'unknown'}`,
    meta.referrer ? `Referrer: ${meta.referrer}` : null,
    meta.userAgent ? `UA: ${meta.userAgent.slice(0, 300)}` : null,
    org?.name && org.name !== company ? `Apollo matched: ${org.name}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const properties: Record<string, unknown> = {
    Company: { title: [{ type: 'text', text: { content: company.slice(0, 200) } }] },
    Status: { select: { name: 'New' } },
    Source: { select: { name: meta.source || 'qr-oem' } },
  };

  if (contactName) properties['Contact'] = text(contactName);
  if (domain) properties.Domain = { url: domain };
  if (org?.industry) properties.Industry = text(org.industry);
  if (org?.estimated_num_employees) properties.Employees = { number: org.estimated_num_employees };
  if (org?.annual_revenue) properties.Revenue = { number: org.annual_revenue };
  if (hq) properties.HQ = text(hq);
  if (org?.linkedin_url) properties.LinkedIn = { url: org.linkedin_url };
  if (description) properties.Description = text(description);
  if (topContacts) properties['Top Contacts'] = text(topContacts);
  if (notes) properties.Notes = text(notes);

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return { stored: false, reason: `notion ${res.status}: ${errText.slice(0, 300)}` };
  }
  const page = await res.json();
  return { stored: true, pageUrl: page?.url };
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const company = typeof payload?.company === 'string' ? payload.company.trim() : '';
    const contactName = typeof payload?.name === 'string' ? payload.name.trim() : '';
    if (!company || company.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid company' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (contactName.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), {
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
    const storage = await storeInNotion(company, contactName, enrichment, meta);

    // Always log for Vercel runtime logs, regardless of storage.
    console.log(
      '[oem-lead]',
      JSON.stringify({
        company,
        contactName,
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
