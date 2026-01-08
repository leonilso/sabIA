import api from "./api";

export async function pegarProvas(id) {
  const response = await api.get(`/projetos/${id}/provas`);
  return response.data;
}

export async function salvarProvas(id, provas) {
  const response = await api.put(`/projetos/${id}/provas`, {provas});
  return response.data;
}