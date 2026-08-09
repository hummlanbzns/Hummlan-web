'use client';

/**
 * BrandLogo — Renders a brand logo image with a styled fallback.
 *
 * If logoUrl is provided and non-empty, renders an <img>.
 * Otherwise shows a circular fallback with the brand's first letter,
 * colored by HSS score band.
 */

import { useState } from 'react';

interface BrandLogoProps {
  name: string;
  logoUrl: string | null | undefined;
  size?: number; // width/height in px (default: 80 for hero, 28 for cards)
  score?: number | null; // for fallback color
  className?: string;
}

function getScoreColors(score: number | null | undefined) {
  if (score === null || score === undefined) return { bg: 'bg-gray-200', text: 'text-gray-500' };
  if (score >= 70) return { bg: 'bg-green-100', text: 'text-green-700' };
  if (score >= 50) return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
  if (score >= 30) return { bg: 'bg-orange-100', text: 'text-orange-700' };
  return { bg: 'bg-red-100', text: 'text-red-700' };
}

export default function BrandLogo({ name, logoUrl, size = 80, score, className = '' }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  const colors = getScoreColors(score);
  const initial = name?.charAt(0)?.toUpperCase() || '?';

  // If logoUrl is valid, render image
  if (logoUrl && !imgError) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        width={size}
        height={size}
        className={`object-contain rounded-xl ${className}`}
        style={{ width: size, height: size }}
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  // Fallback: colored circle with first initial
  const fontSize = size >= 80 ? Math.round(size * 0.45) : Math.round(size * 0.5);
  return (
    <div
      className={`rounded-full flex items-center justify-center font-extrabold shrink-0 border-2 border-gray-200 ${colors.bg} ${colors.text} ${className}`}
      style={{ width: size, height: size, fontSize }}
      aria-label={`${name} logo (fallback)`}
    >
      {initial}
    </div>
  );
}