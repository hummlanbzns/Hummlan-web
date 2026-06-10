
import { CloudSun, RefreshCw, FlaskConical, Users, Sprout, Info } from 'lucide-react';

const pillarIcons: Record<string, any> = {
  'Climate Impact': CloudSun,
  'Circular Economy': RefreshCw,
  'Pollution Prevention': FlaskConical,
  'Supply Chain & Social': Users,
  'Biodiversity': Sprout,
};

export default function SustainabilityBreakdown({ ratings }: { ratings: any[] }) {
  return (
    <div className="bg-white border rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Info className="w-6 h-6 text-green-600" />
        Sustainability Breakdown
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ratings.map((rating) => {
          const pillarName = rating.source_name.replace('Hummlan Pillar: ', '');
          const Icon = pillarIcons[pillarName] || Info;
          const score = rating.rating_score;
          const maxScore = rating.max_score || 5;
          const percentage = (score / maxScore) * 100;

          return (
            <div key={rating.id} className="flex flex-col gap-3 p-4 border rounded-xl hover:border-green-200 transition-colors bg-gray-50/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white rounded-lg border shadow-sm">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-bold text-gray-700">{pillarName}</span>
                </div>
                <span className="text-sm font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  {score}/{maxScore}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <p className="text-sm text-gray-600 leading-snug">
                {rating.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0" />
        <p className="text-sm text-blue-800">
          Our ratings are <strong>"stern but fair"</strong>, based on third-party certifications and EU Taxonomy alignment. 
          We prioritize verifiable data over brand marketing claims.
        </p>
      </div>
    </div>
  );
}
