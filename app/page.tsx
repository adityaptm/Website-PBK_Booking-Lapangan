'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, ShieldCheck, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface Booking {
  id: string;
  full_name: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
}

export default function Home() {
  const [schedules, setSchedules] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();

    // Database connection and real-time listeners
    const channel = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => fetchSchedules()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchSchedules() {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, full_name, booking_date, start_time, end_time, status')
      .eq('status', 'approved')
      .order('booking_date', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      console.error("Supabase Error:", error);
    }

    if (data) {
      console.log("Fetched Schedules:", data);
      setSchedules(data);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="py-24 px-6 bg-neutral-950" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Kenapa Memilih <span className="text-accent">Kami?</span></h2>
            <p className="text-gray-400">Kami memberikan solusi terbaik untuk manajemen jadwal lapangan Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Calendar className="text-accent" size={32} />,
                title: "Booking Mudah",
                desc: "Proses cepat dan simpel melalui website kami."
              },
              {
                icon: <ShieldCheck className="text-accent" size={32} />,
                title: "Konfirmasi Selfie",
                desc: "Cukup selfie untuk konfirmasi bermain."
              },
              {
                icon: <Clock className="text-accent" size={32} />,
                title: "Real-time Update",
                desc: "Cek ketersediaan lapangan secara langsung."
              },
              {
                icon: <Users className="text-accent" size={32} />,
                title: "Komunitas",
                desc: "Bergabung dengan ribuan pemain lainnya."
              }
            ].map((feature, i) => (
              <div key={i} className="glass p-8 rounded-3xl transition-transform hover:-translate-y-2 group">
                <div className="mb-6 p-4 bg-accent/10 w-fit rounded-2xl group-hover:bg-accent/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Display */}
      <section id="schedule" className="py-24 px-6">
        <div className="max-w-7xl mx-auto glass p-8 md:p-16 rounded-[40px] border-accent/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-4 uppercase tracking-widest">
              Live Updates
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Jadwal <span className="gradient-text">Lapangan</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Berikut adalah daftar warga yang sudah terjadwal untuk menggunakan lapangan hari ini dan mendatang.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="flex flex-col items-center py-20 gap-4">
                <Loader2 className="animate-spin text-accent" size={40} />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Menyelaraskan Jadwal...</p>
              </div>
            ) : schedules.length === 0 ? (
              <div className="p-16 border-2 border-dashed border-white/5 rounded-[32px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="text-gray-600" size={32} />
                </div>
                <p className="text-xl font-bold text-gray-500 mb-2">Belum Ada Jadwal</p>
                <p className="text-gray-600 text-sm max-w-xs">Semua slot masih tersedia. Silakan lakukan booking sekarang!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {schedules.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass p-6 rounded-3xl border-white/5 relative group overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                          <Users size={24} />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-black text-accent uppercase tracking-tighter">
                          Confirmed
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 line-clamp-1">{item.full_name}</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-400">
                          <Calendar size={16} className="text-accent" />
                          <span className="text-sm font-semibold">{item.booking_date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Clock size={16} className="text-accent" />
                          <span className="text-sm font-semibold">{item.start_time} - {item.end_time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/book" 
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl text-sm font-bold transition-all"
            >
              Mau Main Juga? <span className="text-accent">Booking Di Sini</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="Logo" fill sizes="32px" className="object-cover" />
            </div>
            <span className="font-bold tracking-tight">BUKIT <span className="text-accent">KEMUNING</span></span>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-gray-500 text-sm">© 2026 PBK Booking System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
