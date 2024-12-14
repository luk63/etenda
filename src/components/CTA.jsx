import React from 'react';
import { Container } from './ui/Container';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900/30 to-pink-900/50" />
      <div className="absolute h-[500px] w-[500px] -top-40 -right-40 rounded-full 
        bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl animate-pulse" />
      <div className="absolute h-[500px] w-[500px] -bottom-40 -left-40 rounded-full 
        bg-gradient-to-br from-pink-500/30 to-purple-500/30 blur-3xl animate-pulse delay-1000" />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl 
              p-6 sm:p-8 md:p-12 shadow-2xl shadow-purple-500/10"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0">
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white">Ready to </span>
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 
                    text-transparent bg-clip-text bg-300% animate-gradient">
                    revolutionize
                  </span>
                  <span className="text-white"> your tendering?</span>
                </motion.h2>
                <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0
                  leading-relaxed">
                  Join us for secure and efficient tender management.
                </p>

                {/* Enhanced Stats */}
                <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0">
                  {[
                    { value: '100%', label: 'Secure' },
                    { value: '24/7', label: 'Support' },
                    { value: '0%', label: 'Platform Fee' },
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label} 
                      className="text-center px-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 
                        via-pink-400 to-purple-400 text-transparent bg-clip-text bg-300% animate-gradient">
                        {stat.value}
                      </div>
                      <div className="text-sm sm:text-base text-gray-400 mt-2 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Enhanced Action Card */}
              <div className="w-full max-w-sm lg:max-w-md">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl p-6 sm:p-8 backdrop-blur-xl
                    shadow-2xl shadow-purple-500/10 transition-all duration-300
                    before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
                    before:from-purple-500/10 before:to-pink-500/10 before:backdrop-blur-xl
                    before:border before:border-white/10"
                >
                  <div className="relative">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                      Start for free
                    </h3>
                    <div className="space-y-5">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.1] rounded-xl 
                          text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50
                          text-base sm:text-lg transition-all duration-200 backdrop-blur-xl"
                      />
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-6 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 
                          rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25
                          text-base sm:text-lg bg-300% animate-gradient"
                      >
                        Get Started Now
                      </motion.button>
                    </div>
                    <p className="mt-6 text-sm sm:text-base text-gray-400 text-center">
                      Free plan includes all basic features
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}