import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, Globe, Mail } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy – Korea OSO",
  description: "Privacy Policy for Korea OSO – How we collect, use, and protect your data and cookies when you use our Korea travel guide.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
          <ShieldCheck className="text-blue-600 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 mt-4 font-medium">Last Updated: March 19, 2026</p>
        <p className="text-slate-400 text-sm mt-2">This policy applies to Korea OSO (koreaoso.com)</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">

        <section>
          <p className="text-slate-600 leading-relaxed">
            Korea OSO ("we," "us," or "our") operates the website koreaoso.com (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. By using our Service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="text-blue-600 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">Information We Collect</h2>
          </div>
          <p>
            At Korea OSO, we prioritize your privacy. We do not require you to create an account or provide personal information to browse our site. We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Log Data:</strong> When you visit our site, our servers automatically record information your browser sends, including your IP address (in anonymized form), browser type and version, pages visited, time and date of your visit, and time spent on pages.</li>
            <li><strong>Cookies and Usage Data:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.</li>
            <li><strong>Analytics Data:</strong> We use Google Analytics to understand how visitors interact with our website. This data is aggregated and anonymized.</li>
            <li><strong>Contact Information:</strong> If you contact us via email, we may retain the content of your message and your email address to respond to your inquiry.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Cookie className="text-blue-600 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">Cookies and Advertising</h2>
          </div>
          <p>
            Korea OSO uses cookies to enhance your browsing experience, analyze site traffic, and serve relevant advertisements through Google AdSense.
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mt-4 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Google AdSense</h3>
            <p className="text-sm">
              We use Google AdSense to display advertisements on our site. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our website and other sites on the Internet. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
            </p>
            <p className="text-sm">
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or by visiting <a href="https://www.aboutads.info" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-4">DoubleClick Cookie</h3>
            <p className="text-sm">
              Google's use of the DoubleClick cookie enables it and its partners to serve ads to users based on their visit to Korea OSO and/or other sites on the Internet. Users may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting <a href="https://adssettings.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-4">Types of Cookies We Use</h3>
            <ul className="text-sm list-disc pl-5 space-y-1">
              <li><strong>Essential cookies:</strong> Required for the website to function properly.</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our site (Google Analytics).</li>
              <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements (Google AdSense).</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences.</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="text-blue-600 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">How We Use Your Information</h2>
          </div>
          <p>Korea OSO uses the collected data for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>To provide and maintain our Service</li>
            <li>To analyze usage patterns and improve our content</li>
            <li>To display relevant advertisements via Google AdSense</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="text-blue-600 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">Data Security</h2>
          </div>
          <p>
            The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Services</h2>
          <p>
            Our Service may contain links to third-party websites. Korea OSO's Privacy Policy does not apply to other websites or services. We have no control over the content and practices of those sites and cannot accept responsibility for their privacy policies. We advise you to review the respective Privacy Policies of any third-party services you visit.
          </p>
          <p className="mt-4">
            Third-party services we use include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Google Analytics</strong> – Website traffic analysis (<a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>)</li>
            <li><strong>Google AdSense</strong> – Advertising network (<a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Policy</a>)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us so that we can take necessary actions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Right to access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Right to rectification:</strong> Request correction of inaccurate data.</li>
            <li><strong>Right to erasure:</strong> Request deletion of your personal data.</li>
            <li><strong>Right to opt-out of advertising:</strong> Opt out of personalized advertising via Google Ads Settings.</li>
            <li><strong>California residents (CCPA):</strong> You have the right to know what personal information is collected, the right to delete personal information, and the right to opt-out of sale of personal information. Korea OSO does not sell personal information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="pt-12 border-t border-slate-100">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="text-blue-600 w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-bold text-slate-900 m-0">Contact Us</h2>
          </div>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mt-4">
            <p className="font-semibold text-slate-900">Korea OSO</p>
            <p className="text-slate-600 mt-1">Email: <a href="mailto:privacy@koreaoso.com" className="text-blue-600 hover:underline">privacy@koreaoso.com</a></p>
            <p className="text-slate-600">Website: <a href="https://koreaoso.com/contact" className="text-blue-600 hover:underline">koreaoso.com/contact</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
