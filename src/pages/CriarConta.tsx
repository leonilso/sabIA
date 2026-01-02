import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { criarConta } from "@/services/auth.service";
import { Link } from "react-router-dom";

export default function CriarConta() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    senha: "",
  });
  const [erro, setErro] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await criarConta(form);
      window.location.href = "/login";
    } catch {
      setErro("Erro ao criar conta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-primary rounded-2xl p-8 w-full max-w-md shadow-sabi-lg hover:scale-[1.01] transition">
        <div className="flex flex-col items-center mb-6">
          <UserPlus className="w-16 h-16 text-primary-foreground/80" />
          <h1 className="text-primary-foreground text-2xl font-bold mt-2">
            Criar Conta
          </h1>
        </div>

        {erro && <p className="text-red-200 text-sm text-center">{erro}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            name="nome"
            className="input"
            placeholder="Nome"
            onChange={handleChange}
          />
          <input
            name="endereco"
            className="input"
            placeholder="Endereço"
            onChange={handleChange}
          />
          <input
            name="cpf"
            className="input"
            placeholder="CPF"
            onChange={handleChange}
          />
          <input
            type="password"
            name="senha"
            className="input"
            placeholder="Senha"
            onChange={handleChange}
          />

          <Button className="mt-4 bg-secondary rounded-xl py-6 text-lg">
            Criar Conta
          </Button>
        </form>

        <Link
          to="/login"
          className="block text-center text-primary-foreground/80 text-sm mt-6 hover:underline"
        >
          Já tenho conta — Entrar
        </Link>
      </div>
    </div>
  );
}
