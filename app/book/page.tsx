import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
import { ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function BookPage() {
  return (
    <main className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-4 uppercase tracking-wider">
              <ShieldCheck size={14} /> Verifikasi Diperlukan
            </div>
            <h1 className="text-4xl font-bold mb-4">Formulir <span className="gradient-text">Booking Lapangan</span></h1>
            <p className="text-gray-400">
              Semua warga berhak main! Mohon isi data di bawah ini. Foto selfie diperlukan agar admin tahu siapa yang sedang di lapangan.
            </p>
          </div>

          <BookingForm />

          <div className="mt-12 glass p-6 rounded-3xl border-white/5">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center text-xs">!</span>
              Ketentuan Booking
            </h3>
            <ul className="text-sm text-gray-500 space-y-2 list-disc ml-5">
              <li>Semua warga perumahan berhak menggunakan lapangan.</li>
              <li>Satu orang/keluarga diharapkan memesan maksimal 1 slot per hari agar adil.</li>
              <li>Booking dilakukan agar tidak terjadi bentrok jadwal.</li>
              <li>Mohon menjaga kebersihan lapangan setelah digunakan.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
