import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, GraduationCap, Newspaper, ArrowRight, CloudSun, RefreshCw, FlaskConical, Users, Sprout, Calendar, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = { title: 'Sustainability Learning Hub', description: 'Learn what sustainability actually means. EU Taxonomy, CSRD, and the real pros and cons of green initiatives.', alternates: { canonical: '/learn' } };

const pillars = [
  { slug: 'climate-impact', name: 'Climate Impact', icon: CloudSun, desc: 'Carbon footprint, SBTi, renewable energy transition', weight: '20%' },
  { slug: 'circular-economy', name: 'Circular Economy', icon: RefreshCw, desc: 'Durability, repairability, recycled materials', weight: '20%' },
  { slug: 'pollution-prevention', name: 'Pollution Prevention', icon: FlaskConical, desc: 'Hazardous chemicals, microplastics, wastewater', weight: '15%' },
  { slug: 'supply-chain-social', name: 'Supply Chain & Social', icon: Users, desc: 'Living wages, worker safety, transparency', weight: '20%' },
  { slug: 'biodiversity', name: 'Biodiversity', icon: Sprout, desc: 'Deforestation-free, regenerative agriculture', weight: '15%' },
];

export default function LearnPage() {
  return (
    <div className="bg-gray-50">
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex p-3 bg-orange-100 rounded-2xl mb-4"><BookOpen className="w-8 h-8 text-orange-600" /></div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Sustainability Learning Hub</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Cut through the greenwash. No fluff &mdash; just the facts about what sustainability actually means.</p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><GraduationCap className="w-6 h-6 text-orange-600" />Framework Explainers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/eu-taxonomy" className="bg-white border rounded-2xl p-8 hover:shadow-lg hover:border-orange-200 transition-all group">
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600">What is the EU Taxonomy?</h3>
                <p className="text-gray-600 mb-4">The EU&apos;s classification system for sustainable activities. The backbone of our HSS rating.</p>
                <span className="text-sm font-bold text-orange-600 flex items-center gap-1">Read <ArrowRight className="w-4 h-4" /></span>
              </Link>
              <Link href="/csrd" className="bg-white border rounded-2xl p-8 hover:shadow-lg hover:border-orange-200 transition-all group">
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600">What is the CSRD?</h3>
                <p className="text-gray-600 mb-4">The Corporate Sustainability Reporting Directive &mdash; new standards for transparency.</p>
                <span className="text-sm font-bold text-orange-600 flex items-center gap-1">Read <ArrowRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><GraduationCap className="w-6 h-6 text-orange-600" />HSS Pillar Guides</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">Deep dives into each of the five pillars of the Hummlan Sustainability Score.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pillars.map(p => {
                const Icon = p.icon;
                return (
                  <div key={p.slug} className="bg-white border rounded-xl p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-50 rounded-lg"><Icon className="w-5 h-5 text-orange-600" /></div>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{p.weight}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{p.name}</h3>
                    <p className="text-sm text-gray-500 flex-grow">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><ShoppingBag className="w-6 h-6 text-orange-600" />Stern-Rated Product Guides</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">Put the theory into practice — our best-of guides apply the HSS framework to real products at real prices.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/best-of/affordable-sustainable-basics-under-50" className="bg-white border rounded-2xl p-8 hover:shadow-lg hover:border-orange-200 transition-all group">
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600">Affordable Sustainable Basics Under $50</h3>
                <p className="text-gray-600 mb-4">Organic cotton leggings from ~$25, boxers from ~$10/pair, and Patagonia Baggies from ~$44 — all stern-rated.</p>
                <span className="text-sm font-bold text-orange-600 flex items-center gap-1">Read the guide <ArrowRight className="w-4 h-4" /></span>
              </Link>
              <Link href="/best-of/affordable-sustainable-home-essentials" className="bg-white border rounded-2xl p-8 hover:shadow-lg hover:border-orange-200 transition-all group">
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600">Affordable Sustainable Home Essentials Under $20</h3>
                <p className="text-gray-600 mb-4">Eco-friendly dish soaps, laundry detergents and cleaners from ~$0.04/use — the cheapest verified options we track.</p>
                <span className="text-sm font-bold text-orange-600 flex items-center gap-1">Read the guide <ArrowRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Newspaper className="w-6 h-6 text-orange-600" />Sustainability News</h2>
            <Link href="/learn/news" className="block bg-white border-2 border-orange-200 rounded-2xl p-8 hover:shadow-lg hover:border-orange-400 transition-all group">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full uppercase tracking-wider">New</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />Week of 29 June 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">The Hummlan Hive &mdash; Sustainability Weekly Digest</h3>
                  <p className="text-gray-600 mb-4">CSRD enforcement begins, EU Taxonomy expands to textiles, H&amp;M faces shareholder revolt, microplastics study, and more. A 5-minute weekly roundup curated for conscious shoppers.</p>
                  <span className="text-sm font-bold text-orange-600 flex items-center gap-1">Read the digest <ArrowRight className="w-4 h-4" /></span>
                </div>
                <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl shrink-0">
                  <Newspaper className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
