"use client";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 h-full border-r p-4">
      <ul className="space-y-2">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/config">Configurações</Link></li>
        <li><Link href="/logout">Sair</Link></li>
      </ul>
    </aside>
  );
}
