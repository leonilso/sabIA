import api from "./api";

export async function pegarTurmas() {
  const response = await api.get("/turmas");
  return response.data;
}

export async function getTurma(turmaId) {
  const response = await api.get(`/turmas/${turmaId}`);
  return response.data;
}

export async function apagarTurma(turmaId) {
  const response = await api.delete(`/turmas/${turmaId}`);
  return response.data;
}



export async function  enviarTurma( id, nome, alunos) {

    if (id) {
    const turma = {
        id: id,
        nome: nome,
        alunos: alunos
    }
    console.log(turma)
      // edição
      const { data } = await api.put(`/turmas/${turma.id}`, turma);
      return data;
    } else {
    const turma = {
        nome: nome,
        alunos: alunos
    }
      // criação
      const { data } = await api.post("/turmas", turma);
      return data;
    }
  }