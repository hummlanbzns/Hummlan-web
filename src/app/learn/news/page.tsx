import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Newspaper, AlertTriangle, FileText, Search, ShoppingBag, Mail } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sustainability Weekly Digest #4 | UK EV Targets Watered Down, California Bans Paraquat, Amazon El Niño & More',
  description: "Edition #4 of Hummlan's weekly digest: the UK's climate contradiction (EV targets cut as wildfires rage), record-low reservoirs and Thames Water's £500m white elephant, California's paraquat ban, the Amazon's El Niño threat, beavers on UK farms and humpbacks back in Rio.",
  keywords: ['sustainability news weekly digest', 'UK EV targets ZEV mandate 2030', 'California paraquat ban', 'El Niño Amazon rainforest', 'Thames Water desalination plant', 'England reservoirs drought', 'beaver dams UK farming', 'humpback whales Rio', 'Europe wildfires arson arrests', 'disposable barbecue ban'],
  alternates: { canonical: '/learn/news' },
  openGraph: {
    title: `Sustainability Weekly Digest #4 | ${SITE_NAME}`,
    description: "Edition #4 of Hummlan's weekly digest: the UK's climate contradiction (EV targets cut as wildfires rage), record-low reservoirs and Thames Water's £500m white elephant, California's paraquat ban, the Amazon's El Niño threat, beavers on UK farms and humpbacks back in Rio.",
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
    'The cost of watering down': 'bg-red-50 text-red-800 border-red-200',
    'The facts are stark': 'bg-red-50 text-red-800 border-red-200',
    'The broader picture this month': 'bg-blue-50 text-blue-800 border-blue-200',
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
                  <Calendar className="w-4 h-4" />Edition #4 &mdash; Week of 17 August 2026
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
                  'Headline Story — The Climate Contradiction: UK Waters Down EV Targets While Wildfires Rage',
                  "Water & Infrastructure — Record-Low Reservoirs and Thames Water's £500m 'White Elephant'",
                  "Food & Health — California Finally Bans Paraquat: A Pesticide the EU Outlawed Long Ago",
                  'Climate & Forests — El Niño Is About to Peak at the Worst Possible Moment for the Amazon',
                  "Farming & Nature — Beavers, Hedges and Tougher Crops: How UK Farmers Are Fighting Drought",
                  "Biodiversity — Humpbacks Return to Rio: A Recovery Story With a New Question",
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
                {/* Section 1 — Headline Story */}
                <SectionCard number="1" title="Headline Story — The Climate Contradiction: UK Waters Down EV Targets While Wildfires Rage">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      On Friday 14 August &mdash; the same day Prime Minister Andy Burnham publicly acknowledged that the climate crisis is behind the hundreds of wildfires ripping across the UK &mdash; his government launched a consultation that could cut the country&apos;s electric vehicle (EV) sales targets by nearly half. Under the current &quot;zero-emission vehicles&quot; (ZEV) mandate, battery EVs must make up a rising share of new car sales: 33% in 2026, rising to 80% in 2030. The new consultation offers options to leave the 2030 target unchanged, or cut it to 70%, 60% &mdash; or as low as <strong>50% of all new cars</strong>.
                    </p>
                    <p className="text-sm mt-2 font-bold">The timing is striking. The same week saw:</p>
                    <BulletList items={[
                      'The **military deployed** to help fight wildfires, with dozens of homes destroyed and people injured, including in Stourbridge in the West Midlands.',
                      'A **ban on the sale of disposable barbecues** and the activation of the national alert system to warn people in England and Wales of fire risk.',
                      'Burnham&apos;s own words: &quot;We cannot accept this as the new normal. This isn&apos;t happening in isolation. Much of England and Wales is in drought and we are in another period of extreme heat. Farmers are watching crops fail and firefighters have faced hundreds of wildfires in a matter of weeks. This is what climate change looks like, here and now.&quot;',
                    ]} />
                    <p className="text-sm mt-2">
                      Meanwhile, more than 50 green organisations &mdash; including Greenpeace, WWF, Friends of the Earth, the Women&apos;s Institute, Uplift and Green New Deal Rising &mdash; wrote to Burnham urging him to &quot;show leadership&quot; and name the cause of the crisis. Their letter points out that after chairing a COBRA meeting on the heatwave and drought, his statement focused on disposable barbecues and did not mention the climate crisis once.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="The cost of watering down">
                    <p className="text-sm">
                      Carbon Brief analysis (published 12 August) finds that weakening the mandate to 50% by 2030 could:
                    </p>
                    <BulletList items={[
                      'Leave up to **3 million fewer battery EVs** on UK roads by 2030 (estimate by NGO T&amp;E).',
                      'Require the UK to import an **extra 17 million barrels of oil** in 2030 &mdash; an 8% rise in expected net imports &mdash; and add **2.5% to national emissions** that year.',
                      'Cost UK consumers an estimated **£3 billion a year by 2030** &mdash; because EVs are already cheaper to own: about **£1,100 a year cheaper to run** than a petrol car, and more than £1,000 a year cheaper overall, according to the Energy and Climate Intelligence Unit (ECIU).',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      Transport is one of the biggest chunks of a household&apos;s carbon footprint, and the UK&apos;s EV policy sends a signal to every car buyer &mdash; and every manufacturer &mdash; about what the future looks like. Under HSS, we rate the &quot;Climate Impact&quot; of brands, but the policy environment matters too: a weakened mandate means fewer affordable EVs, more petrol and diesel cars on second-hand markets for longer, and higher running costs for households that stay on fossil fuels. The claim that weakening targets &quot;protects consumers&quot; is hard to square with the numbers above.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      This is a textbook case of words and action diverging. It is possible &mdash; and fair &mdash; to debate the pace of the EV transition, the grid&apos;s readiness, and the cost of new cars. But launching a consultation to weaken the single biggest consumer transport policy in the same week you call the climate emergency &quot;the new normal&quot; is not a policy debate; it&apos;s a contradiction. If EVs are already cheaper to own, then watering down targets serves the lobbying interests of parts of the car industry, not household budgets. The UK is also reported to be accepting new North Sea drilling &mdash; the opposite direction to the Paris Agreement. Consumers deserve consistency: if the government names the crisis, its policies should follow.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;Andy Burnham criticised for moving to cut electric vehicle (EV) sales targets... at a time of devastating wildfires&quot; (14.08.2026, Primary) | Carbon Brief &mdash; &quot;Analysis: Weaker EV targets could cost UK consumers £3bn a year by 2030&quot; (12.08.2026, Primary) | The Guardian &mdash; &quot;Green groups urge Andy Burnham to break silence on climate crisis&quot; (14.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 2 — Water & Infrastructure */}
                <SectionCard number="2" title="Water & Infrastructure — Record-Low Reservoirs and Thames Water's £500m 'White Elephant'">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      Almost three-quarters of England &mdash; and the whole of Wales &mdash; is now in drought, and the water that millions of households rely on is running low. Environment Agency data from 11 August shows <strong>five key reservoirs at &quot;exceptionally low&quot; levels</strong>:
                    </p>
                    <BulletList items={[
                      '**Wimbleball** (South West Water, Somerset): **46%** full',
                      '**Clatworthy** (Somerset): **48%**',
                      '**Hanningfield** (Essex): **56%**',
                      '**Clywedog** (Powys): **56%**',
                      '**Dove group** (Derbyshire): **69%**',
                    ]} />
                    <p className="text-sm mt-2">
                      Across England, total reservoir levels have fallen to <strong>66%</strong> &mdash; down from 69% the week before and nearly 14 percentage points below what is expected for this time of year. Of the 32 reservoirs the Environment Agency classifies as strategically important or geographically representative, just four are at normal levels (Draycote, Bewl, Roadford and Vyrnwy). The National Hydrological Monitoring Programme calls July&apos;s aridity &quot;unprecedented&quot; and warns that &quot;widespread below-normal to exceptionally low&quot; water flows are likely to persist well into the autumn, with &quot;further deterioration&quot; possible.
                    </p>
                    <p className="text-sm mt-2">
                      Meanwhile, Thames Water &mdash; which supplies 16 million customers in London and the Thames valley &mdash; is preparing to restart the UK&apos;s only desalination plant at Beckton, east London, &quot;by the end of the year&quot;. The plant:
                    </p>
                    <BulletList items={[
                      'Cost **£270 million** to install when it fully opened in 2011; its total cost is now estimated at **£500 million**.',
                      'Has run **only five times in 15 years**, providing 7.2 billion litres of drinking water &mdash; about **seven days&apos; worth of London&apos;s demand** &mdash; in that entire period.',
                      'Won&apos;t be ready until winter, **long after the current drought is likely to have passed** &mdash; to &quot;support reservoir recovery over the winter&quot;, the company says.',
                    ]} />
                    <p className="text-sm mt-2">
                      Hosepipe bans are now in force across much of the UK, and the prime minister is due to decide Thames Water&apos;s future in the coming weeks.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      Water is the silent input to almost everything we buy &mdash; food, clothing, electronics, cleaning products. When reservoirs fall this low, supply chains tighten and prices follow. Under HSS we assess brands&apos; resource efficiency and their exposure to water risk; companies that waste water in drought-prone regions will feel it in both ratings and bills. For households, the desalination story is a reminder that &quot;building our way out&quot; is often more expensive and more carbon-intensive than using less in the first place.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      A £500 million plant that has run five times in 15 years is not water security &mdash; it&apos;s infrastructure theatre. Restarting it after the drought has ended, to &quot;build up reservoirs over winter&quot;, is a confession that planning has failed: the asset exists, the drought is happening, and it still can&apos;t help in time. Desalination is also energy-hungry and carbon-heavy &mdash; the opposite of the resource efficiency HSS rewards. The honest fix is fixing leakage and reducing demand, not polishing white elephants. The UK&apos;s privatised water system has a lot of explaining to do &mdash; and the drought is the moment to do it.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;Five reservoirs in England and Wales &apos;exceptionally low&apos; as drought persists&quot; (14.08.2026, Primary) | The Guardian &mdash; &quot;Thames Water plans to restart desalination plant &ndash; after drought has ended&quot; (14.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 3 — Food & Health */}
                <SectionCard number="3" title="Food & Health — California Finally Bans Paraquat: A Pesticide the EU Outlawed Long Ago">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      California &mdash; the largest agricultural producer and the largest user of paraquat in the United States &mdash; has banned the highly toxic herbicide. It is the second US state to do so, after Vermont, and the decision follows a 2024 state law requiring regulators to act.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="The facts are stark">
                    <BulletList items={[
                      'Paraquat is **already outlawed in more than 70 countries**, including the UK, the EU and China. The US Environmental Protection Agency (EPA) reapproved it for use in both 2021 and 2024.',
                      'About **14 million pounds are sprayed every year** on US wine grapes, pistachios, almonds, walnuts, pears, citrus, soya beans, cotton and other crops &mdash; most heavily in California&apos;s Central Valley and the Mississippi River valley.',
                      'Public health advocates describe it as a substance &quot;virtually proven&quot; to cause **Parkinson&apos;s disease**: research shows paraquat interferes with dopamine production, and agricultural workers and communities are most at risk.',
                      'There is **no antidote** for paraquat poisoning. Exposure is linked to death, cancer, heart failure, kidney failure, liver failure and scarring of the lungs.',
                      '&quot;Paraquat is the most acutely lethal pesticide ever made,&quot; said Nathan Donley of the Center for Biological Diversity.',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      This is a consumer story as much as a farming one. Much of the food on European shelves is imported, and residues of pesticides banned in the EU can still reach us through global supply chains. Under HSS&apos;s &quot;Pollution Prevention&quot; pillar, we look at how brands manage toxic inputs and whether their certifications (organic and similar standards prohibit paraquat) are backed by traceable supply chains. The lesson: &quot;legal where it was grown&quot; is not the same as &quot;safe&quot;.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      The EU banned paraquat in 2007. California &mdash; the world&apos;s fifth-largest economy &mdash; took until 2026. This is a case study in how regulation lags behind evidence when industry pushback is strong, and a reminder that &quot;approved by regulators&quot; is a floor, not a guarantee. California&apos;s move is genuinely good news for farmworkers and communities; it is also a rebuke to the EPA, which has reapproved the chemical twice in the 2020s. Consumers can&apos;t inspect every field &mdash; that&apos;s exactly why strong regulation and honest certification matter.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;California bans paraquat, highly toxic herbicide outlawed in more than 70 countries&quot; (13.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 4 — Climate & Forests */}
                <SectionCard number="4" title="Climate & Forests — El Niño Is About to Peak at the Worst Possible Moment for the Amazon">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      Scientists are predicting that the current El Niño &mdash; on course to be the <strong>strongest in 150 years &quot;by a mind-blowing margin&quot;</strong> &mdash; will peak at the worst possible time for the world&apos;s largest tropical rainforest: the end of the dry season, between October and December, when rivers are at their lowest and the undergrowth is most likely to be tinder dry.
                    </p>
                    <p className="text-sm mt-2">
                      The Amazon is already reeling. Human-driven climate disruption is relentlessly heating the planet and amplifying extreme weather; now the El Niño drought threatens to land on top of that, with a delayed rainy season raising the risk of widespread fire in a forest already damaged by heat and deforestation. As one Guardian analysis puts it, the combination &quot;should worry us all&quot; &mdash; not just those who live there.
                    </p>
                    <p className="text-sm mt-2 font-bold">The broader picture this month:</p>
                    <BulletList items={[
                      '**Europe:** hottest June and July in history, with wildfires in France and Greece and water shortages in the Seine, Rhine and Danube basins; three-quarters of England in drought.',
                      '**Asia:** record heat in South Korea and Japan; Typhoon Dolphin turned Shanghai&apos;s streets into rivers, forced more than 1 million people to evacuate; floods killed more than 100 people in India.',
                      '**North America:** &quot;out of control&quot; wildfires forced tens of thousands to flee British Columbia.',
                      '**Middle East &amp; Africa:** the UAE registered 51.2&deg;C in Al Dhafra; the UN predicts a severe hit to food production in Africa.',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      The Amazon is the planet&apos;s rainmaker and one of its largest carbon stores. When it burns, the carbon released accelerates the very heating that dried it &mdash; a feedback loop with global consequences, including for food prices. Coffee, cocoa, soya and beef are among the commodities whose supply chains reach into Amazon-adjacent regions; brands that buy these ingredients without traceability are exposed to both climate and reputational risk. Under HSS, biodiversity and deforestation risk are part of how we rate a brand&apos;s real-world impact.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      This story deserves more attention than it is getting. A &quot;Godzilla&quot; El Niño peaking over a stressed rainforest is not a distant weather event &mdash; it is a potential accelerator of the entire climate crisis, with knock-on effects on food production, migration and prices. The honest framing: we are now in the phase where climate disruption and natural variability compound each other. Preparation, forest protection and rapid emissions cuts are the only levers left, and none of them can be switched on after the fires start.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;El Niño may peak at the worst time for the Amazon &ndash; and it should worry us all&quot; (14.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 5 — Farming & Nature */}
                <SectionCard number="5" title="Farming & Nature — Beavers, Hedges and Tougher Crops: How UK Farmers Are Fighting Drought">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      Britain&apos;s farmers are adapting &mdash; fast &mdash; to a climate their crops weren&apos;t designed for. This summer&apos;s heat and drought brought the <strong>earliest UK cereals harvest in at least 20 years</strong>, according to the Agriculture and Horticulture Development Board, and the second hot, dry and windy summer in a row for many growers. The Guardian spoke to farmers across the country about how they&apos;re coping:
                    </p>
                    <BulletList items={[
                      '**Soil health first:** farmers in the Nature Friendly Farming Network are improving soil so it holds more water, and planting bigger, bushier hedges and more trees to &quot;slow the flow of air down&quot; &mdash; as Cambridgeshire farmer Martin Lines puts it, this summer has been &quot;like a hot hairdryer on everything... it just saps the moisture out&quot;.',
                      '**Water storage:** ponds, collection tanks and farm reservoirs are being installed &mdash; though they are costly, need planning permission and aren&apos;t always enough for long dry spells.',
                      '**Drought-resistant crops:** growers are trialling varieties that can cope with less water.',
                      '**Beavers:** nature&apos;s own water engineers are increasingly part of the picture &mdash; beaver dams slow water flow, raise water tables and keep streams running through dry periods, helping both crops and wildlife.',
                      '**The other side of the coin:** the same techniques (healthy soil, dams, ponds) also slow floodwater &mdash; adaptation for drought doubles as protection against the floods that increasingly follow.',
                    ]} />
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      What happens on farms shows up in your shopping basket &mdash; in prices, in availability, and in the environmental claims on packaging. &quot;Regenerative&quot; and &quot;nature-friendly&quot; labels are spreading fast, and some of them are now backed by real practices (soil building, hedgerows, water retention). Under HSS, we treat those claims with scepticism until we can see the practice &mdash; but nature-based solutions like beaver reintroduction and soil restoration are exactly the kind of measures that genuinely score well on both the Biodiversity and Circular Economy pillars.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      This is a good-news story that doesn&apos;t let anyone off the hook. Farmers are innovating because the system failed them &mdash; decades of emissions have locked in the heat and drought they are now adapting to, and public policy has been slow to support the transition. Beavers and hedges buy time and build resilience; they do not replace cutting emissions at source. And adaptation has limits: not every farm can afford a reservoir, which is why the burden must not fall on farmers alone. Celebrate the ingenuity &mdash; but name the system that made it necessary.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;Tougher crops and beaver dams: how UK farmers are tackling drought&quot; (14.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 6 — Biodiversity */}
                <SectionCard number="6" title="Biodiversity — Humpbacks Return to Rio: A Recovery Story With a New Question">
                  <LabelBlock label="The news">
                    <p className="text-sm">
                      Humpback whales are back in Rio de Janeiro &mdash; and for the first time in living memory, they&apos;re being spotted inside Guanabara Bay, with at least 18 sightings this year alone. The whales have been returning to Brazil&apos;s coast in growing numbers as populations recover from centuries of whaling, and tourists are flocking to see them: whale-watching operators have started running outings from Rio itself, with boats regularly encountering pairs of the 50-tonne animals breaching against the backdrop of the city&apos;s jungle-cloaked mountains.
                    </p>
                    <p className="text-sm mt-2">
                      But the recovery brings a new tension. While the return of the humpbacks is celebrated as a conservation success, some marine biologists are asking whether the booming tourism that now surrounds them helps or hinders. Whales migrate along the Brazilian coast between June and November, from feeding grounds around South Georgia and the South Sandwich Islands to the warmer breeding waters of the Abrolhos Bank &mdash; and unregulated boats, noise and crowding can stress the very animals people come to admire.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="What this means for Hummlan readers">
                    <p className="text-sm">
                      The humpback comeback is proof that biodiversity recovery is possible when exploitation stops and protection works. But it also shows how quickly a conservation win can become a new pressure: &quot;ecotourism&quot; that isn&apos;t managed responsibly can harm the species it depends on. Under HSS&apos;s Biodiversity pillar, we look at whether a company&apos;s nature-positive claims cover its whole footprint &mdash; including the wildlife experiences it sells. For consumers, the question is whether the whale-watching operator you book with follows codes of conduct, limits boat numbers, and gives the animals space.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Stern take">
                    <p className="text-sm">
                      Enjoy the good news &mdash; whales breaching in Rio&apos;s bay is genuinely remarkable. But note the speed with which the recovery has been commodified: &quot;You can&apos;t put a price on this show&quot; is exactly the sentiment that turns conservation wins into overcrowded encounters. Recovery plus unregulated attention can become a new kind of harm. The test of whether tourism helps is rules, not enthusiasm: Brazil&apos;s regulators need to set limits before the boats multiply, not after the whales start avoiding the bay.
                    </p>
                  </LabelBlock>
                  <LabelBlock label="Source">
                    <p className="text-sm">The Guardian &mdash; &quot;Humpbacks return to Rio: the whales are back from the brink of extinction &ndash; but will tourism help or hinder?&quot; (12.08.2026, Primary)</p>
                  </LabelBlock>
                </SectionCard>

                {/* Section 7 — Quick Hits */}
                <SectionCard number="7" title="Quick Hits — What Else Happened This Week">
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-red-800 mb-1">🚒 Hundreds arrested as wildfires rage across Europe</p>
                      <p className="text-sm text-red-700">French authorities say 474 people, including 183 minors, have been detained on suspicion of starting wildfires since 1 July. In Croatia, a fire engulfed homes in a holiday resort, killing one person, injuring 40 and forcing 1,200 to evacuate; blazes also hit Germany, Greece and Spain as the EU warned of &quot;very extreme&quot; wildfire conditions and about 150 million Europeans faced 35&deg;C or more. <strong>Source:</strong> The Guardian (14.08.2026).</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-purple-800 mb-1">🐙 World&apos;s first industrial octopus farm shelved</p>
                      <p className="text-sm text-purple-700">Spanish seafood giant Nueva Pescanova has dropped its controversial plan to farm octopus on Gran Canaria (it had predicted 3,000 tonnes a year by 2025), citing &quot;business and regulatory&quot; reasons. Activists and scientists, who argued the intelligent animals should not be farmed industrially, called it a victory. <strong>Source:</strong> The Guardian (13.08.2026).</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-green-800 mb-1">🕊️ White storks released in Cornwall</p>
                      <p className="text-sm text-green-700">Twenty-one white storks, most hatched this year, were released on Bodmin Moor in the project&apos;s first release; organisers hope they will return to breed in a few years after wintering in southern Spain or Morocco. <strong>Source:</strong> The Guardian (14.08.2026).</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-amber-800 mb-1">🦆 H5N1 bird flu arrives in Australia</p>
                      <p className="text-sm text-amber-700">A descendant of the virus that emerged in Chinese poultry in 1996 has, after 30 years of evolution and migration, begun killing wild birds in Australia. Risk to humans is currently low, but scientists fear decimation of seal populations after tens of thousands of deaths in South America and Antarctica. <strong>Source:</strong> The Guardian (14.08.2026).</p>
                    </div>
                  </div>
                </SectionCard>

                {/* Sources Table */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Sources for This Edition</h2>
                  <Table
                    headers={['Item', 'Primary Source', 'Tier']}
                    rows={[
                      ['UK waters down EV sales targets (ZEV mandate consultation)', 'The Guardian (14.08.2026)', '🟢 Primary'],
                      ['Cost of weaker EV targets (£3bn, oil imports, emissions)', 'Carbon Brief (12.08.2026)', '🟢 Primary'],
                      ['Green groups\' letter to the PM on climate silence', 'The Guardian (14.08.2026)', '🟢 Primary'],
                      ['Five reservoirs \'exceptionally low\' in England and Wales', 'The Guardian (14.08.2026) / Environment Agency', '🟢 Primary'],
                      ['Thames Water desalination plant restart (\'white elephant\')', 'The Guardian (14.08.2026)', '🟢 Primary'],
                      ['California bans paraquat', 'The Guardian (13.08.2026)', '🟢 Primary'],
                      ['El Niño peak threat to the Amazon', 'The Guardian (14.08.2026)', '🟢 Primary'],
                      ['UK farmers adapting to drought (beavers, soil, crops)', 'The Guardian (14.08.2026)', '🟢 Primary'],
                      ['Humpbacks return to Rio – tourism tension', 'The Guardian (12.08.2026)', '🟢 Primary'],
                      ['Europe wildfires: arson arrests, Croatia fire', 'The Guardian (14.08.2026)', '🟡 Secondary'],
                      ['Nueva Pescanova octopus farm shelved', 'The Guardian (13.08.2026)', '🟡 Secondary'],
                      ['White storks released in Cornwall', 'The Guardian (14.08.2026)', '🟡 Secondary'],
                      ['H5N1 bird flu reaches Australia', 'The Guardian (14.08.2026)', '🟡 Secondary'],
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
                    Next edition: <strong>Week of 24 August 2026</strong>
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
