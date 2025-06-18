"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import type { RegisterResponse } from "@/types/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone_whatsapp: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const { data } = await api.post<RegisterResponse>("/register", form);
      // Exibe mensagem de sucesso (opcional)
      setFeedback(data.message);

      // Limpa o formul�rio
      setForm({ nome: "", email: "", senha: "", telefone_whatsapp: "" });

      // Redireciona para a p�gina de login
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const msg = err.response?.data?.message;
        setFeedback(msg ?? "Erro de resposta do servidor.");
      } else if (err instanceof Error) {
        setFeedback(err.message);
      } else {
        setFeedback("Erro de conex�o com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">Cadastro</h1>

        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="tel"
          name="telefone_whatsapp"
          placeholder="Telefone WhatsApp (ex: +5531999999999)"
          value={form.telefone_whatsapp}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>

        {feedback && (
          <p
            className={`text-sm text-center mt-2 ${
              feedback.toLowerCase().includes("sucesso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}
      </form>
    </div>
  );
}
