'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Lazy load components for better performance
const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Experience = lazy(() => import('@/components/Experience'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));

// Loading component for lazy loaded sections
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500"></div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} // Reduced from 1s to 0.5s
      >
        {/* Hero Section - Always loaded */}
        <section id="home">
          <Hero />
        </section>

        {/* Lazy loaded sections with Suspense */}
        <Suspense fallback={<SectionLoader />}>
          <section id="about">
            <About />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="skills">
            <Skills />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="experience">
            <Experience />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="projects">
            <Projects />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="contact">
            <Contact />
          </section>
        </Suspense>
      </motion.div>

      {/* Performance Monitor - Only in development */}
      <PerformanceMonitor />
    </main>
  );
}
