import type { SVGProps } from 'react';

type HummlanBeeMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

const CHARCOAL = '#2D2D2D';
const BRAND = '#F59127';
const WING = '#F5F0E8';

export default function HummlanBeeMark({
  title = 'Hummlan bee mark',
  className,
  ...props
}: HummlanBeeMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
      {...props}
    >
      {/* Hexagon frame */}
      <polygon
        points="50,2 90,26 90,74 50,98 10,74 10,26"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Wings - left */}
      <ellipse cx="30" cy="36" rx="16" ry="12" fill={WING} stroke={CHARCOAL} strokeWidth="2.5" transform="rotate(-15 30 36)" />
      {/* Wing vein - left */}
      <path d="M22 36 Q30 28 38 36" stroke={CHARCOAL} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M26 32 Q30 30 34 34" stroke={CHARCOAL} strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Wings - right */}
      <ellipse cx="70" cy="36" rx="16" ry="12" fill={WING} stroke={CHARCOAL} strokeWidth="2.5" transform="rotate(15 70 36)" />
      {/* Wing vein - right */}
      <path d="M62 36 Q70 28 78 36" stroke={CHARCOAL} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M66 32 Q70 30 74 34" stroke={CHARCOAL} strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Body - bottom segment */}
      <ellipse cx="50" cy="68" rx="14" ry="18" fill={BRAND} stroke={CHARCOAL} strokeWidth="2.5" />
      {/* Body stripe 1 */}
      <rect x="37" y="58" width="26" height="5" rx="2.5" fill={WING} stroke={CHARCOAL} strokeWidth="1.2" />
      {/* Body stripe 2 */}
      <rect x="37" y="70" width="26" height="5" rx="2.5" fill={WING} stroke={CHARCOAL} strokeWidth="1.2" />

      {/* Head */}
      <circle cx="50" cy="28" r="10" fill={BRAND} stroke={CHARCOAL} strokeWidth="2.5" />

      {/* Antennae */}
      <path d="M45 20 L38 10" stroke={CHARCOAL} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="38" cy="10" r="2" fill={CHARCOAL} />
      <path d="M55 20 L62 10" stroke={CHARCOAL} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="62" cy="10" r="2" fill={CHARCOAL} />

      {/* Stinger */}
      <path d="M50 85 L47 93" stroke={CHARCOAL} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 85 L53 93" stroke={CHARCOAL} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}