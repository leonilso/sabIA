import api from "./api";

export async function gerarProvas(idProjeto) {
  const response = await api.get(`/provas/gerar/${idProjeto}`, {
    responseType: "blob",
  });

  return response.data; // Blob (PDF)
}
