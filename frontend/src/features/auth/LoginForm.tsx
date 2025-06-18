// components/LoginForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, senha });
      const { token } = res.data;
      // salva no localStorage (ou cookie) para usar no Dashboard
      localStorage.setItem("token", token);
      // redireciona para a Dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erro no login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <input
        className="w-full border rounded p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">Entrar</Button>
    </form>
  );
}
