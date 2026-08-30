#!/usr/bin/env node
/**
 * Generate the 9 branded Hummlan pin images (1000x1500px, 2:3 vertical) into
 * /opt/hummlan-web/public/pins/ using sharp to rasterize clean SVG templates.
 *
 * These are text-overlay brand pins (brand name + HSS score + hummlan.com logo)
 * on a brand-gradient background. Each pin references the exact overlay text
 * from pinterest-pin-pack-1.md. Dr. Bronner's (pin 3) is NOT generated here —
 * it uses a real product photo URL and is posted directly from pin-pack-1.json.
 *
 * Requirement: `sharp` must be installed. It is intentionally NOT added to the
 * app's package.json (it is only a generation-time tool). Generate once with:
 *   cd /tmp && npm init -y && npm i sharp
 *   node /opt/hummlan-web/scripts/pinterest/generate-pin-images.mjs /tmp/node_modules
 * then commit the produced public/pins/*.png (they are the durable deliverable).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', '..', 'public', 'pins');

const NODE_MODULES = process.argv[2];
if (!NODE_MODULES) {
  console.error('USAGE: node generate-pin-images.mjs /path/to/install-dir/node_modules');
  process.exit(1);
}
const sharp = (await import(join(NODE_MODULES, 'sharp', 'dist', 'index.cjs'))).default;

const W = 1000, H = 1500;

const pins = [
  { file: 'patagonia.png', brand: 'Patagonia', score: 'HSS 95/100', tag: 'The brand we rate highest', accent: '#1f6f4a', accent2: '#123524' },
  { file: 'nudie-jeans.png', brand: 'Nudie Jeans', score: 'HSS 93/100', tag: 'Sustainable denim, sternly rated', accent: '#24477a', accent2: '#152a4a' },
  { file: 'ethique.png', brand: 'Ethique', score: 'HSS 88/100', tag: 'Plastic-free haircare', accent: '#3f9e9e', accent2: '#1f5c5c' },
  { file: 'blueland.png', brand: 'Blueland', score: 'HSS 85/100', tag: 'Clean without the plastic', accent: '#2e7d9e', accent2: '#17475e' },
  { file: 'wgac.png', brand: 'Who Gives A Crap', score: 'HSS 84/100', tag: '50% of profits to sanitation', accent: '#8a5aa8', accent2: '#4d3161' },
  { file: 'abeego.png', brand: 'Abeego', score: 'HSS 81/100', tag: 'Reusable food wrap that works', accent: '#b57a2a', accent2: '#6b4716' },
  { file: 'bestof-basics.png', brand: 'Sustainable Basics', score: 'Under $50', tag: 'Stern-rated, honestly priced', accent: '#7a6a4a', accent2: '#4a3f2a' },
  { file: 'bestof-home.png', brand: 'Home Essentials', score: 'Under $20', tag: 'Eco cleaning that works', accent: '#4a9e6a', accent2: '#2a5c3c' },
  { file: 'eu-taxonomy.png', brand: 'EU Taxonomy', score: 'Explained', tag: 'Plain language, no jargon', accent: '#2e7d4a', accent2: '#17472a' },
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function svg(p) {
  const fs = 118; // brand font size
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.accent}"/>
      <stop offset="100%" stop-color="${p.accent2}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <!-- decorative leaf circle -->
  <circle cx="${W-160}" cy="170" r="90" fill="#ffffff" opacity="0.10"/>
  <circle cx="${W-160}" cy="170" r="46" fill="none" stroke="#ffffff" stroke-width="8" opacity="0.35"/>
  <!-- top logo -->
  <text x="90" y="110" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#ffffff" letter-spacing="4">HUMMLAN.COM</text>
  <text x="90" y="160" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#ffffff" opacity="0.85" letter-spacing="2">STERN BUT FAIR RATINGS</text>
  <!-- center content -->
  <text x="90" y="${130 + H*0.30}" font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="800" fill="#ffffff">${esc(p.brand)}</text>
  <text x="90" y="${130 + H*0.30 + 52}" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="#ffffff">${esc(p.score)}</text>
  <text x="90" y="${130 + H*0.30 + 130}" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="#ffffff" opacity="0.92">${esc(p.tag)}</text>
  <text x="90" y="${130 + H*0.30 + 205}" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#ffffff" opacity="0.75">hummlan.com</text>
  <!-- bottom band -->
  <rect x="0" y="${H-120}" width="${W}" height="120" fill="#ffffff" opacity="0.10"/>
  <text x="90" y="${H-58}" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="600" fill="#ffffff">See the full ${p.brand} breakdown</text>
</svg>`;
}

mkdirSync(OUT_DIR, { recursive: true });
for (const p of pins) {
  const out = join(OUT_DIR, p.file);
  await sharp(Buffer.from(svg(p))).png().toFile(out);
  console.log(`wrote ${p.file}`);
}
console.log(`\n${pins.length} pin images written to ${OUT_DIR}`);
