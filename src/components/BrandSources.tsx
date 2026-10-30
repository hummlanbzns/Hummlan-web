import Link from 'next/link';

export type BrandSource = {
  id: string;
  pillar: string | null;
  title: string;
  publisher: string | null;
  url: string;
  source_type: string | null;
  published_date: string | null;
  accessed_date: string;
  supports: string | null;
  is_primary: number;
};

export const PILLAR_LABELS: Record<string, string> = {
  climate: 'Climate Impact',
  circular: 'Circular Economy',
  pollution: 'Pollution Prevention',
  supply_chain: 'Supply Chain & Social',
  biodiversity: 'Biodiversity',
};

export const SOURCE_TYPE_LABELS: Record<string, string> = {
  company_report: "Company's own report",
  certifier: 'Certifier',
  regulator: 'Regulator',
  ngo: 'NGO',
  news: 'Journalism',
  academic: 'Academic',
  industry: 'Industry body',
};

const PILLAR_ORDER = ['climate', 'circular', 'pollution', 'supply_chain', 'biodiversity'];

function typeLabel(sourceType: string | null) {
  if (!sourceType) return null;
  return SOURCE_TYPE_LABELS[sourceType] || sourceType;
}

/**
 * A single source, rendered as a plain crawlable <a href> — no JS required.
 * External links open in a new tab and carry rel="noopener nofollow".
 */
export function SourceItem({ source }: { source: BrandSource }) {
  const type = typeLabel(source.source_type);
  return (
    <li className="border-t border-gray-100 first:border-t-0 py-4 first:pt-0 last:pb-0">
      <a
        href={source.url}
        target="_blank"
        rel="noopener nofollow"
        className="font-semibold text-gray-900 underline decoration-brand/40 decoration-2 underline-offset-2 hover:decoration-brand hover:text-brand-dark transition-colors break-words"
      >
        {source.title}
      </a>
      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
        {source.publisher ? <span>{source.publisher}</span> : null}
        {source.publisher && source.published_date ? <span> · </span> : null}
        {source.published_date ? <span>{source.published_date}</span> : null}
        <span> · accessed {source.accessed_date}</span>
        {type ? <span> · {type}</span> : null}
      </p>
      {source.supports ? (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{source.supports}</p>
      ) : null}
    </li>
  );
}

/** Sources for one pillar, used inside the pillar drill-down. */
export function PillarSources({ sources }: { sources: BrandSource[] }) {
  if (!sources.length) return null;
  return (
    <div className="mt-3 pt-3 border-t border-gray-200" aria-label="Sources for this pillar">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
        Sources for this pillar
      </p>
      <ul className="space-y-2">
        {sources.map((s) => (
          <li key={s.id} className="text-sm leading-relaxed">
            <a
              href={s.url}
              target="_blank"
              rel="noopener nofollow"
              className="font-semibold text-gray-800 underline decoration-brand/40 decoration-2 underline-offset-2 hover:decoration-brand hover:text-brand-dark transition-colors break-words"
            >
              {s.title}
            </a>
            <span className="text-gray-500">
              {s.publisher ? ` — ${s.publisher}` : ''} · accessed {s.accessed_date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * "Sources for this rating" section on a brand page.
 * Renders nothing if there are no sources (caller shows the neutral note instead).
 */
export default function BrandSources({ sources }: { sources: BrandSource[] }) {
  if (!sources.length) return null;

  const byPillar = new Map<string, BrandSource[]>();
  const overall: BrandSource[] = [];
  for (const s of sources) {
    if (s.pillar && PILLAR_ORDER.includes(s.pillar)) {
      if (!byPillar.has(s.pillar)) byPillar.set(s.pillar, []);
      byPillar.get(s.pillar)!.push(s);
    } else {
      overall.push(s);
    }
  }

  const groups: Array<{ key: string; label: string; items: BrandSource[] }> = [];
  if (overall.length) {
    groups.push({ key: 'overall', label: 'Overall rating', items: overall });
  }
  for (const key of PILLAR_ORDER) {
    const items = byPillar.get(key);
    if (items && items.length) {
      groups.push({ key, label: PILLAR_LABELS[key], items });
    }
  }

  return (
    <section
      id="sources"
      className="bg-white border rounded-2xl p-8 shadow-sm mb-8"
      aria-labelledby="sources-heading"
    >
      <h2 id="sources-heading" className="text-2xl font-bold text-gray-900 mb-3">
        Sources for this rating
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        Every score on this page is built from the sources below — company sustainability
        reports, third-party certifiers and public registries. Where a claim rests only on the
        company&apos;s own reporting, we say so: that is disclosure, not independent verification.
      </p>

      <div className="space-y-7">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand mb-3">
              {group.label}
            </h3>
            <ul>
              {group.items.map((s) => (
                <SourceItem key={s.id} source={s} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-6 pt-5 border-t border-gray-100 text-sm text-gray-500 leading-relaxed">
        Links open the original page in a new tab and are recorded with the date we accessed them.
        Read how we choose and label sources on our{' '}
        <Link href="/sources" className="underline font-semibold text-gray-700 hover:text-brand-dark">
          Our Sources
        </Link>{' '}
        page.
      </p>
    </section>
  );
}

/** Neutral one-liner for brands whose sources are still being compiled. */
export function SourcesPending() {
  return (
    <section className="bg-white border rounded-2xl p-6 shadow-sm mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Sources for this rating</h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        Sources for this rating are being compiled — the score above reflects our analysis to date.{' '}
        <Link href="/sources" className="underline font-semibold text-gray-700 hover:text-brand-dark">
          How we source our ratings
        </Link>
        .
      </p>
    </section>
  );
}
