import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Building,
  Building2,
  CheckCircle,
  CloudSun,
  FlaskConical,
  Landmark,
  PieChart,
  Recycle,
  Scale,
  ShieldCheck,
  Sprout,
  Tag,
  UserX,
  Waves,
} from 'lucide-react';
import EvolvingPanel from '@/components/EvolvingPanel';

export const metadata: Metadata = {
  title: 'EU Taxonomy Explained for Shoppers',
  description:
    'What the EU Taxonomy actually is — the EU’s shared definition of “environmentally sustainable” — in plain language: the four tests, the six objectives, who reports, and why it changes what you can know as a shopper.',
  alternates: {
    canonical: '/eu-taxonomy',
  },
};

const numberedConditions = [
  {
    number: '01',
    title: 'Substantial contribution',
    subtitle: 'the “does it actually help?” test',
    text: 'The activity must make a real, measurable contribution to at least one of the six environmental objectives — not a token 0.5% improvement. Manufacturing solar panels qualifies; rebranding a standard product with a leaf doesn’t.',
  },
  {
    number: '02',
    title: 'Do No Significant Harm',
    subtitle: 'the “no cheating” test',
    text: 'The activity must not significantly harm any of the other five objectives. A “low-carbon” factory that poisons the local river fails this test, no matter how clean its energy mix is. You can’t fix one problem by creating another.',
  },
  {
    number: '03',
    title: 'Minimum safeguards',
    subtitle: 'the “people still matter” test',
    text: 'The company must meet basic social and governance standards: the OECD Guidelines for Multinational Enterprises, the UN Guiding Principles on Business and Human Rights, and the core labour conventions of the ILO. “Green” is not a licence for exploitation.',
  },
  {
    number: '04',
    title: 'Technical screening criteria',
    subtitle: 'the “show the maths” test',
    text: 'For every objective, the EU has published detailed rules defining exactly what counts — emission thresholds, efficiency levels, substance bans, reporting requirements. These live in “delegated acts” and are updated over time. Alignment is a paperwork-and-numbers exercise, not a marketing exercise.',
  },
];

const objectives = [
  {
    title: 'Climate change mitigation',
    icon: CloudSun,
    asks: 'does the activity cut or avoid greenhouse gas emissions?',
    example: 'generating electricity from wind or solar, manufacturing efficient heat pumps, or recycling materials instead of producing virgin ones.',
  },
  {
    title: 'Climate change adaptation',
    icon: ShieldCheck,
    asks: 'does the activity prepare for — not just resist — a warmer, wilder climate?',
    example: 'a coastal production site built to withstand higher flood risk, or crop varieties selected for drought tolerance, with those plans actually funded and tested.',
  },
  {
    title: 'Sustainable use and protection of water and marine resources',
    icon: Waves,
    asks: 'does the activity protect water quality and quantity, including oceans?',
    example: 'a textile mill that recycles its dye water and treats effluent to standards that protect rivers and marine life — not just “saves water” in the brochure.',
  },
  {
    title: 'Transition to a circular economy',
    icon: Recycle,
    asks: 'does the activity keep materials in use instead of burning or burying them?',
    example: 'products designed for repair and disassembly, refill systems, high-quality recycled content — with durable design so “recyclable in theory” becomes “recycled in practice”.',
  },
  {
    title: 'Pollution prevention and control',
    icon: FlaskConical,
    asks: 'does the activity reduce or avoid harmful substances across air, water and soil?',
    example: 'replacing hazardous chemicals in production, capturing microplastics at the source, or switching to non-toxic flame retardants — including avoiding regrettable substitutions.',
  },
  {
    title: 'Protection and restoration of biodiversity and ecosystems',
    icon: Sprout,
    asks: 'does the activity protect or restore nature — forests, soils, wetlands, habitats?',
    example: 'sourcing certified deforestation-free materials, restoring land after extraction, or setting aside habitat — verified, not just “nature-positive” on a slide.',
  },
];

const whoReports = [
  {
    icon: Building2,
    title: 'Large companies (the same scope as CSRD)',
    text: 'Every company that has to file a CSRD sustainability report must also publish Taxonomy numbers: the percentage of their turnover, capital spending (capex) and operating spending (opex) that is aligned with Taxonomy criteria. So the “green share” of a big brand’s business is a public number, comparable across rivals.',
  },
  {
    icon: Landmark,
    title: 'Banks and financial institutions',
    text: 'Banks must publish a Green Asset Ratio (GAR) — the share of their lending and investment portfolio that finances Taxonomy-aligned activities. Insurers and asset managers have equivalent disclosures. Your bank effectively has to tell the world how green its money is.',
  },
  {
    icon: PieChart,
    title: 'Investment funds',
    text: 'Funds sold as “sustainable” under EU rules (SFDR Articles 8 and 9) must explain how much of what they invest in matches the Taxonomy. That’s one reason “sustainable fund” is becoming a verifiable claim rather than a label. (The fund-label rules themselves are being redrawn by the EU right now — see “What’s changing”.)',
  },
];

const misconceptions = [
  {
    icon: Tag,
    title: 'It’s not a label you’ll see on products',
    text: 'No shopper will find an “EU Taxonomy approved” sticker on a packet — and that’s deliberate. It’s a reporting framework for companies and finance, not a consumer certification. Its value to you is upstream: it makes companies’ own claims checkable.',
  },
  {
    icon: Building,
    title: 'It doesn’t certify whole companies as “green”',
    text: 'A company can be 20% Taxonomy-aligned or 80% — the number is published, and neither extreme is a full verdict on the company. Alignment describes activities, not souls.',
  },
  {
    icon: UserX,
    title: 'It has no social pillar',
    text: 'The Taxonomy covers the six environmental objectives. Social matters are handled through the minimum safeguards test and separate laws like CSRD — which is exactly why Hummlan always combines environmental criteria with supply-chain and social checks.',
  },
  {
    icon: Scale,
    title: 'It doesn’t rank “good vs bad”, and it doesn’t ban anything',
    text: 'Falling short of alignment isn’t illegal and doesn’t make an activity “dirty” — it means it isn’t (yet) counted as sustainable for financing purposes. The Taxonomy steers capital; the lawmaking toolkit (bans, taxes, standards) lives elsewhere.',
  },
];

const whyMatters = [
  {
    title: 'It’s the yardstick for “sustainable”.',
    text: 'When a brand calls itself sustainable, the Taxonomy is the closest thing to an objective ruler. Brands don’t have to use it — but now you can.',
  },
  {
    title: 'It powers comparable evaluation.',
    text: 'The published percentages (turnover, capex, opex aligned) let independent parties compare a clothing giant vs a cosmetics giant on the same scale. That’s the raw material for honest ratings like HSS.',
  },
  {
    title: 'It makes greenwashing expensive.',
    text: 'If a company claims green leadership while disclosing 2% alignment, that gap is public. The Taxonomy doesn’t catch every liar, but it makes lying harder to sustain.',
  },
  {
    title: 'It steers your money’s pipeline.',
    text: 'Your pension and savings sit in the same financial system the Taxonomy is redirecting. When you buy a “sustainable” fund, the Taxonomy is part of what that fund’s managers now have to measure.',
  },
  {
    title: 'It raises the floor for everyone.',
    text: 'As mainstream capital shifts toward aligned activities, even brands that never mention the Taxonomy feel the pull — through financing costs, supply contracts and investor pressure. You benefit even when the brand doesn’t talk about it.',
  },
];

const evolvingItems = [
  {
    label: '2025 simplification',
    text: 'in July 2025 the Commission adopted a delegated act streamlining Taxonomy reporting — later deadlines, lighter requirements for smaller companies, transitional relief for banks — and EU countries keep pushing for more. Reporting got easier; the principle (public, comparable percentages) stayed.',
  },
  {
    label: 'Omnibus I (pending)',
    text: 'the same simplification package agreed politically on 9 Dec 2025 but not yet final law also touches Taxonomy reporting — further cuts in scope are being negotiated.',
  },
  {
    label: 'Criteria revision',
    text: 'in March 2026 the Commission opened public feedback on revising the technical screening criteria, and asked EU supervisors for technical advice on the reporting rules — so the specific thresholds you read today may be updated within a couple of years. The six objectives aren’t changing; the fine print is.',
  },
  {
    label: 'Fund labels being redrawn',
    text: 'the EU is replacing the current fund “Article 8/9” system with a simpler two-category approach under a revised SFDR — the Taxonomy link will remain, but the labels will change. We’ll update this page when the final rules land.',
  },
];

const faqs = [
  {
    q: 'Is the EU Taxonomy a label I’ll see on products?',
    a: 'No. You won’t find it on packaging or shop shelves. It’s a behind-the-scenes classification and reporting system. You’ll feel it through more checkable claims, greener financing — and ratings like HSS that use its logic.',
  },
  {
    q: 'Is a “Taxonomy-aligned” company automatically a good company?',
    a: 'Not necessarily. Alignment means specific activities met specific environmental criteria — it says nothing automatically about wages, lobbying, product safety, or whether the company is net-positive overall. Always look at the whole picture.',
  },
  {
    q: 'Is the EU Taxonomy only for investors?',
    a: 'It’s built for finance and policy — but its public data is a gift to anyone who wants to compare brands honestly. “For investors” doesn’t mean “useless to you”; it means investors demanded it first.',
  },
  {
    q: 'Does a product need to be perfect to score well on Hummlan?',
    a: 'No. Strong verified progress can score well even with gaps — that’s the “fair” half of stern but fair. The “stern” half: unverified claims carry little weight, and red flags are reported openly.',
  },
  {
    q: 'Does “natural” mean Taxonomy-aligned?',
    a: 'No. “Natural”, “eco”, “green”, “planet-friendly” — none of those words are criteria. The Taxonomy asks for specific, measurable actions and thresholds. Words sell; evidence convinces.',
  },
  {
    q: 'Do non-EU brands get excluded?',
    a: 'Not at all. The same large companies that report under CSRD — including non-EU giants selling into Europe — publish Taxonomy numbers. Hummlan applies the same EU-aligned criteria globally so comparisons stay consistent, whatever a brand’s home country.',
  },
  {
    q: 'If a brand isn’t Taxonomy-aligned, is it “bad”?',
    a: 'No. Alignment is a high bar and many honest companies aren’t there yet — especially in hard-to-decarbonise sectors. The useful question is direction: are they aligned on the specific criteria relevant to their activities, and are they moving? Hummlan scores progress, not just perfection.',
  },
  {
    q: 'Will the Taxonomy stop greenwashing?',
    a: 'Not alone. It’s one of several tools — CSRD for disclosure, the consumer-protection rules (from September 2026) for claims bans, the pending Green Claims Directive for product-level substantiation — that together raise the cost of faking it. The Taxonomy is the dictionary all of them work from.',
  },
];

export default function EuTaxonomyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <section className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light text-brand-dark text-sm font-bold mb-6">
              <BookOpen className="w-4 h-4" />
              The &quot;green&quot; Dictionary
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              EU Taxonomy Explained for Shoppers
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              &quot;Sustainable&quot; is the most abused word in marketing. The EU Taxonomy is the EU&apos;s
              answer: a shared, science-based dictionary that defines what an economic activity must
              actually do to call itself environmentally sustainable — so &quot;green&quot; stops meaning
              whatever a brand wants it to mean.
            </p>
          </section>

          <div className="mb-12 border rounded-xl bg-amber-50 border-amber-100 p-4 text-sm text-amber-900">
            <strong>Note:</strong> This page is for educational purposes and is not legal advice.
          </div>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the EU Taxonomy?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The EU Taxonomy is a classification system created by the law Regulation (EU) 2020/852
              (in force since <strong>12 July 2020</strong>). It works through every sector of the
              economy — energy, manufacturing, transport, buildings, agriculture, even finance — and
              sets out detailed criteria for which <strong>economic activities</strong> count as
              environmentally sustainable. Think of it as the ingredient list for &quot;green&quot;.
              Before the Taxonomy, a bank calling a loan &quot;green&quot; and a company calling a product
              &quot;sustainable&quot; were each using their own private definitions. Now there is one official
              EU dictionary, and everyone who wants to use the word has to follow its recipes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              It is crucial to understand what the Taxonomy is <strong>not</strong>: it is not a rating,
              not a label on a box, and not a &quot;good company / bad company&quot; scoreboard. It classifies
              <strong> activities</strong>, with thresholds and technical criteria — a single company can
              have some activities that qualify and others that don&apos;t. The point is a shared,
              verifiable language, not a green seal of approval.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              The 4 tests for &quot;environmentally sustainable&quot;
            </h2>
            <p className="text-gray-600 mb-6">
              These are the four conditions in Article 3 of the Regulation — every activity must pass
              all of them to count as sustainable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {numberedConditions.map((condition) => (
                <div key={condition.number} className="border rounded-xl p-5 bg-gray-50/70">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-3xl font-extrabold text-brand/30 leading-none select-none">
                      {condition.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-snug">{condition.title}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-0.5">
                        {condition.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{condition.text}</p>
                </div>
              ))}
            </div>
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
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <h3 className="font-bold text-gray-900 leading-snug">{objective.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                      <em>What it asks:</em> {objective.asks}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <em>Example:</em> {objective.example}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-gray-600 leading-relaxed mt-6">
              Notice each example: an activity, a concrete action, and a measurable outcome.
              That&apos;s the Taxonomy&apos;s whole trick — moving sustainability from adjectives to
              evidence.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Who actually has to report this?
            </h2>
            <p className="text-gray-600 mb-6">
              The Taxonomy is a reporting obligation on companies — and via them, it reaches the money
              system you use every day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {whoReports.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="border rounded-xl p-5 bg-gray-50/70">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-lg border">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug">{card.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{card.text}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs italic text-gray-500 mt-4">
              Reporting started in 2022 for the climate objectives and expanded in 2024 to all six.
              More than a hundred economic activities now have detailed criteria — from cement to cloud
              computing — and the list keeps growing.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What the Taxonomy does NOT do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {misconceptions.map((misconception) => {
                const Icon = misconception.icon;
                return (
                  <div key={misconception.title} className="border rounded-xl p-5 bg-gray-50/70">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-lg border">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug">
                        {misconception.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">{misconception.text}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 italic mt-4">
              This matters: most misunderstandings about the Taxonomy come from expecting it to be
              something it isn&apos;t.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why this matters when you shop</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The Taxonomy is aimed at companies and investors, not at your shopping basket. So why
              should you care? Because it sits right in the middle of the pipeline that decides
              <strong> what gets produced</strong>. Money flows to activities that qualify as
              sustainable; activities that qualify are what industry invests in; and what industry
              invests in is what ends up on shelves. Understanding the Taxonomy is understanding the
              operating manual behind the &quot;green economy&quot;.
            </p>
            <ul className="space-y-4 text-gray-700">
              {whyMatters.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span>
                    <strong>{item.title}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed mt-6">
              The honest caveat: Taxonomy alignment and real-world performance aren&apos;t identical,
              the criteria are still being refined, and a company can score well on paper while
              disappointing in practice. So don&apos;t treat alignment as a verdict — treat it as one
              strong, standardised data point. Combine it with labour checks, product-level evidence
              and a healthy dose of &quot;does this actually make sense?&quot;, and you have a genuinely
              informed choice. That combination is, very roughly, what the HSS score is for.
            </p>
          </section>

          <EvolvingPanel>
            <p>
              The Taxonomy is young and being actively simplified and extended — dates below are the
              best verified picture today.
            </p>
            <ul className="space-y-3 list-disc list-inside">
              {evolvingItems.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}:</strong> {item.text}
                </li>
              ))}
            </ul>
          </EvolvingPanel>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How Hummlan applies the EU Taxonomy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Hummlan doesn&apos;t wait for companies to volunteer their alignment numbers — we use the
              Taxonomy&apos;s logic as the backbone of the HSS score. Each of our pillars maps to it:
              <strong> Climate</strong> follows the mitigation &amp; adaptation objectives,
              <strong> Circular</strong> the circular-economy objective, <strong>Pollution</strong> the
              pollution objective, <strong>Biodiversity</strong> the biodiversity &amp; water
              objectives, and <strong>Supply Chain &amp; Social</strong> holds the line on the
              minimum-safeguards principle that &quot;green&quot; must never come at the expense of people.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Where a brand publishes real Taxonomy-aligned data, we weigh it as high-quality evidence.
              Where it doesn&apos;t, we apply the same tests using the brand&apos;s own disclosures,
              certifications and product claims — with lower confidence and a more conservative score.
              The HSS is Hummlan&apos;s independent interpretation, inspired by the EU frameworks. It is
              <strong> not</strong> an EU-endorsed label, and we never imply it is.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick FAQ (EU Taxonomy)</h2>
            <div className="space-y-5 text-gray-600">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-gray-900 mb-1">{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border rounded-xl bg-brand-light border-brand/20 p-4 text-sm text-gray-800">
              <strong>Where does the reporting side come in?</strong> CSRD is the other half of this
              story — the law that makes sustainability data public, standardised and checkable.{' '}
              <Link href="/csrd" className="font-bold underline hover:text-brand-dark transition-colors">
                Read the CSRD explainer →
              </Link>
            </div>
          </section>

          <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-10 mb-10">
            <h2 className="text-2xl font-bold mb-6">
              How EU Taxonomy + CSRD map into Hummlan Sustainability Score (HSS)
            </h2>
            <div className="space-y-5 text-gray-200">
              <p>
                <strong>EU Taxonomy</strong> defines what &quot;sustainable&quot; means for each
                activity. <strong>CSRD</strong> makes evidence about it public, standardised and
                checkable. <strong>HSS</strong> turns both into one shopper-facing score.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  Impact criteria (Taxonomy-aligned): climate, circularity, pollution, water,
                  biodiversity, resilience and social safeguards.
                </li>
                <li>
                  Evidence quality (CSRD-informed): stronger disclosures and assurance increase score
                  confidence; missing or vague evidence caps it.
                </li>
                <li>
                  Category weighting: fashion, personal care, household and food use tailored emphasis,
                  so comparisons are fair within each aisle.
                </li>
                <li>
                  Transparent output: score band, rationale, evidence tier and red flags — published on
                  every brand page.
                </li>
              </ul>
              <p>
                Stern but fair means we reward verified progress, down-weight weak claims and update
                scores when credible new evidence appears.
              </p>
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Want to see these criteria in action?
            </h2>
            <p className="text-gray-600 mb-6">
              Browse rated brands and products — each HSS score is built on the same evidence-first
              logic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand text-white font-bold hover:bg-brand-dark transition-colors"
              >
                Browse rated products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-300 text-gray-800 font-bold hover:border-brand hover:text-brand-dark transition-colors"
              >
                Full methodology
              </Link>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}