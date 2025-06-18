import { Sidebar } from "@/components/custom/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p>Bem-vindo ao Agendazap!</p>
      </main>
    </div>
  );
}
