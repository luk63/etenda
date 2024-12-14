import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { features } from '../constants/features';
import { motion } from 'framer-motion';

export default function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-purple-900/30" />
      <div className="absolute h-80 w-80 -top-40 -right-20 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute h-80 w-80 -bottom-40 -left-20 rounded-full bg-pink-500/20 blur-3xl" />
      
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-24"
        >
          <SectionHeading
            label="Features"
            title={
              <span>
                Everything you need to
                <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  manage tenders efficiently
                </span>
              </span>
            }
            className="text-white"
          />
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Our platform provides cutting-edge tools and features to streamline your tendering process
            from start to finish.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] 
                backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300
                hover:shadow-2xl hover:shadow-purple-500/[0.1] hover:-translate-y-1"
              >
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/40 to-pink-500/40 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl 
                      bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg group-hover:shadow-purple-500/50 
                      transition-shadow duration-300"
                    >
                      <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-transparent 
                      group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 
                      group-hover:bg-clip-text transition-all duration-300"
                    >
                      {feature.name}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {[
            { label: 'Security', value: '100%' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Platform Fee', value: '0%' },
            { label: 'Support', value: '24/7' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] 
                backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300
                hover:shadow-xl hover:shadow-purple-500/[0.1]"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                  text-transparent bg-clip-text mb-2"
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}