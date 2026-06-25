import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, GraduationCap, Newspaper, ArrowRight, CloudSun, RefreshCw, FlaskConical, Users, Sprout, Bug } from 'lucide-react';

export const metadata: Metadata = { title: 'Sustainability Learning Hub', description: 'Learn what sustainability actually means. EU Taxonomy, CSRD, and the real pros and cons of green initiatives.' };

const pillars = [
  { slug: 'climate-impact', name: 'Climate Impact', icon: CloudSun, desc: 'Carbon footprint, SBTi, renewable energy transition', weight: '20%' },
  { slug: 'circular-economy', name: 'Circular Economy', icon: RefreshCw, desc: 'Durability, repairability, recycled materials', weight: '20%' },
  { slug: 'pollution-prevention', name: 'Pollution Prevention', icon: FlaskConical, desc: 'Hazardous chemicals, microplastics, wastewater', weight: '15%' },
  { slug: 'supply-chain-social', name: 'Supply Chain & Social', icon: Users, desc: 'Living wages, worker safety, transparency', weight: '20%' },
  { slug: 'biodiversity', name: 'Biodiversity', icon: Sprout, desc: 'Deforestation-free, regenerative agriculture', weight: '15%' },
];

export default function LearnPage() {
  return (<div className="flex flex-col min-h-screen bg-gray-50">
    <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2"><Bug className="w-8 h-8 text-yellow-500 fill-yellow-500" aria-label="Hummlan bee" />Hummlan.com</Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-orange-600 font-medium">Standards</Link>
          <Link href="/search" className="text-gray-600 hover:text-orange-600 font-medium">Search</Link>
        </nav>
      </div>
    </header>
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
              return (<Link key={p.slug} href={`/learn/${p.slug}`} className="bg-white border rounded-xl p-6 hover:shadow-md hover:border-orange-200 transition-all group flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-50 rounded-lg"><Icon className="w-5 h-5 text-orange-600" /></div>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{p.weight}</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 mb-2">{p.name}</h3>
                <p className="text-sm text-gray-500 flex-grow">{p.desc}</p>
              </Link>);
            })}
          </div>
        </section>

        <section className="bg-white border-2 border-dashed rounded-2xl p-10 text-center">
          <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">More Coming Soon</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-6">Greenwashing watch, certification guides, policy explainers &mdash; subscribe to be notified.</p>
          <Link href="/" className="inline-block bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700">Join the Swarm</Link>
        </section>
      </div>
    </main>
    <footer className="bg-white border-t py-12 mt-12 text-center"><p className="text-gray-400 text-sm">&copy; 2025 Hummlan.com. Learning Hub v1.0.</p></footer>
  </div>);
}