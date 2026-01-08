import { useState, useContext } from "react";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from "@/contexts/AuthContext";

export default function CriarConta() {
  const { loginWitthGoogle, criarConta } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState("");

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validarSenha(senha) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(senha);
  }

  function validar() {
    const novosErros = {};

    if (!validarEmail(form.email)) {
      novosErros.email = "E-mail inválido";
    }

    if (!validarSenha(form.senha)) {
      novosErros.senha = "Senha inválida. Use no mínimo 8 caracteres com letras e números.";
    }

    if (form.senha !== form.confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErroGeral("");

    if (!validar()) return;

    try {
      await criarConta(form);
      navigate("/confirmar-email");
    } catch {
      setErroGeral("Erro ao criar conta");
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
          <UserPlus className="w-16 h-16 text-primary-foreground/80" />
          <h1 className="text-primary-foreground text-2xl font-bold mt-2">
            Criar Conta
          </h1>
        </div>

        {erroGeral && (
          <p className="text-red-200 text-sm text-center">{erroGeral}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 mb-1">
          <input
            name="nome"
            className="input rounded-xl p-1"
            placeholder="Nome"
            onChange={handleChange}
          />

          <input
            name="email"
            className={`input rounded-xl p-1 ${erros.email ? "border border-red-400" : ""}`}
            placeholder="E-mail"
            onChange={handleChange}
          />
          {erros.email && (
            <span className="text-red-200 text-xs">{erros.email}</span>
          )}

          <input
            type="password"
            name="senha"
            className={`input rounded-xl p-1 ${erros.senha ? "border border-red-400" : ""}`}
            placeholder="Senha"
            onChange={handleChange}
          />
          {erros.senha && (
            <span className="text-red-200 text-xs">{erros.senha}</span>
          )}

          <input
            type="password"
            name="confirmarSenha"
            className={`input rounded-xl p-1 ${erros.confirmarSenha ? "border border-red-400" : ""}`}
            placeholder="Confirmar senha"
            onChange={handleChange}
          />
          {erros.confirmarSenha && (
            <span className="text-red-200 text-xs">{erros.confirmarSenha}</span>
          )}

          <Button className="mt-4 bg-secondary rounded-xl py-4 text-lg">
            Criar Conta
          </Button>
        </form>

        <GoogleLogin
          shape="circle"
          onSuccess={handleSuccess}
          onError={() => console.log("Erro no login")}
          useOneTap
        />

        <Link
          to="/login"
          className="block text-center text-primary-foreground/80 text-sm mt-4 hover:underline"
        >
          Já tenho conta — Entrar
        </Link>
      </div>
    </div>
  );
}
