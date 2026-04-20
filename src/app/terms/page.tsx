import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions',
};

export default function TermsPage() {
  return (
    <main className="bg-background min-h-screen text-white">
      <Navigation />
      <div className="py-12 md:py-16 lg:py-24">
        <div className="container max-w-[800px] pt-16">
          <h1 className="mb-8">Terms & Conditions</h1>
          <p className="mb-6 text-light-gray">Last Updated: April 2026</p>

          <div className="leading-[1.8] text-light-gray">
            <h3 className="text-white mt-8 mb-4">1. Acceptance of Terms</h3>
            <p>By accessing farhand.live, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>

            <h3 className="text-white mt-8 mb-4">2. Description of Service</h3>
            <p>Farhand provides AI-guided Field Service Engineer services for robots and machinery. Our platform, Farhand Relay™, facilitates on-site installations and repairs.</p>

            <h3 className="text-white mt-8 mb-4">3. Use of Content</h3>
            <p>All content on this website is the property of Farhand Inc. and is protected by copyright laws. Unauthorized use is prohibited.</p>

            <h3 className="text-white mt-8 mb-4">4. Limitation of Liability</h3>
            <p>Farhand Inc. shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
