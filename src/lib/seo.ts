export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://hummlan.com').replace(/\/$/, '');
export const SITE_NAME = 'Hummlan';
export const SITE_TAGLINE = 'Stern but Fair Sustainability Ratings';
export const SITE_DESCRIPTION =
  'Stern but fair sustainability ratings for brands and companies, backed by EU Taxonomy and CSRD principles. Check any brand\'s record before you buy — no product pushing, no affiliate pressure, no greenwashing.';
export const DEFAULT_OG_IMAGE = '/og-default.svg';
export const DEFAULT_OG_IMAGE_ALT =
  'Hummlan — stern but fair sustainability ratings for brands and companies.';
export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}
export function toOgImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return DEFAULT_OG_IMAGE;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  if (imageUrl.startsWith('/')) return imageUrl;
  return `/${imageUrl}`;
}