import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Calendar, User, Tag, ArrowLeft, BookOpen, Bug } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

export const dynamic = 'force-dynamic';

async function getArticle(slug: string) {
  try {
    const rs = await db.execute({
      sql: `SELECT slug, title, content_type, body, excerpt, author, published_at, tags FROM learning_content WHERE slug = ? AND is_published = 1 LIMIT 1`,
      args: [slug],
    });
    return rs.rows[0] as any;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Article not found' };

  return {
    title: `${article.title} | Learn`,
    description: article.excerpt || article.body?.slice(0, 155) || `Learn about ${article.title}`,
    alternates: { canonical: `/learn/${slug}` },
    openGraph: {
      title: `${article.title} | ${SITE_NAME}`,
      description: article.excerpt || article.body?.slice(0, 155),
      type: 'article',
      url: `/learn/${slug}`,
    },
  };
}

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const bodyLines = article.body?.split('\n') || [];
  const headingLines = bodyLines.filter((l: string) => l.startsWith('## '));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Bug className="w-8 h-8 text-yellow-500 fill-yellow-500" aria-label="Hummlan bee" />
            Hummlan.com
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-600 hover:text-orange-700 font-medium">Home</Link>
            <Link href="/search" className="text-gray-600 hover:text-orange-700 font-medium">Search</Link>
            <Link href="/learn" className="text-orange-600 font-bold border-b-2 border-orange-600">Learn</Link>
            <Link href="/shop" className="text-gray-600 hover:text-orange-700 font-medium">Shop</Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-700 font-medium">Standards</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
          </Link>

          <article className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-12 text-white">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
                  {article.content_type === 'guide' ? 'Guide' : article.content_type === 'explainer' ? 'Explainer' : 'Article'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{article.title}</h1>
              {article.excerpt && (
                <p className="text-lg text-orange-100 max-w-2xl leading-relaxed">{article.excerpt}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-orange-200">
                {article.author && (
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>
                )}
                {article.published_at && (
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                )}
                {article.tags && (
                  <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" />{article.tags}</span>
                )}
              </div>
            </div>

            {/* Table of Contents */}
            {headingLines.length > 0 && (
              <div className="bg-gray-50 border-b px-8 py-6">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">In this article</h2>
                <nav className="flex flex-wrap gap-x-6 gap-y-1">
                  {headingLines.map((h: string, i: number) => {
                    const text = h.replace(/^##\s*/, '');
                    const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                      <a key={i} href={`#${anchor}`} className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                        {text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Body */}
            <div className="px-8 py-10">
              <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-orange-600 prose-a:font-medium prose-strong:text-gray-900 prose-ul:mt-2 prose-li:text-gray-700 prose-code:text-orange-700 prose-code:bg-orange-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
                {article.body?.split('\n').map((line: string, i: number) => {
                  // Simple markdown to HTML rendering
                  if (line.startsWith('### ')) {
                    const text = line.replace('### ', '');
                    const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return <h3 key={i} id={anchor} className="text-xl font-bold text-gray-900 mt-8 mb-3">{text}</h3>;
                  }
                  if (line.startsWith('## ')) {
                    const text = line.replace('## ', '');
                    const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return <h2 key={i} id={anchor} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{text}</h2>;
                  }
                  if (line.startsWith('# ')) {
                    return null; // Skip h1 - already shown in header
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={i} className="font-bold text-gray-900 my-2">{line.replace(/\*\*/g, '')}</p>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} className="text-gray-700 ml-4 list-disc">{line.replace('- ', '')}</li>;
                  }
                  if (line.startsWith('| ')) {
                    return null; // Skip tables for now
                  }
                  if (line.trim() === '---') {
                    return <hr key={i} className="my-8 border-gray-200" />;
                  }
                  if (line.trim() === '') {
                    return <div key={i} className="h-2" />;
                  }
                  // Bold in middle of text
                  const boldProcessed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                  return <p key={i} className="text-gray-700 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: boldProcessed }} />;
                })}
              </div>
            </div>
          </article>

          {/* Related links */}
          <div className="mt-12 bg-white border rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Keep Learning</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/learn" className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
                <p className="font-bold text-gray-900">Learning Hub</p>
                <p className="text-sm text-gray-600">Browse all guides and explainers</p>
              </Link>
              <Link href="/search" className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
                <p className="font-bold text-gray-900">HSS Search Engine</p>
                <p className="text-sm text-gray-600">Check any brand&apos;s sustainability score</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 text-sm font-semibold mb-6 text-gray-600">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            <Link href="/search" className="hover:text-orange-700">Search</Link>
            <Link href="/learn" className="hover:text-orange-700">Learn</Link>
            <Link href="/shop" className="hover:text-orange-700">Shop</Link>
            <Link href="/about" className="hover:text-orange-700">Standards</Link>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Hummlan.com — Stern but Fair Sustainability Ratings</p>
        </div>
      </footer>
    </div>
  );
}