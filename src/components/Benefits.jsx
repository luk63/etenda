import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { benefits } from '../constants/benefits';
import { motion } from 'framer-motion';

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-slate-900/50" />
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
            label="Benefits"
            title={
              <span>
                Why Choose
                <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Our Platform
                </span>
              </span>
            }
            className="text-white"
          />
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Experience the advantages of blockchain-powered tendering with our innovative platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.name}
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
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/40 to-pink-500/40 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

                <div className="flex flex-col h-full">
                  {/* Icon with gradient background */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl 
                      bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg 
                      group-hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-transparent 
                      group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 
                      group-hover:bg-clip-text transition-all duration-300"
                    >
                      {benefit.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                    {benefit.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-8 pt-8 border-t border-white/[0.05]">
                    <div className="w-12 h-1 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 
                      group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-24 p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.05] 
            backdrop-blur-sm max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {[
              { value: '100%', label: 'Secure' },
              { value: '24/7', label: 'Support' },
              { value: '0%', label: 'Fee' },
              { value: 'Fast', label: 'Processing' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                  text-transparent bg-clip-text mb-1"
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}