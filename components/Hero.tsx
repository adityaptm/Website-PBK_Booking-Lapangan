'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-8 uppercase tracking-widest mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Official Booking System
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            BUKIT <span className="gradient-text">KEMUNING</span> SPORTS.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-lg leading-relaxed mx-auto lg:mx-0">
            Booking lapangan komplek jadi lebih tertib dan mudah. Cukup isi formulir, unggah selfie, dan amankan slot bermainmu hari ini!
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <Link 
              href="/book" 
              className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-10 py-5 rounded-[24px] font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(34,197,94,0.4)]"
            >
              Booking Sekarang <ChevronRight size={20} />
            </Link>
            <Link 
              href="#schedule" 
              className="flex items-center justify-center gap-3 glass px-10 py-5 rounded-[24px] font-black text-lg transition-all hover:bg-white/10 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Play size={14} className="fill-white" />
              </div>
              Cek Jadwal
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-60">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-accent" />
              <span className="text-sm font-bold uppercase tracking-widest">Konfirmasi Instan</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-accent" />
              <span className="text-sm font-bold uppercase tracking-widest">Cukup Selfie</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-square w-full max-w-[600px] mx-auto">
            {/* Decorative rings */}
            <div className="absolute inset-0 border-[20px] border-accent/5 rounded-[80px] animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-20 border-[1px] border-white/5 rounded-full" />
            
            <div className="relative z-10 w-full h-full glass rounded-[60px] overflow-hidden border border-white/10 p-6">
              <div className="w-full h-full bg-neutral-900 rounded-[40px] overflow-hidden relative shadow-2xl">
                 <Image src="/logo.png" alt="Logo Large" fill sizes="(max-width: 768px) 100vw, 600px" priority className="object-contain p-12 opacity-40 scale-125" />
                 
                 <div className="absolute bottom-10 left-10 right-10 glass p-8 rounded-3xl border-white/10 translate-y-0 group hover:-translate-y-2 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Live Status</div>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full w-full mb-3" />
                    <div className="h-4 bg-white/5 rounded-full w-4/5" />
                    <div className="mt-6 flex justify-between items-center">
                       <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800" />
                         ))}
                       </div>
                       <div className="text-xs font-bold text-accent">Active Now</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
