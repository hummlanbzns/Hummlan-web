import { Clock } from 'lucide-react';

/**
 * Shared amber "What's changing right now" panel, used on both /csrd and
 * /eu-taxonomy. Each page supplies its own evolving items as children (a lead
 * paragraph plus a bullet list); the title, Clock icon and "last checked"
 * footer are shared so the two explainers stay visually identical.
 *
 * Honesty guardrail: evolving EU items are labelled as pending/evolving, never
 * presented as settled law.
 */
export default function EvolvingPanel({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-10 shadow-sm mb-10">
      <h2 className="text-2xl font-bold text-amber-900 mb-5 flex items-center gap-3">
        <span className="p-2 bg-white rounded-lg border border-amber-200 shrink-0">
          <Clock className="w-5 h-5 text-amber-700" />
        </span>
        What&apos;s changing right now
      </h2>
      <div className="space-y-3 text-amber-900/90 leading-relaxed text-[15px] md:text-base">
        {children}
      </div>
      <p className="text-amber-800/70 text-sm italic mt-5">
        *Last checked: September 2026. We keep this page updated as the rules move.*
      </p>
    </section>
  );
}