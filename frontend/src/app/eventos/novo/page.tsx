"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Paciente {
  PK: string;
  SK: string;
  nome: string;
}

interface FormState {
  patientPK: string;
  patientSK: string;
  summary: string;
  location: string;
  start: string;
  end: string;
}

export default function NovoEventoPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [form, setForm] = useState<FormState>({
    patientPK: "",
    patientSK: "",
    summary: "",
    location: "",
    start: "",
    end: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const nutriId = localStorage.getItem("nutriId");
    const token = localStorage.getItem("token");
    if (!nutriId || !token) return;

    api
      .get<Paciente[]>(`/nutricionistas/${nutriId}/pacientes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setPacientes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = pacientes.find(p => p.SK === e.target.value);
    setForm(prev => ({
      ...prev,
      patientPK: selected?.PK ?? "",
      patientSK: selected?.SK ?? "",
    }));
  };

  const validate = () => {
    if (
      !form.patientPK ||
      !form.patientSK ||
      !form.summary ||
      !form.location ||
      !form.start ||
      !form.end
    ) {
      setFeedback("Preencha todos os campos.");
      return false;
    }
    if (new Date(form.end) <= new Date(form.start)) {
      setFeedback("Data/hora final deve ser após a inicial.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!validate()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setFeedback("Usuário não autenticado.");
      return;
    }

    try {
      setLoading(true);
      await api.post(
        "/events",
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setFeedback("Evento criado com sucesso!");
      setForm({
        patientPK: "",
        patientSK: "",
        summary: "",
        location: "",
        start: "",
        end: "",
      });
    } catch (err) {
      console.error(err);
      setFeedback("Erro ao criar evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Novo Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <select
          name="patientSK"
          value={form.patientSK}
          onChange={handlePatientSelect}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Selecione um paciente</option>
          {pacientes.map(p => (
            <option key={p.SK} value={p.SK}>
              {p.nome}
            </option>
          ))}
        </select>

        <Input
          type="text"
          name="summary"
          placeholder="Título"
          value={form.summary}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="location"
          placeholder="Local"
          value={form.location}
          onChange={handleChange}
          required
        />

        <Input
          type="datetime-local"
          name="start"
          value={form.start}
          onChange={handleChange}
          required
        />

        <Input
          type="datetime-local"
          name="end"
          value={form.end}
          onChange={handleChange}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Criar Evento"}
        </Button>

        {feedback && (
          <p
            className={`text-sm ${
              feedback.includes("sucesso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}
      </form>
    </div>
  );
}

