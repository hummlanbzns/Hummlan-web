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
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      {...props}
    >
      <ellipse cx="22" cy="18" rx="10" ry="8" fill="currentColor" opacity="0.26" />
      <ellipse cx="42" cy="18" rx="10" ry="8" fill="currentColor" opacity="0.26" />
      <ellipse cx="32" cy="36" rx="14" ry="18" fill="currentColor" />
      <rect x="21" y="29" width="22" height="4" rx="2" fill="white" opacity="0.9" />
      <rect x="21" y="38" width="22" height="4" rx="2" fill="white" opacity="0.9" />
      <circle cx="32" cy="14" r="7" fill="currentColor" />
      <path d="M29 8 L26 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 8 L38 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="29" cy="13" r="1.1" fill="white" />
      <circle cx="35" cy="13" r="1.1" fill="white" />
      <path d="M28.5 16.5 Q32 19 35.5 16.5" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M32 54 L29 60" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 54 L35 60" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
