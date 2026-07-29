'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const MAIN_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
];

const STANDARDS_DROPDOWN = [
  { href: '/about', label: 'HSS' },
  { href: '/eu-taxonomy', label: 'EU Taxonomy' },
  { href: '/csrd', label: 'CSRD' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStandardsOpen, setIsStandardsOpen] = useState(false);
  const [isMobileStandardsOpen, setIsMobileStandardsOpen] = useState(false);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-2xl" aria-label="Hummlan bumblebee">🐝</span>
          <span>Hummlan</span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 items-center">
          {MAIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-700 ${
                isActive(link.href) ? 'text-orange-700' : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Standards Dropdown */}
          <div className="relative"
            onMouseEnter={() => setIsStandardsOpen(true)}
            onMouseLeave={() => setIsStandardsOpen(false)}
          >
            <button
              onClick={() => setIsStandardsOpen(!isStandardsOpen)}
              className={`text-sm font-medium transition-colors hover:text-orange-700 flex items-center gap-1 ${
                isActive('/about') || isActive('/eu-taxonomy') || isActive('/csrd') ? 'text-orange-700' : 'text-gray-600'
              }`}
            >
              Standards <ChevronDown className={`w-4 h-4 transition-transform ${isStandardsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isStandardsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg py-2 min-w-[180px] z-50">
                {STANDARDS_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-700 ${
                      isActive(item.href) ? 'text-orange-700' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-orange-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t bg-white p-4 flex flex-col gap-4 shadow-lg animate-in fade-in slide-in-from-top-2">
          {MAIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-700 ${
                isActive(link.href) ? 'text-orange-700' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Standards Accordion */}
          <div>
            <button
              onClick={() => setIsMobileStandardsOpen(!isMobileStandardsOpen)}
              className={`text-sm font-medium transition-colors hover:text-orange-700 flex items-center gap-1 w-full ${
                isActive('/about') || isActive('/eu-taxonomy') || isActive('/csrd') ? 'text-orange-700' : 'text-gray-600'
              }`}
            >
              Standards <ChevronDown className={`w-4 h-4 transition-transform ${isMobileStandardsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMobileStandardsOpen && (
              <div className="pl-4 mt-2 flex flex-col gap-2 border-l-2 border-orange-200">
                {STANDARDS_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-orange-700 ${
                      isActive(item.href) ? 'text-orange-700' : 'text-gray-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
