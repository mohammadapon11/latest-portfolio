'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, ArrowDown, Sparkles, Zap, Target } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import heavy 3D components with better loading
const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 animate-pulse" />
  ),
});

// Isolated 3D background component: defers Three.js to browser idle time
// and encapsulates state so Hero's LCP elements never re-render.
const Hero3DScene = () => {
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  useEffect(() => {
    let idleHandle: number | null = null;
    let timerHandle: NodeJS.Timeout | null = null;

    const triggerLoad = () => {
      setIs3DLoaded(true);
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleHandle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(triggerLoad, { timeout: 2500 });
    } else {
      timerHandle = setTimeout(triggerLoad, 1500);
    }

    return () => {
      if (idleHandle !== null && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleHandle);
      }
      if (timerHandle !== null) {
        clearTimeout(timerHandle);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {is3DLoaded ? (
        <ThreeScene />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 animate-pulse" />
      )}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible] = useState(true);

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
    link.download = 'Mohammad_Apon_Frontend_Engineer.pdf';
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

  // Deterministic floating elements (hydration-safe, avoids Math.random during SSR)
  const floatingElements = useMemo(() => {
    if (!isVisible) return null;
    
    const particles = [
      { left: '20%', top: '35%', duration: 3.2, delay: 0.1 },
      { left: '80%', top: '50%', duration: 3.8, delay: 0.3 },
      { left: '48%', top: '78%', duration: 2.8, delay: 0.2 },
    ];

    return (
      <>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
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

      {/* 3D Background Scene - Isolated render boundary */}
      <Hero3DScene />

      {/* Content */}
      <div className="container-custom relative z-10">
        {/* Mobile-specific top padding to prevent jumping */}
        <div className="pt-20 md:pt-24 lg:pt-28"></div>
        
        <div className="text-center max-w-5xl mx-auto">
          {/* Optimized Greeting */}
          <motion.div
            initial={{ scale: 0.8, rotateY: -15 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-2 md:mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-cyan-400" size={24} />
              </motion.div>
              <span className="text-lg md:text-xl text-cyan-400 font-medium tracking-wider">
                FUTURE IS NOW
              </span>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-cyan-400" size={24} />
              </motion.div>
            </div>
            <span className="text-lg md:text-xl text-indigo-400 dark:text-indigo-300 font-medium tracking-wider">
              Hello, I&apos;m
            </span>
          </motion.div>

          {/* Optimized Main Title + Image */}
{/* Professional Main Title + Image Section */}
<div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 mb-8 lg:mb-12">
  {/* Left Side - Title */}
  <div className="flex-1 text-center lg:text-left">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <span className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-cyan-400 tracking-[3px]">
        <Sparkles size={18} />
        FUTURE IS NOW
      </span>
    </motion.div>

    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-black leading-[1.05] text-white">
      <span className="block bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
        FRONTEND
      </span>
      <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent mt-1">
        DEVELOPER
      </span>
    </h1>

    <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto lg:mx-0 mt-6" />
  </div>

  {/* Right Side - Professional Image */}
  <div className="flex-shrink-0 relative group">
    <div className="relative">
      {/* Main Image */}
      <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
        <Image
          src="/hero.webp"
          alt="Mohammad Apon - Professional Frontend Developer"
          width={960}
          height={1088}
          priority
          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
          className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] object-cover transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Premium Glow Border */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-[2rem] opacity-20 blur-2xl -z-10 group-hover:opacity-30 transition-opacity duration-500" />
      
      {/* Inner Border */}
      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none" />
    </div>

    {/* Small floating badge */}
    <div className="absolute -top-12 -right-4 lg:block hidden bg-black/80 backdrop-blur-md text-xs font-mono px-4 py-2 rounded-2xl border border-cyan-400/30 shadow-xl">
      <span className="text-emerald-400">●</span> Available for work
    </div>
  </div>
</div>

          {/* Optimized Description */}
          <motion.p
            initial={{ x: -100, scale: 0.8 }}
            whileInView={{ x: 0, scale: 1 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 100, delay: 0.2 }}
            viewport={{ once: true }}
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
            initial={{ y: 50, scale: 0.8 }}
            whileInView={{ y: 0, scale: 1 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 100, delay: 0.3 }}
            viewport={{ once: true }}
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
            initial={{ scale: 0.8, rotate: -5 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-4 sm:gap-6 mb-8 md:mb-12 px-4 sm:px-0"
          >
            {[
              { icon: Github, href: 'https://github.com/mohammadapon11', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammadapon11/', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
              { icon: Mail, href: 'mailto:mohammadapon11@gmail.com', label: 'Email', color: 'from-red-500 to-red-700' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.3, 
                  type: "spring", 
                  stiffness: 200, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 bg-gradient-to-br ${social.color} rounded-2xl shadow-2xl hover:shadow-lg transition-all duration-300 text-white backdrop-blur-sm border border-white/20`}
                aria-label={social.label}
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </motion.div>

          {/* Optimized Scroll Indicator */}
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="absolute bottom-8 right-8 md:bottom-12 md:-right-[322px] transform md:block hidden"
          >
            <motion.button
              onClick={scrollToAbout}
              animate={{ 
                y: [0, 8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
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
