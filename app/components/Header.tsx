'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reserve', href: '/reserve' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <motion.div
              className="text-2xl font-bold text-gold-gradient font-display"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              COCO<span className="text-gold">BONGO</span>
            </motion.div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-white hover:text-gold transition-smooth rounded-lg hover:bg-white hover:bg-opacity-5"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/reserve"
              className="px-6 py-2 bg-gradient-to-r from-gold to-gold-light text-dark-bg font-semibold rounded-lg transition-smooth hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Reserve Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gold hover:text-gold-light"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-white hover:text-gold transition-smooth rounded-lg hover:bg-white hover:bg-opacity-5"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/reserve"
              className="block px-4 py-2 bg-gradient-to-r from-gold to-gold-light text-dark-bg font-semibold rounded-lg transition-smooth text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Reserve Now
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
