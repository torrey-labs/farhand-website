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
      <div className="py-[clamp(3rem,8vw,6rem)]">
        <div className="container max-w-[800px] pt-16">
          <h1 className="mb-8">Privacy Policy</h1>
          <p className="mb-6 text-light-gray">Last Updated: April 2026</p>

          <div className="leading-[1.8] text-light-gray">
            <h3 className="text-white mt-8 mb-4">1. Data Collection</h3>
            <p>We collect personal information when you book a call, such as your name, email, and phone number, to provide our field service support.</p>

            <h3 className="text-white mt-8 mb-4">2. Data Usage</h3>
            <p>Your data is used to coordinate technician deployments and improve the Farhand Relay™ AI guidance system.</p>

            <h3 className="text-white mt-8 mb-4">3. Data Sharing</h3>
            <p>Farhand does not sell your personal information. We may share data with service providers to facilitate installations and repairs.</p>

            <h3 className="text-white mt-8 mb-4">4. Security</h3>
            <p>We use industry-standard measures to protect your information, ensuring that your machinery data remains confidential.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
