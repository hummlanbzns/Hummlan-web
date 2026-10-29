import type { Metadata } from 'next';
import Link from 'next/link';
import { FileSearch, ShieldCheck, AlertTriangle } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Our Sources | ${SITE_NAME}`,
  description:
    'How Hummlan sources its sustainability ratings: what we cite, how we label company self-reporting, how we record access dates, and what we do when a claim cannot be verified.',
  alternates: { canonical: '/sources' },
};

const CITE = [
  {
    title: "Company sustainability and CSRD reporting",
    body:
      'Annual sustainability reports, CSRD disclosures and dedicated sustainability or impact pages published by the brand itself. These are labelled as the company\'s own reporting on every brand page.',
  },
  {
    title: 'Certifier directories',
    body:
      'B Lab (B Corp), Fair for Life, Fair Wear Foundation, Fair Labor Association, GOTS, Cradle to Cradle, FSC, EPA Safer Choice, Green Button and similar schemes — the certifying body\'s own directory where we can reach it.',
  },
  {
    title: 'Regulators and public registries',
    body:
      'Official EU and national sources such as the EU Taxonomy and CSRD texts, and government-run labelling schemes.',
  },
  {
    title: 'NGO datasets and credible journalism',
    body:
      'Established non-profits and newsrooms reporting on labour, pollution or supply-chain issues, where their reporting is specific enough to check.',
  },
];

export default function SourcesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-brand">Home</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Our Sources</li>
            </ol>
          </nav>

          <header className="bg-white rounded-2xl border shadow-sm p-8 md:p-12 mb-8">
            <p className="text-brand font-bold uppercase tracking-widest mb-2 text-sm">Method</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Sources</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              A sustainability score is only worth something if you can check the facts behind it.
              Every brand page links to the sources we used, so you can read the same reports and
              registries we read — and disagree with us if you want to.
            </p>
          </header>

          <section className="bg-white rounded-2xl border shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileSearch className="w-6 h-6 text-brand" />
              What we cite
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              In rough order of preference, we cite:
            </p>
            <ol className="space-y-5">
              {CITE.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand-light text-brand-dark font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-white rounded-2xl border shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand" />
              Company reporting is disclosure, not verification
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Most of what any company publishes about itself is self-reported. We use it — it is
                often the only public record of a supply chain — but we label it. On every brand
                page, sources that come from the company itself are marked as the company&apos;s own
                report. Sources from a certifier, a regulator or an NGO are marked as such, because
                an outside body checked them.
              </p>
              <p>
                When a score rests mainly on the company&apos;s own numbers, we would rather say so
                plainly than dress it up as independent verification.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl border shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access dates</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Web pages change, move and disappear. Every source we list records the date we
                opened it and checked that the page really contained the claim we attribute to it.
                That date sits next to the link on the brand page.
              </p>
              <p>
                If you open a link months later and the wording has changed, the access date tells
                you what we actually saw. We re-check sources when we review a rating.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl border shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              When a claim cannot be sourced
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                If we cannot find a page that genuinely backs a claim, we do not list one. A
                plausible-looking link that does not say what we say it says is worse than no link
                at all.
              </p>
              <p>
                Some brand pages therefore show a note saying sources are still being compiled, or
                carry fewer sources for a pillar than we would like. That is deliberate: the score
                reflects our analysis to date, and we would rather publish an honest gap than invent
                a citation.
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-blue-50 border border-blue-100 p-5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 leading-relaxed">
              Hummlan does not sell products and earns nothing from the brands we rate. That is why
              we can afford to show you the sources instead of asking you to trust us.{' '}
              <Link href="/search" className="underline font-semibold hover:text-blue-950">
                Check a brand
              </Link>{' '}
              or read about the{' '}
              <Link href="/csrd" className="underline font-semibold hover:text-blue-950">CSRD</Link>{' '}
              and{' '}
              <Link href="/eu-taxonomy" className="underline font-semibold hover:text-blue-950">
                EU Taxonomy
              </Link>{' '}
              frameworks behind the pillars.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
