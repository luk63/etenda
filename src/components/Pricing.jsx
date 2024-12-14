import React, { useState } from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { plans } from '../constants/pricing';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="relative py-24 overflow-hidden">
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
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <SectionHeading
            label="Pricing"
            title={
              <span>
                Simple pricing,
                <span className="block mt-1 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  for everyone
                </span>
              </span>
            }
            className="text-white"
          />
          <p className="mt-6 text-gray-400 text-lg">
            Choose the perfect plan for your needs. All plans include core features.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center justify-center gap-4 rounded-full bg-white/5 p-2 backdrop-blur-sm">
            <span className={`text-sm px-3 py-1 rounded-full transition-colors duration-200
              ${!isAnnual ? 'text-white bg-white/10' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-white/10 p-1 transition-colors duration-200"
            >
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-200 
                  ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-sm px-3 py-1 rounded-full transition-colors duration-200
              ${isAnnual ? 'text-white bg-white/10' : 'text-gray-400'}`}>
              Annual
              <span className="ml-1.5 text-purple-400">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`h-full p-6 rounded-2xl backdrop-blur-sm transition-all duration-300
                hover:-translate-y-1 
                ${plan.featured 
                  ? 'bg-white/10 border-2 border-purple-500/20 shadow-xl shadow-purple-500/10' 
                  : 'bg-white/[0.03] border border-white/[0.05]'}`}
              >
                {/* Featured Badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-3 py-1 rounded-full text-xs font-semibold
                      bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                      ${isAnnual ? Math.floor(plan.price * 12 * 0.8) : plan.price}
                    </span>
                    <span className="ml-1.5 text-sm text-gray-400">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-400">
                      <CheckIcon className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200
                  ${plan.featured
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  } hover:shadow-lg`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 flex items-center justify-center gap-2 text-sm">
            <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
            30-day money-back guarantee
          </p>
        </motion.div>
      </Container>
    </section>
  );
}