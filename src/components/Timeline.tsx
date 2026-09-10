import { CalendarDays } from 'lucide-react';

export interface TimelineStop {
  year: string;
  title: string;
  body: string;
}

export default function Timeline({ stops }: { stops: TimelineStop[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-blue-200" aria-hidden="true" />
      <div className="space-y-8">
        {stops.map((stop) => (
          <div key={stop.year} className="relative pl-14">
            <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-blue-100">
              <CalendarDays className="h-4 w-4" />
            </div>
            <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
              {stop.year}
            </div>
            <h3 className="mt-2 font-bold text-gray-900">{stop.title}</h3>
            <p className="mt-1 text-sm md:text-base text-gray-600 leading-relaxed">{stop.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}