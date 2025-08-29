'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Rocket,
  Brain,
  Cpu,
  Atom,
  Sparkles,
  Target,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:mohammadapon11@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      // Open default email client
      window.open(mailtoLink, '_blank');
      
      // Simulate success
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }, 1000);
      
    } catch {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(236,72,153,0.03)_50%,transparent_70%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 7 + Math.random() * 4,
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
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center md:mb-20 mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="text-pink-400 animate-pulse" size={32} />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <Brain className="text-pink-400 animate-pulse" size={32} />
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            I&apos;m always excited to hear about new opportunities and interesting projects. 
            Let&apos;s discuss how we can work together to create something <span className="text-pink-400 font-medium">amazing</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Futuristic Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-8">
              <Target className="text-pink-400 animate-pulse" size={28} />
              <h3 className="text-3xl font-black text-white">
                Send Message
              </h3>
              <Sparkles className="text-pink-400 animate-pulse" size={28} />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <label className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-pink-400 transition-colors duration-300">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="relative w-full px-6 py-4 bg-black/40 border border-slate-700/30 rounded-2xl text-white placeholder-gray-400 focus:border-pink-500/60 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all duration-500 backdrop-blur-sm group-hover:border-pink-500/40 group-hover:bg-black/50 group-hover:shadow-lg group-hover:shadow-pink-500/10"
                      placeholder="Your Name"
                    />
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: formData.name ? '100%' : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="group relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <label className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="relative w-full px-6 py-4 bg-black/40 border border-slate-700/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-500 backdrop-blur-sm group-hover:border-purple-500/40 group-hover:bg-black/50 group-hover:shadow-lg group-hover:shadow-purple-500/10"
                      placeholder="your@email.com"
                    />
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: formData.email ? '100%' : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div className="group relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <label className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-indigo-400 transition-colors duration-300">
                  Subject
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="relative w-full px-6 py-4 bg-black/40 border border-slate-700/30 rounded-2xl text-white placeholder-gray-400 focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-500 backdrop-blur-sm group-hover:border-indigo-500/40 group-hover:bg-black/50 group-hover:shadow-lg group-hover:shadow-indigo-500/10"
                    placeholder="Project Discussion"
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: formData.subject ? '100%' : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="group relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <label className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-blue-400 transition-colors duration-300">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="relative w-full px-6 py-4 bg-black/40 border border-slate-700/30 rounded-2xl text-white placeholder-gray-400 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-500 backdrop-blur-sm group-hover:border-blue-500/40 group-hover:bg-black/50 group-hover:shadow-lg group-hover:shadow-blue-500/10 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: formData.message ? '100%' : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                      <Zap size={20} className="text-yellow-300" />
                    </>
                  )}
                </span>
              </motion.button>

              {/* Submission Status */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl text-green-400 backdrop-blur-xl"
                  >
                    <CheckCircle size={20} />
                    <span className="font-medium">Message sent successfully! Check your email client.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl text-red-400 backdrop-blur-xl"
                  >
                    <AlertCircle size={20} />
                    <span className="font-medium">Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Futuristic Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Cpu className="text-pink-400 animate-pulse" size={28} />
              <h3 className="text-3xl font-black text-white">
                Contact Info
              </h3>
              <Atom className="text-pink-400 animate-pulse" size={28} />
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  value: 'mohammadapon11@gmail.com',
                  href: 'mailto:mohammadapon11@gmail.com',
                  color: 'from-pink-500 to-purple-500'
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  value: '+8801335-486776',
                  href: 'tel:+8801335486776',
                  color: 'from-purple-500 to-indigo-500'
                },
                {
                  icon: MapPin,
                  title: 'Location',
                  value: 'Remote / Worldwide',
                  href: '#',
                  color: 'from-indigo-500 to-blue-500'
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.title}
                  href={contact.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-6 p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-3xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 border border-slate-700/50 hover:border-pink-500/50 backdrop-blur-xl"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <contact.icon size={28} className="text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300">
                      {contact.title}
                    </h4>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h4 className="text-xl font-bold text-white mb-6 text-center">
                Follow Me
              </h4>
              <div className="flex justify-center gap-6">
                {[
                  { icon: Github, href: 'https://github.com/mohammadapon11', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammadapon11/', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, y: -10, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-4 bg-gradient-to-br ${social.color} rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 text-white backdrop-blur-sm border border-white/20`}
                    aria-label={social.label}
                  >
                    <social.icon size={28} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Futuristic Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="relative p-12 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-3xl border border-pink-500/30 backdrop-blur-xl overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_70%)]" />
          
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="text-pink-400 animate-pulse" size={32} />
              <h3 className="text-3xl font-black text-white">
                Current <span className="gradient-text">Status</span>
              </h3>
              <Sparkles className="text-pink-400 animate-pulse" size={32} />
            </div>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg font-light">
              I&apos;m currently <span className="text-pink-400 font-medium">available for new opportunities</span> and exciting projects. 
              I&apos;m particularly interested in <span className="text-purple-400 font-medium">frontend development roles</span> and 
              <span className="text-indigo-400 font-medium"> innovative web applications</span>.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.span 
                className="px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 rounded-2xl text-sm font-medium border border-pink-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Available for Freelance
              </motion.span>
              <motion.span 
                className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 rounded-2xl text-sm font-medium border border-purple-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Open to Full-time Roles
              </motion.span>
              <motion.span 
                className="px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 text-indigo-300 rounded-2xl text-sm font-medium border border-indigo-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Remote Work Preferred
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
