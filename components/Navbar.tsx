'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Calendar, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4`}>
      <div className={`max-w-7xl mx-auto glass rounded-2xl md:rounded-3xl border border-white/5 transition-all duration-500 ${
        isScrolled ? 'px-4 md:px-6 py-2 shadow-2xl' : 'px-6 py-4'
      }`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center overflow-hidden border border-accent/30 transition-transform group-hover:scale-110">
              <Image src="/logo.png" alt="Logo" fill sizes="40px" priority className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white leading-none text-sm md:text-base">
                BUKIT <span className="text-accent">KEMUNING</span>
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Sports Club</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Beranda</Link>
            <Link href="#schedule" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Jadwal</Link>
            <Link href="#about" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Tentang Kami</Link>
            <Link 
              href="/book" 
              className="bg-accent text-accent-foreground px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              Booking Sekarang <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 md:hidden z-40"
          >
            <div className="glass p-6 rounded-3xl border-white/10 space-y-4 shadow-2xl">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-bold text-gray-300 hover:text-accent p-2"
              >
                Beranda
              </Link>
              <Link 
                href="#schedule" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-bold text-gray-300 hover:text-accent p-2"
              >
                Jadwal
              </Link>
              <Link 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-bold text-gray-300 hover:text-accent p-2"
              >
                Tentang Kami
              </Link>
              <Link 
                href="/book" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full bg-accent text-accent-foreground p-4 rounded-2xl font-bold text-center shadow-[0_10px_30px_rgba(34,197,94,0.3)]"
              >
                Booking Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
