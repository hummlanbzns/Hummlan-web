import Link from 'next/link';
import HummlanBeeMark from './HummlanBeeMark';

export default function Footer() {
  return (
    <footer className="bg-white border-t py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <Link href="/" className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <HummlanBeeMark className="w-8 h-8" />
            Hummlan.com
          </Link>
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <Link href="/search" className="hover:text-orange-700 transition-colors">
              Search
            </Link>
            <Link href="/learn" className="hover:text-orange-700 transition-colors">
              Learn
            </Link>
            <Link href="/best-of" className="hover:text-orange-700 transition-colors">
              Best Of
            </Link>
            <Link href="/about" className="hover:text-orange-700 transition-colors">
              Our Standards
            </Link>
            <Link href="/eu-taxonomy" className="hover:text-orange-700 transition-colors">
              EU Taxonomy
            </Link>
            <Link href="/csrd" className="hover:text-orange-700 transition-colors">
              CSRD
            </Link>
            <Link href="/privacy" className="hover:text-orange-700 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-orange-700 transition-colors">
              Terms
            </Link>
          </nav>
        </div>
        <div className="text-center pt-12 border-t border-gray-100">
          <p className="text-gray-400 text-sm mb-2">© {new Date().getFullYear()} Hummlan.com. All rights reserved.</p>
          <p className="text-gray-400 text-xs max-w-2xl mx-auto leading-relaxed">
            Hummlan is an independent comparison site. We earn affiliate commissions from some of
            the stores we link to, which helps fund our in-depth sustainability research and stern
            rating framework.
          </p>
        </div>
      </div>
    </footer>
  );
}
