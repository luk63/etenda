import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigation } from '../../constants/navigation';
import { ConnectButton } from '../ConnectButton';

export function DesktopMenu() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    const offset = 80; // Height of fixed header
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
    <div className="flex items-center">
      <div className="flex items-center space-x-1">
        {navigation.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive 
                  ? 'text-white bg-white/10 shadow-lg shadow-purple-500/10' 
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 mx-4 bg-gradient-to-r from-purple-400 to-pink-400"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.a>
          );
        })}
      </div>
      <div className="ml-6">
        <ConnectButton />
      </div>
    </div>
  );
}