import React from 'react';
import { motion } from 'framer-motion';
import { navigation } from '../../constants/navigation';

export function MobileMenu() {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element?.getBoundingClientRect().top ?? 0;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-1">
      {navigation.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.href}
          onClick={(e) => scrollToSection(e, item.href)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white 
            rounded-lg hover:bg-white/[0.05] transition-all duration-200"
        >
          {item.name}
        </motion.a>
      ))}
    </div>
  );
}