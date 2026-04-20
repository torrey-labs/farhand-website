import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <main className="bg-background min-h-screen text-white">
      <Navigation />
      <div className="py-12 md:py-16 lg:py-24">
        <div className="container max-w-[800px] pt-16">
          <h1 className="mb-8">Privacy Policy</h1>
          <p className="mb-6 text-light-gray">Last Updated: April 2026</p>

          <div className="leading-[1.8] text-light-gray">
            <h3 className="text-white mt-8 mb-4">1. Data Collection</h3>
            <p>We collect personal information when you book a call, submit a lead form, or subscribe to our newsletter. This typically includes your name, company, email, and phone number, used to coordinate field service and respond to inquiries.</p>

            <h3 className="text-white mt-8 mb-4">2. Automatic Visitor Analytics</h3>
            <p>When you visit <strong>farhand.live</strong>, we automatically collect standard server-side request data — IP address, request path, referrer, and user-agent string. We use a reverse IP lookup service to identify the <em>company</em> (not the individual) visiting from corporate networks so our sales team can follow up with a relevant message.</p>
            <p className="mt-4"><strong>Important:</strong> we do not attempt to identify individual visitors from IP addresses. No personal identifiers (names, emails, phone numbers) are captured passively — only company-level data (company name, industry, size) that is already publicly associated with the corporate IP range. Under both GDPR and CCPA, company-level information not tied to a natural person does not constitute &quot;personal data.&quot;</p>
            <p className="mt-4"><strong>Opt-out:</strong> to prevent identification, use a VPN, disable third-party cookies, or contact us at <a href="mailto:aaryan@farhand.live" className="text-accent">aaryan@farhand.live</a> to request deletion of any records associated with your company. We honor the <code>Do-Not-Track</code> browser header and will not log visits from browsers that send it.</p>

            <h3 className="text-white mt-8 mb-4">3. Third-Party Analytics</h3>
            <p>We use Google Analytics 4 and Vercel Analytics for aggregated traffic metrics (sessions, page views, referrers). Both services anonymize IP addresses by default and do not receive personally identifying information. You can opt out of Google Analytics at <a href="https://tools.google.com/dlpage/gaoptout" className="text-accent">tools.google.com/dlpage/gaoptout</a>.</p>

            <h3 className="text-white mt-8 mb-4">4. Data Usage</h3>
            <p>Your data is used to coordinate Field Service Engineer deployments, improve the Farhand Relay™ AI guidance system, and surface relevant service offerings. Form submissions are stored in our internal CRM (Notion) for sales follow-up.</p>

            <h3 className="text-white mt-8 mb-4">5. Data Sharing</h3>
            <p>Farhand does not sell your personal information. We may share data with service providers (Notion, Vercel, Apollo.io, IPinfo.io, Google) to the extent necessary to operate the site, perform field service, and enrich inbound leads. Each of these providers has their own privacy terms.</p>

            <h3 className="text-white mt-8 mb-4">6. Security</h3>
            <p>We use industry-standard measures to protect your information, including encrypted transport (HTTPS everywhere), role-based access control on our internal systems, and periodic security reviews. Your machinery documentation and operational data remain confidential and are not shared beyond the Farhand team assigned to your account.</p>

            <h3 className="text-white mt-8 mb-4">7. Contact</h3>
            <p>Questions about this policy? Email <a href="mailto:aaryan@farhand.live" className="text-accent">aaryan@farhand.live</a>. For data deletion or access requests, include your company name and the email address on file.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
