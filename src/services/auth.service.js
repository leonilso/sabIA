import api from "./api";

export async function deleteUser() {
  await api.delete("/usuarios/me");
}

export async function setarNovaSenha(senha) {
  await api.put("/usuarios/me/senha", {senha});
}


export async function login(cpf, senha) {
  const { data } = await api.post("/auth/login", { cpf, senha });
  localStorage.setItem("token", data.token);
  return data.usuario;
}


export async function criarConta(dados) {
  await api.post("/usuarios", dados);
}

export async function verificarEmail(token) {
  await api.post("/verify-email", {token: token});
}

