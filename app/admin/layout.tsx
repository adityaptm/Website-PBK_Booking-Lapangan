import React from "react";
import type { Metadata } from "next";

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
    <div className="min-h-screen bg-[#050505]">
      {children}
    </div>
  );
}
