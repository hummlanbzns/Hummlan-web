import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The plain-language terms for using Hummlan: what we do, how our ratings work, and our independence from the brands we rate.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: September 2026</p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">1. What Hummlan is</h2>
              <p className="text-gray-600 leading-relaxed">
                Hummlan (hummlan.com) is an independent sustainability ratings hub. We rate brands
                and companies with our Hummlan Sustainability Score (HSS) and explain sustainability
                topics such as the EU Taxonomy and CSRD. We do not sell products. Using the site
                means you accept these terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">2. Our ratings are informational</h2>
              <p className="text-gray-600 leading-relaxed">
                Our ratings and reviews are opinions based on our published methodology and on
                publicly available information. They are provided to help you make your own
                informed choices — they are not professional, financial, or legal advice, and they
                are not a guarantee about any brand&apos;s behaviour.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">3. Independence</h2>
              <p className="text-gray-600 leading-relaxed">
                Hummlan does not sell products and does not use affiliate links. We earn nothing
                from the brands we rate, and a brand cannot pay for a better score. Our ratings are
                independent and apply to any brand or company we assess — whether or not it has any
                relationship with Hummlan.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">4. No prices or products</h2>
              <p className="text-gray-600 leading-relaxed">
                Hummlan rates brands and companies — not products. We do not display product prices
                or store offers, and we do not sell or promote products.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">5. Acceptable use</h2>
              <p className="text-gray-600 leading-relaxed">
                Please use the site normally: don&apos;t scrape it at scale, attempt to disrupt it,
                or use its content to mislead others.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">6. Intellectual property</h2>
              <p className="text-gray-600 leading-relaxed">
                The content on Hummlan — including our ratings, guides, and the HSS methodology —
                belongs to Hummlan. You may share links to our pages, but you may not republish our
                content without permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">7. No liability</h2>
              <p className="text-gray-600 leading-relaxed">
                Hummlan is provided &quot;as is&quot;. To the extent permitted by law, we are not
                liable for any loss arising from your use of the site or from relying on the
                information it contains.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">8. Changes to these terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these terms from time to time. The date at the top of this page
                always shows when they were last updated.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">9. Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                Questions about these terms? Email{' '}
                <a href="mailto:hello@hummlan.com" className="text-brand font-semibold hover:underline">
                  hello@hummlan.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
