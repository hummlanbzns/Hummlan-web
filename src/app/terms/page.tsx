import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The plain-language terms for using Hummlan: what we do, how our ratings work, and our affiliate disclosure.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: August 2026</p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">1. What Hummlan is</h2>
              <p className="text-gray-600 leading-relaxed">
                Hummlan (hummlan.com) is an independent comparison and review site. We rate brands
                and products with our Hummlan Sustainability Score (HSS), publish buying guides,
                and explain sustainability topics such as the EU Taxonomy and CSRD. Using the site
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
              <h2 className="text-xl font-bold text-gray-900 mb-2">3. Affiliate disclosure</h2>
              <p className="text-gray-600 leading-relaxed">
                Hummlan earns money through affiliate links. If you click a link to a store on our
                site and make a purchase, we may receive a commission at no extra cost to you.
                This helps fund our research. Being an affiliate never changes our rating — we rate
                brands the same way whether or not they are in our affiliate programme.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">4. Prices and availability</h2>
              <p className="text-gray-600 leading-relaxed">
                Prices shown on Hummlan come from the stores we link to and may change at any time.
                We try to keep them accurate but we cannot guarantee that a price, offer, or
                product is still available when you click through.
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
                information it contains. Purchases are made with the store, not with us, so store
                disputes are handled by the store.
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
