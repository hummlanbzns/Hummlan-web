import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  FileCheck2,
  FileCode2,
  Leaf,
  Scale,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react';
import EvolvingPanel from '@/components/EvolvingPanel';
import Timeline from '@/components/Timeline';

export const metadata: Metadata = {
  title: 'CSRD Explained for Shoppers',
  description:
    'What the EU Corporate Sustainability Reporting Directive means for shoppers — in plain language: who reports, what they must disclose, when, and how it makes sustainability claims checkable.',
  alternates: {
    canonical: '/csrd',
  },
};

const keyConcepts = [
  {
    label: 'ESRS — the reporting standards',
    icon: Leaf,
    text: 'One set of European Sustainability Reporting Standards applies to everyone, so a clothing brand in Sweden and a cosmetics firm in Spain answer the same questions in the same structure. Comparable, not cherry-picked.',
  },
  {
    label: 'Double materiality',
    icon: Scale,
    text: 'Companies must report in both directions: how the world affects their business (flooded factories, carbon taxes, resource prices) and how their business affects the world (emissions, pollution, labour conditions). One-sided “good news only” reports are no longer allowed.',
  },
  {
    label: 'Value-chain reporting',
    icon: Users,
    text: "Reporting doesn't stop at HQ. Companies must look along their supply chain — the farms, factories, mills and logistics behind the product — and report what they find there. That is why a CSRD report can tell you things about where your T-shirt actually comes from.",
  },
  {
    label: 'Assurance — independent checking',
    icon: ShieldCheck,
    text: 'The numbers must be checked by an external auditor. Today that check is “limited” in depth; a stronger “reasonable” check was planned down the line (see “What’s changing right now” — this is one of the parts the EU is currently re-deciding).',
  },
  {
    label: 'Digital tagging — machine-readable data',
    icon: FileCode2,
    text: "Reports are published in the EU's single electronic format (the technical standards are called ESEF and XBRL) — so computers can read, compare and score the numbers, not just humans admiring a PDF. That machine readability is what lets data be searched, aggregated and rated at scale — which is exactly what independent rating systems need.",
  },
];

const whoReports = [
  {
    icon: Building2,
    title: 'Large companies (in scope)',
    text: 'Any company meeting two of three tests: more than 250 employees, net turnover above €40 million, or balance-sheet assets above €20 million. This covers the vast majority of well-known brands — including big non-EU brands that sell into Europe once they pass the turnover thresholds.',
  },
  {
    icon: Briefcase,
    title: 'Listed small and mid-size companies (in scope, delayed)',
    text: "Smaller companies whose shares trade on EU stock markets are also covered — but their reporting start was postponed to financial year 2028, and several EU countries can choose to exempt them. Many will voluntarily use the EU's new VSME voluntary standard (a short, practical report designed for SMEs) instead.",
  },
  {
    icon: Store,
    title: 'Everyone else (out of scope)',
    text: "Unlisted small and medium businesses — your local bakery, a 30-person soap maker — do not have to file CSRD reports. Roughly 99% of EU companies are SMEs and are deliberately left out. That said, big companies in scope must report what they find in their supply chains — so small suppliers can't just disappear from the picture. A small brand's sustainability story is still the brand's choice to tell, which is why Hummlan always weighs evidence quality, not just size.",
  },
];

const timelineStops = [
  {
    year: '2025',
    title: 'Reports published 2025 — already out',
    body: "The first wave — roughly the largest listed companies, banks and insurers with over 500 employees — already published their first CSRD reports for financial year 2024. If you want an example of what one of these reports looks like, they're public and searchable — most big brands link to theirs in their annual reports.",
  },
  {
    year: '2027',
    title: 'Financial year 2027, reports 2028',
    body: 'The second wave — all other large companies (the 250+ employee / €40M turnover test above) — starts reporting. Delayed by two years from the original 2026 date under Directive (EU) 2025/794.',
  },
  {
    year: '2028',
    title: 'Financial year 2028, reports 2029',
    body: 'Listed SMEs, smaller listed companies and large non-EU groups selling into Europe come into scope.',
  },
  {
    year: '2030',
    title: '2030 and beyond',
    body: "The system matures: every large company in Europe, and every foreign giant that wants EU customers, is reporting to the same standard. That is when the dataset really becomes a consumer superpower.",
  },
];

const esrsGroups = [
  {
    label: 'Environment',
    areas: [
      { title: 'Climate', text: 'emissions, energy use and transition plans (does the company have a real plan to cut emissions, or just a slogan?)' },
      { title: 'Pollution', text: 'air, water and soil pollution from operations and products' },
      { title: 'Water & marine resources', text: 'water use and protection of oceans and rivers' },
      { title: 'Biodiversity & ecosystems', text: 'whether operations and sourcing help or harm nature' },
      { title: 'Circular economy', text: 'waste, recycled content, durability, repairability and design for reuse' },
    ],
  },
  {
    label: 'People',
    areas: [
      { title: 'Own workforce', text: "wages, health & safety, rights of the company's own employees" },
      { title: 'Value-chain workers', text: "working conditions in suppliers' factories and farms" },
      { title: 'Affected communities', text: 'how operations affect people living nearby' },
      { title: 'Consumers & end-users', text: 'product safety, health impacts and information for buyers' },
    ],
  },
  {
    label: 'Governance',
    areas: [
      { title: 'Business conduct', text: 'anti-corruption, lobbying transparency and supplier relationships' },
    ],
  },
];

const whyMatters = [
  {
    title: 'Free, standardised data on demand.',
    text: "Every in-scope company must publish the same key facts in the same format, for free. You no longer have to rely on a brand's own adverts and “About us” page to judge it.",
  },
  {
    title: 'Fewer uncheckable claims.',
    text: 'When “climate neutral” has to be backed by audited emissions data, vague slogans get expensive. CSRD doesn’t ban green marketing — it makes weak marketing embarrassingly thin.',
  },
  {
    title: 'Supply-chain labour visibility.',
    text: "Brands must report on working conditions in their supplier networks. That's information that used to be nearly impossible to get — now it's a legal filing.",
  },
  {
    title: 'Your savings and pension ride on the same companies.',
    text: 'The funds in your pension and savings products invest in the very companies these reports cover. Better reporting is one of the reasons sustainable funds can become less “faith-based” and more evidence-based.',
  },
  {
    title: 'Demand signals flow back to brands.',
    text: "Every rating, comparison and informed purchase you make is a signal. Companies that publish honest data and act on it get rewarded in the marketplace — that's the loop that changes what gets made.",
  },
  {
    title: 'Ratings like HSS get sharper.',
    text: 'Independent scores are only as good as the underlying evidence. CSRD gives rating systems a consistent evidence base — which means better, fairer scores for you.',
  },
];

const honestLimits = [
  {
    title: "Reporting isn't the same as performance.",
    text: "A company can file a perfect report on terrible behaviour. CSRD makes behaviour visible; it doesn't make it good.",
  },
  {
    title: 'Compliance varies in practice.',
    text: "National enforcement differs across the EU, and the first years will be messy. Some reports will be late, thin or optimistic. That's why independent cross-checking still matters.",
  },
  {
    title: "It's a work in progress.",
    text: "The rules are being simplified even as they roll out, and the final scope isn't locked. What's law today may differ in 2027 — for now, the direction (mandatory, comparable, public) is holding.",
  },
];

const evolvingItems = [
  {
    label: 'Omnibus I (biggest unknown)',
    text: 'in Feb 2025 the EU proposed narrowing CSRD to only the very largest companies (1,000+ employees). Parliament and Council reached political agreement on 9 December 2025, but the deal is not yet final law as we publish. If adopted, roughly the middle tier of companies would drop out — the top tier, and the disclosure principle, would remain.',
  },
  {
    label: 'Simpler ESRS',
    text: "the Commission adopted a “quick-fix” to the standards in July 2025 (so early reporters don't add workload), and adopted a bigger simplification of the ESRS in July 2026 — fewer datapoints, lighter materiality process. The simplified standards are landing as we write.",
  },
  {
    label: 'Assurance',
    text: 'the move to stronger “reasonable” assurance was planned — the pending simplification deal is expected to keep the lighter “limited” assurance for the foreseeable future. We’ll update when it’s decided.',
  },
  {
    label: 'Green Claims Directive',
    text: 'a separate EU law (proposed March 2023) that would require environmental claims on products to be substantiated with recognised evidence is still in the legislative process — not yet adopted. Separately, the already-adopted consumer-protection rules (Directive (EU) 2024/825) ban unproven generic claims like “eco” or “green” and start applying in EU countries from 27 September 2026. The anti-greenwashing wave is arriving — in layers, and late.',
  },
];

const faqs = [
  {
    q: 'Is CSRD a consumer law?',
    a: "No — it's a corporate reporting law aimed at investors and regulators. But because its reports are public, standardised and free, it quietly becomes one of the best consumer-research tools that exists. You're just rarely told it's there.",
  },
  {
    q: 'When will I actually see the effect?',
    a: "You already can: the first wave of reports (for 2024) was published during 2025, covering many of the biggest brands you know. The dataset grows substantially from 2028, when the second wave reports and large non-EU brands arrive. It compounds — every year there's more, and better, evidence.",
  },
  {
    q: 'Do small brands have to report?',
    a: "Almost none. Only listed SMEs are in scope (and their start is postponed to 2028, with opt-outs possible). Ordinary small and medium businesses are exempt, and there's now a voluntary short “VSME” standard for those that want to report anyway. So a small brand with no CSRD report is normal — judge it on what it can show in other ways.",
  },
  {
    q: 'Is this just paperwork for big companies?',
    a: "Partly, yes — that criticism is fair, and it's one reason the EU is simplifying the rules. But paperwork that's public creates accountability. The same filing that annoys a sustainability manager is the document that lets a watchdog, a journalist, a pension fund or Hummlan check a company's story.",
  },
  {
    q: 'Will CSRD remove greenwashing?',
    a: "No single law can. What it does is raise the cost of vague claims and create a standard anyone can test claims against. Greenwashing doesn't disappear — it has to get smarter, which is far easier to catch.",
  },
  {
    q: 'Can a company look good on paper and be bad in practice?',
    a: "Yes — reporting and behaviour are different things. That's exactly why Hummlan doesn't take CSRD reports at face value: we cross-check them against certifications, product claims, news and our own research, and score the whole picture.",
  },
  {
    q: 'Does Hummlan give automatic credit for a CSRD report?',
    a: "No. A good report raises confidence in what a brand says; it isn't a score in itself. Always ask what the report actually contains — targets, timelines, real numbers — not just that one exists.",
  },
];

export default function CsrdPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

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
              Sustainability should be something a company can prove, not just promise. The EU&apos;s
              Corporate Sustainability Reporting Directive (CSRD) is the biggest attempt yet to make
              companies show their work — and the result is a growing library of honest, comparable
              data that shoppers like you can use.
            </p>
          </section>

          <div className="mb-12 border rounded-xl bg-amber-50 border-amber-100 p-4 text-sm text-amber-900">
            <strong>Note:</strong> This page is for educational purposes and is not legal advice.
          </div>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is CSRD?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              CSRD stands for Corporate Sustainability Reporting Directive — EU law passed in 2022
              (Directive (EU) 2022/2464, in force since January 2023) that made sustainability
              reporting <strong>mandatory, standardised and comparable</strong> for large companies.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              It replaces an older, weaker rule (the NFRD from 2014) that let around 11,700 big
              companies report almost whatever they liked, in whatever format they liked. The new
              rules are designed to reach approximately <strong>50,000 companies</strong> across the EU —
              roughly four times as many — and to force them to follow the same reporting standards.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In plain English: if a company is big enough to matter, it now has to publish a regular,
              auditor-checked account of how its business affects the planet and people — climate,
              pollution, water, waste, workers, communities — and how those issues affect the business
              in return. Before CSRD, that information was patchy, voluntary and easy to spin. Now it
              is a legal obligation with a standard structure. That single change matters more to
              consumers than it might sound — because it turns vague sustainability marketing into
              something you can check.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How the rules work</h2>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Who has to report (and who doesn&apos;t)
            </h2>
            <p className="text-gray-600 mb-6">
              CSRD is a law for <strong>large companies</strong>, not for everyone. Here is who is in
              and who is out.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {whoReports.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="border rounded-xl p-5 bg-gray-50/70">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-lg border">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug">{card.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{card.text}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs italic text-gray-500 mt-4">
              Non-EU parent companies with more than €150 million in EU turnover (for example a US or
              Asian group selling heavily in Europe) come into scope from financial year 2028 — so the
              world&apos;s biggest brands will mostly be covered, not just European ones.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">When does this actually happen?</h2>
            <Timeline stops={timelineStops} />
            <p className="text-sm italic text-gray-500 mt-6">
              <em>Why the 2025 delay? The EU paused the second and third waves for two years to give
              companies breathing room — and it is now debating narrowing the scope entirely. That means
              the timeline above is the law today, but the finishing line may move.</em> This timeline
              reflects current law — two waves were postponed in 2025 by the “stop-the-clock” directive
              (EU) 2025/794. We will keep this page updated.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What companies must report</h2>
            <p className="text-gray-600 mb-8">
              The detail lives in the European Sustainability Reporting Standards (ESRS) — 12 standards
              covering everything from emissions to business ethics. Shoppers don&apos;t need to read 12
              standards, but you should know what they cover, because each area is a question you can ask
              of any brand:
            </p>
            {esrsGroups.map((group) => (
              <div key={group.label} className="mb-8 last:mb-0">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  {group.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.areas.map((area) => (
                    <div key={area.title} className="border rounded-xl p-5 bg-gray-50/70">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{area.title}</h4>
                      <p className="text-sm text-gray-600">{area.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="mt-8 text-gray-600 leading-relaxed">
              Notice what this list does: it covers the full product story, not just the recycled label
              on the front. That is the same all-round view Hummlan tries to build with the HSS
              five-pillar score.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why this matters when you shop</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Here is the honest framing: CSRD is a law aimed at investors and regulators, not at you.
              You will not see a CSRD logo on a product, and no shop will stamp &quot;CSRD-compliant&quot;
              on a packet. But it changes what you can know — and knowing is the whole game. What it
              gives you:
            </p>
            <ul className="space-y-4 text-gray-700">
              {whyMatters.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{item.title}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed mt-6">
              The practical takeaway is simple. When you&apos;re choosing between two brands, ask what
              they actually disclose — emissions, materials, suppliers, wages — and compare like with
              like. That habit is exactly what CSRD was built to enable. It&apos;s the difference between
              &quot;trust us&quot; and &quot;here&apos;s the data&quot;.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What CSRD can&apos;t do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {honestLimits.map((limit) => (
                <div key={limit.title} className="border rounded-xl p-5 bg-gray-50/70">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg border">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{limit.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{limit.text}</p>
                </div>
              ))}
            </div>
          </section>

          <EvolvingPanel>
            <p>These items are changing — dates below are the best verified picture today, not a promise.</p>
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
              How Hummlan uses CSRD-style disclosures
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Hummlan weights evidence quality, not marketing. When a brand publishes robust,
              verifiable, standards-based disclosures — especially audited CSRD-style filings —
              confidence in its HSS score rises. When information is missing, vague or contradictory,
              scores become deliberately more conservative, and gaps are called out on the brand page.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We don&apos;t assume a good report means a good company, and we never assume a small company
              with no report is a bad one. CSRD gives us a rich evidence layer for big brands; direct
              outreach, certifications and product-level checks cover the rest. The goal is the same on
              both sides: <strong>stern but fair</strong> — reward verified progress, discount weak
              claims, and update scores the moment credible new evidence appears.
            </p>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick FAQ (CSRD)</h2>
            <div className="space-y-5 text-gray-600">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-gray-900 mb-1">{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border rounded-xl bg-blue-50 border-blue-100 p-4 text-sm text-blue-900">
              <strong>Keep following the thread:</strong> the EU Taxonomy is the other half of this
              story — the EU&apos;s shared dictionary of what counts as &quot;environmentally
              sustainable&quot;.{' '}
              <Link href="/eu-taxonomy" className="font-bold underline hover:text-blue-700 transition-colors">
                Read the EU Taxonomy explainer →
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
                  Taxonomy-aligned impact criteria shape <strong>what</strong> we evaluate — climate,
                  circularity, pollution, water, biodiversity, plus social safeguards.
                </li>
                <li>
                  CSRD-informed evidence quality shapes <strong>how confidently</strong> we score —
                  audited, comparable disclosures beat unverifiable claims.
                </li>
                <li>
                  Category weighting keeps comparisons fair across product types — a detergent and a
                  jacket aren&apos;t judged the same way.
                </li>
                <li>
                  Output stays transparent: score band, rationale, evidence tier and red flags,
                  published for every brand.
                </li>
              </ul>
              <p>
                Stern but fair means we reward verified progress, discount weak support and update
                ratings when credible new information appears.
              </p>
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              See how evidence quality shapes scores
            </h2>
            <p className="text-gray-600 mb-6">
              Browse rated brands and products that go through the same evidence-first framework.
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

    </div>
  );
}