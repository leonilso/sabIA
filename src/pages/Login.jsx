import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const { login, loginWitthGoogle } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validarSenha(senha) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(senha);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("E-mail inválido.");
      return;
    }

    if (!validarSenha(senha)) {
      setErro("Senha inválida. Use no mínimo 8 caracteres com letras e números.");
      return;
    }

    try {
      await login(email, senha);
    } catch {
      setErro("E-mail ou senha incorretos.");
    }
  }

  async function handleSuccess(response) {
    try {
      await loginWitthGoogle(response);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-primary rounded-2xl p-8 w-full max-w-md shadow-sabi-lg hover:scale-[1.01] transition">
        <Link to="/">
          <ArrowLeft className="w-8 h-8 text-primary-foreground/80" />
        </Link>

        <div className="flex flex-col items-center mb-6">
          <Users className="w-16 h-16 text-primary-foreground/80" />
          <h1 className="text-primary-foreground text-2xl font-bold mt-2">
            Entrar
          </h1>
        </div>

        {erro && (
          <p className="text-red-200 text-sm text-center mb-2">
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
          <input
            type="email"
            className={`input rounded-xl p-2
              
    ${erro ? "border-red-500" : "border-border"}`}
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {erro && (
            <p className="text-red-500 text-sm mt-1">{erro}</p>
          )}

          <input
            type="password"
            className={`input rounded-xl p-2   ${erro ? "border-red-500" : "border-border"}`}
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}

          />
          {erro && (
            <p className="text-red-500 text-sm mt-1">{erro}</p>
          )}

          <Button className="mt-2 bg-secondary rounded-xl py-4 text-lg ">
            Entrar
          </Button>
        </form>

        <GoogleLogin shape="circle" onSuccess={handleSuccess} onError={() => console.log('Erro no login')} useOneTap />

        <Link
          to="/criar-conta"
          className="block text-center text-primary-foreground/80 text-sm mt-4 hover:underline"
        >
          Não tenho conta — Criar agora
        </Link>
      </div>
    </div>
  );
}
