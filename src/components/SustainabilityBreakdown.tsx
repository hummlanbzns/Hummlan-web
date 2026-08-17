'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CloudSun, RefreshCw, FlaskConical, Users, Sprout, Info, ChevronDown } from 'lucide-react';

const pillarIcons: Record<string, any> = {
  'Climate Impact': CloudSun,
  'Circular Economy': RefreshCw,
  'Pollution Prevention': FlaskConical,
  'Supply Chain & Social': Users,
  'Biodiversity': Sprout,
};

// Inline formatting: **bold** segments become <strong>.
function formatInline(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-gray-900">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// Tiny markdown-ish renderer for the `detail` column: paragraphs + "- " bullet lists.
function DetailBody({ detail }: { detail: string }) {
  const lines = detail
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const out: React.ReactNode[] = [];
  let list: string[] | null = null;

  const flushList = (key: string) => {
    if (list === null) return;
    out.push(
      <ul key={key} className="list-disc pl-5 space-y-1">
        {list.map((li, j) => (
          <li key={j} className="text-sm text-gray-600 leading-relaxed">
            {formatInline(li)}
          </li>
        ))}
      </ul>
    );
    list = null;
  };

  lines.forEach((line, i) => {
    if (line.startsWith('- ')) {
      if (list === null) list = [];
      list.push(line.slice(2));
    } else {
      flushList(`ul-${i}`);
      out.push(
        <p key={`p-${i}`} className="text-sm text-gray-600 leading-relaxed">
          {formatInline(line)}
        </p>
      );
    }
  });
  flushList('ul-end');

  return (
    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2" aria-label="Why this score">
      {out}
    </div>
  );
}

export default function SustainabilityBreakdown({ ratings }: { ratings: any[] }) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="bg-white border rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Info className="w-6 h-6 text-brand" />
        Sustainability Breakdown
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ratings.map((rating) => {
          const pillarName = rating.source_name.replace('Hummlan Pillar: ', '');
          const Icon = pillarIcons[pillarName] || Info;
          const score = rating.rating_score;
          const maxScore = rating.max_score || 5;
          const percentage = (score / maxScore) * 100;
          const detail = typeof rating.detail === 'string' ? rating.detail.trim() : '';
          const hasDetail = detail.length > 0;
          const isOpen = !!openIds[rating.id];
          const detailId = `pillar-detail-${rating.id}`;

          return (
            <div
              key={rating.id}
              className="flex flex-col gap-3 p-4 border rounded-xl hover:border-brand transition-colors bg-gray-50/50"
            >
              {hasDetail ? (
                <button
                  type="button"
                  onClick={() => toggle(rating.id)}
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  className="flex items-center justify-between gap-2 w-full text-left group"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="p-2 bg-white rounded-lg border shadow-sm shrink-0">
                      <Icon className="w-5 h-5 text-brand" />
                    </span>
                    <span className="font-bold text-gray-700 group-hover:text-brand-dark transition-colors">
                      {pillarName}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold bg-brand-light text-brand-dark px-2 py-0.5 rounded">
                      {score}/{maxScore}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-2 bg-white rounded-lg border shadow-sm shrink-0">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <span className="font-bold text-gray-700">{pillarName}</span>
                  </div>
                  <span className="text-sm font-bold bg-brand-light text-brand-dark px-2 py-0.5 rounded shrink-0">
                    {score}/{maxScore}
                  </span>
                </div>
              )}

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-brand h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-sm text-gray-600 leading-snug">{rating.description}</p>

              {hasDetail && isOpen && (
                <div id={detailId} className="mt-1">
                  <DetailBody detail={detail} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0" />
        <p className="text-sm text-blue-800">
          Our ratings are <strong>"stern but fair"</strong>, based on third-party certifications and
          EU Taxonomy + CSRD alignment. We prioritize verifiable data over brand marketing claims.{' '}
          <Link href="/eu-taxonomy" className="underline hover:text-blue-950">
            EU Taxonomy
          </Link>{' '}
          and{' '}
          <Link href="/csrd" className="underline hover:text-blue-950">
            CSRD
          </Link>{' '}
          explain the framework backbone.
        </p>
      </div>
    </div>
  );
}
