import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const defaultTitle = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // No global canonical here: each page sets its own alternates.canonical so
  // every route canonicalizes to itself instead of the homepage. (Fixed after
  // audit: /about, /learn, /search, /shop all emitted <link rel=canonical
  // href=https://hummlan.com/> because of the old canonical: '/' in this layout.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${absoluteUrl('/')}#organization`,
      name: SITE_NAME,
      url: absoluteUrl('/'),
      description: SITE_DESCRIPTION,
      logo: absoluteUrl('/og-default.svg'),
    },
    {
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      url: absoluteUrl('/'),
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: {
        '@id': `${absoluteUrl('/')}#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${absoluteUrl('/shop')}?query={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="impact-site-verification" value="d8ab6caf-18a2-497d-841b-b6eb7ffe0dea" />
      </head>
      <body className="min-h-full flex flex-col">
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { anonymize_ip: true });
                `,
              }}
            />
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <Header />
        {children}
        <NewsletterSignup />
        <Footer />
      </body>
    </html>
  );
}
