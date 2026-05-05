import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - PBK Booking",
  description: "Panel kontrol untuk manajemen booking lapangan perumahan.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      {children}
    </div>
  );
}
