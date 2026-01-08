// src/api/projetos.api.js
import api from "./api";

export async function pegarProjetos(turmaId) {
  const response = await api.get(`/projetos/turmas/${turmaId}`);
  return response.data;
}

export async function pegarProjetosUser() {
  const response = await api.get(`/projetos/turmas/`);
  return response.data;
}

export async function pegarProjeto(id) {
  const response = await api.get(`/projetos/${id}`);
  return response.data;
}

// export async function pegarProjetoPorIdPublico(id) {
//   const response = await api.get(`/projetos/id-publico/${id}`);
//   return response.data;
// }

export async function apagarProjeto(id) {
  const response = await api.delete(`/projetos/${id}`);
  return response.data;
}


export async function criarProjeto(dadosProjeto){
  const formData = new FormData();

  formData.append("disciplina", dadosProjeto.disciplina);
  formData.append("turma", dadosProjeto.turma);
  formData.append("questoes", JSON.stringify(dadosProjeto.questoes));
  formData.append("qtdProvas", dadosProjeto.qtdProvas);
  formData.append("qtdQuestoes", dadosProjeto.qtdQuestoes);
  
  formData.append("temas", JSON.stringify(dadosProjeto.aulas));
  if (dadosProjeto.material) {
    formData.append("pdfBuffer", dadosProjeto.material); 
  }

  const response = await api.post(`/projetos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export async function editarProjeto(idProjeto, dadosProjeto){
  const formData = new FormData();
  formData.append("disciplina", dadosProjeto.disciplina);
  formData.append("turma", dadosProjeto.turma);
  formData.append("questoes", JSON.stringify(dadosProjeto.questoes));
  formData.append("qtdProvas", dadosProjeto.qtdProvas);
  formData.append("qtdQuestoes", dadosProjeto.qtdQuestoes);
  
  formData.append("temas", JSON.stringify(dadosProjeto.aulas));
    
  if (dadosProjeto.material) {
    formData.append("pdfBuffer", dadosProjeto.material); 
  }

  const response = await api.put(`/projetos/${idProjeto}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};