-- Migration: brand_sources
-- Purpose: store the real, verifiable sources behind every HSS score so
-- visitors can check the facts themselves. See scripts/import_brand_sources.py
-- for the importer and data/brand-sources/*.json for the data batches.
--
-- pillar: one of climate|circular|pollution|supply_chain|biodiversity,
--         or NULL when the source supports the overall HSS score.
-- is_primary: 1 when the source is the brand's own first-party reporting
--         (i.e. self-reported, not independent verification).

CREATE TABLE IF NOT EXISTS brand_sources (
  id            TEXT PRIMARY KEY,
  brand_id      TEXT NOT NULL,
  pillar        TEXT NULL,
  title         TEXT NOT NULL,
  publisher     TEXT,
  url           TEXT NOT NULL,
  source_type   TEXT,
  published_date TEXT NULL,
  accessed_date TEXT NOT NULL,
  supports      TEXT,
  is_primary    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK (pillar IS NULL OR pillar IN ('climate','circular','pollution','supply_chain','biodiversity'))
);

CREATE INDEX IF NOT EXISTS idx_brand_sources_brand_id ON brand_sources (brand_id);
