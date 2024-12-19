import React from 'react';
import { APP_CONFIG } from '../constants/app';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      
      <div className="space-y-6 text-sm text-gray-600">
        <p className="text-base">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">1. Agreement to Terms</h2>
          <p>
            By accessing and using {APP_CONFIG.NAME} (the "Service"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">2. Use License</h2>
          <p>
            Permission is granted to temporarily access the materials within {APP_CONFIG.NAME} for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to reverse engineer any software contained on the Service</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">3. Disclaimer</h2>
          <p>
            The materials on {APP_CONFIG.NAME} are provided on an 'as is' basis. {APP_CONFIG.NAME} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">4. Financial Advice Disclaimer</h2>
          <p>
            The content provided on {APP_CONFIG.NAME} is for informational purposes only and should not be considered as financial advice. We strongly recommend consulting with a qualified financial advisor before making any investment decisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">5. Limitations</h2>
          <p>
            In no event shall {APP_CONFIG.NAME} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">6. Accuracy of Materials</h2>
          <p>
            The materials appearing on {APP_CONFIG.NAME} could include technical, typographical, or photographic errors. {APP_CONFIG.NAME} does not warrant that any of the materials on its website are accurate, complete, or current.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">7. Links</h2>
          <p>
            {APP_CONFIG.NAME} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {APP_CONFIG.NAME} of the site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">8. Modifications</h2>
          <p>
            {APP_CONFIG.NAME} may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">9. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>
      </div>
    </div>
  );
};