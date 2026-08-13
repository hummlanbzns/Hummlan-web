import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Hummlan handles your data: what we collect (newsletter email, standard server logs), how we use it, and your rights.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: August 2026</p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">1. Who we are</h2>
              <p className="text-gray-600 leading-relaxed">
                Hummlan (hummlan.com) is an independent comparison and review site that rates the
                sustainability of brands and products. This policy explains what information we
                collect and how we use it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">2. What we collect</h2>
              <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-2">
                <li>
                  <strong>Email address</strong> — only when you voluntarily subscribe to our
                  newsletter (The Hive). We ask for your consent before adding you.
                </li>
                <li>
                  <strong>Standard server logs</strong> — our hosting provider automatically
                  records basic technical information such as IP address, browser type, and which
                  pages are requested. This is normal for any website and is used to keep the site
                  secure and working.
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                We do not set our own tracking or advertising cookies, and we do not use analytics
                scripts on this site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">3. How we use your data</h2>
              <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-2">
                <li>To send you our newsletter, if you subscribed.</li>
                <li>To keep the website functioning and secure.</li>
                <li>To respond to enquiries you send us.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                We do not sell or rent your personal data to anyone.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">4. Affiliate links and third parties</h2>
              <p className="text-gray-600 leading-relaxed">
                Some of the store links on Hummlan are affiliate links. When you click one, the
                store or its affiliate network (for example, Awin) may set cookies in your browser
                so the referral can be credited. We do not control those cookies — please see the
                store&apos;s own privacy policy for details. Clicking an affiliate link never costs
                you anything extra.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">5. How long we keep data</h2>
              <p className="text-gray-600 leading-relaxed">
                We keep your email address only while you remain subscribed. You can unsubscribe at
                any time using the link at the bottom of every newsletter, and we will remove you
                from our list.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">6. Your rights</h2>
              <p className="text-gray-600 leading-relaxed">
                You may ask us at any time what data we hold about you, ask us to correct or delete
                it, or withdraw your consent to receive the newsletter. To do any of these, email{' '}
                <a href="mailto:hello@hummlan.com" className="text-brand font-semibold hover:underline">
                  hello@hummlan.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">7. Children</h2>
              <p className="text-gray-600 leading-relaxed">
                Hummlan is not directed at children under 16, and we do not knowingly collect
                personal data from them.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">8. Changes to this policy</h2>
              <p className="text-gray-600 leading-relaxed">
                If we change how we handle your data, we will update this page and revise the date
                at the top.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
