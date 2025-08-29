'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Brain, Cpu, Atom, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);

      // Clear previous timeout
      clearTimeout(timeoutId);
      
      // Debounce the section detection for better performance
      timeoutId = setTimeout(() => {
        // Update active section based on scroll position
        const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
        const isMobile = window.innerWidth < 1024;
        const threshold = isMobile ? 150 : 100; // Larger threshold for mobile
        
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= threshold && rect.bottom >= threshold;
          }
          return false;
        });
        
        if (currentSection) {
          setActiveSection(currentSection);
        }
      }, 50); // 50ms debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the current scroll position
      const currentScrollY = window.scrollY;
      
      // Get the element's position relative to the viewport
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + currentScrollY;
      
      // Calculate the target scroll position with offset for mobile
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      const offset = isMobile ? 100 : 80; // Smaller offset for mobile
      const targetScrollY = elementTop - offset;
      
      // Add small delay for mobile to ensure smooth navigation
      const scrollDelay = isMobile ? 100 : 0;
      
      setTimeout(() => {
        // Smooth scroll to the target position
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });
      }, scrollDelay);
      
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Rocket },
    { id: 'about', label: 'About', icon: Brain },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Atom },
    { id: 'projects', label: 'Projects', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Rocket }
  ];

  return (
    <>
      {/* Futuristic Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Rocket size={24} className="text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-50" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-black text-white">
                  <span className="gradient-text">Mohammad Apon</span>
                </div>
                <div className="text-xs text-cyan-400 font-medium tracking-wider">
                  FRONTEND DEVELOPER
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 shadow-lg shadow-cyan-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={18} className={`transition-colors duration-300 ${
                      activeSection === item.id ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'
                    }`} />
                    {item.label}
                  </div>
                  
                  {/* Active Indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl border border-slate-600/50 backdrop-blur-xl"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0 }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden"
          >
            <div className="bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl">
              <div className="container-custom py-6">
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                        activeSection === item.id
                          ? 'text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 shadow-lg shadow-cyan-500/25'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <item.icon size={20} className={`transition-colors duration-300 ${
                        activeSection === item.id ? 'text-cyan-400' : 'text-gray-400'
                      }`} />
                      {item.label}
                      
                      {/* Active Indicator */}
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="mobileActiveSection"
                          className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </>
  );
};

export default Navigation;
