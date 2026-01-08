import { DashboardLayout } from "@/components/layout";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getTurma, enviarTurma} from "@/services/turmas.service";
import { useParams, useNavigate } from "react-router-dom";

export default function Alunos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id;

  const [nomeTurma, setNomeTurma] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({ nome: "", email: "" });

  useEffect(() => {
    if (!isEdit) return;

    async function carregarTurma() {
      try {
        const data = await getTurma(id);
        setNomeTurma(data.turma.nome_turma);
        setAlunos(data.alunos);
      } catch (err) {
        console.error(err);
      }
    }

    carregarTurma();
  }, [id, isEdit]);

  // const adicionarAluno = () => {
  //   if (!novoAluno.nome || !novoAluno.email) return;
  //   setAlunos((prev) => [...prev, {...novoAluno}]);
  //   setNovoAluno({ nome: "", email: "" });
  // };

  // const removerAluno = (alunoId) => {
  //   setAlunos((prev) => prev.filter((a) => a.id !== alunoId));
  // };

  const adicionarAluno = () => {
    if (!novoAluno.nome || !novoAluno.email) return;
    
    // Geramos um ID temporário para alunos novos para que o React possa renderizar a lista
    const alunoComId = { 
      ...novoAluno, 
      ID_aluno: Date.now(), // ID temporário apenas para a interface
      isNew: true 
    };
    
    setAlunos((prev) => [...prev, alunoComId]);
    setNovoAluno({ nome: "", email: "" });
  };

  const removerAluno = (alunoId) => {
    // Ajustado para ID_aluno conforme seu banco
    setAlunos((prev) => prev.filter((a) => a.ID_aluno !== alunoId));
  };

  const salvarTurma = async () => {
    try {
      await enviarTurma(id, nomeTurma, alunos);
      navigate("/turmas");
    } catch (err) {
      console.error(err);
    }
  };
  const cancelar = () => {
      navigate("/turmas");
  };




  

  return (
    <DashboardLayout title={isEdit ? "Editar Turma" : "Criar Turma"}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Nome da turma */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-semibold text-primary">Nome da turma</label>
          <Input
            placeholder="Ex: 6 B"
            value={nomeTurma || ""}
            onChange={(e) => setNomeTurma(e.target.value)}
            className="bg-secondary text-secondary-foreground border-0 rounded-md px-6 font-semibold"
          />
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          <label className="text-sm font-semibold text-primary">Inserir alunos</label>
          <div className="flex gap-4">
            <Input
              placeholder="Nome do aluno"
              value={novoAluno.nome || ""}
              onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}
            />
            <Input
              placeholder="email@escola.com"
              value={novoAluno.email || ""}
              onChange={(e) => setNovoAluno({ ...novoAluno, email: e.target.value })}
            />
            <Button onClick={adicionarAluno}>
              <Plus className="w-4 h-4" />
              Adicionar
            </Button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Lista de alunos */}
          <label className="text-sm font-semibold text-primary">Alunos</label>
          <div className=" space-y-2">
            {alunos.map((aluno) => (
              <div key={aluno.ID_aluno} className="bg-background rounded-md flex gap-2 p-2 m-1">
                <span className="flex-1">{aluno.nome}</span>
                <span className="flex-1">{aluno.email}</span>
                <button onClick={() => removerAluno(aluno.ID_aluno)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-8"> 
          <Button onClick={salvarTurma} className="mt-6">
            {isEdit ? "Salvar Alterações" : "Criar Turma"}
          </Button>
          <Button onClick={cancelar} className="mt-6">
            Cancelar
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
