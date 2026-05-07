/**
 * Shared Notion + Apollo utilities used by /api/oem-lead (form submit)
 * and /api/visit (reverse IP visitor tracking).
 *
 * All functions gracefully degrade when env vars are missing so the
 * site keeps working without Apollo / Notion / IPinfo keys.
 */

export type ApolloOrg = {
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

export type ApolloPerson = {
  name?: string;
  title?: string;
  email?: string;
  linkedin_url?: string;
};

export type EnrichmentResult = {
  org: ApolloOrg | null;
  topPeople: ApolloPerson[];
  source: 'apollo' | 'none';
  error?: string;
};

export type StoreResult = {
  stored: boolean;
  pageUrl?: string;
  pageId?: string;
  reason?: string;
};

export type LeadMeta = {
  source?: string;
  referrer?: string;
  userAgent?: string;
  path?: string;
  /** Free-form message body — surfaced in Notes + appended as a paragraph block. */
  message?: string;
  /** Inbound contact email — surfaced in the Notion Notes column. */
  email?: string;
  /** Inbound contact phone (E.164 preferred) — written to Contact column. */
  phone?: string;
  /** Live-Assist Q2 — written to Machinery column. */
  machinery?: string;
  /** Live-Assist Q3 — written to Location column. */
  location?: string;
};

const NOTION_VERSION = '2022-06-28';
const API_BASE = 'https://api.notion.com/v1';

function text(s: string) {
  return { rich_text: [{ type: 'text', text: { content: s.slice(0, 2000) } }] };
}

export async function enrichViaApollo(company: string): Promise<EnrichmentResult> {
  const key = process.env.APOLLO_API_KEY;
  if (!key) {
    return { org: null, topPeople: [], source: 'none' };
  }
  try {
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
      return {
        org: null,
        topPeople: [],
        source: 'none',
        error: `apollo org ${orgRes.status}`,
      };
    }
    const orgData = await orgRes.json();
    const org: ApolloOrg | null = orgData?.organizations?.[0] ?? null;

    if (!org?.primary_domain) {
      return { org, topPeople: [], source: 'apollo' };
    }

    const peopleRes = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': key,
      },
      body: JSON.stringify({
        q_organization_domains: org.primary_domain,
        person_titles: [
          'CEO',
          'Founder',
          'VP Engineering',
          'VP Product',
          'Head of Service',
          'Director',
        ],
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

/**
 * Search Inbound Leads DB for an existing row with this company name.
 * Used by /api/visit to avoid creating duplicate rows on repeat visits.
 *
 * Inbound Leads is deliberately kept as its own DB (separate from CRM Companies)
 * so raw form submissions have their own inbox. User promotes to Companies
 * manually when a lead is qualified.
 */
export async function findLeadByCompany(
  company: string,
): Promise<{ exists: boolean; pageId?: string; visitCount?: number }> {
  const token = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;
  if (!token || !databaseId) return { exists: false };

  try {
    const res = await fetch(`${API_BASE}/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Company', title: { equals: company } },
        page_size: 1,
      }),
    });
    if (!res.ok) return { exists: false };
    const data = await res.json();
    const hit = data?.results?.[0];
    if (!hit) return { exists: false };
    const vc = hit.properties?.['Visit Count']?.number;
    return {
      exists: true,
      pageId: hit.id,
      visitCount: typeof vc === 'number' ? vc : 0,
    };
  } catch {
    return { exists: false };
  }
}

/**
 * Bump the visit count + last visit timestamp on an existing lead row.
 */
export async function bumpLeadVisit(
  pageId: string,
  previousVisitCount: number,
): Promise<boolean> {
  const token = process.env.NOTION_API_KEY;
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/pages/${pageId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          'Visit Count': { number: previousVisitCount + 1 },
          'Last Visit': { date: { start: new Date().toISOString() } },
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function storeInNotion(
  company: string,
  contactName: string,
  enrichment: EnrichmentResult,
  meta: LeadMeta,
): Promise<StoreResult> {
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
    contactName ? `Name: ${contactName}` : null,
    meta.email ? `Email: ${meta.email}` : null,
    meta.phone ? `Phone: ${meta.phone}` : null,
    meta.message ? `Message: ${meta.message.slice(0, 1500)}` : null,
    meta.path ? `Path: ${meta.path}` : null,
    meta.referrer ? `Referrer: ${meta.referrer}` : null,
    meta.userAgent ? `UA: ${meta.userAgent.slice(0, 300)}` : null,
    org?.name && org.name !== company ? `Apollo matched: ${org.name}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const properties: Record<string, unknown> = {
    Company: {
      title: [{ type: 'text', text: { content: company.slice(0, 200) } }],
    },
    Status: { select: { name: 'New' } },
    Source: { select: { name: meta.source || 'qr-oem' } },
    'Visit Count': { number: 1 },
    'Last Visit': { date: { start: new Date().toISOString() } },
  };

  // Contact column: prefer phone (matches the inbound-text shape); fall back to name.
  const contactValue = meta.phone || contactName;
  if (contactValue) properties.Contact = text(contactValue);
  if (meta.machinery) properties.Machinery = text(meta.machinery);
  if (meta.location) properties.Location = text(meta.location);
  if (domain) properties.Domain = { url: domain };
  if (org?.industry) properties.Industry = text(org.industry);
  if (org?.estimated_num_employees) properties.Employees = { number: org.estimated_num_employees };
  if (org?.annual_revenue) properties.Revenue = { number: org.annual_revenue };
  if (hq) properties.HQ = text(hq);
  if (org?.linkedin_url) properties.LinkedIn = { url: org.linkedin_url };
  if (description) properties.Description = text(description);
  if (topContacts) properties['Top Contacts'] = text(topContacts);
  if (notes) properties.Notes = text(notes);

  // Body block: the user's message verbatim — mirrors how inbound texts
  // are stored, so the conversation transcript view is consistent.
  const children = meta.message
    ? [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: meta.message.slice(0, 1900) } },
            ],
          },
        },
      ]
    : undefined;

  const res = await fetch(`${API_BASE}/pages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
      ...(children ? { children } : {}),
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return {
      stored: false,
      reason: `notion ${res.status}: ${errText.slice(0, 300)}`,
    };
  }
  const page = await res.json();
  return { stored: true, pageUrl: page?.url, pageId: page?.id };
}
