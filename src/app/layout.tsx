import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Portfolio - Frontend Developer",
  description: "Professional portfolio showcasing 3 years of frontend development experience with modern technologies and 3D animations",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "3D Portfolio", "Web Development"],
  authors: [{ name: "Frontend Developer" }],
  manifest: "/manifest.json",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio.com",
    title: "Portfolio - Frontend Developer",
    description: "Professional portfolio showcasing 3 years of frontend development experience",
    siteName: "Portfolio 3D",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Frontend Developer",
    description: "Professional portfolio showcasing 3 years of frontend development experience",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="dark" />
        
        {/* PWA support */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="antialiased bg-black text-white overflow-x-hidden">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
