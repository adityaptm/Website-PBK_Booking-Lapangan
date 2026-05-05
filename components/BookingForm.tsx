'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, Send, X, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

const FIELDS = ['Lapangan Perumahan'];

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    fieldName: FIELDS[0],
    date: '',
    startTime: '',
    endTime: '',
    phone: '',
    photo: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.photo) throw new Error('Foto wajib diupload untuk verifikasi.');

      // 1. Upload Image to Supabase Storage
      const fileExt = formData.photo.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `verifications/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('bookings')
        .upload(filePath, formData.photo);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('bookings')
        .getPublicUrl(filePath);

      // 2. Insert Data into Supabase Table
      const { error: insertError } = await (supabase
        .from('bookings')
        .insert([
          {
            full_name: formData.fullName,
            field_name: formData.fieldName,
            booking_date: formData.date,
            start_time: formData.startTime,
            end_time: formData.endTime,
            phone_number: formData.phone,
            photo_url: publicUrl,
            status: 'pending',
          },
        ] as any));

      if (insertError) throw insertError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 rounded-[40px] text-center border-accent/20"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Booking Berhasil!</h2>
        <p className="text-gray-400 mb-8">
          Data Anda telah kami terima dan sedang dalam proses verifikasi. Kami akan menghubungi Anda melalui WhatsApp.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-accent text-accent-foreground px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105"
        >
          Kembali ke Home
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass p-8 md:p-12 rounded-[40px] border-white/5 space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Nama Lengkap</label>
          <input 
            required
            type="text"
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            placeholder="Masukkan nama lengkap"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">No. WhatsApp</label>
          <input 
            required
            type="tel"
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            placeholder="0812xxxx"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {/* Field Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Pilih Lapangan</label>
          <select 
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
            value={formData.fieldName}
            onChange={e => setFormData({ ...formData, fieldName: e.target.value })}
          >
            {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Tanggal Main</label>
          <input 
            required
            type="date"
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Jam Mulai</label>
          <input 
            required
            type="time"
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            value={formData.startTime}
            onChange={e => setFormData({ ...formData, startTime: e.target.value })}
          />
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Jam Selesai</label>
          <input 
            required
            type="time"
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            value={formData.endTime}
            onChange={e => setFormData({ ...formData, endTime: e.target.value })}
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-400 ml-1">Foto Selfie</label>
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative h-64 border-2 border-dashed border-white/10 rounded-[32px] overflow-hidden flex flex-col items-center justify-center gap-4 hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer group"
        >
          {preview ? (
            <>
              <Image src={preview} alt="Preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-bold flex items-center gap-2"><Camera size={20} /> Ganti Foto</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-500 group-hover:text-accent transition-colors">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="font-bold">Klik untuk upload foto</p>
                <p className="text-sm text-gray-500">Maksimal 5MB (JPG, PNG)</p>
              </div>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm flex items-center gap-2">
          <X size={16} /> {error}
        </div>
      )}

      <button 
        disabled={loading}
        type="submit"
        className="w-full bg-accent text-accent-foreground py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
        {loading ? 'Mengirim Data...' : 'Kirim Pengajuan Booking'}
      </button>
    </motion.form>
  );
}
