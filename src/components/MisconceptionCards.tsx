import type { LucideIcon } from 'lucide-react';

export interface MisconceptionItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

export default function MisconceptionCards({ items }: { items: MisconceptionItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="border rounded-xl p-5 bg-gray-50/70">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg border">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}