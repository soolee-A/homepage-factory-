import React from 'react';
import { FileText, AlertTriangle, Globe, Scale } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service – Korea OSO",
  description: "Terms of Service for Korea OSO. Please read these terms carefully before using our South Korea travel guide website.",
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-3xl mb-6">
          <FileText className="text-blue-600 w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
        <p className="text-slate-500 mt-4 font-medium">Last Updated: March 19, 2026</p>
        <p className="text-slate-400 text-sm mt-2">Please read these terms carefully before using Korea OSO.</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">

        <section>
          <p>
            Welcome to Korea OSO ("we," "us," or "our"). By accessing or using our website at koreaoso.com (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
          </p>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="text-blue-600 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">Use of Service</h2>
          </div>
          <p>
            Korea OSO provides travel information and guides about South Korea for informational purposes only. You may use our Service for personal, non-commercial purposes subject to the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>You must be at least 13 years of age to use this Service.</li>
            <li>You agree not to scrape, copy, or redistribute our content without express written permission.</li>
            <li>You agree not to use the Service in any way that violates applicable laws or regulations.</li>
            <li>You agree not to attempt to gain unauthorized access to any part of the Service.</li>
            <li>You agree not to use automated tools to access our content at scale without permission.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="text-amber-500 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">Disclaimer of Warranties</h2>
          </div>
          <p>
            Korea OSO provides all content on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Accuracy:</strong> While we strive for accuracy, travel regulations, transportation schedules, and airport procedures change frequently. We do not guarantee that all information is current or correct at the time of your visit.</li>
            <li><strong>Completeness:</strong> Our guides are comprehensive but may not cover every scenario or edge case relevant to your specific situation.</li>
            <li><strong>Fitness for purpose:</strong> Information that is accurate in general may not be appropriate for your specific travel circumstances.</li>
          </ul>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mt-6">
            <p className="text-sm font-medium text-amber-800">
              <strong>Important:</strong> Always verify critical travel information — including visa requirements, K-ETA status, flight details, and entry procedures — directly with official South Korean government sources before your trip. Korea OSO is not a substitute for official government guidance.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Scale className="text-blue-600 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">Limitation of Liability</h2>
          </div>
          <p>
            To the fullest extent permitted by law, Korea OSO and its operators shall not be liable for:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service.</li>
            <li>Any errors, omissions, or inaccuracies in the content.</li>
            <li>Any loss or damage resulting from reliance on information provided on this website.</li>
            <li>Any travel disruptions, immigration issues, or financial losses related to following advice on this website.</li>
            <li>Unauthorized access to or alteration of your data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
          <p>
            All content on Korea OSO — including text, graphics, logos, and images — is the property of Korea OSO and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of our content without prior written permission.
          </p>
          <p className="mt-4">
            You may share links to our pages and quote brief excerpts for commentary or educational purposes with appropriate attribution to Korea OSO (koreaoso.com).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Links</h2>
          <p>
            Korea OSO may contain links to third-party websites including official booking platforms, government sites, and external services. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advertising</h2>
          <p>
            Korea OSO displays third-party advertisements through Google AdSense. These ads are served by Google and are subject to Google's advertising policies. Korea OSO does not endorse the products or services advertised. Clicking on advertisements may direct you to third-party websites that have their own terms and privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the Service after any changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law provisions.
          </p>
        </section>

        <section className="pt-8 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mt-4">
            <p className="font-semibold text-slate-900">Korea OSO</p>
            <p className="text-slate-600 mt-1">Email: <a href="mailto:legal@koreaoso.com" className="text-blue-600 hover:underline">legal@koreaoso.com</a></p>
            <p className="text-slate-600">Website: <a href="https://koreaoso.com/contact" className="text-blue-600 hover:underline">koreaoso.com/contact</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
