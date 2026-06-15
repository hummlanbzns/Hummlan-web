import type { SVGProps } from 'react';

type HummlanBeeMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export default function HummlanBeeMark({
  title = 'Hummlan bee mark',
  className,
  ...props
}: HummlanBeeMarkProps) {
  return (
    <svg
      viewBox="0 0 72 72"
      role="img"
      aria-label={title}
      className={className}
      {...props}
    >
      {/* Wings */}
      <ellipse cx="24" cy="20" rx="12" ry="10" fill="currentColor" opacity="0.22" />
      <ellipse cx="48" cy="20" rx="12" ry="10" fill="currentColor" opacity="0.22" />
      {/* Body */}
      <ellipse cx="36" cy="40" rx="16" ry="20" fill="currentColor" />
      {/* Stripes */}
      <rect x="22" y="31" width="28" height="5" rx="2.5" fill="white" opacity="0.9" />
      <rect x="22" y="42" width="28" height="5" rx="2.5" fill="white" opacity="0.9" />
      {/* Head */}
      <circle cx="36" cy="15" r="9" fill="currentColor" />
      {/* Antennae */}
      <path d="M33 8 L29 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M39 8 L43 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="32" cy="14" r="1.6" fill="white" />
      <circle cx="40" cy="14" r="1.6" fill="white" />
      {/* Stinger */}
      <path d="M36 58 L33 65" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M36 58 L39 65" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}