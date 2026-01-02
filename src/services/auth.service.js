import api from "./api";

export async function login(cpf, senha) {
  const { data } = await api.post("/auth/login", { cpf, senha });
  localStorage.setItem("token", data.token);
  return data.usuario;
}

export async function criarConta(dados) {
  await api.post("/usuarios", dados);
}
