'use client';

import React, { useEffect, useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import { supabase } from '@/lib/supabase';
import { Check, X, Trash2, ExternalLink, Calendar, Clock, User, Phone, Loader2, ShieldCheck, AlertCircle, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Booking {
  id: string;
  full_name: string;
  field_name: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  phone_number: string;
  photo_url: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const savedLogin = localStorage.getItem('admin_logged_in');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
      fetchBookings();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'pbkadmin' && password === 'pbkadmin') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_logged_in', 'true');
      fetchBookings();
    } else {
      setLoginError('ID atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged_in');
  };

  async function fetchBookings() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookings(data);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    if (!id) return;
    setUpdatingId(id);
    
    try {
      const { error } = await (supabase
        .from('bookings') as any)
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteBooking(id: string) {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <AdminNavbar />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 md:p-12 rounded-[40px] max-w-md w-full border-white/5"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-accent/20 relative overflow-hidden">
               <Image src="/logo.png" alt="Logo" fill sizes="80px" priority className="object-cover opacity-80" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-gray-500 text-sm">Dashboard Bukit Kemuning Sports</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">ID Admin</label>
              <input 
                type="text"
                required
                className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                placeholder="ID"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
              <input 
                type="password"
                required
                className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                {loginError}
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-accent text-accent-foreground py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_40px_rgba(34,197,94,0.3)]"
            >
              Masuk Sekarang
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505]">
      <AdminNavbar isLoggedIn={true} onLogout={handleLogout} />
      
      <div className="pt-28 md:pt-32 px-4 md:px-6 max-w-7xl mx-auto pb-20">
        {/* Stats Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-accent mb-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest">Live Management</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Dashboard <span className="gradient-text">Booking</span></h1>
          </div>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full md:w-auto">
            <div className="glass px-5 py-4 rounded-2xl border-white/5">
              <div className="text-2xl font-bold text-white">{bookings.length}</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Booking</div>
            </div>
            <div className="glass px-5 py-4 rounded-2xl border-white/5">
              <div className="text-2xl font-bold text-yellow-500">
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Perlu Review</div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Cari nama warga..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-accent/50 transition-all"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-5 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                  filterStatus === status 
                  ? 'bg-accent text-accent-foreground shadow-[0_10px_20px_rgba(34,197,94,0.2)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="relative">
              <Loader2 className="animate-spin text-accent" size={48} />
              <div className="absolute inset-0 blur-xl bg-accent/20 animate-pulse" />
            </div>
            <p className="text-gray-500 font-medium">Sinkronisasi data...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="glass p-20 rounded-[40px] text-center border-white/5">
            <AlertCircle size={48} className="mx-auto mb-4 text-gray-700" />
            <h3 className="text-xl font-bold mb-1">Data tidak ditemukan</h3>
            <p className="text-gray-500 text-sm">Coba ubah kata kunci atau filter status.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass p-5 md:p-6 rounded-[32px] border-white/5 flex flex-col md:flex-row gap-6 items-center relative group"
                >
                  {/* Status Strip */}
                  <div className={`absolute top-6 left-0 w-1 h-12 rounded-r-full ${
                    booking.status === 'approved' ? 'bg-green-500' : 
                    booking.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />

                  {/* Photo Preview */}
                  <div className="relative w-full md:w-32 aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image 
                      src={booking.photo_url} 
                      alt="Selfie" 
                      fill 
                      className="object-cover"
                    />
                    <a 
                      href={booking.photo_url} 
                      target="_blank" 
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="text-white" size={20} />
                    </a>
                  </div>

                  {/* Applicant Details */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Pemohon</p>
                        <h4 className="font-bold text-lg leading-tight truncate">{booking.full_name}</h4>
                        <a href={`https://wa.me/${booking.phone_number}`} target="_blank" className="text-sm text-accent font-medium hover:underline flex items-center gap-1 mt-1">
                          <Phone size={12} /> {booking.phone_number}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                           <Calendar size={14} />
                         </div>
                         <p className="text-sm font-semibold">{booking.booking_date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                           <Clock size={14} />
                         </div>
                         <p className="text-sm font-semibold">{booking.start_time} - {booking.end_time}</p>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                      <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          disabled={updatingId === booking.id}
                          onClick={() => updateStatus(booking.id, 'approved')}
                          className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center border border-green-500/20"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          disabled={updatingId === booking.id}
                          onClick={() => updateStatus(booking.id, 'rejected')}
                          className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-red-500/20"
                        >
                          <X size={18} />
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="w-10 h-10 rounded-xl bg-white/5 text-gray-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-white/10"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
