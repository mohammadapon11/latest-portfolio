'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, ArrowDown, Sparkles, Zap, Target } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import heavy 3D components with better loading
const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 animate-pulse" />
  ),
});

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  // Optimized intersection observer
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported in Hero. Falling back.');
      setIsVisible(true);
      setTimeout(() => setIs3DLoaded(true), 200);
      return;
    }

    let observer: globalThis.IntersectionObserver | null = null;

    try {
      observer = new globalThis.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Load 3D scene with delay for better performance
            setTimeout(() => setIs3DLoaded(true), 200);
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    } catch (error) {
      console.warn('IntersectionObserver failed in Hero:', error);
      // Fallback: show content immediately
      setIsVisible(true);
      setTimeout(() => setIs3DLoaded(true), 200);
    }

    return () => {
      if (observer) {
        try {
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
          observer.disconnect();
        } catch (error) {
          console.warn('Error disconnecting observer in Hero:', error);
        }
      }
    };
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  // CV Download function
  const downloadCV = useCallback(() => {
    const cvUrl = 'https://drive.google.com/file/d/1sFZftDfGYF7Kqdw9VXko3gRiPPQj3Nj3/view?usp=sharing';
    
    // Extract the file ID from the Google Drive URL
    const fileId = '1sFZftDfGYF7Kqdw9VXko3gRiPPQj3Nj3';
    
    // Create direct download URL for Google Drive
    const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = directDownloadUrl;
    link.download = 'Frontend_Developer_CV_Mohammad_Apon.pdf';
    link.target = '_blank';
    
    // Add click event to trigger download
    document.body.appendChild(link);
    
    try {
      // Try direct download first
      link.click();
      
      // If direct download doesn't work, open in new tab
      setTimeout(() => {
        window.open(cvUrl, '_blank');
      }, 1000);
      
    } catch {
      console.log('Direct download failed, opening in new tab');
      window.open(cvUrl, '_blank');
    } finally {
      // Clean up
      document.body.removeChild(link);
    }
  }, []);

  // Memoized and reduced grid lines
  const gridLines = useMemo(() => {
    if (!isVisible) return null;
    
    return (
      <>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
            style={{
              top: `${i * 12.5}%`,
              left: '0%',
              right: '0%',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"
            style={{
              left: `${i * 12.5}%`,
              top: '0%',
              bottom: '0%',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3 + 0.5,
            }}
          />
        ))}
      </>
    );
  }, [isVisible]);

  // Further reduced floating elements
  const floatingElements = useMemo(() => {
    if (!isVisible) return null;
    
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              repeat: Infinity,
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </>
    );
  }, [isVisible]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(120,119,198,0.03)_50%,transparent_100%)] animate-pulse"></div>
      </div>

      {/* Optimized Grid Lines */}
      {gridLines}

      {/* 3D Background Scene - Only when visible and loaded */}
      {isVisible && (
        <div className="absolute inset-0 z-0">
          {is3DLoaded ? (
            <ThreeScene />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 animate-pulse" />
          )}
        </div>
      )}

      {/* Content */}
      <div className="container-custom relative z-10">
        {/* Mobile-specific top padding to prevent jumping */}
        <div className="pt-20 md:pt-24 lg:pt-28"></div>
        
        <div className="text-center max-w-5xl mx-auto">
          {/* Optimized Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-2 md:mb-6">
              <Sparkles className="text-cyan-400 animate-pulse" size={24} />
              <span className="text-lg md:text-xl text-cyan-400 font-medium tracking-wider">
                FUTURE IS NOW
              </span>
              <Sparkles className="text-cyan-400 animate-pulse" size={24} />
            </div>
            <span className="text-lg md:text-xl text-indigo-400 dark:text-indigo-300 font-medium tracking-wider">
              Hello, I&apos;m
            </span>
          </motion.div>

          {/* Optimized Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 lg:mb-10 relative"
          >
            <span className="relative">
              <span className="gradient-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                FRONTEND
              </span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 rounded-lg blur opacity-20"
                animate={{ opacity: isVisible ? [0.2, 0.4, 0.2] : 0.2 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
            <br />
            <span className="relative">
              <span className="gradient-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                DEVELOPER
              </span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg blur opacity-20"
                animate={{ opacity: isVisible ? [0.2, 0.4, 0.2] : 0.2 }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Optimized Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-0"
          >
            <span className="text-cyan-400 font-medium">Crafting</span> exceptional digital experiences with{' '}
            <span className="text-indigo-400 font-medium">cutting-edge technologies</span>. 
            Specialized in <span className="text-purple-400 font-medium">React</span>,{' '}
            <span className="text-pink-400 font-medium">Next.js</span>, and{' '}
            <span className="text-red-400 font-medium">TypeScript</span> with 3+ years of expertise 
            in building <span className="text-cyan-400 font-medium">scalable web applications</span>.
          </motion.p>

          {/* Optimized CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 md:mb-12 px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={downloadCV}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <Download size={20} className="animate-bounce" />
                <span>DOWNLOAD CV</span>
                <Zap size={20} className="text-yellow-300" />
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToAbout}
              className="group relative px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-bold rounded-2xl hover:bg-cyan-500 hover:text-black transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative flex items-center gap-3">
                <Target size={20} />
                EXPLORE MORE
              </span>
            </motion.button>
          </motion.div>

          {/* Optimized Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center gap-4 sm:gap-6 mb-8 md:mb-12 px-4 sm:px-0"
          >
            {[
              { icon: Github, href: 'https://github.com/mohammadapon11', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammadapon11/', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
              { icon: Mail, href: 'mailto:mohammadapon11@gmail.com', label: 'Email', color: 'from-red-500 to-red-700' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -3, rotate: 360 }}
                whileTap={{ scale: 0.92 }}
                className={`p-4 bg-gradient-to-br ${social.color} rounded-2xl shadow-2xl hover:shadow-lg transition-all duration-300 text-white backdrop-blur-sm border border-white/20`}
                aria-label={social.label}
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </motion.div>

          {/* Optimized Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-8 right-8 md:bottom-12 md:-right-[322px] transform md:block hidden"
          >
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: isVisible ? [0, 8, 0] : 0 }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="group p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300 border border-cyan-400/30 shadow-lg hover:shadow-cyan-500/25"
            >
              <ArrowDown size={28} className="text-cyan-400 group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Optimized Floating Elements */}
      {floatingElements}

      {/* Simplified Energy Field Effect */}
      {isVisible && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-cyan-500/3 via-transparent to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/3 via-transparent to-transparent animate-pulse" style={{animationDelay: '1s'}} />
        </div>
      )}
    </section>
  );
};

export default Hero;
