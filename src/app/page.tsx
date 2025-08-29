'use client';

import { Suspense, lazy, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import LoadingIndicator from '@/components/LoadingIndicator';
import PerformanceScripts from '@/components/PerformanceScripts';
import IntersectionObserver from '@/components/IntersectionObserver';
import SimpleIntersectionObserver from '@/components/SimpleIntersectionObserver';

// Lazy load components with better loading states
const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Experience = lazy(() => import('@/components/Experience'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));

// Optimized loading component
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
    </div>
  </div>
);

export default function Home() {
  const [isIntersectionSupported, setIsIntersectionSupported] = useState(false);

  // Check if IntersectionObserver is supported
  useEffect(() => {
    setIsIntersectionSupported('IntersectionObserver' in window);
  }, []);

  const handleSectionIntersect = useCallback((sectionId: string, isIntersecting: boolean) => {
    if (isIntersecting) {
      // Preload next section for smoother experience
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const currentIndex = sections.indexOf(sectionId);
      if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        // Trigger preload of next section
        setTimeout(() => {
          const nextElement = document.getElementById(nextSection);
          if (nextElement) {
            nextElement.style.visibility = 'visible';
          }
        }, 100);
      }
    }
  }, []);

  // Choose the appropriate observer component
  const ObserverComponent = isIntersectionSupported ? IntersectionObserver : SimpleIntersectionObserver;

  return (
    <>
      <LoadingIndicator />
      <PerformanceScripts />
      
      <main className="min-h-screen bg-black">
        <Navigation />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero Section - Always loaded */}
          <section id="home">
            <Hero />
          </section>

          {/* Optimized lazy loaded sections with better intersection observer */}
          <ObserverComponent
            threshold={[0.1, 0.3]}
            rootMargin="100px"
            onIntersect={(isIntersecting) => handleSectionIntersect('about', isIntersecting)}
          >
            <Suspense fallback={<SectionLoader />}>
              <section id="about" className="min-h-screen">
                <About />
              </section>
            </Suspense>
          </ObserverComponent>

          <ObserverComponent
            threshold={[0.1, 0.3]}
            rootMargin="100px"
            onIntersect={(isIntersecting) => handleSectionIntersect('skills', isIntersecting)}
          >
            <Suspense fallback={<SectionLoader />}>
              <section id="skills" className="min-h-screen">
                <Skills />
              </section>
            </Suspense>
          </ObserverComponent>

          <ObserverComponent
            threshold={[0.1, 0.3]}
            rootMargin="100px"
            onIntersect={(isIntersecting) => handleSectionIntersect('experience', isIntersecting)}
          >
            <Suspense fallback={<SectionLoader />}>
              <section id="experience" className="min-h-screen">
                <Experience />
              </section>
            </Suspense>
          </ObserverComponent>

          <ObserverComponent
            threshold={[0.1, 0.3]}
            rootMargin="100px"
            onIntersect={(isIntersecting) => handleSectionIntersect('projects', isIntersecting)}
          >
            <Suspense fallback={<SectionLoader />}>
              <section id="projects" className="min-h-screen">
                <Projects />
              </section>
            </Suspense>
          </ObserverComponent>

          <ObserverComponent
            threshold={[0.1, 0.3]}
            rootMargin="100px"
            onIntersect={(isIntersecting) => handleSectionIntersect('contact', isIntersecting)}
          >
            <Suspense fallback={<SectionLoader />}>
              <section id="contact" className="min-h-screen">
                <Contact />
              </section>
            </Suspense>
          </ObserverComponent>
        </motion.div>

        {/* Performance Monitor - Only in development */}
        <PerformanceMonitor />
      </main>
    </>
  );
}
