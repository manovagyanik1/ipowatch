import React from 'react';
import { APP_CONFIG } from '../constants/app';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-sm text-gray-600">
        <p className="text-base">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">1. Information We Collect</h2>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">1.1 Personal Information</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email address when you subscribe to our newsletter</li>
              <li>Communication preferences</li>
              <li>Any feedback or correspondence you send us</li>
            </ul>

            <h3 className="font-medium text-gray-900">1.2 Usage Information</h3>
            <p>We automatically collect certain information about your device, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages you visit on our Service</li>
              <li>Time and date of your visits</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide and maintain our Service</li>
            <li>Send you IPO recommendations and market insights</li>
            <li>Respond to your comments and questions</li>
            <li>Understand how you use our Service</li>
            <li>Improve our Service and develop new features</li>
            <li>Send you technical notices and security alerts</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>With your consent</li>
            <li>To comply with laws or respond to legal requests</li>
            <li>To protect our rights and property</li>
            <li>In connection with a business transfer or acquisition</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to our use of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Request data portability</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href={`mailto:${APP_CONFIG.CONTACT_EMAIL}`} className="text-blue-600 hover:text-blue-800">
              {APP_CONFIG.CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};