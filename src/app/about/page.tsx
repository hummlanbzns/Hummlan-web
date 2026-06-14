
import Link from 'next/link';
import { ShieldCheck, Scale, CheckCircle, Info, Award, AlertTriangle } from 'lucide-react';
import HummlanBeeMark from '@/components/HummlanBeeMark';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HummlanBeeMark className="w-8 h-8 text-orange-600" />
            Hummlan.com
          </Link>
          <nav className="flex gap-8">
            <Link href="/" className="text-gray-600 font-medium hover:text-orange-700">Home</Link>
            <Link href="/best-of" className="text-gray-600 font-medium hover:text-orange-700">Best Of</Link>
            <span className="text-orange-700 font-bold border-b-2 border-orange-700">Our Standards</span>
            <Link href="/eu-taxonomy" className="text-gray-600 font-medium hover:text-orange-700">EU Taxonomy</Link>
            <Link href="/csrd" className="text-gray-600 font-medium hover:text-orange-700">CSRD</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <section className="mb-16 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Our "Stern & Fair" Standards</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              In a world of greenwashing, Hummlan.com provides clarity. Our rating system isn't based on brand marketing—it's based on the backbone of EU Taxonomy and CSRD.
            </p>
          </section>

          <section className="mb-16 bg-white border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-orange-700" />
              <h2 className="text-2xl font-bold text-gray-900">Framework Backbone</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              For full transparency, we publish the two frameworks that power our rating logic.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/eu-taxonomy" className="border rounded-xl p-5 hover:border-orange-300 transition-colors bg-gray-50">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-2">Guide</p>
                <h3 className="font-bold text-gray-900 mb-2">EU Taxonomy Explained</h3>
                <p className="text-sm text-gray-600">What sustainability means and how we map it into HSS criteria.</p>
              </Link>
              <Link href="/csrd" className="border rounded-xl p-5 hover:border-orange-300 transition-colors bg-gray-50">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-2">Guide</p>
                <h3 className="font-bold text-gray-900 mb-2">CSRD Explained</h3>
                <p className="text-sm text-gray-600">How disclosure quality and evidence confidence affect ratings.</p>
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border shadow-sm">
              <div className="p-3 bg-red-50 rounded-xl w-fit mb-6">
                <ShieldCheck className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why we are "Stern"</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Tier 1 Evidence Only:</strong> We only give points for third-party audited certifications. Self-reported claims from brands score zero.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>No Partial Credit:</strong> If a brand can't prove it, we don't assume it. "Working towards" isn't the same as "Doing".</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>DNSH Enforcement:</strong> We apply the "Do No Significant Harm" principle. Excellence in one area doesn't excuse failure in another.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border shadow-sm">
              <div className="p-3 bg-blue-50 rounded-xl w-fit mb-6">
                <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why we are "Fair"</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Context Matters:</strong> We recognize industry constraints. Sustainable dairy has different challenges than organic cotton.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Transparent Logic:</strong> Every score breakdown is public. We show exactly why a brand was docked points.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span><span><strong>Open for Appeals:</strong> Brands can submit new third-party evidence at any time to improve their score.</span></span>
                </li>
              </ul>
            </div>
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why "Hummlan"?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border shadow-sm hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <HummlanBeeMark className="w-6 h-6 text-orange-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Masters of "Buzz Pollination"</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Bumblebees vibrate at a specific frequency to dislodge hidden pollen other bees can't reach. Just as they go deeper, Hummlan’s "stern and fair" rating system cuts through greenwashing to uncover the absolute truth about a brand's sustainability.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border shadow-sm hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <HummlanBeeMark className="w-6 h-6 text-orange-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Keystone Pollinators</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  As a keystone species, bumblebees support entire ecosystems. We follow the EU Taxonomy to look at systemic, holistic impact—ensuring the products we recommend protect the very foundation of our planet's biodiversity.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border shadow-sm hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <HummlanBeeMark className="w-6 h-6 text-orange-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Resilience in Harsh Climates</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Bumblebees thrive in harsh conditions where others cannot. Genuine sustainability isn't a fair-weather commitment; our ratings remain strict and unyielding, weathering the harsh reality of climate accountability.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border shadow-sm hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <HummlanBeeMark className="w-6 h-6 text-orange-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Hyper-Efficient Foragers</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Highly selective and efficient, bumblebees visit up to 30 flowers per minute. Hummlan mirrors this by filtering out greenwashed products, doing the rigorous foraging so you get only high-integrity, cost-effective options.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-10 shadow-sm mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The 5 Pillars of Hummlan Score (HSS)</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-800">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Climate Impact (20%)</h3>
                  <p className="text-gray-600">Focuses on carbon footprint, renewable energy use in production, and verified science-based targets (SBTi).</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-800">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Circular Economy (20%)</h3>
                  <p className="text-gray-600">Evaluates product durability, repairability, use of recycled materials, and end-of-life take-back programs.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-800">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pollution Prevention (15%)</h3>
                  <p className="text-gray-600">Checks for hazardous substance avoidance (PFAS, phthalates), microplastic mitigation, and wastewater treatment.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-800">4</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Supply Chain & Social (20%)</h3>
                  <p className="text-gray-600">Audits worker rights, living wage payments, and full supply chain transparency down to the farm or factory level.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-800">5</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Biodiversity (15%)</h3>
                  <p className="text-gray-600">Focuses on sustainable sourcing (FSC, organic), protection of ecosystems, and water stewardship in high-stress regions.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 flex gap-6 items-start">
            <AlertTriangle className="w-8 h-8 text-orange-700 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-orange-950 mb-2">A Note on Affiliate Links</h3>
              <p className="text-orange-900 leading-relaxed">
                Hummlan earns commissions through affiliate marketing. However, our rating team and our marketing team are strictly separated. A brand cannot pay for a better score. We link to the cheapest store regardless of the commission rate to ensure you get the best deal on the best products.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 text-sm font-semibold mb-6 text-gray-600">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            <Link href="/eu-taxonomy" className="hover:text-orange-700">EU Taxonomy</Link>
            <Link href="/csrd" className="hover:text-orange-700">CSRD</Link>
          </div>
          <Link href="/" className="text-orange-700 font-bold hover:underline">← Back to Homepage</Link>
          <p className="text-gray-400 text-sm mt-8">© 2025 Hummlan.com. Methodology version 1.2 (May 2025).</p>
        </div>
      </footer>
    </div>
  );
}
