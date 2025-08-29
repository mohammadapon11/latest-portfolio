'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Zap, 
  Palette,
  GitBranch,
  Cloud,
  Cpu,
  Rocket,
  Brain,
  Atom,
  Sparkles,
  Target
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Technologies',
      icon: Code,
      skills: [
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'React.js', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
      ]
    },
    {
      title: 'Backend & Database',
      icon: Database,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'GraphQL', level: 70 },
        { name: 'REST APIs', level: 90 },
        { name: 'JWT Authentication', level: 85 },
      ]
    },
    {
      title: 'Development Tools',
      icon: GitBranch,
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Webpack/Vite', level: 80 },
        { name: 'ESLint & Prettier', level: 85 },
        { name: 'Jest & Testing', level: 75 },
        { name: 'Docker Basics', level: 70 },
      ]
    },
    {
      title: 'Performance & Optimization',
      icon: Zap,
      skills: [
        { name: 'SEO Optimization', level: 85 },
        { name: 'Performance Metrics', level: 80 },
        { name: 'Lighthouse', level: 85 },
        { name: 'Image Optimization', level: 90 },
        { name: 'Code Splitting', level: 80 },
        { name: 'Caching Strategies', level: 75 },
      ]
    },
    {
      title: 'UI/UX & Design',
      icon: Palette,
      skills: [
        { name: 'Responsive Design', level: 95 },
        { name: 'Mobile-First', level: 90 },
        { name: 'Figma Basics', level: 75 },
        { name: 'Accessibility', level: 80 },
        { name: 'Design Systems', level: 85 },
        { name: 'Animation Libraries', level: 90 },
      ]
    },
    {
      title: 'Cloud & Deployment',
      icon: Cloud,
      skills: [
        { name: 'Vercel', level: 90 },
        { name: 'Netlify', level: 85 },
        { name: 'AWS Basics', level: 70 },
        { name: 'CI/CD', level: 75 },
        { name: 'Domain Management', level: 80 },
        { name: 'SSL & Security', level: 85 },
      ]
    }
  ];

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_30%,rgba(139,92,246,0.03)_50%,transparent_70%)]"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
            style={{
              top: `${i * 7}%`,
              left: '0%',
              right: '0%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
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
            <Brain className="text-purple-400 animate-pulse" size={32} />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <Cpu className="text-purple-400 animate-pulse" size={32} />
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            I&apos;ve developed expertise in a wide range of technologies and tools, 
            constantly learning and adapting to stay current with <span className="text-purple-400 font-medium">industry best practices</span>.
          </p>
        </motion.div>

        {/* Futuristic Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 border border-slate-700/50 hover:border-purple-500/50 backdrop-blur-xl overflow-hidden"
            >
              {/* Holographic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <category.icon size={32} className="text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full" />
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.5 }}
                        viewport={{ once: true }}
                        className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Futuristic Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center md:mb-20 mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Target className="text-pink-400 animate-pulse" size={32} />
            <h3 className="text-3xl font-black text-white">
              Other <span className="gradient-text">Skills</span>
            </h3>
            <Sparkles className="text-pink-400 animate-pulse" size={32} />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Redux', 'Context API', 'React Query', 'Framer Motion',
              'Three.js', 'WebGL', 'PWA', 'Service Workers',
              'Webpack', 'Babel', 'PostCSS', 'Sass/SCSS',
              'Jest', 'React Testing Library', 'Cypress', 'Storybook',
              'Agile/Scrum', 'JIRA', 'Confluence', 'Slack',
              'Postman', 'Insomnia', 'MongoDB Compass', 'Robo 3T'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group px-6 py-3 bg-gradient-to-br from-slate-800/50 to-slate-700/50 text-gray-300 rounded-2xl text-sm font-medium shadow-lg hover:shadow-pink-500/25 transition-all duration-300 border border-slate-600/50 hover:border-pink-500/50 backdrop-blur-sm hover:scale-105 hover:text-white"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Futuristic Learning Path */}
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
              <Rocket className="text-purple-400 animate-pulse" size={32} />
              <h3 className="text-3xl font-black text-white">
                Always Learning & <span className="gradient-text">Growing</span>
              </h3>
              <Atom className="text-pink-400 animate-pulse" size={32} />
            </div>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg font-light">
              I&apos;m constantly exploring new technologies and methodologies to enhance my skills. 
              Currently focusing on <span className="text-purple-400 font-medium">advanced React patterns</span>, <span className="text-pink-400 font-medium">performance optimization</span>, and <span className="text-cyan-400 font-medium">emerging web technologies</span>.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.span 
                className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-2xl text-sm font-medium border border-purple-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Currently Learning: Advanced React Patterns
              </motion.span>
              <motion.span 
                className="px-6 py-3 bg-gradient-to-r from-pink-500/20 to-red-500/20 text-pink-300 rounded-2xl text-sm font-medium border border-pink-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Next: WebAssembly & Rust
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
