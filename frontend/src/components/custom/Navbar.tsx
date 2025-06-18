"use client";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4 border-b">
      <div className="font-bold text-lg">Agendazap</div>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}
