import api from "./api";

export async function enviarProjetoAluno(id, dados) {
      const response = await api.post(`/projetos/${id}/aluno`, dados);
      return response.data;
  }

export async function pegarAlunosPorTurma(id) {
      const response = await api.get(`/alunos/turma/${id}/`);
      return response.data;
  }

export async function pegarAluno(id) {
      const response = await api.get(`/alunos/${id}/`);
      return response.data;
  }