'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Smartphone, Database, Zap, Shield, Rocket, Brain, Cpu, Atom } from 'lucide-react';
import { useCallback, useMemo } from 'react';

const aboutParticles = [
  { left: '10%', top: '20%', duration: '7s', delay: '0s' },
  { left: '25%', top: '65%', duration: '9s', delay: '1.5s' },
  { left: '40%', top: '15%', duration: '8s', delay: '0.8s' },
  { left: '55%', top: '80%', duration: '10s', delay: '2.2s' },
  { left: '70%', top: '30%', duration: '7.5s', delay: '1s' },
  { left: '85%', top: '70%', duration: '9.5s', delay: '3s' },
  { left: '15%', top: '85%', duration: '8.5s', delay: '2s' },
  { left: '35%', top: '45%', duration: '7s', delay: '0.5s' },
  { left: '60%', top: '50%', duration: '9s', delay: '1.8s' },
  { left: '80%', top: '10%', duration: '8s', delay: '2.5s' },
  { left: '92%', top: '40%', duration: '10s', delay: '0.2s' },
  { left: '48%', top: '90%', duration: '8s', delay: '3.5s' },
];

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Expert in React, Next.js, TypeScript with cutting-edge UI/UX practices',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Globe,
      title: 'Web Technologies',
      description: 'Proficient in HTML5, CSS3, Tailwind CSS, and responsive design',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First',
      description: 'Creating responsive and mobile-optimized web applications',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'Backend Knowledge',
      description: 'Experience with Node.js, Express, MongoDB, and GraphQL',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, SEO, and user experience',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Best Practices',
      description: 'Following industry standards, clean code, and testing methodologies',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  const scrollToAbout = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  const particlesElement = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none">
      {aboutParticles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full about-particle"
          style={{
            left: p.left,
            top: p.top,
            animation: `about-particle-float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  ), []);

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(0,255,255,0.03)_50%,transparent_70%)]"></div>
      
      {/* Lightweight CSS Floating Particles */}
      {particlesElement}

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center md:mb-20 mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.15, rotate: 15 }}
            >
              <Rocket className="text-cyan-400" size={32} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
              About <span className="gradient-text">Me</span>
            </h2>
            <motion.div
              initial={{ scale: 0, rotate: 90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.15, rotate: -15 }}
            >
              <Rocket className="text-cyan-400" size={32} />
            </motion.div>
          </div>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            I&apos;m a <span className="text-cyan-400 font-medium">passionate Frontend Developer</span> with 3+ years of experience crafting 
            <span className="text-purple-400 font-medium"> exceptional digital experiences</span>. I specialize in <span className="text-pink-400 font-medium">modern web technologies</span> 
            and love turning complex problems into simple, <span className="text-cyan-400 font-medium">beautiful solutions</span>.
          </motion.p>
        </motion.div>

        {/* Futuristic Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-3xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/50 backdrop-blur-xl overflow-hidden"
            >
              {/* Holographic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon Container */}
              <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon size={32} className="text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed font-light">
                {feature.description}
              </p>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Futuristic Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { number: '3+', label: 'Years Experience', icon: '🚀', color: 'from-cyan-500 to-blue-500' },
            { number: '50+', label: 'Projects Completed', icon: '🎯', color: 'from-blue-500 to-purple-500' },
            { number: '100%', label: 'Client Satisfaction', icon: '⭐', color: 'from-purple-500 to-pink-500' },
            { number: '24/7', label: 'Support Available', icon: '⚡', color: 'from-pink-500 to-red-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center group cursor-default"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                {stat.number}
              </div>
              
              <div className="text-sm md:text-base text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simplified Lightweight 2D CTA Card */}
        <div
          className="relative p-10 md:p-12 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-3xl border border-cyan-500/30 hover:border-cyan-400/50 backdrop-blur-xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 motion-reduce:transform-none motion-reduce:transition-none"
        >
          {/* Lightweight Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-pulse pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.08),transparent_70%)] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
          
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="text-cyan-400" size={32} />
              <h3 className="text-3xl font-black text-white">
                Ready to Build Something <span className="gradient-text">Amazing</span>?
              </h3>
              <Cpu className="text-purple-400" size={32} />
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg font-light">
              I&apos;m always excited to work on new projects and collaborate with amazing teams. 
              Let&apos;s discuss how we can bring your ideas to life with <span className="text-cyan-400 font-medium">cutting-edge technology</span>.
            </p>
            
            <button
              onClick={scrollToAbout}
              className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-200 ease-out hover:scale-105 hover:-translate-y-0.5 active:scale-95 overflow-hidden motion-reduce:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative flex items-center gap-3">
                <span
                  className="inline-flex transition-transform duration-300"
                  style={{ animation: 'spin-clockwise 8s linear infinite' }}
                >
                  <Atom size={24} />
                </span>
                Let&apos;s Talk
                <Zap size={24} className="text-yellow-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
