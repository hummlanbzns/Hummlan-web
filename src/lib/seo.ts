export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://hummlan.com').replace(/\/$/, '');

export const SITE_NAME = 'Hummlan.com';
export const SITE_TAGLINE = 'Cheapest & Most Sustainable Product Comparison';
export const SITE_DESCRIPTION =
  'Stern but fair sustainability ratings backed by EU Taxonomy and CSRD principles. Compare prices and shop cleaner, cheaper, and smarter.';

export const DEFAULT_OG_IMAGE = '/og-default.svg';
export const DEFAULT_OG_IMAGE_ALT =
  'Hummlan.com — Compare the cheapest and most sustainable products with stern and fair ratings.';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function toOgImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return DEFAULT_OG_IMAGE;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  if (imageUrl.startsWith('/')) return imageUrl;
  return `/${imageUrl}`;
}
