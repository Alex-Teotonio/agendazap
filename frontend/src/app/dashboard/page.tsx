'use client'
// pages/Dashboard.tsx
import { useState } from "react";
import { Sidebar, SidebarItem } from "@/components/ui/sidebar";
import { TopBar } from "@/components/ui/topbar";
import { Home, Users, Calendar, Settings, Zap, RotateCw } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)}>
        <SidebarItem
          icon={<Home size={20} />}
          label="Dashboard"
          href="/dashboard"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Users size={20} />}
          label="Pacientes"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Calendar size={20} />}
          label="Eventos"
          href="/eventos/novo"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          label="Configuração"
          collapsed={collapsed}
        />
        <SidebarItem icon={<Zap size={20}/>} label="Google Calendar" collapsed={collapsed} />
        <SidebarItem icon={<RotateCw size={20}/>} label="Confirmações 2d" collapsed={collapsed} />
        <SidebarItem icon={<RotateCw size={20}/>} label="Suporte" collapsed={collapsed} />
      </Sidebar>

      <div className="flex-1 flex flex-col bg-gray-50">
        <TopBar>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-green-600">WhatsApp: Conectado</span>
            <span className="text-sm text-red-600">Google: Pendente</span>
            <Avatar />
          </div>
        </TopBar>

        {/* resto igual */}
      </div>
    </div>
  );
}