import api from "./api";

export async function gerarProvas(idProjeto, imprimirGabarito) {
  const response = await api.get(`/provas/gerar/${idProjeto}`, {
    params: {
      imprimirGabarito: imprimirGabarito 
    },
    responseType: "blob",
  });

  return response.data; // Blob (PDF)
}

export async function pegarProvas(idProjeto, imprimirGabarito) {
  const response = await api.get(`/provas/pegar/${idProjeto}`, {
    params: {
      imprimirGabarito: imprimirGabarito 
    },
    responseType: "blob",
  });

  return response.data; // Blob (PDF)
}

export async function infoUser() {
  const response = await api.get(`/provas/me`);

  return response.data; // Blob (PDF)
}
