export interface NumberedCondition {
  number: string;
  title: string;
  subtitle: string;
  text: string;
}

export default function NumberedConditions({
  conditions,
}: {
  conditions: NumberedCondition[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {conditions.map((condition) => (
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
  );
}