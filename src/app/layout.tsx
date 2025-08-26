import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Frontend Developer",
  description: "Professional portfolio showcasing 3 years of frontend development experience with modern technologies and 3D animations",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "3D Portfolio", "Web Development"],
  authors: [{ name: "Frontend Developer" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
