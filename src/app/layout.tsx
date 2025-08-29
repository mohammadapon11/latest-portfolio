import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3D Portfolio - Frontend Developer',
  description: 'Professional portfolio showcasing 3D web development, React, Next.js, and modern web technologies.',
  keywords: ['portfolio', '3D', 'frontend', 'developer', 'react', 'nextjs', 'typescript', 'webgl'],
  authors: [{ name: 'Frontend Developer' }],
  creator: 'Frontend Developer',
  publisher: 'Frontend Developer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '3D Portfolio - Frontend Developer',
    description: 'Professional portfolio showcasing 3D web development, React, Next.js, and modern web technologies.',
    url: 'https://your-domain.com',
    siteName: '3D Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '3D Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Portfolio - Frontend Developer',
    description: 'Professional portfolio showcasing 3D web development, React, Next.js, and modern web technologies.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Resource hints */}
        <link rel="preload" href="/globe.svg" as="image" />
        <link rel="preload" href="/file.svg" as="image" />
      </head>
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
