import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(cpf, senha);
    } catch {
      setErro("CPF ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-primary rounded-2xl p-8 w-full max-w-md shadow-sabi-lg hover:scale-[1.01] transition">
        <div className="flex flex-col items-center mb-6">
          <Users className="w-16 h-16 text-primary-foreground/80" />
          <h1 className="text-primary-foreground text-2xl font-bold mt-2">
            Entrar
          </h1>
        </div>

        {erro && <p className="text-red-200 text-sm text-center">{erro}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            className="input"
            placeholder="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />

          <Button className="mt-4 bg-secondary rounded-xl py-6 text-lg">
            Entrar
          </Button>
        </form>

        <Link
          to="/criar-conta"
          className="block text-center text-primary-foreground/80 text-sm mt-6 hover:underline"
        >
          Não tenho conta — Criar agora
        </Link>
      </div>
    </div>
  );
}
