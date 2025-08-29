'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Code, Globe, Smartphone, Rocket, Brain, Sparkles, Target, Zap } from 'lucide-react';
import Image from 'next/image';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  const allProjects = [
    {
      id: 1,
      title: 'Makinft NFT MARKETPLACE',
      description: 'A modern NFT marketplace built with Next.js, featuring digital asset trading, wallet integration, and blockchain technology.',
      image: '/pro1.png',
      technologies: ['Next.js', 'React', 'Web3.js', 'Solidity', 'Ethereum'],
      category: 'Full-Stack',
      liveUrl: 'https://maki-nft-nextjs.vercel.app/',
      githubUrl: 'https://github.com/MohammadApon11/MakiNFT-NEXTJS',
      featured: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Meidusware - SOFTWARE COMPANY',
      description: 'Professional software company website showcasing services, portfolio, and company information with modern design.',
      image: '/pro2.png',
      technologies: ['React', 'JavaScript', 'CSS3', 'Responsive Design', 'SEO'],
      category: 'Frontend',
      liveUrl: 'https://mediusware-new.vercel.app/',
      githubUrl: 'https://github.com/MohammadApon11/mediusware-new',
      featured: false,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 3,
      title: 'E-Commerce',
      description: 'A full-stack e-commerce platform built with Next.js, featuring product management, shopping cart, user authentication, and payment integration.',
      image: '/bazaar.png',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
      category: 'Full-Stack',
      liveUrl: 'https://next-bazaar-sigma.vercel.app/',
      githubUrl: 'https://github.com/MohammadApon11/BAZAAR',
      featured: true,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 4,
      title: 'Chat-Application',
      description: 'Real-time chat application with user authentication, private messaging, and modern UI design for seamless communication.',
      image: '/chat-app.png',
      technologies: ['React', 'Node.js', 'Socket.io', 'Express', 'MongoDB'],
      category: 'Full-Stack',
      liveUrl: 'https://own-chat-bot.onrender.com/',
      githubUrl: 'https://github.com/MohammadApon11/own-chat-bot',
      featured: true,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 4,
      title: 'Jobs Gonjo - Job Portal',
      description: 'Comprehensive job portal with job listings, application management, and employer dashboard for efficient hiring.',
      image: '/Jobs-gonjo.png',
      technologies: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL'],
      category: 'Full-Stack',
      liveUrl: 'https://jobs-portal-swx6.vercel.app/',
      githubUrl: 'https://github.com/MohammadApon11/jobs-portal',
      featured: true,
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 5,
      title: 'Relaxa music - Music Listener website',
      description: 'Music streaming platform with playlist management, audio controls, and personalized music recommendations.',
      image: '/relaxa-music.png',
      technologies: ['React', 'JavaScript', 'CSS3', 'Web Audio API', 'Local Storage'],
      category: 'Frontend',
      liveUrl: 'https://relaxa-music-client.vercel.app/',
      githubUrl: 'https://github.com/MohammadApon11/relaxa-music',
      featured: false,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 7,
      title: 'Toy house - Shopping Mall',
      description: 'E-commerce platform for toys and games with product catalog, shopping cart, and secure checkout system.',
      image: '/pro3.png',
      technologies: ['React', 'Firebase', 'JavaScript', 'CSS3', 'Authentication'],
      category: 'Full-Stack',
      liveUrl: 'https://toy-house-open.web.app/',
      githubUrl: 'https://github.com/MohammadApon11/toys-marketplace',
      featured: false,
      color: 'from-yellow-500 to-green-500'
    },
    {
      id: 8,
      title: 'Sports World - Learning Platform',
      description: 'Educational platform for sports training with course management, user progress tracking, and interactive learning.',
      image: '/pro4.png',
      technologies: ['React', 'Firebase', 'JavaScript', 'CSS3', 'Real-time Database'],
      category: 'Full-Stack',
      liveUrl: 'https://summer-camp-7b372.web.app/',
      githubUrl: 'https://github.com/MohammadApon11/sports_world_client_server',
      featured: false,
      color: 'from-green-500 to-cyan-500'
    },
    {
      id: 9,
      title: 'Apple Corner - Ecommerce',
      description: 'Apple products e-commerce store with modern UI, product filtering, and seamless shopping experience.',
      image: '/pro5.png',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      category: 'Frontend',
      liveUrl: 'https://applecorner-client-solutya.vercel.app/',
      githubUrl: 'https://github.com/MohammadApon11/applecorner-client-solutya',
      featured: false,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 10,
      title: 'Chefs World - Chefs Details',
      description: 'Culinary platform showcasing chef profiles, recipes, and cooking tutorials with interactive features.',
      image: '/pro6.png',
      technologies: ['React', 'Firebase', 'JavaScript', 'CSS3', 'Authentication'],
      category: 'Full-Stack',
      liveUrl: 'https://chef-recipes-hunter.web.app/',
      githubUrl: 'https://github.com/MohammadApon11/chefs-management',
      featured: false,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 11,
      title: 'Dua Ruquyah - Islamic Dua Store',
      description: 'Islamic application featuring daily duas, prayer times, and spiritual content with beautiful Arabic typography.',
      image: '/pro7.png',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      category: 'Frontend',
      liveUrl: 'https://duaruqyah-cloned.vercel.app/',
      githubUrl: 'https://github.com/MohammadApon11/duaruqyah-cloned',
      featured: false,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 12,
      title: 'Task Master - Task Management',
      description: 'Comprehensive task management application with project organization, deadline tracking, and team collaboration.',
      image: '/pro8.png',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      category: 'Frontend',
      liveUrl: 'https://taskinator-own.vercel.app/',
      githubUrl: 'https://github.com/MohammadApon11/taskinator-own',
      featured: false,
      color: 'from-pink-500 to-red-500'
    }
  ];

  const displayedProjects = showAll ? allProjects : allProjects.filter(project => project.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Full-Stack':
        return <Code size={20} />;
      case 'Frontend':
        return <Globe size={20} />;
      case 'Mobile':
        return <Smartphone size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  const scrollToAbout = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_30%,rgba(139,92,246,0.03)_50%,transparent_70%)]"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
            style={{
              top: `${i * 8}%`,
              left: '0%',
              right: '0%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center md:mb-20 mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="text-purple-400 animate-pulse" size={32} />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <Brain className="text-purple-400 animate-pulse" size={32} />
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            A showcase of my recent work, demonstrating my skills in frontend development, 
            full-stack applications, and <span className="text-purple-400 font-medium">modern web technologies</span>.
          </p>
        </motion.div>

        {/* Futuristic Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mb-16">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 overflow-hidden border border-slate-700/50 hover:border-purple-500/50 backdrop-blur-xl project-card"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-gradient-to-br from-slate-800/90 to-slate-700/90 text-gray-300 rounded-2xl text-sm font-medium flex items-center gap-2 backdrop-blur-sm border border-slate-600/50">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-br from-slate-800/50 to-slate-700/50 text-gray-300 rounded-xl text-sm font-medium border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg overflow-hidden group/btn"
                      style={{
                        background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(236, 72, 153))',
                        boxShadow: '0 10px 25px rgba(139, 92, 246, 0.25)'
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgb(168, 85, 247), rgb(244, 63, 94))'
                        }}
                      />
                      <span className="relative flex items-center gap-3">
                        <Eye size={18} />
                        Live Demo
                      </span>
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-slate-600/50 text-gray-300 font-bold rounded-2xl hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                    >
                      <Github size={18} />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Futuristic See All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center md:mb-20 mb-12"
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(236, 72, 153), rgb(59, 130, 246))',
              boxShadow: '0 20px 25px rgba(139, 92, 246, 0.25)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgb(168, 85, 247), rgb(244, 63, 94), rgb(96, 165, 250))'
              }}
            />
            <span className="relative flex items-center gap-3">
              {showAll ? 'Show Less' : 'See All Projects'}
              <ExternalLink size={24} />
              <Zap size={24} className="text-yellow-300" />
            </span>
          </motion.button>
        </motion.div>

        {/* Futuristic Project Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { number: '12+', label: 'Projects Completed', icon: '🎯', color: 'from-purple-500 to-pink-500' },
            { number: '3+', label: 'Years Experience', icon: '⏰', color: 'from-pink-500 to-indigo-500' },
            { number: '100%', label: 'Client Satisfaction', icon: '⭐', color: 'from-indigo-500 to-blue-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-3xl shadow-2xl border border-slate-700/50 hover:border-purple-500/50 backdrop-blur-xl transition-all duration-500"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <span className="text-4xl">{stat.icon}</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-4xl font-black gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Futuristic Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="relative p-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl border border-purple-500/30 backdrop-blur-xl overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
          
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="text-purple-400 animate-pulse" size={32} />
              <h3 className="text-3xl font-black text-white">
                Have a Project in <span className="gradient-text">Mind</span>?
              </h3>
              <Sparkles className="text-purple-400 animate-pulse" size={32} />
            </div>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg font-light">
              I&apos;m always excited to work on new projects and bring innovative ideas to life. 
              Let&apos;s discuss how we can create something <span className="text-purple-400 font-medium">amazing together</span>.
            </p>
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(236, 72, 153), rgb(59, 130, 246))',
                boxShadow: '0 20px 25px rgba(139, 92, 246, 0.25)'
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgb(168, 85, 247), rgb(244, 63, 94), rgb(96, 165, 250))'
                }}
              />
              <span className="relative flex items-center gap-3">
                <Rocket size={24} className="animate-bounce" />
                Start a Project
                <Zap size={24} className="text-yellow-300" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
