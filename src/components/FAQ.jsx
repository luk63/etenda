import React from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { faqs } from '../constants/faq';

export default function FAQ() {
  return (
    <section className="relative py-24 overflow-hidden">
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
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <SectionHeading
            label="FAQ"
            title={
              <span>
                Got questions?
                <span className="block mt-1 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  We've got answers
                </span>
              </span>
            }
            className="text-white"
          />
          <p className="mt-6 text-gray-400 text-lg">
            Everything you need to know about our platform and services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <Disclosure>
                {({ open }) => (
                  <div className={`overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-300
                    ${open 
                      ? 'bg-white/10 shadow-lg' 
                      : 'bg-white/[0.03]'}`}
                  >
                    <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4">
                      <span className="text-left text-base font-medium text-white">
                        {faq.question}
                      </span>
                      <ChevronUpIcon
                        className={`h-5 w-5 text-purple-400 transition-transform duration-300
                          ${open ? '' : 'rotate-180'}`}
                      />
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-200 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-100 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-6 pb-4">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Still have questions?
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white 
            bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl
            hover:from-purple-600 hover:to-pink-600 transition-all duration-200
            shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </button>
        </motion.div>
      </Container>
    </section>
  );
}