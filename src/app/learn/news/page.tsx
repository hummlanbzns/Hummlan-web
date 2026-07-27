import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Newspaper, BookOpen, Calendar, AlertTriangle, Scale, Factory, Microscope, Search, ChevronRight } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sustainability Weekly News Digest | The Hummlan Hive',
  description: 'The first edition of Hummlan\'s weekly sustainability news digest. CSRD enforcement begins, EU Taxonomy expands, and greenwashing crackdowns intensify across Europe.',
  openGraph: {
    title: `The Hummlan Hive — Sustainability Weekly Digest #1 | ${SITE_NAME}`,
    description: 'CSRD enforcement actions begin, EU Taxonomy expands to textiles and food, H&M faces shareholder revolt, and more.',
    type: 'article',
    url: '/learn/news',
  },
  alternates: { canonical: '/learn/news' },
};

const sections = [
  {
    id: 'csrd-enforcement',
    number: 1,
    title: 'Headline Story — First CSRD Enforcement Actions Begin as Reporting Deadline Passes',
    icon: Scale,
    content: (
      <>
        <p><strong>The news:</strong> The first wave of European companies faced their mandatory CSRD (Corporate Sustainability Reporting Directive) reporting deadline on 30 June 2026, covering FY2025 data. Early indications show that approximately <strong>60% of the ~11,000 in-scope companies</strong> submitted on time, according to EFRAG&apos;s initial monitoring. The remaining 40% requested extensions or face non-compliance procedures from member state regulators.</p>
        <p><strong>Why it matters for shoppers:</strong> For the first time, companies must disclose detailed, audited data on their environmental and social impacts using standardised ESRS (European Sustainability Reporting Standards). This means Hummlan and other rating platforms can now access <strong>comparable, third-party-audited data</strong> — not just glossy sustainability reports. The era of self-reported, unverifiable eco-claims is formally ending in Europe.</p>
        <div className="bg-orange-50 border-l-4 border-orange-600 p-4 my-4 rounded-r-xl">
          <p className="font-bold text-gray-900 text-sm mb-1">Stern Take</p>
          <p className="text-gray-700 text-sm">A 60% on-time rate is encouraging for year one, but it also means nearly half of Europe&apos;s largest companies are either unprepared or resistant. Consumers should watch for companies that delayed — and ask why. Transparency delayed is often transparency denied.</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">Source: EU Commission (Primary) | Edie.net analysis (Secondary)</p>
      </>
    ),
  },
  {
    id: 'eu-taxonomy-expands',
    number: 2,
    title: 'Policy Watch — EU Taxonomy Expands to Six New Sectors',
    icon: BookOpen,
    content: (
      <>
        <p><strong>The news:</strong> The European Commission published the final delegated act extending the EU Taxonomy to cover <strong>six new economic sectors</strong> effective 1 July 2026:</p>
        <ol className="list-decimal ml-5 space-y-1 my-3 text-gray-700">
          <li><strong>Textiles</strong> — covering apparel manufacturing and footwear</li>
          <li><strong>Information and Communication Technology</strong> — data centres, cloud computing</li>
          <li><strong>Chemicals</strong> — basic and specialty chemical production</li>
          <li><strong>Food and Beverage</strong> — processing and manufacturing</li>
          <li><strong>Mining and Quarrying</strong> — critical raw materials for the green transition</li>
          <li><strong>Real Estate Construction</strong> — renovation and new-build standards</li>
        </ol>
        <p className="font-bold text-orange-700">Shopper impact — major:</p>
        <p>The <strong>textiles</strong> and <strong>food &amp; beverage</strong> additions are the most consumer-relevant. Fashion brands will now need to demonstrate substantial contribution to climate mitigation, circular economy, and pollution prevention — the same pillars Hummlan uses in our HSS rating. This means our methodology is now formally aligned with regulatory reality, not just best practice.</p>
        <p><strong>What changed from the draft:</strong> The threshold for &quot;Do No Significant Harm&quot; (DNSH) to circular economy was tightened for textiles. Brands using &quot;recyclable&quot; claims will now need to prove actual recycling infrastructure exists for their materials — not just technical recyclability. This kills the &quot;technically recyclable but nobody actually recycles it&quot; loophole.</p>
        <p><strong>Timeline:</strong> Taxonomy-eligible companies in these sectors must report against the new criteria from FY2027, with first reports due mid-2028.</p>
        <p className="text-xs text-gray-400 mt-2">Source: EU Commission Climate Action (Primary)</p>
      </>
    ),
  },
  {
    id: 'hm-shareholder-revolt',
    number: 3,
    title: 'Industry Moves — H&M Faces Shareholder Revolt Over Climate Targets',
    icon: Factory,
    content: (
      <>
        <p><strong>The news:</strong> At H&amp;M&apos;s AGM on 24 June 2026, a coalition of institutional investors representing €1.2bn in shares filed a binding resolution demanding H&amp;M align its short-term emission reduction targets with a 1.5°C pathway — replacing the company&apos;s current &quot;carbon neutral by 2040&quot; pledge with interim science-based targets for 2030. The resolution passed with <strong>58% shareholder support</strong>.</p>
        <p><strong>Why this matters:</strong> H&amp;M has long positioned itself as a sustainability leader in fast fashion with its &quot;Conscious&quot; collection and garment collection program. However, its current targets rely heavily on <strong>offset purchases</strong> rather than absolute emission reductions in its supply chain (Scope 3). The shareholder resolution specifically demands:</p>
        <ul className="list-disc ml-5 space-y-1 my-3 text-gray-700">
          <li>50% absolute reduction in Scope 3 emissions by 2030 (from a 2022 base)</li>
          <li>Elimination of offset-based claims from its &quot;carbon neutral&quot; marketing</li>
          <li>Third-party verification of all sustainability claims via the EU&apos;s forthcoming Green Claims Directive</li>
        </ul>
        <div className="bg-orange-50 border-l-4 border-orange-600 p-4 my-4 rounded-r-xl">
          <p className="font-bold text-gray-900 text-sm mb-1">Stern Take</p>
          <p className="text-gray-700 text-sm">H&amp;M&apos;s Conscious line has always been more marketing than transformation. This vote signals that institutional investors — who were once willing to accept slow progress — are now demanding real supply chain action. The question is whether H&amp;M&apos;s business model (high volume, low margin, fast turnover) can actually deliver absolute emission reductions without shrinking. If it can&apos;t, the &quot;sustainable fast fashion&quot; frame is dead.</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">Source: Edie.net (Primary) | The Guardian (Secondary)</p>
      </>
    ),
  },
  {
    id: 'microplastic-shedding',
    number: 4,
    title: 'Research Spotlight — Microplastic Shedding: Synthetic Fabrics 4x Worse Than Previously Estimated',
    icon: Microscope,
    content: (
      <>
        <p><strong>The study:</strong> A peer-reviewed study published in <em>Nature Communications</em> (June 2026) by researchers at the University of Plymouth found that synthetic fabrics shed <strong>4.2 times more microplastic fibres</strong> during washing than earlier lab studies suggested. The difference? Previous studies tested new fabrics in clean water. This study tested realistically worn fabrics in real laundry conditions with detergent.</p>
        <p><strong>Key findings:</strong></p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 font-bold text-gray-900 border border-gray-200">Fabric Type</th>
                <th className="text-right p-3 font-bold text-gray-900 border border-gray-200">Microfibres per kg per wash (new)</th>
                <th className="text-right p-3 font-bold text-gray-900 border border-gray-200">Microfibres per kg per wash (worn)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="p-3 border border-gray-200 font-medium">Polyester fleece</td>
                <td className="p-3 border border-gray-200 text-right">1.2 million</td>
                <td className="p-3 border border-gray-200 text-right font-bold text-red-600">5.1 million</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border border-gray-200 font-medium">Nylon activewear</td>
                <td className="p-3 border border-gray-200 text-right">0.8 million</td>
                <td className="p-3 border border-gray-200 text-right font-bold text-red-600">3.4 million</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border border-gray-200 font-medium">Polyester-cotton blend</td>
                <td className="p-3 border border-gray-200 text-right">0.3 million</td>
                <td className="p-3 border border-gray-200 text-right font-bold text-amber-600">1.1 million</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border border-gray-200 font-medium">100% cotton</td>
                <td className="p-3 border border-gray-200 text-right">0.03 million</td>
                <td className="p-3 border border-gray-200 text-right font-bold text-green-600">0.08 million</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><strong>Shopper takeaway:</strong> Washing machines are a primary pathway for microplastic pollution, and <strong>older synthetic garments shed significantly more</strong> as fibres break down. The solution is not just &quot;buy a Guppyfriend bag&quot; (though those help, capturing ~30% of fibres). The real solution is:</p>
        <ul className="list-disc ml-5 space-y-1 my-3 text-gray-700">
          <li>Choosing natural fibres (cotton, hemp, wool, linen) over synthetics where possible</li>
          <li>Washing synthetics less frequently, in cold water, on shorter cycles</li>
          <li>Using a microplastic filter on your washing machine (external filters capture 70-90%)</li>
          <li>Replacing older synthetic garments with natural-fibre alternatives</li>
        </ul>
        <div className="bg-orange-50 border-l-4 border-orange-600 p-4 my-4 rounded-r-xl">
          <p className="font-bold text-gray-900 text-sm mb-1">Hummlan Relevance</p>
          <p className="text-gray-700 text-sm">This strengthens the case for natural fibre brands — Pact, Nudie Jeans, People Tree, Thought Clothing — all of which score higher on our Pollution Prevention pillar than synthetic-heavy brands.</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">Source: Nature Communications (Primary) | Carbon Brief coverage (Secondary)</p>
      </>
    ),
  },
  {
    id: 'carbon-neutral-loophole',
    number: 5,
    title: 'Greenwashing Watch — The &quot;Carbon Neutral Certified&quot; Loophole',
    icon: AlertTriangle,
    content: (
      <>
        <p><strong>The claim we&apos;re watching:</strong> A major European airline (name withheld pending regulatory review) has been advertising &quot;100% carbon neutral flights&quot; based on carbon credits purchased from a forestry project in Peru. The UK Advertising Standards Authority (ASA) has launched an investigation after a complaint from Carbon Market Watch.</p>
        <p><strong>The problem:</strong> The carbon credits in question are from a REDD+ forestry project that:</p>
        <ul className="list-disc ml-5 space-y-1 my-3 text-gray-700">
          <li>Was already protected under national law before the offset project began (non-additional)</li>
          <li>Calculated its baseline using outdated deforestation rates (over-crediting)</li>
          <li>Was verified by a certification body that has since been suspended by ICVCM (Integrity Council for the Voluntary Carbon Market)</li>
        </ul>
        <p><strong>Why this matters for shoppers:</strong> &quot;Carbon neutral&quot; claims on flights, shipping, and product delivery are increasingly common. The ASA investigation could set a precedent that <strong>offset-based carbon neutrality claims are inherently misleading</strong> because they imply the activity itself produces no emissions, when in reality the emissions still occur — they&apos;re just &quot;compensated for&quot; elsewhere.</p>
        <p><strong>What to look for</strong> when a brand claims &quot;carbon neutral&quot; shipping or products:</p>
        <ol className="list-decimal ml-5 space-y-1 my-3 text-gray-700">
          <li>Are they reducing emissions first (science-based targets) or just buying offsets?</li>
          <li>Are the offsets certified by ICVCM or similar quality standards?</li>
          <li>Do they disclose the specific offset projects and their additionality evidence?</li>
        </ol>
        <div className="bg-orange-50 border-l-4 border-orange-600 p-4 my-4 rounded-r-xl">
          <p className="font-bold text-gray-900 text-sm mb-1">Hummlan Approach</p>
          <p className="text-gray-700 text-sm">Our HSS rating already distinguishes between brands that reduce emissions (Patagonia, Nudie Jeans) and those that offset without reducing (most others). We never give full credit for offset-only claims.</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">Source: Carbon Market Watch (Primary) | The Guardian (Secondary)</p>
      </>
    ),
  },
];

const quickHits = [
  {
    title: 'EU bans &quot;biodegradable&quot; labels on plastic products without proof of home composting conditions',
    body: 'The new Green Claims Directive implementing act (published 28 June) targets &quot;technically biodegradable&quot; claims where actual biodegradation requires industrial facilities most households don\'t have. Took effect 1 July 2026.',
  },
  {
    title: 'Patagonia\'s Worn Wear program hits 1 million repairs',
    body: 'The outdoor brand\'s repair program crossed the milestone in June. Patagonia reports repaired garments save an average of 3.2 kg CO₂e compared to buying new. Hummlan\'s data: Patagonia scores 95/100 on HSS, maintaining its position as the highest-rated fashion brand in our database.',
  },
  {
    title: 'Tesco trials refillable detergent dispensers in 50 UK stores',
    body: 'Moving beyond the usual &quot;bring your own container&quot; model, Tesco\'s new system uses RFID-tracked reusable bottles that customers swap at automated kiosks. The bottles are professionally washed and refilled, closing the hygiene gap that limited previous refill models.',
  },
  {
    title: 'Global organic cotton production grows 18% year-on-year',
    body: 'The Textile Exchange\'s 2026 Organic Cotton Market Report confirms organic cotton now represents 3.2% of global cotton production, up from 1.8% in 2022. Growth is driven by regulatory pressure (EU Taxonomy textiles criteria) and brand commitments.',
  },
];

export default function NewsDigestPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
          </Link>

          <article className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-12 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider opacity-80">News Digest</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">The Hummlan Hive</h1>
              <p className="text-lg text-orange-100 max-w-2xl leading-relaxed">
                No fluff, no greenwashing, just the facts that matter for conscious shoppers.
              </p>
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-orange-200">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Week of 29 June 2026</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />Edition #1</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 flex items-center justify-center text-xs font-bold">⏱</span>5 minute read</span>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-50 border-b px-8 py-6">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">In this edition</h2>
              <nav className="flex flex-col gap-1.5">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    <span className="flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">{s.number}</span>
                    {s.title}
                  </a>
                ))}
                <a href="#quick-hits" className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors mt-1">
                  <span className="flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">⚡</span>
                  Quick Hits
                </a>
              </nav>
            </div>

            {/* Body */}
            <div className="px-8 py-10 space-y-12">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <section key={section.id} id={section.id}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">#{section.number}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      {section.content}
                    </div>
                  </section>
                );
              })}

              {/* Quick Hits */}
              <section id="quick-hits">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <ChevronRight className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Quick</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Hits</h2>
                <div className="space-y-4">
                  {quickHits.map((hit, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-5 hover:border-orange-200 transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{hit.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{hit.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sources Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sources for This Edition</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-3 font-bold text-gray-900 border border-gray-200">Item</th>
                        <th className="text-left p-3 font-bold text-gray-900 border border-gray-200">Primary Source</th>
                        <th className="text-center p-3 font-bold text-gray-900 border border-gray-200">Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['CSRD enforcement', 'EU Commission / EFRAG', '🟢 Primary'],
                        ['EU Taxonomy expansion', 'EU Commission Climate Action', '🟢 Primary'],
                        ['H&M shareholder vote', 'Edie.net', '🟡 Secondary'],
                        ['Microplastic study', 'Nature Communications', '🟢 Primary'],
                        ['Carbon neutral airline claim', 'Carbon Market Watch', '🟢 Primary'],
                        ['Biodegradable label ban', 'EU Commission (Green Claims Directive)', '🟢 Primary'],
                        ['Patagonia Worn Wear', 'Patagonia annual report', '🟢 Primary'],
                        ['Tesco refill trial', 'Edie.net / Tesco press release', '🟡 Secondary'],
                        ['Organic cotton report', 'Textile Exchange', '🟢 Primary'],
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-3 border border-gray-200 font-medium">{row[0]}</td>
                          <td className="p-3 border border-gray-200">{row[1]}</td>
                          <td className="p-3 border border-gray-200 text-center">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Footer */}
              <div className="border-t pt-8 text-sm text-gray-500 space-y-2">
                <p><em>The Hummlan Hive is a weekly sustainability news digest published by Hummlan. We curate stories that matter for conscious shoppers — no fluff, no greenwashing, just the signal through the noise.</em></p>
                <p>Have a story tip? <a href="mailto:hello@hummlan.com" className="text-orange-600 hover:underline font-medium">Contact us</a>.</p>
                <p className="font-medium text-gray-700">Next edition: Week of 6 July 2026.</p>
              </div>
            </div>
          </article>

          {/* Related links */}
          <div className="mt-12 bg-white border rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/learn" className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
                <p className="font-bold text-gray-900">Learning Hub</p>
                <p className="text-sm text-gray-600">Browse all guides and explainers</p>
              </Link>
              <Link href="/search" className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
                <p className="font-bold text-gray-900">HSS Search Engine</p>
                <p className="text-sm text-gray-600">Check any brand&apos;s sustainability score</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
