'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminNavbarProps {
  onLogout?: () => void;
  isLoggedIn?: boolean;
}

export default function AdminNavbar({ onLogout, isLoggedIn }: AdminNavbarProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    onLogout?.();
    setShowLogoutConfirm(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl md:rounded-3xl border border-white/5 px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center overflow-hidden border border-accent/30 transition-transform group-hover:scale-110">
            <Image src="/logo.png" alt="Logo" fill sizes="40px" priority className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white leading-none text-sm md:text-base">
              BUKIT <span className="text-accent">KEMUNING</span>
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Admin Panel</span>
          </div>
        </Link>

        {isLoggedIn && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest">
              Online
            </div>
            <button 
              onClick={handleLogoutClick}
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm font-medium p-2 hover:bg-white/5 rounded-xl"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass p-8 rounded-[32px] max-w-sm w-full border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                <LogOut size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Konfirmasi Keluar</h3>
              <p className="text-gray-400 text-sm mb-8">Apakah Anda yakin ingin keluar dari Dashboard Admin?</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-2xl font-bold transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={confirmLogout}
                  className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-bold text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  Ya, Keluar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
