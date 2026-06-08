import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bug,
  CheckCircle,
  CloudSun,
  FlaskConical,
  Recycle,
  ShieldCheck,
  Sprout,
  Waves,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EU Taxonomy Explained for Shoppers',
  description:
    'A plain-language guide to EU Taxonomy and how Hummlan translates it into stern but fair sustainability scoring.',
  alternates: {
    canonical: '/eu-taxonomy',
  },
};

const objectives = [
  {
    title: 'Climate change mitigation',
    icon: CloudSun,
    detail: 'Is the brand reducing emissions and using cleaner energy?',
  },
  {
    title: 'Climate change adaptation',
    icon: ShieldCheck,
    detail: 'Is the business preparing its supply chain for climate risk?',
  },
  {
    title: 'Sustainable use of water and marine resources',
    icon: Waves,
    detail: 'Does production protect water quality and reduce water stress?',
  },
  {
    title: 'Transition to a circular economy',
    icon: Recycle,
    detail: 'Is the product durable, refillable, repairable, reusable, or recyclable?',
  },
  {
    title: 'Pollution prevention and control',
    icon: FlaskConical,
    detail: 'Are harmful substances reduced or avoided?',
  },
  {
    title: 'Protection and restoration of biodiversity and ecosystems',
    icon: Sprout,
    detail: 'Are sourcing choices helping, not harming, forests, soils, and habitats?',
  },
];

export default function EuTaxonomyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bug className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            Hummlan.com
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-green-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600">
              Our Standards
            </Link>
            <span className="text-green-600 font-bold border-b-2 border-green-600">EU Taxonomy</span>
            <Link href="/csrd" className="text-gray-600 hover:text-green-600">
              CSRD
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              EU Taxonomy Explained for Shoppers
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Sustainability claims are everywhere — but the standards behind those claims are often
              unclear. EU Taxonomy helps define what is environmentally sustainable using criteria,
              not marketing language.
            </p>
          </section>

          <div className="mb-12 border rounded-xl bg-amber-50 border-amber-100 p-4 text-sm text-amber-900">
            <strong>Note:</strong> This page is for educational purposes and is not legal advice.
          </div>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the EU Taxonomy in plain language?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The EU Taxonomy is a classification system created by the European Union to identify
              which economic activities are genuinely aligned with environmental sustainability goals.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For shoppers, this gives a consistent reference point: less green storytelling, more
              measurable proof.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              The 6 EU environmental objectives (shopper-friendly)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {objectives.map((objective) => {
                const Icon = objective.icon;
                return (
                  <div key={objective.title} className="border rounded-xl p-5 bg-gray-50/70">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg border">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 leading-snug">{objective.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{objective.detail}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Key concepts you&apos;ll hear</h2>
            <ul className="space-y-4 text-gray-600">
              <li>
                <strong>Substantial contribution:</strong> A product or activity should make a meaningful
                positive impact, not just a tiny improvement.
              </li>
              <li>
                <strong>Do No Significant Harm (DNSH):</strong> A brand cannot claim progress in one area
                while causing major harm in another.
              </li>
              <li>
                <strong>Minimum safeguards:</strong> Basic social and governance expectations still apply,
                including responsible labor practices.
              </li>
            </ul>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Why this matters when you shop</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                Compare products on consistent sustainability criteria
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                Spot greenwashing faster
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                Prioritize products with stronger environmental fundamentals
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                Support brands making measurable progress
              </li>
            </ul>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Hummlan applies EU Taxonomy</h2>
            <p className="text-gray-600 leading-relaxed">
              Hummlan turns Taxonomy objectives into practical rating pillars like climate impact,
              circularity, pollution profile, and biodiversity-sensitive sourcing. We combine those
              checks with social and governance criteria to build a product-and-brand view that is
              strict but fair.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick FAQ (EU Taxonomy)</h2>
            <div className="space-y-5 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Is EU Taxonomy only for investors?</h3>
                <p>
                  It started in finance and policy, but its structure is useful for consumer-facing
                  product evaluation when translated clearly.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Does a product need to be perfect to score well?</h3>
                <p>No. Strong evidence of real progress can still score well, even if gaps remain.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Is “natural” the same as Taxonomy-aligned?</h3>
                <p>No. Marketing words alone are not enough; evidence matters.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Do non-EU brands get excluded?</h3>
                <p>No. Hummlan uses EU-aligned criteria globally to keep comparisons consistent.</p>
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
                improves how sustainability evidence is disclosed. <strong>HSS</strong> combines both into a
                shopper-facing score.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Impact criteria (Taxonomy-aligned): climate, circularity, pollution, water, biodiversity, resilience, and safeguards.</li>
                <li>Evidence quality (CSRD-informed): stronger disclosures and assurance increase score confidence.</li>
                <li>Category weighting: fashion, personal care, household, and food use tailored emphasis.</li>
                <li>Transparent output: score band, rationale, evidence tier, and red flags when needed.</li>
              </ul>
              <p>
                Stern but fair means we reward verified progress, down-weight weak claims, and update
                scores when credible new evidence appears.
              </p>
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Want to see these criteria in action?</h2>
            <p className="text-gray-600 mb-6">Browse rated products and compare sustainability with price.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors"
              >
                Browse rated products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-300 text-gray-800 font-bold hover:border-green-400 hover:text-green-700 transition-colors"
              >
                Full methodology
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 text-sm font-semibold mb-6 text-gray-600">
            <Link href="/about" className="hover:text-green-600">
              Our Standards
            </Link>
            <Link href="/eu-taxonomy" className="text-green-600">
              EU Taxonomy
            </Link>
            <Link href="/csrd" className="hover:text-green-600">
              CSRD
            </Link>
          </div>
          <p className="text-gray-400 text-sm">© 2025 Hummlan.com. Educational framework page.</p>
        </div>
      </footer>
    </div>
  );
}
