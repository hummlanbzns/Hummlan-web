import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bug, CheckCircle, FileCheck2, Leaf, Scale, ShieldCheck, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSRD Explained for Shoppers',
  description:
    'A plain-language guide to CSRD and how Hummlan uses disclosure quality to keep sustainability ratings strict and transparent.',
  alternates: {
    canonical: '/csrd',
  },
};

const csrdImprovements = [
  'Comparability — brands can be assessed on more consistent reporting fields.',
  'Transparency — less room for cherry-picked sustainability claims.',
  'Accountability — stronger expectation for evidence behind statements.',
  'Decision quality — rating systems can evaluate brands with higher confidence.',
];

const keyConcepts = [
  {
    label: 'ESRS (reporting standards)',
    icon: Leaf,
    text: 'A common reporting structure so companies can be compared more fairly.',
  },
  {
    label: 'Double materiality',
    icon: Scale,
    text: 'Companies report both financial risk and real-world impact on people and planet.',
  },
  {
    label: 'Value-chain reporting',
    icon: Users,
    text: 'Expectations extend beyond headquarters into supplier networks.',
  },
  {
    label: 'Assurance',
    icon: ShieldCheck,
    text: 'Reported sustainability information increasingly needs independent checks.',
  },
];

export default function CsrdPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bug className="w-8 h-8 text-brand fill-brand" />
            Hummlan.com
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-brand">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-brand">
              Our Standards
            </Link>
            <Link href="/eu-taxonomy" className="text-gray-600 hover:text-brand">
              EU Taxonomy
            </Link>
            <span className="text-brand font-bold border-b-2 border-brand">CSRD</span>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <section className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-bold mb-6">
              <FileCheck2 className="w-4 h-4" />
              Disclosure Quality
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              CSRD Explained for Shoppers
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              If sustainability claims are going to be trusted, companies need to show their work.
              CSRD raises the quality and consistency of sustainability reporting — which gives
              shoppers stronger evidence to compare brands.
            </p>
          </section>

          <div className="mb-12 border rounded-xl bg-amber-50 border-amber-100 p-4 text-sm text-amber-900">
            <strong>Note:</strong> This page is for educational purposes and is not legal advice.
          </div>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is CSRD in plain language?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              CSRD (Corporate Sustainability Reporting Directive) is an EU framework that requires many
              companies to report sustainability information in a more structured and comparable way.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Instead of selective claims, companies are expected to provide fuller disclosures across
              climate, resources, workforce, supply chains, and governance.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What CSRD improves</h2>
            <ul className="space-y-3 text-gray-700">
              {csrdImprovements.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key CSRD concepts (simplified)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {keyConcepts.map((concept) => {
                const Icon = concept.icon;
                return (
                  <div key={concept.label} className="border rounded-xl p-5 bg-gray-50/70">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-lg border">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900">{concept.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{concept.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Why this matters when you shop</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                Fewer uncheckable “green” claims
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                Better visibility into supply-chain and labor risks
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                Clearer signals on climate plans and resource use
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                More reliable product-level sustainability comparisons
              </li>
            </ul>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Hummlan uses CSRD-style disclosures</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Hummlan weights evidence quality. When disclosure is robust and verifiable, confidence in
              scoring increases. When information is missing, vague, or contradictory, scores are more
              conservative and red flags may appear.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This keeps ratings fair to improving brands while staying strict on unproven claims.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick FAQ (CSRD)</h2>
            <div className="space-y-5 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Is CSRD a consumer law?</h3>
                <p>
                  It is a corporate reporting framework, but it strongly affects the quality of
                  information consumers rely on.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Will this remove all greenwashing?</h3>
                <p>
                  No single framework can do that, but stronger standardized disclosure makes weak
                  claims easier to challenge.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Do small brands get penalized if they report less?</h3>
                <p>
                  Hummlan evaluates evidence proportionally and transparently. Less verified evidence
                  can limit confidence and cap scores.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Are ratings static once published?</h3>
                <p>No. Ratings are updated when credible new evidence or disclosures appear.</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-10 mb-10">
            <h2 className="text-2xl font-bold mb-6">
              How EU Taxonomy + CSRD map into Hummlan Sustainability Score (HSS)
            </h2>
            <div className="space-y-5 text-gray-200">
              <p>
                <strong>EU Taxonomy</strong> helps define what sustainability means. <strong>CSRD</strong>{' '}
                improves how evidence is disclosed. <strong>HSS</strong> combines both into a shopper-facing
                score.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Taxonomy-aligned impact criteria shape what we evaluate.</li>
                <li>CSRD-informed evidence tiers shape how confidently we score.</li>
                <li>Category weighting keeps comparisons fair across product types.</li>
                <li>Output includes score band, rationale, evidence tier, and red flags.</li>
              </ul>
              <p>
                Stern but fair means we reward verified progress, discount weak support, and update
                ratings when new credible information is available.
              </p>
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">See how evidence tiers shape scores</h2>
            <p className="text-gray-600 mb-6">
              Review our methodology and then explore products through the same framework.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
              >
                Go to methodology
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-300 text-gray-800 font-bold hover:border-blue-400 hover:text-blue-700 transition-colors"
              >
                Browse rated products
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 text-sm font-semibold mb-6 text-gray-600">
            <Link href="/about" className="hover:text-brand">
              Our Standards
            </Link>
            <Link href="/eu-taxonomy" className="hover:text-brand">
              EU Taxonomy
            </Link>
            <Link href="/csrd" className="text-brand">
              CSRD
            </Link>
          </div>
          <p className="text-gray-400 text-sm">© 2025 Hummlan.com. Educational framework page.</p>
        </div>
      </footer>
    </div>
  );
}
