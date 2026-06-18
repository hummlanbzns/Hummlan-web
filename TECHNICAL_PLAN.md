# HSS Search Engine & Learning Hub — Technical Planning Document

## Executive Summary
Hummlan.com has **48 brands** in its database, but only **8** are connected to affiliate programs. The core challenge is making **all** brands and products searchable and ratable via HSS, regardless of affiliate status. This document covers the search engine architecture, learning hub CMS, HSS standardization for patenting, and a functional prototype.

---

## 1. HSS Search Engine Architecture

### 1.1 Problem Statement
Currently, products are only surfaced via category/shop pages that require `affiliate_links` for pricing. Brands without affiliate links (40 out of 48) are "invisible" to users but are already rated in the database.

### 1.2 Solution: Universal Brand & Product Index

**Core Principle:** Every brand in the database — whether it has affiliate products or not — should appear in search results with its HSS rating and detailed pillar breakdown.

#### Data Model Enhancements

```sql
-- Brands without affiliate links need no changes — they already exist
-- We just need a search index query that doesn't require affiliate joins

-- New table: brand_index for full-text search
CREATE TABLE brand_index (
    id TEXT PRIMARY KEY,
    brand_id TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    brand_slug TEXT NOT NULL,
    description TEXT,
    overall_score REAL,
    category_tags TEXT,  -- comma-separated category names
    certification_names TEXT,  -- comma-separated cert names
    is_affiliate BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Enable FTS5 for full-text search
CREATE VIRTUAL TABLE brand_fts USING fts5(
    brand_name,
    description,
    category_tags,
    certification_names,
    content='brand_index',
    content_rowid='rowid'
);
```

#### Search API Design

```typescript
// src/lib/hss-search.ts

interface HSSSearchResult {
  type: 'brand' | 'product';
  id: string;
  name: string;
  slug: string;
  brandName?: string;
  description: string;
  overallScore: number;
  pillarScores: { name: string; score: number; maxScore: number }[];
  categoryName: string;
  categorySlug: string;
  certifications: string[];
  isAffiliate: boolean;
  lowestPrice?: number;
  imageUrl?: string;
}

async function searchHSS(query: string, filters?: HSFilterOptions): Promise<HSSSearchResult[]> {
  // 1. Full-text search via FTS5 on brand_index
  // 2. Fall back to LIKE search on brands + products tables
  // 3. Apply category/sustainability filters
  // 4. Sort by relevance + sustainability score
  // 5. Return results with pillar breakdowns
}
```

#### Data Refresh Strategy
- **Cron job** (Vercel Cron or GitHub Action): Refresh `brand_index` table weekly
- **On-demand**: Refresh when a new brand is added or rating updated
- All brands and products are included regardless of affiliate status

---

## 2. Sustainability Learning Hub Architecture

### 2.1 Content Strategy

**Content Types:**
1. **Framework Explainers** (EU Taxonomy, CSRD, DNSH principles)
2. **Pillar Deep Dives** (5 pillars of HSS)
3. **News & Analysis** (sustainability policy updates, greenwashing watch)
4. **How-To Guides** (reading product labels, understanding certifications)

### 2.2 Recommended Approach: MDX + File-Based CMS

**Why MDX over headless CMS:**
- No external dependencies or API calls
- Full type safety with TypeScript
- Version-controlled alongside code
- Works seamlessly with Next.js App Router
- SEO-friendly (static generation)
- Zero cost (vs. paid CMS)

#### Directory Structure:

```
src/
  content/
    learning/
      eu-taxonomy/
        index.mdx
        what-is-eu-taxonomy.mdx
        do-no-significant-harm.mdx
      csrd/
        index.mdx
        esrs-standards.mdx
      hss-pillars/
        climate-impact.mdx
        circular-economy.mdx
        pollution-prevention.mdx
        supply-chain-social.mdx
        biodiversity.mdx
      news/
        2025-06-10-new-eu-regulation.mdx
    best-of/
      affordable-sustainable-basics-under-50.mdx
      affordable-sustainable-home-essentials.mdx
```

#### MDX Component Library:

```typescript
// src/components/mdx/
// HSSScoreBadge.tsx — Inline HSS score display
// PillarBreakdown.tsx — Visual pillar chart
// CertificationBadge.tsx — Badge for certifications
// ProsCons.tsx — Two-column upsides/downsides
// GreenwashingAlert.tsx — Warning callout
// DataSource.tsx — Citation with source URL
// LearnMore.tsx — Link to related learning content
```

### 2.3 Dynamic Routes for Content

```typescript
// src/app/learn/[slug]/page.tsx — Dynamic MDX renderer
// src/app/learn/page.tsx — Learning hub index
```

### 2.4 Newsletter Integration
Existing `NewsletterSignup` component already exists. Integrate at the bottom of every learning article to capture leads.

---

## 3. HSS Standardization for Industry Adoption

### 3.1 Current Schema Assessment

The current `sustainability_ratings` table is already quite robust:
- `entity_type` ('brand' | 'product') — polymorphic
- `source_name` — flexible for any rating source
- `rating_value` — original human-readable value
- `rating_score` / `max_score` — normalized numeric
- `rating_url` — evidence trail
- `description` — qualitative explanation

### 3.2 Enhancements Needed for Patenting

```sql
-- ALTER TABLE sustainability_ratings ADD COLUMN

-- Methodology version tracking
ALTER TABLE sustainability_ratings ADD COLUMN methodology_version TEXT;

-- Evidence tier (1=third-party audited, 2=self-reported verified, 3=declared)
ALTER TABLE sustainability_ratings ADD COLUMN evidence_tier INTEGER CHECK(evidence_tier BETWEEN 1 AND 3);

-- Pillar weight (for weighted score calculation)
ALTER TABLE sustainability_ratings ADD COLUMN pillar_weight REAL;

-- Reviewer/auditor attribution
ALTER TABLE sustainability_ratings ADD COLUMN reviewer TEXT;

-- Date of evidence/audit (not just when we entered it)
ALTER TABLE sustainability_ratings ADD COLUMN evidence_date DATE;

-- Evidence document URL (supporting PDF or certification page)
ALTER TABLE sustainability_ratings ADD COLUMN evidence_document_url TEXT;
```

### 3.3 Pillar Weight Configuration

```sql
CREATE TABLE hss_pillar_config (
    id TEXT PRIMARY KEY,
    pillar_name TEXT NOT NULL UNIQUE,
    pillar_slug TEXT NOT NULL UNIQUE,
    weight REAL NOT NULL CHECK(weight BETWEEN 0 AND 1),
    max_points INTEGER NOT NULL,
    description TEXT,
    methodology_version TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed default configuration
INSERT INTO hss_pillar_config (id, pillar_name, pillar_slug, weight, max_points, methodology_version) VALUES
    ('p1', 'Climate Impact', 'climate-impact', 0.20, 20, '1.0'),
    ('p2', 'Circular Economy', 'circular-economy', 0.20, 20, '1.0'),
    ('p3', 'Pollution Prevention', 'pollution-prevention', 0.15, 15, '1.0'),
    ('p4', 'Supply Chain & Social', 'supply-chain-social', 0.20, 20, '1.0'),
    ('p5', 'Biodiversity', 'biodiversity', 0.15, 15, '1.0');
```

### 3.4 Methodology Versioning

```sql
CREATE TABLE hss_methodology_versions (
    id TEXT PRIMARY KEY,
    version TEXT NOT NULL UNIQUE,
    release_date DATE NOT NULL,
    changelog TEXT,
    is_current BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3.5 HSS Score Calculation Engine

```typescript
// src/lib/hss-engine.ts

function calculateHSS(pillarScores: PillarScore[], version: MethodologyVersion): HSSResult {
  // 1. Validate evidence tiers
  // 2. Apply pillar weights
  // 3. Apply DNSH penalty if any pillar is critically low
  // 4. Calculate final score (0-100)
  // 5. Return breakdown for transparency
}
```

---

## 4. HSS Search Interface Prototype

### 4.1 Route & Layout

**Route:** `/search` — public search page
**API Route:** `/api/search` — JSON search endpoint (for future SPA)

### 4.2 UI Components

**SearchBar**: Full-width input with autocomplete suggestions
- Debounced input (300ms)
- Live results as you type
- Clear button

**FilterPanel**: 
- Category filter (dropdown/chips)
- Sustainability score range slider
- Affiliate/Non-affiliate toggle
- Sort by: Score | Name | Category

**ResultCard**: Brand/product card showing:
- Brand name + logo placeholder
- HSS score with color-coded badge
- Pillar scores (compact horizontal bars)
- Category tag
- "View Details" link to brand/product page
- "Compare Prices" only if affiliate links exist

### 4.3 Implementation Priority

1. **Phase 1 (This sprint)**: Basic search page with server-side filtering
2. **Phase 2**: FTS5 full-text search index + autocomplete
3. **Phase 3**: Advanced filters + sorting
4. **Phase 4**: Brand detail pages for non-affiliate brands

---

## 5. Database Schema Changes Summary

### New Tables:
1. `brand_index` — Denormalized search index
2. `brand_fts` — FTS5 virtual table for full-text search
3. `hss_pillar_config` — Pillar weights and methodology config
4. `hss_methodology_versions` — Version tracking for patenting
5. `learning_content` (optional) — DB-stored content if not using MDX

### Modified Tables:
1. `sustainability_ratings` — Add evidence_tier, methodology_version, pillar_weight, reviewer, evidence_date, evidence_document_url
2. `products` — Add is_affiliate_only flag

---

## 6. Build & Deployment

- All new code in Next.js App Router
- SQLite/Turso for database (same as existing)
- MDX files for learning content (static generation)
- GitHub Actions for brand_index refresh
- All changes via feature branches with PR review

---

*Document version 1.0 — June 2026*
