'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <Link href="/" className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <span className="text-2xl" aria-label="Hummlan bumblebee">🐝</span>
            Hummlan
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
        {/* Social links */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://www.pinterest.com/Hummmlan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-orange-600 transition-colors"
            aria-label="Hummlan on Pinterest"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.936 1.406-5.957 1.406-5.957s-.359-.72-.359-1.782c0-1.666.967-2.91 2.169-2.91 1.022 0 1.517.768 1.517 1.688 0 1.028-.654 2.567-.993 3.992-.284 1.194.599 2.168 1.777 2.168 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.013-4.882-3.414 0-5.418 2.562-5.418 5.207 0 1.031.397 2.138.893 2.739a.36.36 0 01.083.344l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.38l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
          </a>
        </div>
        <div className="text-center pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-sm mb-2">© {new Date().getFullYear()} Hummlan. All rights reserved.</p>
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
