'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Github, Linkedin, Mail, ArrowDown, Sparkles, Zap, Target } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text3D, Center, Environment, Stars, Cloud, Sparkles as ThreeSparkles } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Futuristic Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(120,119,198,0.1)_50%,transparent_100%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(120,119,198,0.1)_50%,transparent_100%)] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
            style={{
              top: `${i * 5}%`,
              left: '0%',
              right: '0%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"
            style={{
              left: `${i * 5}%`,
              top: '0%',
              bottom: '0%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1 + 1.5,
            }}
          />
        ))}
      </div>

      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
          
          {/* Floating Geometric Shapes */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[-3, 2, 0]}>
              <octahedronGeometry args={[0.5, 0]} />
              <meshStandardMaterial color="#6366f1" wireframe />
            </mesh>
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
            <mesh position={[3, -2, 0]}>
              <icosahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial color="#8b5cf6" wireframe />
            </mesh>
          </Float>

          {/* Central Holographic Sphere */}
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
              <MeshDistortMaterial
                color="#06b6d4"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0}
                metalness={0.8}
                transparent
                opacity={0.6}
              />
            </Sphere>
          </Float>

          {/* Orbiting Particles */}
          <ThreeSparkles
            count={100}
            scale={10}
            size={2}
            speed={0.3}
            color="#6366f1"
          />

          {/* Environment and Effects */}
          <Environment preset="city" />
          <EffectComposer>
            <Bloom luminanceThreshold={0.1} intensity={0.5} />
            <ChromaticAberration offset={[0.002, 0.002]} />
            <Vignette darkness={0.3} />
          </EffectComposer>
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Futuristic Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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

          {/* Main Title with Futuristic Effects */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 relative"
          >
            <span className="relative">
              <span className="gradient-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                FRONTEND
              </span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 rounded-lg blur opacity-25"
                animate={{ opacity: [0.25, 0.5, 0.25] }}
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
                animate={{ opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Futuristic Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
          >
            <span className="text-cyan-400 font-medium">Crafting</span> exceptional digital experiences with{' '}
            <span className="text-indigo-400 font-medium">cutting-edge technologies</span>. 
            Specialized in <span className="text-purple-400 font-medium">React</span>,{' '}
            <span className="text-pink-400 font-medium">Next.js</span>, and{' '}
            <span className="text-red-400 font-medium">TypeScript</span> with 3+ years of expertise 
            in building <span className="text-cyan-400 font-medium">scalable web applications</span>.
          </motion.p>

          {/* Futuristic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
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
              whileHover={{ scale: 1.05, y: -5 }}
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

          {/* Futuristic Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                whileHover={{ scale: 1.2, y: -10, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 bg-gradient-to-br ${social.color} rounded-2xl shadow-2xl hover:shadow-lg transition-all duration-300 text-white backdrop-blur-sm border border-white/20`}
                aria-label={social.label}
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </motion.div>

          {/* Futuristic Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="group p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300 border border-cyan-400/30"
            >
              <ArrowDown size={28} className="text-cyan-400 group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Floating Holographic Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Energy Field Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent animate-pulse" style={{animationDelay: '1s'}} />
      </div>
    </section>
  );
};

export default Hero;
