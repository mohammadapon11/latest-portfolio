'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Smartphone, Database, Zap, Shield, Rocket, Brain, Cpu, Atom } from 'lucide-react';

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

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(0,255,255,0.03)_50%,transparent_70%)]"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="text-cyan-400 animate-pulse" size={32} />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
              About <span className="gradient-text">Me</span>
            </h2>
            <Rocket className="text-cyan-400 animate-pulse" size={32} />
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            I&apos;m a <span className="text-cyan-400 font-medium">passionate Frontend Developer</span> with 3+ years of experience crafting 
            <span className="text-purple-400 font-medium"> exceptional digital experiences</span>. I specialize in <span className="text-pink-400 font-medium">modern web technologies</span> 
            and love turning complex problems into simple, <span className="text-cyan-400 font-medium">beautiful solutions</span>.
          </p>
        </motion.div>

        {/* Futuristic Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-3xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/50 backdrop-blur-xl overflow-hidden"
            >
              {/* Holographic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon Container */}
              <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                <feature.icon size={32} className="text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed font-light">
                {feature.description}
              </p>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Futuristic Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
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

        {/* Futuristic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative p-12 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-3xl border border-cyan-500/30 backdrop-blur-xl overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]" />
          
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="text-cyan-400 animate-pulse" size={32} />
              <h3 className="text-3xl font-black text-white">
                Ready to Build Something <span className="gradient-text">Amazing</span>?
              </h3>
              <Cpu className="text-purple-400 animate-pulse" size={32} />
            </div>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg font-light">
              I&apos;m always excited to work on new projects and collaborate with amazing teams. 
              Let&apos;s discuss how we can bring your ideas to life with <span className="text-cyan-400 font-medium">cutting-edge technology</span>.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                <Atom size={24} className="animate-spin" />
                Let&apos;s Talk
                <Zap size={24} className="text-yellow-300" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
