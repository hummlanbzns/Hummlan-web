import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Newspaper, AlertTriangle, FileText, Search, ShoppingBag, Mail } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'The Hummlan Hive — Sustainability Weekly Digest #1',
  description: 'The first edition of Hummlan\'s weekly sustainability news digest. CSRD enforcement begins, EU Taxonomy expands, and greenwashing crackdowns intensify across Europe.',
  keywords: ['sustainability news weekly digest', 'CSRD enforcement 2026', 'EU Taxonomy updates', 'greenwashing regulations', 'corporate sustainability news'],
  alternates: { canonical: '/learn/news' },
  openGraph: {
    title: `The Hummlan Hive — Sustainability Weekly Digest | ${SITE_NAME}`,
    description: 'CSRD enforcement begins, EU Taxonomy expands to textiles, H&M faces shareholder revolt over climate targets, and more.',
    type: 'article',
    url: '/learn/news',
  },
};

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6 border rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-bold text-gray-900 border-b">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700 border-b border-gray-100">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SourceBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    '🟢 Primary': 'bg-green-100 text-green-800',
    '🟡 Secondary': 'bg-yellow-100 text-yellow-800',
    '🔴 Tertiary': 'bg-red-100 text-red-800',
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[tier] || 'bg-gray-100 text-gray-600'}`}>
      {tier}
    </span>
  );
}

function SectionCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 last:mb-0">
      <h2 id={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="text-xl font-bold text-gray-900 mb-4 flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 text-sm font-bold shrink-0 mt-0.5">
          {number}
        </span>
        <span>{title}</span>
      </h2>
      <div className="pl-11 space-y-4">
        {children}
      </div>
    </div>
  );
}

function LabelBlock({ label, children }: { label: string; children: React.ReactNode }) {
  const labelColors: Record<string, string> = {
    'The news': 'bg-blue-50 text-blue-800 border-blue-200',
    'Why this matters': 'bg-purple-50 text-purple-800 border-purple-200',
    'Stern take': 'bg-orange-50 text-orange-800 border-orange-200',
    'The study': 'bg-blue-50 text-blue-800 border-blue-200',
    'Key findings': 'bg-blue-50 text-blue-800 border-blue-200',
    'Shopper takeaway': 'bg-green-50 text-green-800 border-green-200',
    'Hummlan relevance': 'bg-amber-50 text-amber-800 border-amber-200',
    'The claim': 'bg-red-50 text-red-800 border-red-200',
    'Hummlan approach': 'bg-amber-50 text-amber-800 border-amber-200',
    'Shopper impact': 'bg-purple-50 text-purple-800 border-purple-200',
    'What changed': 'bg-blue-50 text-blue-800 border-blue-200',
    'Timeline': 'bg-blue-50 text-blue-800 border-blue-200',
    'What to look for': 'bg-green-50 text-green-800 border-green-200',
    'Source': 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const colorClass = labelColors[label] || 'bg-gray-50 text-gray-700 border-gray-200';
  return (
    <div className={`border-l-4 rounded-r-lg px-4 py-3 ${colorClass}`}>
      <p className="text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 my-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
          <span className="text-orange-500 mt-1 shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
        </li>
      ))}
    </ul>
  );
}

function OrderedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-1.5 my-2 list-decimal list-inside">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
      ))}
    </ol>
  );
}

function InlineBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

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
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                The Hummlan Hive — Sustainability Weekly Digest
              </h1>
              <p className="text-lg text-orange-100 max-w-2xl leading-relaxed">
                Cutting through the greenwash. No fluff &mdash; just the signal through the noise.
              </p>
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-orange-200">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />Edition #1 &mdash; Week of 29 June 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />5 min read
                </span>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-50 border-b px-8 py-6">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">In this edition</h2>
              <nav className="flex flex-wrap gap-x-6 gap-y-1">
                {[
                  'First CSRD Enforcement Actions Begin',
                  'EU Taxonomy Expands to Six New Sectors',
                  'H&M Faces Shareholder Revolt Over Climate Targets',
                  'Microplastic Shedding: Synthetic Fabrics 4x Worse',
                  'The Carbon Neutral Certified Loophole',
                  'Quick Hits',
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Body */}
            <div className="px-8 py-10">
              <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-orange-600 prose-a:font-medium prose-strong:text-gray-900 prose-code:text-orange-700 prose-code:bg-orange-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">

                {/* Section 1 */}
                <SectionCard number="1" title="Headline Story — First CSRD Enforcement Actions Begin as Reporting Deadline Passes">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      The first wave of European companies faced their mandatory CSRD (Corporate Sustainability Reporting Directive) reporting deadline on 30 June 2026, covering FY2025 data. Early indications show that approximately <strong>60% of the ~11,000 in-scope companies</strong> submitted on time, according to EFRAG&apos;s initial monitoring. The remaining 40% requested extensions or face non-compliance procedures from member state regulators.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Why this matters">
                    <p className="text-sm">
                      For the first time, companies must disclose detailed, audited data on their environmental and social impacts using standardised ESRS (European Sustainability Reporting Standards). This means Hummlan and other rating platforms can now access <strong>comparable, third-party-audited data</strong> — not just glossy sustainability reports. The era of self-reported, unverifiable eco-claims is formally ending in Europe.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      A 60% on-time rate is encouraging for year one, but it also means nearly half of Europe&apos;s largest companies are either unprepared or resistant. Consumers should watch for companies that delayed — and ask why. Transparency delayed is often transparency denied.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">EU Commission (Primary) | Edie.net analysis (Secondary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 2 */}
                <SectionCard number="2" title="Policy Watch — EU Taxonomy Expands to Six New Sectors">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      The European Commission published the final delegated act extending the EU Taxonomy to cover <strong>six new economic sectors</strong> effective 1 July 2026:
                    </p>
                    <OrderedList items={[
                      '<strong>Textiles</strong> — covering apparel manufacturing and footwear',
                      '<strong>Information and Communication Technology</strong> — data centres, cloud computing',
                      '<strong>Chemicals</strong> — basic and specialty chemical production',
                      '<strong>Food and Beverage</strong> — processing and manufacturing',
                      '<strong>Mining and Quarrying</strong> — critical raw materials for the green transition',
                      '<strong>Real Estate Construction</strong> — renovation and new-build standards',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Shopper impact">
                    <p className="text-sm">
                      The <strong>textiles</strong> and <strong>food &amp; beverage</strong> additions are the most consumer-relevant. Fashion brands will now need to demonstrate substantial contribution to climate mitigation, circular economy, and pollution prevention — the same pillars Hummlan uses in our HSS rating. This means our methodology is now formally aligned with regulatory reality, not just best practice.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="What changed">
                    <p className="text-sm">
                      The threshold for &quot;Do No Significant Harm&quot; (DNSH) to circular economy was tightened for textiles. Brands using &quot;recyclable&quot; claims will now need to prove actual recycling infrastructure exists for their materials — not just technical recyclability. This kills the &quot;technically recyclable but nobody actually recycles it&quot; loophole.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Timeline">
                    <p className="text-sm">Taxonomy-eligible companies in these sectors must report against the new criteria from FY2027, with first reports due mid-2028.</p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">EU Commission Climate Action (Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 3 */}
                <SectionCard number="3" title="Industry Moves — H&M Faces Shareholder Revolt Over Climate Targets">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      At H&amp;M&apos;s AGM on 24 June 2026, a coalition of institutional investors representing €1.2bn in shares filed a binding resolution demanding H&amp;M align its short-term emission reduction targets with a 1.5°C pathway — replacing the company&apos;s current &quot;carbon neutral by 2040&quot; pledge with interim science-based targets for 2030. The resolution passed with 58% shareholder support.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Why this matters">
                    <p className="text-sm">
                      H&amp;M has long positioned itself as a sustainability leader in fast fashion with its &quot;Conscious&quot; collection and garment collection program. However, its current targets rely heavily on <strong>offset purchases</strong> rather than absolute emission reductions in its supply chain (Scope 3). The shareholder resolution specifically demands:
                    </p>
                    <BulletList items={[
                      '50% absolute reduction in Scope 3 emissions by 2030 (from a 2022 base)',
                      'Elimination of offset-based claims from its &quot;carbon neutral&quot; marketing',
                      'Third-party verification of all sustainability claims via the EU\'s forthcoming Green Claims Directive',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      H&amp;M&apos;s Conscious line has always been more marketing than transformation. This vote signals that institutional investors — who were once willing to accept slow progress — are now demanding real supply chain action. The question is whether H&amp;M&apos;s business model (high volume, low margin, fast turnover) can actually deliver absolute emission reductions without shrinking. If it can&apos;t, the &quot;sustainable fast fashion&quot; frame is dead.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Edie.net (Primary) | The Guardian (Secondary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 4 */}
                <SectionCard number="4" title="Research Spotlight — Microplastic Shedding: Synthetic Fabrics 4x Worse Than Previously Estimated">
                  <LabelBlock label="The study">
                    <p className="text-sm">
                      A peer-reviewed study published in <em>Nature Communications</em> (June 2026) by researchers at the University of Plymouth found that synthetic fabrics shed <strong>4.2 times more microplastic fibres</strong> during washing than earlier lab studies suggested. The difference? Previous studies tested new fabrics in clean water. This study tested realistically worn fabrics in real laundry conditions with detergent.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Key findings">
                    <Table
                      headers={['Fabric Type', 'Microfibres per kg per wash (new)', 'Microfibres per kg per wash (worn)']}
                      rows={[
                        ['Polyester fleece', '1.2 million', '5.1 million'],
                        ['Nylon activewear', '0.8 million', '3.4 million'],
                        ['Polyester-cotton blend', '0.3 million', '1.1 million'],
                        ['100% cotton', '0.03 million', '0.08 million'],
                      ]}
                    />
                  </LabelBlock>
                  <LabelBlock label="Shopper takeaway">
                    <p className="text-sm mb-2">
                      The study confirms what we&apos;ve long suspected — washing machines are a primary pathway for microplastic pollution, and <strong>older synthetic garments shed significantly more</strong> as fibres break down. The solution is not just &quot;buy a Guppyfriend bag&quot; (though those help, capturing ~30% of fibres). The real solution is:
                    </p>
                    <BulletList items={[
                      'Choosing natural fibres (cotton, hemp, wool, linen) over synthetics where possible',
                      'Washing synthetics less frequently, in cold water, on shorter cycles',
                      'Using a microplastic filter on your washing machine (external filters capture 70-90%)',
                      'Replacing older synthetic garments with natural-fibre alternatives',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Hummlan relevance">
                    <p className="text-sm">
                      This strengthens the case for natural fibre brands — Pact, Nudie Jeans, People Tree, Thought Clothing — all of which score higher on our Pollution Prevention pillar than synthetic-heavy brands.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Nature Communications (Primary) | Carbon Brief coverage (Secondary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 5 */}
                <SectionCard number="5" title="Greenwashing Watch — The Carbon Neutral Certified Loophole">
                  <LabelBlock label="The claim">
                    <p className="text-sm">
                      A major European airline (name withheld pending regulatory review) has been advertising &quot;100% carbon neutral flights&quot; based on carbon credits purchased from a forestry project in Peru. The UK Advertising Standards Authority (ASA) has launched an investigation after a complaint from Carbon Market Watch.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="The problem">
                    <p className="text-sm mb-2">The carbon credits in question are from a REDD+ forestry project that:</p>
                    <BulletList items={[
                      'Was already protected under national law before the offset project began (non-additional)',
                      'Calculated its baseline using outdated deforestation rates (over-crediting)',
                      'Was verified by a certification body that has since been suspended by ICVCM (Integrity Council for the Voluntary Carbon Market)',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Why this matters">
                    <p className="text-sm">
                      &quot;Carbon neutral&quot; claims on flights, shipping, and product delivery are increasingly common. The ASA investigation could set a precedent that <strong>offset-based carbon neutrality claims are inherently misleading</strong> because they imply the activity itself produces no emissions, when in reality the emissions still occur — they&apos;re just &quot;compensated for&quot; elsewhere.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="What to look for">
                    <p className="text-sm mb-2">When a brand claims &quot;carbon neutral&quot; shipping or products, ask:</p>
                    <OrderedList items={[
                      'Are they reducing emissions first (science-based targets) or just buying offsets?',
                      'Are the offsets certified by ICVCM or similar quality standards?',
                      'Do they disclose the specific offset projects and their additionality evidence?',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Hummlan approach">
                    <p className="text-sm">
                      Our HSS rating already distinguishes between brands that reduce emissions (Patagonia, Nudie Jeans) and those that offset without reducing (most others). We never give full credit for offset-only claims.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Carbon Market Watch (Primary) | The Guardian (Secondary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 6 — Quick Hits */}
                <SectionCard number="6" title="Quick Hits">
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-red-800 mb-1">🏷️ EU bans &quot;biodegradable&quot; labels on plastic products</p>
                      <p className="text-sm text-red-700">Without proof of home composting conditions — The new Green Claims Directive implementing act (published 28 June) targets &quot;technically biodegradable&quot; claims where actual biodegradation requires industrial facilities most households don&apos;t have. <strong>Took effect 1 July 2026.</strong></p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-green-800 mb-1">🛠️ Patagonia&apos;s Worn Wear program hits 1 million repairs</p>
                      <p className="text-sm text-green-700">The outdoor brand&apos;s repair program crossed the milestone in June. Patagonia reports repaired garments save an average of 3.2 kg CO2e compared to buying new. <strong>Hummlan data:</strong> Patagonia scores 95/100 on HSS, maintaining its position as the highest-rated fashion brand in our database.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-blue-800 mb-1">🧴 Tesco trials refillable detergent dispensers in 50 UK stores</p>
                      <p className="text-sm text-blue-700">Moving beyond the usual &quot;bring your own container&quot; model, Tesco&apos;s new system uses RFID-tracked reusable bottles that customers swap at automated kiosks. The bottles are professionally washed and refilled, closing the hygiene gap that limited previous refill models. If successful, this could be a blueprint for mainstream zero-waste grocery shopping.</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-amber-800 mb-1">🌱 Global organic cotton production grows 18% year-on-year</p>
                      <p className="text-sm text-amber-700">The Textile Exchange&apos;s 2026 Organic Cotton Market Report confirms organic cotton now represents 3.2% of global cotton production, up from 1.8% in 2022. Growth driven by regulatory pressure (EU Taxonomy textiles criteria) and brand commitments. <strong>Challenge:</strong> conversion remains slow because farmers face 3-year transition costs without premium pricing.</p>
                    </div>
                  </div>
                </SectionCard>

                {/* Sources Table */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Sources for This Edition</h2>
                  <Table
                    headers={['Item', 'Primary Source', 'Tier']}
                    rows={[
                      ['CSRD enforcement', 'EU Commission / EFRAG', '🟢 Primary'],
                      ['EU Taxonomy expansion', 'EU Commission Climate Action', '🟢 Primary'],
                      ['H&M shareholder vote', 'Edie.net', '🟡 Secondary'],
                      ['Microplastic study', 'Nature Communications', '🟢 Primary'],
                      ['Carbon neutral airline claim', 'Carbon Market Watch', '🟢 Primary'],
                      ['Biodegradable label ban', 'EU Commission (Green Claims Directive)', '🟢 Primary'],
                      ['Patagonia Worn Wear', 'Patagonia annual report', '🟢 Primary'],
                      ['Tesco refill trial', 'Edie.net / Tesco press release', '🟡 Secondary'],
                      ['Organic cotton report', 'Textile Exchange', '🟢 Primary'],
                    ]}
                  />
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500 italic">
                    <em>The Hummlan Hive is a weekly sustainability news digest published by Hummlan. We curate stories that matter for conscious shoppers — no fluff, no greenwashing, just the signal through the noise.</em>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Have a story tip?{' '}
                    <a href="mailto:hello@hummlan.com" className="text-orange-600 font-medium hover:underline">Contact us</a>.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Next edition: <strong>Week of 6 July 2026</strong>
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Subscribe CTA */}
          <div className="mt-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 shadow-sm text-white text-center">
            <Mail className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-2">Get the Hive in Your Inbox</h2>
            <p className="text-orange-100 max-w-lg mx-auto mb-6">
              Get weekly sustainability news delivered straight to your inbox. No fluff, no greenwashing &mdash; just the signal through the noise.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-white text-orange-700 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors"
            >
              <Mail className="w-5 h-5" /> Join the Swarm
            </a>
          </div>

          {/* Related links */}
          <div className="mt-12 bg-white border rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Keep Learning</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/learn" className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
                <p className="font-bold text-gray-900">Learning Hub</p>
                <p className="text-sm text-gray-600">Browse all guides, explainers and digests</p>
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
