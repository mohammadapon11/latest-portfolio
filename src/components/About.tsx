'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Smartphone, Database, Zap, Shield, Rocket, Brain, Cpu, Atom } from 'lucide-react';
import { useCallback } from 'react';

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
          initial={{ 
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            filter: "blur(10px)",
            transform: "perspective(1000px) rotateX(90deg) translateZ(-100px)"
          }}
          whileInView={{ 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            filter: "blur(0px)",
            transform: "perspective(1000px) rotateX(0deg) translateZ(0px)"
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            filter: { duration: 0.8 },
            transform: { duration: 1.2 }
          }}
          viewport={{ once: true }}
          className="text-center md:mb-20 mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 200,
                delay: 0.3
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.2, 
                rotate: 360,
                filter: "hue-rotate(180deg)"
              }}
            >
              <Rocket className="text-cyan-400" size={32} />
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
              initial={{ 
                backgroundPosition: "200% center",
                backgroundSize: "200% 100%"
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 200,
                delay: 0.5
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.2, 
                rotate: -360,
                filter: "hue-rotate(-180deg)"
              }}
            >
              <Rocket className="text-cyan-400" size={32} />
            </motion.div>
          </div>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ 
              opacity: 0,
              transform: "translateY(30px) skewY(-2deg)",
              filter: "blur(5px)"
            }}
            whileInView={{ 
              opacity: 1,
              transform: "translateY(0px) skewY(0deg)",
              filter: "blur(0px)"
            }}
            transition={{ 
              duration: 1,
              delay: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true }}
          >
            I&apos;m a <span className="text-cyan-400 font-medium">passionate Frontend Developer</span> with 2+ years of experience crafting 
            <span className="text-purple-400 font-medium"> exceptional digital experiences</span>. I specialize in <span className="text-pink-400 font-medium">modern web technologies</span> 
            and love turning complex problems into simple, <span className="text-cyan-400 font-medium">beautiful solutions</span>.
          </motion.p>
        </motion.div>

        {/* Futuristic Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ 
                clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
                transform: "perspective(1000px) rotateY(90deg) translateZ(-100px)",
                filter: "blur(8px) saturate(0.5)"
              }}
              whileInView={{ 
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                transform: "perspective(1000px) rotateY(0deg) translateZ(0px)",
                filter: "blur(0px) saturate(1)"
              }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
                clipPath: { duration: 0.8 },
                transform: { duration: 1.2 }
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transform: "perspective(1000px) rotateY(-5deg) translateZ(20px)",
                filter: "brightness(1.1) contrast(1.1)"
              }}
              className="group relative p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-3xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/50 backdrop-blur-xl overflow-hidden"
            >
              {/* Advanced Holographic Background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  opacity: 0.8, 
                  scale: 1.1,
                  filter: "hue-rotate(45deg)"
                }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                viewport={{ once: true }}
              />
              
              {/* Advanced Icon Container */}
              <motion.div 
                className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                initial={{ 
                  scale: 0,
                  rotate: 180,
                  filter: "hue-rotate(180deg) saturate(0)"
                }}
                whileInView={{ 
                  scale: 1,
                  rotate: 0,
                  filter: "hue-rotate(0deg) saturate(1)"
                }}
                whileHover={{ 
                  rotate: 360, 
                  scale: 1.3,
                  filter: "hue-rotate(90deg) brightness(1.2)",
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)"
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15 + 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true }}
              >
                <feature.icon size={32} className="text-white" />
                <motion.div 
                  className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 0, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              
              <motion.h3 
                className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300"
                initial={{ 
                  opacity: 0,
                  transform: "translateX(-20px) skewX(-5deg)"
                }}
                whileInView={{ 
                  opacity: 1,
                  transform: "translateX(0px) skewX(0deg)"
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15 + 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed font-light"
                initial={{ 
                  opacity: 0,
                  transform: "translateY(20px) scale(0.9)"
                }}
                whileInView={{ 
                  opacity: 1,
                  transform: "translateY(0px) scale(1)"
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15 + 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true }}
              >
                {feature.description}
              </motion.p>
              
              {/* Advanced Hover Effect Border */}
              <motion.div 
                className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ 
                  opacity: 1, 
                  scale: 1.1,
                  filter: "hue-rotate(45deg)"
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Futuristic Stats */}
        <motion.div
          initial={{ 
            clipPath: "polygon(0% 50%, 0% 50%, 100% 50%, 100% 50%)",
            transform: "perspective(1000px) rotateX(-90deg) translateZ(-100px)",
            filter: "blur(10px) saturate(0.3)"
          }}
          whileInView={{ 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            transform: "perspective(1000px) rotateX(0deg) translateZ(0px)",
            filter: "blur(0px) saturate(1)"
          }}
          transition={{ 
            duration: 1.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            clipPath: { duration: 1 },
            transform: { duration: 1.5 }
          }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { number: '2+', label: 'Years Experience', icon: '🚀', color: 'from-cyan-500 to-blue-500' },
            { number: '50+', label: 'Projects Completed', icon: '🎯', color: 'from-blue-500 to-purple-500' },
            { number: '100%', label: 'Client Satisfaction', icon: '⭐', color: 'from-purple-500 to-pink-500' },
            { number: '24/7', label: 'Support Available', icon: '⚡', color: 'from-pink-500 to-red-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ 
                scale: 0,
                rotate: 180,
                filter: "hue-rotate(180deg) saturate(0) blur(5px)",
                transform: "perspective(1000px) rotateZ(180deg) translateZ(-50px)"
              }}
              whileInView={{ 
                scale: 1,
                rotate: 0,
                filter: "hue-rotate(0deg) saturate(1) blur(0px)",
                transform: "perspective(1000px) rotateZ(0deg) translateZ(0px)"
              }}
              transition={{ 
                duration: 1, 
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                filter: { duration: 0.8 },
                transform: { duration: 1 }
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                filter: "hue-rotate(45deg) brightness(1.2)",
                transform: "perspective(1000px) rotateZ(5deg) translateZ(20px)"
              }}
              className="text-center group"
            >
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                initial={{ 
                  scale: 0,
                  rotate: -180,
                  filter: "hue-rotate(-180deg) saturate(0)"
                }}
                whileInView={{ 
                  scale: 1,
                  rotate: 0,
                  filter: "hue-rotate(0deg) saturate(1)"
                }}
                whileHover={{ 
                  rotate: 360, 
                  scale: 1.3,
                  filter: "hue-rotate(90deg) brightness(1.3)",
                  boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)"
                }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.2 + 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true }}
              >
                <motion.span 
                  className="text-3xl"
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    filter: "hue-rotate(180deg)"
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2 + 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true }}
                >
                  {stat.icon}
                </motion.span>
              </motion.div>
              
              <motion.div 
                className="text-4xl md:text-5xl font-black gradient-text mb-2"
                initial={{ 
                  opacity: 0,
                  transform: "translateY(20px) scale(0.5)",
                  filter: "blur(5px)"
                }}
                whileInView={{ 
                  opacity: 1,
                  transform: "translateY(0px) scale(1)",
                  filter: "blur(0px)"
                }}
                whileHover={{ 
                  scale: 1.1,
                  filter: "brightness(1.2) contrast(1.1)"
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2 + 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              
              <motion.div 
                className="text-sm md:text-base text-gray-300 font-medium"
                initial={{ 
                  opacity: 0,
                  transform: "translateY(15px) skewY(-2deg)",
                  filter: "blur(3px)"
                }}
                whileInView={{ 
                  opacity: 1,
                  transform: "translateY(0px) skewY(0deg)",
                  filter: "blur(0px)"
                }}
                whileHover={{ 
                  scale: 1.05,
                  skewY: 1,
                  filter: "brightness(1.1)"
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2 + 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Futuristic CTA */}
        <motion.div
          initial={{ 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            transform: "perspective(1000px) rotateY(-90deg) translateZ(-100px)",
            filter: "blur(15px) saturate(0.2) hue-rotate(180deg)"
          }}
          whileInView={{ 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            transform: "perspective(1000px) rotateY(0deg) translateZ(0px)",
            filter: "blur(0px) saturate(1) hue-rotate(0deg)"
          }}
          transition={{ 
            duration: 1.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            clipPath: { duration: 1.2 },
            transform: { duration: 1.8 },
            filter: { duration: 1.5 }
          }}
          viewport={{ once: true }}
          className="relative p-12 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-3xl border border-cyan-500/30 backdrop-blur-xl overflow-hidden"
        >
          {/* Advanced Animated Background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
              filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(360deg)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
              filter: ["hue-rotate(0deg)", "hue-rotate(-180deg)", "hue-rotate(-360deg)"]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ 
                  scale: 0,
                  rotate: -180,
                  filter: "hue-rotate(180deg) saturate(0)"
                }}
                whileInView={{ 
                  scale: 1,
                  rotate: 0,
                  filter: "hue-rotate(0deg) saturate(1)"
                }}
                whileHover={{ 
                  scale: 1.3,
                  rotate: 360,
                  filter: "hue-rotate(90deg) brightness(1.5)"
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Brain className="text-cyan-400" size={32} />
              </motion.div>
              
              <motion.h3 
                className="text-3xl font-black text-white"
                initial={{ 
                  opacity: 0,
                  transform: "translateY(30px) scale(0.8)",
                  filter: "blur(10px) saturate(0)"
                }}
                whileInView={{ 
                  opacity: 1,
                  transform: "translateY(0px) scale(1)",
                  filter: "blur(0px) saturate(1)"
                }}
                whileHover={{ 
                  scale: 1.05,
                  filter: "brightness(1.2) contrast(1.1)"
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true }}
              >
                Ready to Build Something <span className="gradient-text">Amazing</span>?
              </motion.h3>
              
              <motion.div
                initial={{ 
                  scale: 0,
                  rotate: 180,
                  filter: "hue-rotate(-180deg) saturate(0)"
                }}
                whileInView={{ 
                  scale: 1,
                  rotate: 0,
                  filter: "hue-rotate(0deg) saturate(1)"
                }}
                whileHover={{ 
                  scale: 1.3,
                  rotate: -360,
                  filter: "hue-rotate(-90deg) brightness(1.5)"
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: 1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Cpu className="text-purple-400" size={32} />
              </motion.div>
            </div>
            
            <motion.p 
              className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg font-light"
              initial={{ 
                opacity: 0,
                transform: "translateY(25px) skewY(-1deg)",
                filter: "blur(5px) saturate(0.5)"
              }}
              whileInView={{ 
                opacity: 1,
                transform: "translateY(0px) skewY(0deg)",
                filter: "blur(0px) saturate(1)"
              }}
              whileHover={{ 
                scale: 1.02,
                skewY: 0.5,
                filter: "brightness(1.1)"
              }}
              transition={{ 
                duration: 1,
                delay: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
            >
              I&apos;m always excited to work on new projects and collaborate with amazing teams. 
              Let&apos;s discuss how we can bring your ideas to life with <span className="text-cyan-400 font-medium">cutting-edge technology</span>.
            </motion.p>
            
            <motion.button
              onClick={scrollToAbout}
              initial={{ 
                scale: 0.8,
                rotate: -5,
                filter: "blur(3px) saturate(0.7)"
              }}
              whileInView={{ 
                scale: 1,
                rotate: 0,
                filter: "blur(0px) saturate(1)"
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -8, 
                rotate: 2,
                filter: "brightness(1.2) contrast(1.1)",
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                duration: 0.8,
                delay: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-3">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  animate={{ 
                    rotate: [0, 360],
                    filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(360deg)"]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: 3
                  }}
                >
                  <Atom size={24} />
                </motion.div>
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
