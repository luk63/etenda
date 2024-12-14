import React, { useRef } from 'react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { useCases } from '../constants/useCases';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function UseCases() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="use-cases" className="relative py-24 overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />
      
      {/* Modern Grain Texture */}
      <div className="absolute inset-0 opacity-[0.015]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
        style={{ animationDuration: '8s' }} 
      />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" 
        style={{ animationDuration: '10s', animationDelay: '1s' }} 
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <SectionHeading
            label="Use Cases"
            title={
              <span>
                Perfect for
                <span className="block mt-1 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Various Industries
                </span>
              </span>
            }
            className="text-white"
          />
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Discover how our platform can transform tendering processes across different sectors
          </p>
        </motion.div>

        {/* Scroll Navigation Buttons */}
        <div className="relative px-4">
          <motion.button 
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full 
              bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm
              text-white/50 hover:text-white/90 transition-all duration-200
              shadow-lg hover:shadow-purple-500/20"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </motion.button>
          
          <motion.button 
            onClick={() => scroll('right')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full 
              bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm
              text-white/50 hover:text-white/90 transition-all duration-200
              shadow-lg hover:shadow-purple-500/20"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </motion.button>

          {/* Horizontal Scrolling Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex-shrink-0 w-[380px] snap-center"
              >
                <div className="h-full rounded-2xl bg-slate-800/50 border border-white/[0.05] 
                  backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-300
                  hover:shadow-2xl hover:shadow-purple-500/[0.1] hover:-translate-y-1 overflow-hidden"
                >
                  {/* Gradient Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/40 to-pink-500/40 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

                  {/* Icon Header */}
                  <div className="relative h-32 overflow-hidden rounded-t-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/90 to-pink-500/90" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-xl bg-white/10 backdrop-blur-sm 
                        flex items-center justify-center border border-white/20
                        group-hover:scale-110 transition-transform duration-300"
                      >
                        {useCase.icon && <useCase.icon className="h-8 w-8 text-white" />}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white group-hover:text-transparent 
                      group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 
                      group-hover:bg-clip-text transition-all duration-300 mb-3"
                    >
                      {useCase.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {useCase.description}
                    </p>

                    {/* Features List */}
                    {useCase.features && (
                      <ul className="mt-4 space-y-2">
                        {useCase.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
                            <svg className="h-4 w-4 mr-2 text-purple-400 group-hover:text-pink-400 transition-colors" 
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Learn More Button */}
                    <div className="mt-6 pt-6 border-t border-white/[0.05]">
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-sm font-medium text-purple-400 
                          hover:text-pink-400 transition-colors group/btn w-full justify-end"
                      >
                        Learn more
                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
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
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 
              rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25
              transform hover:-translate-y-0.5 backdrop-blur-sm bg-300% animate-gradient"
          >
            Explore All Use Cases
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
}