import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Newspaper, AlertTriangle, FileText, Search, ShoppingBag, Mail } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'The Hummlan Hive — Sustainability Weekly Digest #2 | China Climate Plan, EU Nature Targets & Greenwashing News',
  description: "Edition #2 of Hummlan's weekly digest: China's new five-year climate plan, the world falling short on biodiversity targets, UK's new leader on net-zero, and more.",
  keywords: ['sustainability news weekly digest', 'China climate policy 2026', 'EU biodiversity targets', 'corporate sustainability news', 'renewable energy', 'greenwashing regulations'],
  alternates: { canonical: '/learn/news' },
  openGraph: {
    title: `The Hummlan Hive — Sustainability Weekly Digest #2 | ${SITE_NAME}`,
    description: "China's new five-year climate plan, the world falling short on biodiversity targets, UK's new leader on net-zero, and more.",
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
    'Why it matters for shoppers': 'bg-purple-50 text-purple-800 border-purple-200',
    'The Carbon Brief analysis': 'bg-blue-50 text-blue-800 border-blue-200',
    'The findings that matter for consumers': 'bg-green-50 text-green-800 border-green-200',
    'What this means for Hummlan readers': 'bg-amber-50 text-amber-800 border-amber-200',
    'The uncomfortable truth': 'bg-red-50 text-red-800 border-red-200',
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
                  <Calendar className="w-4 h-4" />Edition #2 &mdash; Week of 3 August 2026
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
                  'China\'s New Five-Year Climate Plan: Emissions Set to Reverse',
                  'Nature & Biodiversity — World Falling Short on 22 of 23 Global Nature Targets',
                  'Policy Watch — UK\'s New Leader on Climate: Andy Burnham\'s Net-Zero Vision',
                  'Extreme Weather — Europe\'s May and June Heatwaves: Death Toll and Counting',
                  'Greenwashing Watch — Carbon Capture Claims Under Fire',
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
                {/* Section 1 — China Climate Plan */}
                <SectionCard number="1" title="Headline Story — China's New Five-Year Climate Plan: Emissions Set to Reverse">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      On 6 August 2026, China released its 15th Five-Year Plan for climate change, marking a significant shift in the world&apos;s largest emitter&apos;s approach. The plan sets binding targets for:
                    </p>
                    <BulletList items={[
                      '**Peak CO₂ emissions** before 2025 (confirmed achieved)',
                      '**Absolute reductions in coal consumption** by 2027',
                      '**Non-fossil energy** reaching 45% of primary energy by 2030',
                      'A reformed **emissions trading scheme** expanding to cover cement, aluminium, and aviation',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Why it matters for shoppers">
                    <p className="text-sm">
                      China dominates global supply chains for solar panels (80%+ of manufacturing), wind turbines, lithium-ion batteries, and critical minerals processing. The new plan includes specific provisions for **green supply chain reporting** for Chinese exporters to the EU — aligning with the EU&apos;s Carbon Border Adjustment Mechanism (CBAM). This means products manufactured in China for European markets will increasingly carry verified carbon footprint data, making it easier for consumers to compare the climate impact of imported goods.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="The Carbon Brief analysis">
                    <p className="text-sm">
                      China&apos;s CO₂ emissions already appear to have entered structural decline. An analysis published 15 May 2025 first identified the reversal, attributed to:
                    </p>
                    <BulletList items={[
                      'Record-breaking renewable energy installation (1,200 GW combined solar and wind by mid-2026)',
                      'Declining steel and cement output as the property sector contracts',
                      'Rapid EV adoption (EVs reached 50% of new car sales in China by Q2 2026)',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      This is genuinely significant — China was the primary driver of global emission growth for two decades. However, the plan still includes new coal-fired power plants as &quot;flexibility capacity&quot; for grid balancing, and the emissions trading scheme&apos;s carbon price remains too low (~¥60/tonne ≈ €7.70) to drive real abatement. Progress is real, but the pace remains behind what the Paris Agreement requires.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Carbon Brief (06.08.2026, Primary) | Analysis: Clean energy put China&apos;s CO₂ emissions into reverse (15.05.2025, Secondary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 2 — Nature & Biodiversity */}
                <SectionCard number="2" title="Nature & Biodiversity — World Falling Short on 22 of 23 Global Nature Targets">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      A draft UN report, published 29 July 2026, reveals that the world is falling short on 22 of the 23 Global Biodiversity Framework targets set for 2030. The only target on track? Protecting 30% of land and sea areas (&quot;30×30&quot;) — which itself relies on generous definitions of &quot;protected&quot; that include areas with active mining and logging permits.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="The findings that matter for consumers">
                    <BulletList items={[
                      '**Target 1:** &quot;Space planning to retain high-biodiversity areas&quot; — off track. Only 12% of signatory nations have completed spatial plans.',
                      '**Target 7:** &quot;Reduce pollution from excess nutrients, pesticides, and plastics&quot; — significantly off track. Global plastic production continues to rise despite voluntary commitments.',
                      '**Target 15:** &quot;Businesses assess and disclose impacts on biodiversity&quot; — partially on track. The EU&apos;s CSRD and TNFD (Taskforce on Nature-related Financial Disclosures) framework are driving corporate adoption, but primarily among European-headquartered firms.',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      The &quot;30×30&quot; target sounds like a win, but the devil is in the definition. Marine protected areas where bottom-trawling continues aren&apos;t really &quot;protected.&quot; Terrestrial reserves that allow logging aren&apos;t &quot;conserved.&quot; The UN draft report is honest about this — but national governments are less so. For shoppers, this means &quot;sustainably sourced&quot; claims on products from countries with weak protected-area enforcement need extra scrutiny.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Carbon Brief (29.07.2026, Primary) — UN draft report assessment</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 3 — UK Leader on Climate */}
                <SectionCard number="3" title="Policy Watch — UK's New Leader on Climate: Andy Burnham's Net-Zero Vision">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      Andy Burnham, the UK&apos;s new Prime Minister (took office July 2026), has a track record on climate that Carbon Brief and others are scrutinising closely. Key positions from his recent statements and past record as Greater Manchester Mayor:
                    </p>
                    <BulletList items={[
                      '**Net-zero 2038 for Greater Manchester** — As Mayor, Burnham committed the city-region to a 2038 net-zero target, one of the most ambitious in the UK. His government is expected to accelerate the national 2050 target.',
                      '**Public transport ownership** — Burnham pioneered London-style public transport franchising in Manchester, with plans to expand zero-emission bus fleets nationally.',
                      '**Onshore wind ban** — He supports lifting England&apos;s effective ban on onshore wind, which the previous government maintained despite widespread public support.',
                      '**Oil and gas licensing** — Burnham has signalled he will not issue new North Sea oil and gas licences, aligning UK policy with the International Energy Agency&apos;s pathway to net-zero.',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      The UK remains a primary market for Hummlan. Changes to energy policy (onshore wind, grid decarbonisation) directly affect the &quot;Climate Impact&quot; pillar of our HSS ratings for UK-based brands and products. A faster grid decarbonisation timeline means lower scope 2 emissions for all UK manufacturers — a genuine positive that will be reflected in updated ratings.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      Burnham&apos;s record is genuinely strong on climate compared to his predecessors. However, the fiscal environment is challenging — the UK carries high debt, and public investment in green infrastructure faces competing demands from healthcare, defence, and social care. The gap between ambition and funded delivery remains the critical question.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Carbon Brief — &quot;28 quotes from new UK leader Andy Burnham on climate&quot; (July 2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 4 — Extreme Weather */}
                <SectionCard number="4" title="Extreme Weather — Europe's May and June Heatwaves: Death Toll and Counting">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      A study published 17 July 2026 in <em>Nature Medicine</em> estimated the excess mortality attributable to Europe&apos;s May and June 2026 heatwaves at <strong>4,800 deaths</strong> across France, Germany, Spain, Italy, and the UK. The methodology compares observed deaths to a modelled baseline of expected mortality, accounting for an ageing population that is more vulnerable to heat.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Key findings">
                    <Table
                      headers={['Country', 'Estimated Excess Deaths (May–June 2026)', 'Heatwave Days']}
                      rows={[
                        ['France', '1,650', '12'],
                        ['Italy', '1,210', '14'],
                        ['Spain', '960', '10'],
                        ['Germany', '580', '8'],
                        ['United Kingdom', '400', '6'],
                      ]}
                    />
                  </LabelBlock>
                  <LabelBlock label="The uncomfortable truth">
                    <p className="text-sm">
                      The study notes that heatwave mortality was 30% lower than equivalent events in 2022 and 2023, suggesting that early-warning systems and public health responses are improving. However, the absolute number of deaths remains stubbornly high because:
                    </p>
                    <BulletList items={[
                      'Urban heat island effects are worsening as cities densify',
                      'Night-time temperatures are rising faster than daytime highs, reducing recovery time',
                      'An ageing European population means more people are physiologically vulnerable',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Hummlan relevance">
                    <p className="text-sm">
                      Climate adaptation — not just mitigation — is now a material factor for supply chains. Brands with manufacturing or warehousing in Southern Europe face increasing heat-related risks (workplace safety, crop yield impacts, logistics disruptions). We will be monitoring how our rated brands disclose these risks under CSRD&apos;s ESRS E1 (Climate Change) reporting standard.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Carbon Brief / Nature Medicine (17.07.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 5 — Greenwashing Watch */}
                <SectionCard number="5" title="Greenwashing Watch — Carbon Capture Claims Under Fire">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      A Carbon Brief Q&amp;A published 3 August 2026 examines the growing controversy around &quot;carbon capture and storage&quot; (CCS) claims used by fossil fuel companies to justify continued extraction. The analysis finds that:
                    </p>
                    <BulletList items={[
                      '**Current global CCS capacity:** ~45 million tonnes CO₂ per year — equivalent to just **0.1% of global energy-related emissions**',
                      '**Cost:** CCS remains prohibitively expensive ($60-160/tonne captured) compared to renewable alternatives ($0-20/tonne abated through solar/wind)',
                      '**Track record:** Several high-profile CCS projects (Gorgon LNG in Australia, Petrobras Santos Basin in Brazil) have failed to meet injection targets by 50-80%',
                      '**The new twist:** The oil industry is now marketing &quot;CCS-enabled oil&quot; — crude oil produced with associated carbon capture — as a premium product, with claims appearing in European fuel marketing',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Why this matters for shoppers">
                    <p className="text-sm">
                      Major oil companies are branding petrol/diesel as &quot;carbon captured&quot; or &quot;net-zero fuel.&quot; These claims are misleading because:
                    </p>
                    <OrderedList items={[
                      'The capture rate is never 100%',
                      'The captured CO₂ is often used for enhanced oil recovery (injecting CO₂ to extract more oil)',
                      'The emissions from burning the fuel are still released to the atmosphere',
                      'Most CCS projects are massively subsidised by taxpayers',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      CCS has a legitimate role in industrial processes (cement, steel, chemicals) where alternatives are limited. But using it to market &quot;green petrol&quot; is the most brazen greenwashing play of 2026. The EU&apos;s Green Claims Directive, once fully implemented, should require that &quot;carbon captured&quot; fuel claims be accompanied by evidence that the capture rate exceeds 90%, the CO₂ is permanently stored (not used for EOR), and the claim applies only to the well-to-tank portion of the lifecycle — which is a fraction of the total emissions.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Carbon Brief — Q&amp;A: Does the world need carbon capture to reach net-zero? (03.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 6 — Quick Hits */}
                <SectionCard number="6" title="Quick Hits">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-blue-800 mb-1">🌊 &quot;Super El Niño&quot; could bring wet winter to western US</p>
                      <p className="text-sm text-blue-700">Climate scientists are warning that a strong El Niño developing in the Pacific could trigger heavy rainfall and flooding across California and the southwestern US this winter. While this would provide drought relief, the risk of catastrophic flooding is elevated. <strong>Source:</strong> The Guardian (August 2026).</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-amber-800 mb-1">♻️ Plastics contamination an &quot;overlooked&quot; problem in food waste composting</p>
                      <p className="text-sm text-amber-700">Experts are warning that compostable food waste is increasingly contaminated with microplastics from packaging, undermining the environmental benefits of food waste recycling schemes. The presence of PLA &quot;compostable&quot; plastics in industrial composting facilities creates microplastic pollution in the finished compost — and the labelling loophole means consumers can&apos;t distinguish home-compostable from industrially-compostable. <strong>Source:</strong> The Guardian (August 2026).</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-red-800 mb-1">💨 Trump administration pays $1.22bn to cut offshore wind leases</p>
                      <p className="text-sm text-red-700">In a controversial move, the Trump administration has agreed to pay a German energy firm $1.22 billion to cancel offshore wind development leases in federal waters. Environmental groups have condemned the move as a taxpayer-funded subsidy for the fossil fuel industry. <strong>Source:</strong> The Guardian (August 2026).</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-green-800 mb-1">🌳 Australian fined $195,000 for removing 287 trees</p>
                      <p className="text-sm text-green-700">A Sydney homeowner was fined nearly $200,000 for illegally removing 287 native trees from a harbourside property to improve water views. The case underscores the tension between property rights and biodiversity protection in urban areas. <strong>Source:</strong> The Guardian (August 2026).</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-purple-800 mb-1">☀️ European solar installations pass 1 TW milestone</p>
                      <p className="text-sm text-purple-700">Europe&apos;s cumulative solar photovoltaic capacity has passed 1 terawatt, according to industry data. The milestone was driven by record installations in Germany, Spain, and Poland. However, grid connection bottlenecks and negative wholesale electricity prices during peak solar hours are emerging as constraints on further growth. <strong>Source:</strong> Industry data / Carbon Brief analysis (July 2026).</p>
                    </div>
                  </div>
                </SectionCard>

                {/* Sources Table */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Sources for This Edition</h2>
                  <Table
                    headers={['Item', 'Primary Source', 'Tier']}
                    rows={[
                      ['China five-year climate plan', 'Carbon Brief (06.08.2026)', '🟢 Primary'],
                      ['China CO₂ reversal analysis', 'Carbon Brief (15.05.2025)', '🟢 Primary'],
                      ['UN biodiversity targets', 'Carbon Brief (29.07.2026)', '🟢 Primary'],
                      ['UK PM Burnham on climate', 'Carbon Brief (July 2026)', '🟢 Primary'],
                      ['Europe heatwave deaths', 'Nature Medicine / Carbon Brief (17.07.2026)', '🟢 Primary'],
                      ['Carbon capture controversy', 'Carbon Brief (03.08.2026)', '🟢 Primary'],
                      ['Super El Niño', 'The Guardian (August 2026)', '🟡 Secondary'],
                      ['Plastics composting', 'The Guardian (August 2026)', '🟡 Secondary'],
                      ['Offshore wind cancellation', 'The Guardian (August 2026)', '🟡 Secondary'],
                      ['Australian tree removal', 'The Guardian (August 2026)', '🟡 Secondary'],
                      ['European solar 1 TW', 'Industry data / Carbon Brief', '🟢 Primary'],
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
                    Next edition: <strong>Week of 10 August 2026</strong>
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