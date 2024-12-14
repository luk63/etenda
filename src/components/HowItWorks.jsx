import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { steps } from '../constants/steps';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-purple-900/30" />
      <div className="absolute h-80 w-80 -top-40 -left-20 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute h-80 w-80 -bottom-40 -right-20 rounded-full bg-pink-500/20 blur-3xl" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <SectionHeading
            label="Process"
            title={
              <span>
                Simple steps to
                <span className="block mt-1 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  get started with us
                </span>
              </span>
            }
            className="text-white"
          />
          <p className="mt-6 text-gray-400 text-lg">
            Follow these simple steps to start your tendering journey with our platform
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 
            transform -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] 
                  backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300
                  hover:shadow-2xl hover:shadow-purple-500/[0.1] hover:-translate-y-1"
                >
                  {/* Gradient Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/40 to-pink-500/40 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

                  <div className="flex flex-col items-center text-center">
                    {/* Step Number */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 
                        flex items-center justify-center text-2xl font-bold text-white
                        shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300"
                      >
                        {step.id}
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="absolute top-1/2 left-full w-full h-0.5 
                          bg-gradient-to-r from-purple-500/20 to-transparent transform -translate-y-1/2 lg:hidden" />
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white group-hover:text-transparent 
                      group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 
                      group-hover:bg-clip-text transition-all duration-300 mb-4"
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 
            rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 
            transition-all duration-300 shadow-lg hover:shadow-purple-500/25
            transform hover:-translate-y-0.5"
          >
            Start Your Journey
          </button>
        </motion.div>
      </Container>
    </section>
  );
}