import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Newspaper, AlertTriangle, FileText, Search, ShoppingBag, Mail } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sustainability Weekly Digest #3 | Hottest July, Europe Heatwave Energy Crisis, UK Plastic Waste & More',
  description: "Edition #3 of Hummlan's weekly digest: Hottest July on record in the US, Europe's grid under heatwave strain, the truth about UK plastic recycling, a rewilding success story, and quick hits.",
  keywords: ['sustainability news weekly digest', 'hottest July 2026', 'Europe heatwave energy grid', 'nuclear power heatwave', 'waste colonialism UK plastic exports', 'Caspian tiger rewilding', 'UK COBRA extreme heat'],
  alternates: { canonical: '/learn/news' },
  openGraph: {
    title: `Sustainability Weekly Digest #3 | ${SITE_NAME}`,
    description: "Hottest July on record in the US, Europe's grid under heatwave strain, the truth about UK plastic recycling, a rewilding success story, and quick hits.",
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
    'The details': 'bg-blue-50 text-blue-800 border-blue-200',
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
                  <Calendar className="w-4 h-4" />Edition #3 &mdash; Week of 10 August 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />6 min read
                </span>
              </div>
            </div>
            {/* Table of Contents */}
            <div className="bg-gray-50 border-b px-8 py-6">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">In this edition</h2>
              <nav className="flex flex-wrap gap-x-6 gap-y-1">
                {[
                  'Headline Story — Hottest July on Record: US and Europe in the Grip of Extreme Heat',
                  'Energy & the Grid — Heatwaves Don\'t Discriminate: Nuclear, Gas, and Renewables All Feel the Strain',
                  'Waste & Circular Economy — "Waste Colonialism": The Truth About UK Plastic Recycling',
                  'Nature & Biodiversity — Caspian Tiger Returns to Kazakhstan After 70 Years',
                  'Quick Hits — What Else Happened This Week',
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
                {/* Section 1 — Hottest July on Record */}
                <SectionCard number="1" title="Headline Story — Hottest July on Record: US and Europe in the Grip of Extreme Heat">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      July 2026 was the hottest month ever recorded in the United States, according to new data from the National Oceanic and Atmospheric Administration (NOAA). The average temperature across the contiguous US was 3.3&deg;F (1.8&deg;C) above the 20th-century average, surpassing previous records set during the Dust Bowl (July 1936) and July 2012. The dataset goes back to 1895.
                    </p>
                    <p className="text-sm mt-2">
                      The US blistered under three separate heat dome events, with Wyoming recording its hottest July ever &mdash; a staggering 5.1&deg;F above average. Wildfire smoke from blazes in Canada and the US Pacific Northwest blanketed parts of the country for much of the month.
                    </p>
                    <p className="text-sm mt-2 font-bold">Across the Atlantic, Europe is enduring its hottest summer on record. In the UK:</p>
                    <BulletList items={[
                      'The country is facing its **fifth heatwave of the summer**.',
                      'The number of days reaching 30&deg;C in a single year has hit a **new record of 35 days** (beating the 34-day record set in 1995), according to the Met Office.',
                      'Prime Minister Andy Burnham chaired an emergency COBRA meeting on 12 August as temperatures are forecast to reach 38&deg;C. Wildfires are stretching emergency services, with the &quot;fire wave&quot; described as the most widespread the UK has ever experienced.',
                      'An exclusive Guardian investigation reveals that England is &quot;desperately unprepared&quot; for climate adaptation: **just 20 of 6,600 staff at the Department for Environment, Food and Rural Affairs (Defra) are working on climate adaptation** amid drought and wildfires.',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      The lived reality of a warming world directly affects the supply chains behind the products we rate. Extreme heat disrupts transport, reduces agricultural yields, strains energy grids, and increases the carbon footprint of cooling systems. When we assess a brand&apos;s &quot;Climate Impact&quot; under HSS, we consider the resilience of its supply chain to climate disruption &mdash; not just its emissions. Brands that invest in climate adaptation (sustainable water management, heat-resilient logistics, renewable cooling) score higher for a reason.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      Every &quot;hottest month on record&quot; headline is both a news story and a warning that was issued decades ago. The UK&apos;s COBRA meeting is reactive, not proactive. The finding that 20 out of 6,600 Defra staff work on adaptation speaks volumes about the gap between political rhetoric and institutional capacity. The climate is changing faster than governments are adapting. For shoppers, this means the products you buy today are coming through supply chains that are increasingly stressed &mdash; and that stress will only grow.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;July was hottest month ever recorded in US&quot; (10.08.2026, NOAA data, Primary) | The Guardian &mdash; &quot;Andy Burnham to chair emergency Cobra meeting amid extreme heat&quot; (12.08.2026, Primary) | The Guardian &mdash; &quot;Just 20 of 6,600 Defra staff working on climate adaptation&quot; (12.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 2 — Energy & the Grid */}
                <SectionCard number="2" title="Energy & the Grid — Heatwaves Don't Discriminate: Nuclear, Gas, and Renewables All Feel the Strain">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      When temperatures soared past 40&deg;C in parts of Europe in June and July 2026, every type of electricity generation was affected &mdash; yet some commentators were quick to blame &quot;intermittent&quot; wind and solar while downplaying the impact on gas and nuclear. A detailed Carbon Brief factcheck (published 4 August 2026) sets the record straight.
                    </p>
                    <p className="text-sm mt-2 font-bold">Nuclear:</p>
                    <BulletList items={[
                      'During the July 2026 heatwave, **3 of France&apos;s 57 reactors shut down**; generation was reduced at another 7, causing an almost 9% dip in nuclear power production.',
                      'Low river levels on the Danube hit reactors in Romania and Hungary. A Swiss reactor also shuttered due to high river temperatures.',
                      'On Monday 3 August, **2.44 GW &mdash; or 40% &mdash; of south-east Europe&apos;s nuclear capacity was offline** due to drought in the Danube, according to data company Montel. The Associated Press reported the Danube was not expected to return to normal levels for &quot;days or even weeks,&quot; pushing some countries &quot;to the brink of energy emergency.&quot;',
                      '12% of the French nuclear fleet was offline due to heat-related reasons on the same Monday.',
                      '**However:** heatwaves cut annual nuclear generation by only 0.6% on average (2003–2022). France&apos;s losses fell from 5.5 TWh in 2003 to 0.5 TWh in 2022 &mdash; a 90% reduction through cooling upgrades and better operating practices.',
                    ]} />
                    <p className="text-sm mt-2 font-bold">Gas:</p>
                    <BulletList items={[
                      'At 40&deg;C, a gas-fired power station&apos;s capacity drops by 13% and efficiency by 7% compared to 20&deg;C, according to Electric Insights.',
                      'Simple gas turbines lose about 10% output per 10&deg;C rise, says Dr Iain Staffell of Imperial College London.',
                      'Power line capacity falls by up to 16% for a 10&deg;C rise.',
                      'Gas plants made up 79% of the capacity that dropped off California&apos;s grid during the August 2020 rolling blackouts.',
                    ]} />
                    <p className="text-sm mt-2 font-bold">Wind:</p>
                    <BulletList items={[
                      'Wind speeds drop during heatwaves (high-pressure &quot;heat domes&quot;). A 2024 study found **wind power decreased by 30–50% during heatwaves** across Australia, northern Asia, and Europe.',
                      'In the UK in June 2026, wind generation fell to ~15% of the mix (from a ~30% average). The National Electricity System Operator (Neso) paid &pound;1,400/MWh to secure 1.7 GW of imported power &mdash; nearly 20 times the average June 2025 price.',
                    ]} />
                    <p className="text-sm mt-2 font-bold">Solar:</p>
                    <BulletList items={[
                      'Despite the myth that solar &quot;struggles&quot; in heat, each 1&deg;C rise only reduces output by 0.4–0.5%, which is easily outweighed by long, cloudless days.',
                      'Across a 4-day UK heatwave in June 2026, solar generated 484 GWh &mdash; a **46% increase** over the same period a week earlier.',
                      '**EU solar generated a record 52 TWh in June 2026**, beating the previous month&apos;s record of 47 TWh.',
                      'The Guardian (12 August 2026) reports that heat pumps &mdash; often seen as a heating technology &mdash; are increasingly being used for cooling, with owners reporting 21&deg;C indoor temperatures when it&apos;s 35&deg;C outside.',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      The anti-renewables playbook is predictable &mdash; blame wind and solar when the grid strains, while ignoring that gas and nuclear are also compromised by extreme heat. The reality is more nuanced: **all generation types are affected by heatwaves, but solar + battery storage is uniquely complementary to the problem (air conditioning demand peaks when the sun shines).** The Daily Mail&apos;s claim that wind was to blame for UK grid strain on 24 June 2026 is simply false &mdash; its own article acknowledged that gas plants had also cut output by 2.5 GW that day. For consumers, the lesson is: don&apos;t let selective narratives shape your view of energy. The grid needs flexibility, storage, and resilience &mdash; not a blame game.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">Carbon Brief &mdash; &quot;Factcheck: How nuclear, gas, wind and solar power are affected during heatwaves&quot; (04.08.2026, Primary) | Associated Press via Carbon Brief (03.08.2026, Secondary) | The Guardian &mdash; &quot;Heat pumps can cool your home&quot; (12.08.2026, Secondary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 3 — Waste & Circular Economy */}
                <SectionCard number="3" title='Waste & Circular Economy — "Waste Colonialism": The Truth About UK Plastic Recycling'>
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      A Guardian investigation (published 4 August 2026) has revealed that **high levels of microplastics and plastic contamination** have been found in a waterway in Adana, Turkey, close to a major recycling hub supplied with plastic waste by British companies.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Key findings">
                    <BulletList items={[
                      'The UK exported **139,000 tonnes of rubbish** to poor districts in Adana, Turkey.',
                      'The Environmental Investigation Agency (EIA) identified **13 British companies** that sent plastic to the Kemal Deniz recycling site between 2021 and 2024.',
                      'The polluted waterway floods into agricultural fields after heavy rain and feeds into a canal used for irrigating crops on the &Ccedil;ukurova plain &mdash; **one of the largest and most fertile agricultural basins in Turkey.**',
                      'A follow-up article (6 August 2026, also by the Guardian) went deeper: &quot;The Turkish city carrying the weight of Britain&apos;s pollution problem&quot; &mdash; farmers report microplastics, toxic smoke from burning waste, and debris in their fields.',
                      'Residents protest with banners reading: &quot;Plastic waste imports should be banned.&quot;',
                      'This comes after global talks to end the plastic crisis collapsed in 2025.',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      The UK is one of the world&apos;s largest exporters of plastic waste. The term &quot;recycling&quot; often masks a system where waste is shipped to countries with weaker environmental regulations. When we assess a brand&apos;s &quot;Circular Economy &amp; Waste&quot; pillar under HSS, we look at whether its recycling claims are backed by verifiable, domestic processing &mdash; not just export to facilities that may or may not handle waste responsibly. Brands that use recycled content in their products and can trace it to certified processors score higher.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      This is the uncomfortable truth the recycling industry doesn&apos;t advertise. &quot;Recycled in the UK&quot; often means &quot;shipped to Turkey where it pollutes someone else&apos;s water and soil.&quot; The UK government pledged to reduce plastic waste exports, but the data shows 139,000 tonnes still flowing. Until there is domestic infrastructure to actually process what we throw away, &quot;recycling&quot; remains a euphemism for waste displacement. For conscious shoppers, the most reliable choice remains reducing plastic consumption at the source &mdash; not trusting that your recycling bin&apos;s contents will be dealt with responsibly.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;UK plastic &apos;waste colonialism&apos; found to be polluting Turkey&apos;s farming heartland&quot; (04.08.2026, Primary) | The Guardian &mdash; &quot;&apos;Waste colonialism&apos; &ndash; the Turkish city carrying the weight of Britain&apos;s pollution problem&quot; (06.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 4 — Nature & Biodiversity */}
                <SectionCard number="4" title="Nature & Biodiversity — Caspian Tiger Returns to Kazakhstan After 70 Years">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      On 31 July 2026, a female tiger named <strong>&quot;Umit&quot;</strong> (meaning &quot;hope&quot; in Kazakh) was released into a nature reserve on the edge of Lake Balkhash in Kazakhstan &mdash; the first time a Caspian tiger has roamed the country&apos;s wilds in over 70 years. The Guardian reported the story on 11 August 2026.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="The details">
                    <BulletList items={[
                      'Umit was wild-caught in the Russian Far East and transported to Kazakhstan as part of a decade-long rewilding project.',
                      'Kazakhstan has become the **first country in the world to restore its tiger range** after the species was thought extinct there.',
                      'A wild-caught male flown from Russia is still being monitored and will be released when ready.',
                      'Two wild tiger cubs are being reared in special enclosures with minimal human contact, expected to be released next year.',
                      'The goal is to establish a **self-sustaining population of about 50 tigers**, feasting on boar, deer, and kulans (a type of wild donkey).',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      Biodiversity restoration is a key pillar of the HSS rating system. While most corporate sustainability efforts focus on emissions reduction, the Kunming-Montreal Global Biodiversity Framework requires businesses to assess and disclose their impacts on nature. Rewilding success stories like this one demonstrate that ecosystem restoration is possible &mdash; but they require long-term commitment, political will, and significant funding. For shoppers, the question to ask is: does the brand you&apos;re buying from have a biodiversity policy that goes beyond &quot;we plant trees&quot;?
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      This is genuinely good news &mdash; a rare bright spot in an otherwise bleak biodiversity picture. The Caspian tiger&apos;s return is a testament to what conservation can achieve with sustained effort. However, rewilding one apex predator in one country, while meaningful, is a drop in the ocean compared to the scale of biodiversity loss globally. The UN&apos;s draft report from late July (covered in Edition #2) found the world is falling short on 22 of 23 biodiversity targets. Celebrating wins like this is important &mdash; but it must not distract from the systemic failures elsewhere.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;The return of the Caspian tiger: how a species feared extinct has come back to Kazakhstan&quot; (11.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 5 — Quick Hits */}
                <SectionCard number="5" title="Quick Hits — What Else Happened This Week">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-blue-800 mb-1">🐚 Falkland Islands salmon farm referendum</p>
                      <p className="text-sm text-blue-700">The 3,500-strong population of the Falkland Islands is calling for a referendum on a proposed massive salmon farm. Unity Marine (a joint venture between a local fishing company and a Danish firm) wants to farm 50,000 tonnes of salmon annually in 16 locations &mdash; the largest industrial inshore development in the archipelago&apos;s history. Supporters say it could add &pound;35 million/year (11% of GDP) and 133 jobs. Critics fear salmon waste will damage the kelp forests that are spawning grounds for squid &mdash; a commercially critical species. Consultation runs through 30 October. <strong>Source:</strong> The Guardian (09.08.2026).</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-amber-800 mb-1">🐔 Farm animals in heatwaves</p>
                      <p className="text-sm text-amber-700">Claire Bass of Humane World for Animals UK warns that the government&apos;s climate adaptation plans have a &quot;troubling blind spot&quot; for animal welfare. French media reported that 1–3 million birds died in a single week during June&apos;s 44&deg;C heatwave. Pigs and poultry begin suffering above 27&deg;C, and UK temperatures could reach 45&deg;C by 2056 per the Met Office. The Animal Welfare (Sentience) Act 2022 requires ministers to consider animals as sentient beings &mdash; yet current discourse treats deaths as &quot;reduced productivity.&quot; <strong>Source:</strong> The Guardian Letters (11.08.2026).</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-red-800 mb-1">🇨🇳 China&apos;s 15th Five-Year Climate Plan</p>
                      <p className="text-sm text-red-700">Carbon Brief&apos;s Q&amp;A (published 6 August 2026) examines China&apos;s new five-year plan for climate change. The plan does not include any major new targets, instead consolidating existing policies: carbon intensity -17% over five years, carbon market per-product intensity -3%, and a target of 30 MtCO₂e reduction capacity from non-CO₂ greenhouse gases by 2030. The Ministry of Ecology and Environment describes it as &quot;the main policy instrument&quot; for 2026–2030. <em>Stern take:</em> Reaffirmation is not acceleration. China&apos;s emissions may have peaked, but the pace of reduction remains behind what the Paris Agreement requires. <strong>Source:</strong> Carbon Brief (06.08.2026).</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-green-800 mb-1">🔥 Defra&apos;s climate adaptation staffing gap</p>
                      <p className="text-sm text-green-700">Just 20 of 6,600 staff at the UK&apos;s Department for Environment, Food and Rural Affairs work on climate adaptation. England is &quot;desperately unprepared&quot; for water shortages, heatwaves, and wildfires. <strong>Source:</strong> The Guardian (12.08.2026).</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-purple-800 mb-1">❄️ Heat pumps can cool your home</p>
                      <p className="text-sm text-purple-700">A Guardian feature (12 August 2026) highlights how heat pumps, often seen as a heating technology, are being used for cooling during heatwaves. One owner in Maidenhead, Berkshire, reports keeping his living room at 21&deg;C when it&apos;s 35&deg;C outside. A recent study found that using a heat pump for cooling can &quot;significantly reduce overheating&quot; in modern homes. <strong>Source:</strong> The Guardian (12.08.2026).</p>
                    </div>
                  </div>
                </SectionCard>

                {/* Sources Table */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Sources for This Edition</h2>
                  <Table
                    headers={['Item', 'Primary Source', 'Tier']}
                    rows={[
                      ['Hottest July on record in the US', 'The Guardian (10.08.2026) / NOAA', '🟢 Primary'],
                      ['UK COBRA emergency meeting on extreme heat', 'The Guardian (12.08.2026)', '🟢 Primary'],
                      ['Defra climate adaptation staffing gap', 'The Guardian (12.08.2026)', '🟢 Primary'],
                      ['Heatwave impact on nuclear, gas, wind, solar', 'Carbon Brief (04.08.2026)', '🟢 Primary'],
                      ['Danube drought – SE Europe nuclear capacity offline', 'Associated Press (03.08.2026, via Carbon Brief)', '🟡 Secondary'],
                      ['Heat pumps used for cooling', 'The Guardian (12.08.2026)', '🟡 Secondary'],
                      ['UK plastic waste exports to Turkey ("waste colonialism")', 'The Guardian (04.08.2026)', '🟢 Primary'],
                      ['Waste colonialism deep-dive: Adana, Turkey', 'The Guardian (06.08.2026)', '🟢 Primary'],
                      ['Caspian tiger reintroduction, Kazakhstan', 'The Guardian (11.08.2026)', '🟢 Primary'],
                      ['Falkland Islands salmon farm referendum', 'The Guardian (09.08.2026)', '🟡 Secondary'],
                      ['Farm animals & heatwaves', 'The Guardian Letters (11.08.2026)', '🟡 Secondary'],
                      ['China\'s 15th Five-Year Plan for climate change', 'Carbon Brief (06.08.2026)', '🟢 Primary'],
                    ]}
                  />
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500 italic">
                    <em>The Hummlan Hive is a weekly sustainability news digest produced by the Hummlan.com team. Our mission is to make sustainability transparent, accessible, and affordable &mdash; no fluff, no greenwashing, just the facts that matter for conscious shoppers.</em>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Have a tip or story suggestion?{' '}
                    <a href="mailto:hive@hummlan.com" className="text-orange-600 font-medium hover:underline">Email us</a>.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Next edition: <strong>Week of 17 August 2026</strong>
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
              <Link href="/about" className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
                <p className="font-bold text-gray-900">Our HSS Methodology</p>
                <p className="text-sm text-gray-600">How the Hummlan Sustainability Score actually works</p>
              </Link>
              <Link href="/best-of" className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
                <p className="font-bold text-gray-900">Best-Of Guides</p>
                <p className="text-sm text-gray-600">Stern-rated sustainable products at real prices</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}