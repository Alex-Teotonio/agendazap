// pages/pacientes/index.tsx
'use client';

import { useState } from 'react';
import useSWR from 'swr';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface Paciente {
  PK: string;
  SK: string;
  telefone_whatsapp: string;
  nome: string;
  criadoEm: string;
}

const fetcher = (url: string) => api.get<Paciente[]>(url).then(res => res.data);

export default function PacientesPage() {
  const nutriId = typeof window !== 'undefined' ? localStorage.getItem('nutriId') : null;
  const { data: pacientes, mutate } = useSWR(
    () => nutriId ? `/nutricionistas/${nutriId}/pacientes` : null,
    fetcher
  );

  const [newPaciente, setNewPaciente] = useState({ nome: '', telefone_whatsapp: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPaciente({ ...newPaciente, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!nutriId) return;
    setLoading(true);
    setError(null);

    try {
      await api.post(`/nutricionistas/${nutriId}/pacientes`, newPaciente);
      setNewPaciente({ nome: '', telefone_whatsapp: '' });
      await mutate(); // revalidate
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error: string }>;
        setError(axiosErr.response?.data?.error ?? 'Erro ao cadastrar paciente');
      } else {
        setError('Erro ao cadastrar paciente');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (phone: string) => {
    if (!nutriId) return;
    try {
      await api.delete(`/nutricionistas/${nutriId}/pacientes/${phone}`);
      await mutate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pacientes</h1>

      <div className="flex space-x-2 mb-4">
        <Input
          name="nome"
          placeholder="Nome"
          value={newPaciente.nome}
          onChange={handleChange}
        />
        <Input
          name="telefone_whatsapp"
          placeholder="Telefone WhatsApp"
          value={newPaciente.telefone_whatsapp}
          onChange={handleChange}
        />
        <Button onClick={handleAdd} disabled={loading}>
          {loading ? 'Cadastrando...' : 'Adicionar'}
        </Button>
      </div>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <Separator />

      <ul className="mt-4 space-y-2">
        {pacientes?.map(p => (
          <li key={p.SK} className="flex justify-between items-center bg-white p-3 rounded shadow">
            <div>
              <p className="font-medium">{p.nome}</p>
              <p className="text-sm text-gray-600">{p.telefone_whatsapp}</p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(p.telefone_whatsapp)}>
              Remover
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
