'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, ArrowDown, Sparkles, Zap, Target } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import heavy 3D components
const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20" />
});

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Load 3D scene only when visible
          setTimeout(() => setIs3DLoaded(true), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Memoize grid lines to prevent unnecessary re-renders
  const gridLines = useMemo(() => {
    if (!isVisible) return null;
    
    return (
      <>
        {[...Array(10)].map((_, i) => ( // Reduced from 20 to 10
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
            style={{
              top: `${i * 10}%`,
              left: '0%',
              right: '0%',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 2, // Reduced from 3s
              repeat: Infinity,
              delay: i * 0.2, // Increased delay
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => ( // Reduced from 20 to 10
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"
            style={{
              left: `${i * 10}%`,
              top: '0%',
              bottom: '0%',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 2, // Reduced from 3s
              repeat: Infinity,
              delay: i * 0.2 + 1, // Increased delay
            }}
          />
        ))}
      </>
    );
  }, [isVisible]);

  // Memoize floating elements
  const floatingElements = useMemo(() => {
    if (!isVisible) return null;
    
    return (
      <>
        {[...Array(4)].map((_, i) => ( // Reduced from 8 to 4
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{
              y: [0, -20, 0], // Reduced movement
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1], // Reduced scale
            }}
            transition={{
              duration: 3 + Math.random() * 2, // Reduced duration
              repeat: Infinity,
              delay: Math.random() * 1, // Reduced delay
            }}
          />
        ))}
      </>
    );
  }, [isVisible]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),rgba(255,255,255,0))]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(120,119,198,0.05)_50%,transparent_100%)] animate-pulse"></div>
      </div>

      {/* Optimized Grid Lines */}
      {gridLines}

      {/* 3D Background Scene - Only when visible and loaded */}
      {isVisible && (
        <div className="absolute inset-0 z-0">
          {is3DLoaded ? (
            <ThreeScene />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20" />
          )}
        </div>
      )}

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Optimized Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }} // Reduced from 0.8s
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 relative"
          >
            <span className="relative">
              <span className="gradient-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                FRONTEND
              </span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 rounded-lg blur opacity-25"
                animate={{ opacity: isVisible ? [0.25, 0.5, 0.25] : 0.25 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            <br />
            <span className="relative">
              <span className="gradient-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                DEVELOPER
              </span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg blur opacity-25"
                animate={{ opacity: isVisible ? [0.25, 0.5, 0.25] : 0.25 }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Optimized Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }} // Reduced movement
              whileTap={{ scale: 0.95 }}
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
              whileHover={{ scale: 1.05, y: -3 }} // Reduced movement
              whileTap={{ scale: 0.95 }}
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center gap-6 mb-12"
          >
            {[
              { icon: Github, href: '#', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
              { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
              { icon: Mail, href: '#', label: 'Email', color: 'from-red-500 to-red-700' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -5, rotate: 360 }} // Reduced movement
                whileTap={{ scale: 0.9 }}
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
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: isVisible ? [0, 10, 0] : 0 }} // Reduced movement
              transition={{ duration: 2, repeat: Infinity }}
              className="group p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300 border border-cyan-400/30"
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
          <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent animate-pulse" style={{animationDelay: '1s'}} />
        </div>
      )}
    </section>
  );
};

export default Hero;
