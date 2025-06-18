// components/ui/Sidebar.tsx
import { FC, ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  children: ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ collapsed = false, onToggle, children }) => (
  <aside className={`h-screen bg-white shadow-md ${collapsed ? 'w-20' : 'w-64'} transition-width duration-200`}>
    <div className="p-4 flex justify-between items-center">
      <span className="font-bold text-lg">Agendazap</span>
      <button onClick={onToggle} className="p-1 rounded hover:bg-gray-100">
        {collapsed ? <ChevronRight size={20}/> : <ChevronLeft size={20}/>}
      </button>
    </div>
    <nav className="mt-6">{children}</nav>
  </aside>
);

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href?: string;
  collapsed?: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = ({ icon, label, href = "#", collapsed = false }) => (
  <Link
    href={href}
    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
  >
    <div className="text-xl">{icon}</div>
    {!collapsed && <span className="ml-3 text-sm font-medium">{label}</span>}
  </Link>
);
