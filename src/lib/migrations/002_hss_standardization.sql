-- HSS Standardization & Search Engine Schema Migration v1.0

ALTER TABLE sustainability_ratings ADD COLUMN methodology_version TEXT DEFAULT '1.0';
ALTER TABLE sustainability_ratings ADD COLUMN evidence_tier INTEGER CHECK(evidence_tier BETWEEN 1 AND 3);
ALTER TABLE sustainability_ratings ADD COLUMN pillar_weight REAL;
ALTER TABLE sustainability_ratings ADD COLUMN reviewer TEXT;
ALTER TABLE sustainability_ratings ADD COLUMN evidence_date DATE;
ALTER TABLE sustainability_ratings ADD COLUMN evidence_document_url TEXT;

CREATE TABLE IF NOT EXISTS hss_pillar_config (
    id TEXT PRIMARY KEY, pillar_name TEXT NOT NULL UNIQUE, pillar_slug TEXT NOT NULL UNIQUE,
    weight REAL NOT NULL CHECK(weight BETWEEN 0 AND 1), max_points INTEGER NOT NULL,
    description TEXT, methodology_version TEXT NOT NULL DEFAULT '1.0',
    is_active BOOLEAN DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO hss_pillar_config VALUES
    ('p1','Climate Impact','climate-impact',0.20,20,'Carbon footprint, SBTi, renewable energy','1.0',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
    ('p2','Circular Economy','circular-economy',0.20,20,'Durability, repairability, recycled materials','1.0',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
    ('p3','Pollution Prevention','pollution-prevention',0.15,15,'Hazardous chemicals, microplastics, wastewater','1.0',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
    ('p4','Supply Chain & Social','supply-chain-social',0.20,20,'Living wages, worker safety, transparency','1.0',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
    ('p5','Biodiversity','biodiversity',0.15,15,'Deforestation-free, regenerative ag, water','1.0',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS hss_methodology_versions (
    id TEXT PRIMARY KEY, version TEXT NOT NULL UNIQUE, release_date DATE NOT NULL,
    changelog TEXT, is_current BOOLEAN DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO hss_methodology_versions VALUES ('v1','1.0','2026-06-01','Initial release: 5-pillar HSS with EU Taxonomy alignment',1,CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS brand_index (
    id TEXT PRIMARY KEY, brand_id TEXT NOT NULL, brand_name TEXT NOT NULL, brand_slug TEXT NOT NULL,
    description TEXT, overall_score REAL, category_tags TEXT, certification_names TEXT,
    has_affiliate_links BOOLEAN DEFAULT 0, product_count INTEGER DEFAULT 0, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE IF NOT EXISTS learning_content (
    id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK(content_type IN ('explainer','pillar','news','guide')),
    body_markdown TEXT NOT NULL, excerpt TEXT, author TEXT, published_at DATE,
    is_published BOOLEAN DEFAULT 0, tags TEXT, related_article_slugs TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_brand_index_score ON brand_index(overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_brand_index_affiliate ON brand_index(has_affiliate_links);
CREATE INDEX IF NOT EXISTS idx_learning_content_type ON learning_content(content_type);
CREATE INDEX IF NOT EXISTS idx_learning_content_published ON learning_content(is_published);