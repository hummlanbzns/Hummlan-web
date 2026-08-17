-- Pillar drill-down: "why this score" detail column v1.0
-- Applied via team-db CLI on 2026-08-17 (shared DB). This file documents the
-- change and can be re-run against any environment. Content is authored by the
-- researcher team; the rows below are the initial demo seed (Patagonia + H&M).

ALTER TABLE sustainability_ratings ADD COLUMN detail TEXT;

-- Demo seed: Patagonia (high scorer — strengths + what would improve)
UPDATE sustainability_ratings SET detail = '**Evidence:** SBTi-approved Scope 1/2/3 targets; emissions down ~87% since 1990s baseline; Climate Neutral certified.
**What would improve the score:**
- Publish per-product lifecycle assessments across the full catalogue
- Cut third-party logistics emissions with lower-carbon shipping modes' WHERE id = 'sr_patagonia_climate_impact';

UPDATE sustainability_ratings SET detail = '**Evidence:** Worn Wear repair and resale programme; recycled materials in ~87% of products; lifetime repair guarantees on many styles.
**What would improve the score:**
- Publish annual repair and take-back volumes
- Scale garment-to-garment recycling beyond pilot stage' WHERE id = 'sr_patagonia_circular_economy';

UPDATE sustainability_ratings SET detail = '**Evidence:** Bluesign-approved dyes and mills; PFC-free DWR finishes since 2020; dye-free low-impact lines.
**What would improve the score:**
- Extend bluesign certification to 100% of mills
- Publish microfiber-shedding test results for synthetic styles' WHERE id = 'sr_patagonia_pollution_prevention';

UPDATE sustainability_ratings SET detail = '**Evidence:** Fair Trade Certified sewing; verified living-wage progress; public factory list and supply-chain map.
**What would improve the score:**
- Cover 100% of production with Fair Trade certification
- Publish third-party audits of living-wage data' WHERE id = 'sr_patagonia_supply_chain___social';

UPDATE sustainability_ratings SET detail = '**Evidence:** 100% renewable electricity in owned operations; regenerative organic cotton pilots; 1% for the Planet funding land and species protection.
**What would improve the score:**
- Publish land-use metrics for cotton-sourcing regions
- Scale regenerative pilots into mainstream sourcing' WHERE id = 'sr_patagonia_biodiversity';

-- Demo seed: H&M (lower scorer — shortfalls + what would improve)
UPDATE sustainability_ratings SET detail = '**Evidence:** SBTi-approved absolute Scope 1/2/3 targets; high share of preferred (recycled/organic) materials.
**Where it falls short:** Absolute emissions have risen with business growth - intensity gains are outpaced by volume under the fast-fashion model.
**What would improve the score:**
- Tie executive incentives to absolute emission cuts
- Reduce unit volumes and prioritise durability over trend cycles' WHERE id = 'sr_hm_climate_impact';

UPDATE sustainability_ratings SET detail = '**Evidence:** In-store garment collection in most markets; growing use of recycled fibres.
**Where it falls short:** Less than 1% of collected garments become new garments - most is downcycled or exported, so the loop is not closed.
**What would improve the score:**
- Invest in garment-to-garment recycling infrastructure
- Publish annual circularity metrics on collected vs re-used fibre' WHERE id = 'sr_hm_circular_economy';

UPDATE sustainability_ratings SET detail = '**Evidence:** ZDHC chemical-management compliance at mills.
**Where it falls short:** Massive synthetic-fibre use drives microplastic shedding; chemical compliance is largely supplier-reported.
**What would improve the score:**
- Adopt microfiber-shedding limits and filtration at washing facilities
- Publish third-party wastewater test results per supplier' WHERE id = 'sr_hm_pollution_prevention';

UPDATE sustainability_ratings SET detail = '**Evidence:** Publishes an annual supplier and factory list; participates in multi-stakeholder labour initiatives.
**Where it falls short:** A high-profile 2013 living-wage pledge remains undelivered; audit remediation is slow and wages in key sourcing countries still trail living-wage benchmarks.
**What would improve the score:**
- Publish a dated living-wage roadmap with factory-level wage data
- Adjust purchasing practices that squeeze supplier margins' WHERE id = 'sr_hm_supply_chain___social';

UPDATE sustainability_ratings SET detail = '**Evidence:** Public targets for recycled or sustainably sourced materials; support for sustainable-cotton initiatives.
**Where it falls short:** Much of the cotton and wood still comes from conventional, water-intensive agriculture; no published land-use or deforestation-risk data for the full supply chain.
**What would improve the score:**
- Publish supplier-level land-use and deforestation-risk data
- Scale regenerative-agriculture programmes beyond pilots' WHERE id = 'sr_hm_biodiversity';
