import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Mohammad Apon - Frontend Developer',
  description: 'Professional portfolio showcasing 3D web development, React, Next.js, and modern web technologies.',
  keywords: ['portfolio', '3D', 'frontend', 'developer', 'react', 'nextjs', 'typescript', 'webgl'],
  authors: [{ name: 'Frontend Developer' }],
  creator: 'Frontend Developer',
  publisher: 'Frontend Developer',
  icons: {
    icon: [
      { url: '/logo.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: '/logo.png',
    shortcut: '/logo.ico'
  },
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
    title: 'Mohammad Apon - Frontend Developer',
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
    title: 'Mohammad Apon - Frontend Developer',
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
        {/* Favicon Configuration */}
        <link rel="icon" href="/logo.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
