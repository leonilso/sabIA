import { DashboardLayout } from "@/components/layout";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { pegarTurmas } from "../services/turmas.service";
import { apagarTurma } from "@/services/turmas.service";
import { useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";

// Mock data for classes
// const turmas = [
//   { id: 1, nome: "Turma 6 B", alunos: 25 },
//   { id: 2, nome: "Turma 1 D", alunos: 30 },
//   { id: 3, nome: "Turma 7 A", alunos: 28 },
//   { id: 4, nome: "Turma 6 C", alunos: 22 },
//   { id: 5, nome: "Turma 8 A", alunos: 27 },
//   { id: 6, nome: "Turma 2 B", alunos: 24 },
// ];

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    async function carregar() {
      try {
        const data = await pegarTurmas();
        setTurmas(data);
      } catch (err) {
        console.error("Erro ao carregar turmas", err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const removerTurma = async (id) => {
    try {
      await apagarTurma(id);
      setTurmas((prevTurmas) => prevTurmas.filter(turma => turma.ID_turma !== id));
      console.log("Turma apagada");
      
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  return (
    <DashboardLayout title="Minhas Turmas">
      <div className="relative min-h-[calc(100vh-200px)] pb-20">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!turmas.length ? (<p className="w-max">Parece que você não tem nenhuma turma que tal criar uma agora</p> ): (
        <>
        {turmas.map((turma) => (
        <Link
          key={turma.ID_turma}
          to={`/projetos/turma/${turma.ID_turma}/`}
          className="group relative"
        >
          <div className="bg-primary rounded-2xl p-6 aspect-[4/3] flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-sabi-lg cursor-pointer relative m-1">
            
            {/* Link de editar */}
            <Link
              to={`/turmas/${turma.ID_turma}/editar`}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-14 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground"
            >

              <Pencil className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Impede que o clique no botão abra a turma
                if (confirm("Deseja realmente excluir esta turma? Essa ação irá apagar todos os projetos associados a ela e não poderá ser desfeita")) {
                  removerTurma(turma.ID_turma);
                }
              }}
              // Mudamos 'right-3' para 'right-14' para ele ficar ao lado do editar
              className="absolute top-3 right-3 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground"
              title="Apagar Turma"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="w-full flex-1 flex items-center justify-center">
              <Users className="w-16 h-16 text-primary-foreground/80" />
            </div>

            <span className="text-primary-foreground font-bold text-lg mt-4">
              {turma.nome_turma}
            </span>
          </div>
        </Link>

        ))}
        </>)
        }
      
      </div> 
    

      <Link
        to={`/turmas/criar`}
        className="absolute bottom-2 right-2 flex bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 py-2 shadow-lg gap-2"
      >
        <Plus className="w-5 h-5" />
        Nova Turma
      </Link>
      </div>
    </DashboardLayout>
  );
}
