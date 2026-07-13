import React from 'react';
import {
  ShieldCheck,
  Scale,
  CheckCircle,
  Info,
  Award,
  AlertTriangle,
  Thermometer,
  RefreshCw,
  Eye,
  Heart,
  Leaf,
  TrendingUp,
  BookOpen,
  FileText,
  Search,
  Database,
  BarChart,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface PillarDetail {
  number: number;
  icon: React.ReactNode;
  title: string;
  weight: string;
  color: string;
  euTaxonomy: string;
  summary: string;
  sternReality: string;
  criteria: { range: string; label: string; description: string }[];
  excellentExample: { brand: string; detail: string };
  failExample: { brand: string; detail: string };
}

interface EvidenceTier {
  tier: string;
  multiplier: string;
  meaning: string;
  examples: string;
}

interface ScoreSample {
  brand: string;
  score: number;
  breakdown: { pillar: string; score: number; tier: string }[];
  summary: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PILLARS: PillarDetail[] = [
  {
    number: 1,
    icon: <Thermometer className="w-6 h-6" />,
    title: 'Climate Impact',
    weight: '20%',
    color: 'red',
    euTaxonomy: 'Article 10 — Climate Change Mitigation',
    summary:
      'Measures a brand\'s commitment to reducing greenhouse gas emissions across its entire value chain — from raw material extraction to product disposal.',
    sternReality:
      'Tackling the climate crisis requires absolute reductions in greenhouse gas emissions, not just purchasing carbon offsets or planting trees while continuing business as usual. We do not award points for "net-zero by 2050" pledges without credible interim targets.',
    criteria: [
      {
        range: '90–100',
        label: 'Excellent',
        description:
          'SBTi-aligned targets verified, annual Scope 1-2-3 emissions reported, 100% renewable energy in operations, year-over-year absolute reductions demonstrated.',
      },
      {
        range: '75–89',
        label: 'Very Good',
        description:
          'Published emissions data with some Scope 3 coverage, active renewable energy procurement, near-term reduction targets set.',
      },
      {
        range: '60–74',
        label: 'Moderate',
        description:
          'Self-reported emissions claims without third-party verification, limited renewable energy use, targets disclosed but not SBTi-validated.',
      },
      {
        range: 'Below 60',
        label: 'Weak',
        description:
          'No public emissions data, no reduction targets, no renewable energy disclosure, or reliance on offsets without reduction commitments.',
      },
    ],
    excellentExample: {
      brand: 'Patagonia',
      detail:
        'Achieves 96/100 on Climate Impact. SBTi-aligned targets, annual Scope 1-2-3 reporting through CDP disclosure, 100% renewable energy across operations, and absolute emission reductions of 87% since the 1990s.',
    },
    failExample: {
      brand: 'Fast fashion giants',
      detail:
        'Brands that announce "carbon neutral" collections while simultaneously increasing total output and relying on fossil-fuel-powered manufacturing in countries with weak environmental regulations. Offsetting without reducing is not a climate strategy.',
    },
  },
  {
    number: 2,
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Circular Economy',
    weight: '20%',
    color: 'blue',
    euTaxonomy: 'Article 13 — Transition to a Circular Economy',
    summary:
      'Evaluates how a brand designs out waste — from material sourcing and product durability to repair services and end-of-life recovery systems.',
    sternReality:
      'We cannot extract our way to a sustainable future. Using 10% recycled plastic in a single-use bottle is not circularity — it is a band-aid. We demand systemic design changes that eliminate waste at the source.',
    criteria: [
      {
        range: '90–100',
        label: 'Excellent',
        description:
          'Comprehensive repair program with published guides, take-back or resale scheme, zero-waste or plastic-free packaging, mono-material design enabling recyclability, published durability guarantees.',
      },
      {
        range: '75–89',
        label: 'Very Good',
        description:
          'Refill or reuse options available for key products, majority of packaging is recyclable, products designed for durability with customer longevity data published.',
      },
      {
        range: '60–74',
        label: 'Moderate',
        description:
          'Standard recyclable packaging only, some recycled content in materials, no repair or take-back program offered.',
      },
      {
        range: 'Below 60',
        label: 'Weak',
        description:
          'Single-use or non-recyclable packaging, planned obsolescence evident in product design, no end-of-life management system.',
      },
    ],
    excellentExample: {
      brand: 'Nudie Jeans',
      detail:
        'Achieves 97/100 on Circular Economy. Free repairs offered at any Nudie store worldwide, a thriving pre-owned denim marketplace, and mono-material 100% cotton denim that is fully recyclable. Their repair program has fixed over 100,000 pairs of jeans.',
    },
    failExample: {
      brand: 'Tech companies',
      detail:
        'Brands that use proprietary screws, waterproof glue, and non-replaceable batteries to make repairs impossible, forcing consumers to buy entirely new devices when a single component fails. Planned obsolescence is the opposite of circularity.',
    },
  },
  {
    number: 3,
    icon: <Eye className="w-6 h-6" />,
    title: 'Pollution Prevention',
    weight: '15%',
    color: 'amber',
    euTaxonomy: 'Article 14 — Pollution Prevention & Control',
    summary:
      'Assesses a brand\'s management of toxic chemicals, microplastics, and hazardous substances across its manufacturing process and final product.',
    sternReality:
      'Toxicity in our air, water, and soil affects human health and devastates ecosystems. We have a zero-tolerance policy for "forever chemicals" (PFAS) and known carcinogens. Safe chemistry is non-negotiable.',
    criteria: [
      {
        range: '90–100',
        label: 'Excellent',
        description:
          'Multiple rigorous chemical safety certifications (MADE SAFE + Cradle to Cradle + EPA Safer Choice), full ingredient transparency with no proprietary secrecy, zero-discharge wastewater treatment, PFAS-free across all products.',
      },
      {
        range: '75–89',
        label: 'Very Good',
        description:
          'At least one rigorous chemical safety certification (EWG Verified, MADE SAFE, or equivalent), comprehensive ingredient disclosure, active microplastic mitigation program.',
      },
      {
        range: '60–74',
        label: 'Moderate',
        description:
          'Self-reported "non-toxic" or "eco-friendly" claims without third-party certification, partial ingredient disclosure only.',
      },
      {
        range: 'Below 60',
        label: 'Weak',
        description:
          'No chemical safety disclosure, known use of PFAS or other hazardous substances, no wastewater treatment data published.',
      },
    ],
    excellentExample: {
      brand: 'Acure',
      detail:
        'Achieves 88/100 on Pollution Prevention. EWG Verified with an "A" rating across their entire product line, COSMOS Organic certified, 100% vegan, paraben-free, sulfate-free, and mineral oil-free. Proves that safe chemistry does not have to be a luxury.',
    },
    failExample: {
      brand: 'Conventional activewear brands',
      detail:
        'Brands that rely on PFAS-based waterproofing or stain-resistant treatments, contaminating water supplies during both manufacturing and home washing. The same chemicals linked to cancer, immune suppression, and environmental persistence.',
    },
  },
  {
    number: 4,
    icon: <Heart className="w-6 h-6" />,
    title: 'Supply Chain & Social',
    weight: '20%',
    color: 'rose',
    euTaxonomy: 'CSRD ESRS S1 — Own Workforce',
    summary:
      'Audits a brand\'s treatment of workers across its entire supply chain — from fair wages and safe conditions to transparency about who makes the products.',
    sternReality:
      'A product cannot be sustainable if it is made through the exploitation of workers. Environmental justice and social justice are inextricably linked. A brand cannot hide behind a complex supply chain.',
    criteria: [
      {
        range: '90–100',
        label: 'Excellent',
        description:
          'Fair Trade Certified across core products, published factory list with public audit scores, third-party verified living wage commitment, strong worker grievance mechanisms.',
      },
      {
        range: '75–89',
        label: 'Very Good',
        description:
          'B Corp certification with social pillar score of 80+, published factory list (even if partial), active supplier code of conduct with audit program.',
      },
      {
        range: '60–74',
        label: 'Moderate',
        description:
          'Self-reported ethical sourcing policy, generic supplier code of conduct, no third-party audits or published enforcement results.',
      },
      {
        range: 'Below 60',
        label: 'Weak',
        description:
          'No supply chain disclosure, no published factory list, no evidence of labor audits, or documented labor violations without remediation.',
      },
    ],
    excellentExample: {
      brand: 'Dr. Bronner\'s',
      detail:
        'Achieves 98/100 on Supply Chain & Social. Pioneers in Fair Trade for over 18 years with verified living wages across their entire supply chain. They publish detailed supplier lists, maintain long-term relationships with farming cooperatives, and reinvest profits into community development projects.',
    },
    failExample: {
      brand: 'E-commerce fast fashion',
      detail:
        'Brands that utilize opaque webs of subcontractors, making it impossible to trace the origin of their products. Without transparency, there is no accountability for low wages, unsafe conditions, or child labour.',
    },
  },
  {
    number: 5,
    icon: <Leaf className="w-6 h-6" />,
    title: 'Biodiversity & Sourcing',
    weight: '15%',
    color: 'green',
    euTaxonomy: 'Article 15 — Protection & Restoration of Biodiversity',
    summary:
      'Evaluates a brand\'s impact on ecosystems — from raw material sourcing and deforestation-free supply chains to regenerative agriculture and water stewardship.',
    sternReality:
      'We are facing a mass extinction event driven largely by habitat destruction for agriculture and resource extraction. Protecting our carbon sinks — forests, wetlands, and soils — is as vital as reducing emissions.',
    criteria: [
      {
        range: '90–100',
        label: 'Excellent',
        description:
          'Regenerative Organic Certified (ROC) or equivalent, deforestation-free supply chain with third-party verification for all high-risk commodities, published biodiversity impact assessment, water stewardship certification.',
      },
      {
        range: '75–89',
        label: 'Very Good',
        description:
          'USDA Organic or equivalent certification across key ingredients, sustainable sourcing policy for high-risk commodities (palm oil, soy, cocoa, cotton), FSC-certified packaging.',
      },
      {
        range: '60–74',
        label: 'Moderate',
        description:
          'Self-reported sustainable sourcing claims, some organic ingredients, no comprehensive biodiversity or deforestation policy.',
      },
      {
        range: 'Below 60',
        label: 'Weak',
        description:
          'No sourcing disclosure, known use of commodities linked to deforestation, no certification for high-risk materials.',
      },
    ],
    excellentExample: {
      brand: 'Frontier Co-op',
      detail:
        'Achieves 92/100 on Biodiversity & Sourcing. Farmer-owned cooperative that works directly with small-scale farmers to implement regenerative organic practices. Supplies are sourced through Fair Trade relationships that enrich soil health, protect pollinators, and preserve surrounding ecosystems.',
    },
    failExample: {
      brand: 'Uncertified palm oil users',
      detail:
        'Food or cosmetic brands that rely on cheap, uncertified palm oil sourced from recently cleared rainforest in Southeast Asia, directly contributing to the habitat loss of orangutans, tigers, and countless other species.',
    },
  },
];

const EVIDENCE_TIERS: EvidenceTier[] = [
  {
    tier: 'Tier 1',
    multiplier: '1.0x',
    meaning: 'Third-party audited certification — full credit given',
    examples: 'GOTS, B Corp, Fair Trade, MADE SAFE, Cradle to Cradle, Bluesign, EU Ecolabel, USDA Organic',
  },
  {
    tier: 'Tier 2',
    multiplier: '0.75x',
    meaning: 'Self-reported with public, verifiable data — partial credit',
    examples: 'Published sustainability report, public factory list, online ingredient disclosure, CDP disclosure',
  },
  {
    tier: 'Tier 3',
    multiplier: '0.5x',
    meaning: 'Self-reported without supporting data — limited credit',
    examples: 'Website claims, marketing materials, press releases, social media posts',
  },
  {
    tier: 'Tier 4',
    multiplier: '0x',
    meaning: 'No evidence available — score capped at 30/100',
    examples: 'No certifications, no reports, no public disclosure on any pillar',
  },
];

const SAMPLE_ASSESSMENTS: ScoreSample[] = [
  {
    brand: 'Patagonia',
    score: 95,
    breakdown: [
      { pillar: 'Climate Impact', score: 96, tier: 'Tier 1' },
      { pillar: 'Circular Economy', score: 97, tier: 'Tier 1' },
      { pillar: 'Pollution Prevention', score: 88, tier: 'Tier 1' },
      { pillar: 'Supply Chain & Social', score: 98, tier: 'Tier 1' },
      { pillar: 'Biodiversity & Sourcing', score: 94, tier: 'Tier 1' },
    ],
    summary:
      'Only major outdoor brand meeting all EU Taxonomy DNSH criteria across all pillars. Worn Wear repair program, SBTi-aligned targets, Fair Trade Certified sewing, and NetPlus recycled fishing nets set the industry gold standard.',
  },
  {
    brand: 'Pact Organic',
    score: 79,
    breakdown: [
      { pillar: 'Climate Impact', score: 82, tier: 'Tier 2' },
      { pillar: 'Circular Economy', score: 68, tier: 'Tier 2' },
      { pillar: 'Pollution Prevention', score: 78, tier: 'Tier 1' },
      { pillar: 'Supply Chain & Social', score: 85, tier: 'Tier 1' },
      { pillar: 'Biodiversity & Sourcing', score: 72, tier: 'Tier 2' },
    ],
    summary:
      'Strong social and chemical management via GOTS and Fair Trade certifications. Docked for lacking circular economy programs (no repair or take-back) and relying on carbon offsets rather than absolute emission reductions.',
  },
  {
    brand: 'Seventh Generation',
    score: 70,
    breakdown: [
      { pillar: 'Climate Impact', score: 72, tier: 'Tier 2' },
      { pillar: 'Circular Economy', score: 58, tier: 'Tier 2' },
      { pillar: 'Pollution Prevention', score: 78, tier: 'Tier 1' },
      { pillar: 'Supply Chain & Social', score: 74, tier: 'Tier 2' },
      { pillar: 'Biodiversity & Sourcing', score: 68, tier: 'Tier 2' },
    ],
    summary:
      'Largest eco-household brand with excellent formulation standards (EPA Safer Choice). Docked for limited circular economy programs (standard plastic bottles, no refill system) and ownership by Unilever, which introduces governance concerns.',
  },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

const PillarCard: React.FC<{ pillar: PillarDetail }> = ({ pillar }) => {
  const colorMap: Record<string, string> = {
    red: 'border-red-200 bg-red-50',
    blue: 'border-blue-200 bg-blue-50',
    amber: 'border-amber-200 bg-amber-50',
    rose: 'border-rose-200 bg-rose-50',
    green: 'border-green-200 bg-green-50',
  };
  const badgeMap: Record<string, string> = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    green: 'bg-green-500',
  };
  const iconBgMap: Record<string, string> = {
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <div className={`border-2 rounded-2xl overflow-hidden ${colorMap[pillar.color] || 'border-gray-200 bg-gray-50'}`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${iconBgMap[pillar.color]}`}>{pillar.icon}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${badgeMap[pillar.color]}`}>
                  {pillar.number}
                </span>
                <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Weight: <strong>{pillar.weight}</strong> &middot; {pillar.euTaxonomy}
              </p>
            </div>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{pillar.summary}</p>
      </div>

      {/* Stern Reality */}
      <div className="mx-6 mb-4 p-4 bg-white/60 rounded-xl border border-gray-200">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 mb-1">The Stern Reality</p>
            <p className="text-sm text-gray-600 leading-relaxed">{pillar.sternReality}</p>
          </div>
        </div>
      </div>

      {/* Scoring Criteria */}
      <div className="px-6 pb-4">
        <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Scoring Criteria</p>
        <div className="space-y-2">
          {pillar.criteria.map((c, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{c.range}</span>
                <span className="text-sm font-bold text-gray-800">{c.label}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 pt-0">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm font-bold text-green-800">Excels</p>
          </div>
          <p className="text-sm text-green-700">
            <strong>{pillar.excellentExample.brand}:</strong> {pillar.excellentExample.detail}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <p className="text-sm font-bold text-red-800">Fails</p>
          </div>
          <p className="text-sm text-red-700">
            <strong>{pillar.failExample.brand}:</strong> {pillar.failExample.detail}
          </p>
        </div>
      </div>
    </div>
  );
};

const ScoreBadge: React.FC<{ score: number; size?: 'sm' | 'md' | 'lg' }> = ({ score, size = 'md' }) => {
  const tier =
    score >= 90 ? 'bg-green-500' :
    score >= 75 ? 'bg-blue-500' :
    score >= 60 ? 'bg-amber-500' :
    score >= 40 ? 'bg-orange-500' :
    'bg-red-500';
  const dim = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-sm';
  return (
    <span className={`inline-flex items-center justify-center ${dim} rounded-full text-white font-bold ${tier}`}>
      {score}
    </span>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HssMethodologySection() {
  return (
    <div className="space-y-16">
      {/* ──────── Section 1: Introduction ──────── */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-7 h-7 text-brand" />
          <h2 className="text-3xl font-bold text-gray-900">How the Hummlan Sustainability Score Works</h2>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          The Hummlan Sustainability Score (HSS) is a rigorous, evidence-based rating system that evaluates consumer products
          and brands across five environmental and social pillars. Unlike qualitative &ldquo;eco&rdquo; labels or self-reported
          brand ratings, HSS applies a <strong>stern but fair</strong> framework grounded in two established regulatory
          standards:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">EU Taxonomy</p>
            <p className="text-sm text-gray-700">
              Regulation (2020/852) — the EU&rsquo;s classification system for environmentally sustainable economic
              activities. Provides the <strong>what</strong>: defines six environmental objectives that qualify as sustainable.
            </p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-1">CSRD</p>
            <p className="text-sm text-gray-700">
              Corporate Sustainability Reporting Directive (2022/2464) — the EU&rsquo;s framework for mandatory
              sustainability disclosure. Provides the <strong>how</strong>: defines evidence standards and disclosure quality.
            </p>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">
          This dual-anchor approach means HSS is legally grounded, audit-compatible, and defensible against greenwashing
          challenges. Every score you see on Hummlan is backed by verifiable evidence, not marketing claims.
        </p>
      </section>

      {/* ──────── Section 2: Core Principles ──────── */}
      <section className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-gray-900">Core Principles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-bold text-gray-900 mb-2">Stern: Evidence over Storytelling</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Tier 1 Evidence Only:</strong> Third-party audited certifications score full points. Self-reported claims from brands score zero without supporting data.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>No Partial Credit:</strong> If a brand cannot prove it, we do not assume it. &ldquo;Working towards&rdquo; is not the same as &ldquo;doing.&rdquo;</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>DNSH Enforcement:</strong> We apply the &ldquo;Do No Significant Harm&rdquo; principle from the EU Taxonomy. Excellence in one area does not excuse failure in another.</span>
              </li>
            </ul>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-gray-900 mb-2">Fair: Context & Progress Matter</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Context Matters:</strong> We recognize industry constraints. Sustainable dairy has different challenges than organic cotton, and our scoring reflects that.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Transparent Logic:</strong> Every score breakdown is public. We show exactly why a brand was docked points and what evidence would improve their score.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Open for Appeals:</strong> Brands can submit new third-party evidence at any time. We review within 30 days and publish score changes with a changelog.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──────── Section 3: The 5 Pillars ──────── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-gray-900">The 5 Pillars of HSS</h2>
        </div>
        <p className="text-gray-600 leading-relaxed mb-8">
          Every brand and product in our database is assessed across five pillars, each mapped to a specific EU Taxonomy
          objective and CSRD disclosure standard. The pillars cover the full product lifecycle — from raw material extraction
          through manufacturing, use, and disposal.
        </p>
        <div className="space-y-8">
          {PILLARS.map((p) => (
            <PillarCard key={p.number} pillar={p} />
          ))}
        </div>
      </section>

      {/* ──────── Section 4: Evidence Confidence Score ──────── */}
      <section className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <BarChart className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-gray-900">Evidence Confidence Score (10%)</h2>
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">
          Beyond the five substantive pillars, we also assess <strong>how well a brand backs up its claims</strong>.
          This 10% component reflects the quality, accessibility, and completeness of a brand's sustainability disclosure
          — separate from what the disclosure actually says. A brand can have good sustainability practices but score
          poorly on transparency if it hides its data behind paywalls or vague language.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 border rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Data Accessibility</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Public sustainability report with clear methodology</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Downloadable data, not just marketing PDFs</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Certification registry links (not just logos)</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 border rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Data Completeness</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>All 5 pillars addressed, not just cherry-picked metrics</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Scope 1-2-3 emissions, not just Scope 1</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Multi-year data for trend analysis</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 border rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Third-Party Verification</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Audited sustainability report (not just compiled)</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Certifications from recognized, accredited bodies</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>CDP or TCFD disclosure with third-party scoring</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <p className="text-sm text-purple-800">
              <strong>Why this matters:</strong> A brand that publishes glossy marketing claims without raw data is
              hiding something. The Evidence Confidence Score ensures brands can&rsquo;t score well on substance
              without also being transparent about <em>how</em> they arrived at their claims. It&rsquo;s the &ldquo;trust
              but verify&rdquo; layer of HSS.
            </p>
          </div>
        </div>
      </section>

      {/* ──────── Section 5: Evidence Tiers ──────── */}
      <section className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-gray-900">Evidence Tier System</h2>
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">
          The quality of evidence determines how much weight a brand&rsquo;s claims carry. We never take a brand&rsquo;s word
          at face value. Every pillar score is multiplied by an evidence tier coefficient that reflects the reliability of the
          supporting data.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-900">Tier</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Multiplier</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Meaning</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Examples</th>
              </tr>
            </thead>
            <tbody>
              {EVIDENCE_TIERS.map((t, i) => (
                <tr key={i} className={`border-b border-gray-100 ${i === 0 ? 'bg-green-50' : ''}`}>
                  <td className="py-3 px-4 font-bold text-gray-800">{t.tier}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${t.multiplier === '1.0x' ? 'text-green-600' : t.multiplier === '0x' ? 'text-red-600' : 'text-amber-600'}`}>
                      {t.multiplier}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{t.meaning}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{t.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Why this matters:</strong> A brand with impressive marketing but no third-party certifications will
              score significantly lower than a brand with modest but verified claims. This is how we separate genuine
              sustainability from greenwashing.
            </p>
          </div>
        </div>
      </section>

      {/* ──────── Section 5: Scoring Formula ──────── */}
      <section className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-gray-900">How Scores Are Calculated</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">The Formula</h3>
            <div className="bg-gray-50 border rounded-xl p-5 font-mono text-sm text-gray-800 space-y-1">
              <p>Pillar Score = Evidence_Score × Evidence_Multiplier</p>
              <p className="text-gray-400">× Category_Weight</p>
              <p className="pt-3 border-t border-gray-200 mt-3">
                HSS = Σ(Pillar_1 through Pillar_5)
              </p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p><strong>Evidence_Score:</strong> 0–100 based on the rubric criteria for each pillar.</p>
              <p><strong>Evidence_Multiplier:</strong> 1.0 (Tier 1) / 0.75 (Tier 2) / 0.5 (Tier 3) / 0 (Tier 4, capped at 30).</p>
              <p><strong>Category_Weight:</strong> Default 20% per pillar, adjusted for materiality per product category.</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Category Weight Adjustments</h3>
            <p className="text-sm text-gray-600 mb-4">
              Certain product categories have different environmental materiality. We adjust weights to reflect what matters most:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-bold text-gray-900">Category</th>
                    <th className="text-left py-2 font-bold text-gray-900">Adjustment</th>
                    <th className="text-left py-2 font-bold text-gray-900">Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Food &amp; Beverage</td>
                    <td className="py-2">Biodiversity +5%, Climate &minus;5%</td>
                    <td className="py-2 text-xs text-gray-500">Sourcing and land use are more material</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Electronics</td>
                    <td className="py-2">Pollution +5%, Circular &minus;5%</td>
                    <td className="py-2 text-xs text-gray-500">Toxicity and conflict minerals are critical</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Fashion</td>
                    <td className="py-2">Supply Chain +5%, Climate &minus;5%</td>
                    <td className="py-2 text-xs text-gray-500">Labour practices are highly material</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── Section 6: HSS Score Scale ──────── */}
      <section className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-gray-900">HSS Score Scale</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-900">Range</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Rating</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-50 border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-green-800">90–100</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-green-700 font-bold">
                    <span className="text-yellow-500">★★★★★</span> Excellent
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">Verifiable evidence across all 5 pillars. Industry-leading performance.</td>
              </tr>
              <tr className="bg-blue-50 border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-blue-800">75–89</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-blue-700 font-bold">
                    <span className="text-yellow-500">★★★★☆</span> Very Good
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">Strong evidence in most pillars. Credible performer with some gaps.</td>
              </tr>
              <tr className="bg-amber-50 border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-amber-800">60–74</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                    <span className="text-yellow-500">★★★☆☆</span> Moderate
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">Partial evidence. Some certifications but significant gaps remain.</td>
              </tr>
              <tr className="bg-orange-50 border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-orange-800">40–59</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-orange-700 font-bold">
                    <span className="text-yellow-500">★★☆☆☆</span> Weak
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">Self-reported claims only. Insufficient third-party verification.</td>
              </tr>
              <tr className="bg-red-50 border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-red-800">Below 40</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-red-700 font-bold">
                    <span className="text-yellow-500">★☆☆☆☆</span> Poor
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">Minimal or no verifiable evidence. High risk of greenwashing.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ──────── Section 7: Sample Assessments ──────── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-gray-900">Sample Assessments</h2>
        </div>
        <p className="text-gray-600 leading-relaxed mb-8">
          To illustrate how HSS works in practice, here are three real assessments from our database — spanning high,
          medium, and moderate scores.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_ASSESSMENTS.map((sample, i) => (
            <div key={i} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
              <div className={`p-5 ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-500' : 'bg-amber-500'}`}>
                <div className="flex items-center justify-between text-white">
                  <h3 className="font-bold text-lg">{sample.brand}</h3>
                  <span className="text-2xl font-bold">{sample.score}</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {sample.breakdown.map((b, j) => (
                  <div key={j} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{b.pillar}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        b.tier === 'Tier 1' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {b.tier}
                      </span>
                      <span className="font-bold text-gray-900 w-8 text-right">{b.score}</span>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-gray-500 pt-3 border-t border-gray-100 leading-relaxed">
                  {sample.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────── Section 8: Quality Assurance ──────── */}
      <section className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-gray-900">Quality Assurance &amp; Review</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">Rating Cadence</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span><strong>Full reassessment:</strong> Annual review cycle</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span><strong>Score adjustment:</strong> As needed for new certifications, major disclosures, or controversies</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span><strong>Price update:</strong> Quarterly tracking of market prices</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">Controversy Protocol</h3>
            <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li><strong>Flag:</strong> Issue identified by internal team or external submission</li>
              <li><strong>Verify:</strong> Source verification against official records</li>
              <li><strong>Adjust:</strong> Score adjusted downward (5–30 point reduction depending on severity)</li>
              <li><strong>Publish:</strong> Updated score published with rationale and changelog</li>
            </ol>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">Appeals Process</h3>
            <p className="text-sm text-gray-600 mb-3">
              Brands may appeal their HSS rating by submitting new evidence:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Must include <strong>verifiable third-party evidence</strong></span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Review within <strong>30 days</strong> of submission</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Score changes published with <strong>public changelog</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──────── Section 9: Methodological Distinctions ──────── */}
      <section className="bg-brand-light border border-brand rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-6 h-6 text-brand shrink-0" />
          <h2 className="text-xl font-bold text-brand-dark">How HSS Differs from Other Rating Systems</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-dark/20">
                <th className="text-left py-2 px-3 font-bold text-brand-dark">System</th>
                <th className="text-left py-2 px-3 font-bold text-brand-dark">Key Difference with HSS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-brand-dark/10">
                <td className="py-2 px-3 font-medium text-brand-dark">Good On You</td>
                <td className="py-2 px-3 text-brand-dark/80">Qualitative, no EU Taxonomy or CSRD basis; focuses on fashion only</td>
              </tr>
              <tr className="border-b border-brand-dark/10">
                <td className="py-2 px-3 font-medium text-brand-dark">HowGood</td>
                <td className="py-2 px-3 text-brand-dark/80">Food-focused, no consumer-facing score with regulatory backbone</td>
              </tr>
              <tr className="border-b border-brand-dark/10">
                <td className="py-2 px-3 font-medium text-brand-dark">B Corp Assessment</td>
                <td className="py-2 px-3 text-brand-dark/80">Corporate-level only, not product-specific; no evidence tier weighting</td>
              </tr>
              <tr className="border-b border-brand-dark/10">
                <td className="py-2 px-3 font-medium text-brand-dark">EU Energy Label</td>
                <td className="py-2 px-3 text-brand-dark/80">Single metric (energy), no multi-pillar assessment</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-brand-dark">Cradle to Cradle</td>
                <td className="py-2 px-3 text-brand-dark/80">Material health focus only, no social or climate pillars</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}