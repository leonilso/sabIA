import { DashboardLayout } from "@/components/layout";
import { Plus, Heart, FileText, List, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { pegarProjetos, pegarProjetosUser, apagarProjeto } from "../services/projetos.service";
import { pegarTurmas } from "../services/turmas.service";
import { Trash2, Printer, Link2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading"
import AlertModal from "../components/AlertModal";

// const projetos = [
//   { id: 1, nome: "Atividade 6 B - História do Brasil", imagem: "🗺️" },
//   { id: 2, nome: "Prova 5 C Ciências", imagem: "🔬" },
//   { id: 3, nome: "Prova Auxiliar", imagem: "📄" },
//   { id: 4, nome: "nome projeto", imagem: "📚" },
//   { id: 5, nome: "Atividade Caça - Palavras", imagem: "🔤" },
//   { id: 6, nome: "nome projeto", imagem: "📖" },
// ];



export default function Provas() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [turmas, setTurmas] = useState([]);
  const [turma, setTurma] = useState({nome_turma: "", ID_turma: 0});
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("")


    useEffect(() => {
      async function carregar() {
        try {
          const data = await pegarTurmas();
          if(id){
            const turmaSelecionada = data.find((t) => t.ID_turma == id);
            setTurma(turmaSelecionada);
          }
          setTurmas(data);
          
        } catch (err) {
          console.error("Erro ao carregar turmas", err);
        } finally {
          setLoading(false);
        }
      }
      carregar();
    }, []);
  

  useEffect(() => {
    async function carregar() {
      try {
        let data;
        if(id){
          data = await pegarProjetos(id);
        } 
        else {
          data = await pegarProjetosUser();
        }
        setProjetos(data);
      } catch (err) {
        console.error("Erro ao carregar projetos", err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const removerProjeto = async (id) => {
    try {
      await apagarProjeto(id);
      setProjetos((prevProjetos) => prevProjetos.filter(projeto => projeto.ID !== id));
      
    } catch (err) {
      console.error(err);
    }
  };

  const paginaLink = (projeto) => {
    let resultado = projeto;
    resultado.turma = (turmas.find((t) => t.ID_turma == projeto.ID_turma)).nome_turma
    navigate(`/impressao/${projeto.ID}`)
  }

  const handleModal = () => {
          setMensagemModal("Você deve ter no mínimo uma turma");
      setIsModalOpen(true);
  }

  if (loading) return <Loading/>
  return (
    <DashboardLayout title={id ? `Turma ${turma.nome_turma} - Minhas Provas` : `Minhas Provas`}>
            {isModalOpen && (
        <AlertModal 
          message={mensagemModal}
          cancelText="ok"
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="relative min-h-[calc(100vh-200px)] pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetos.map((projeto) => (
          <button
            key={projeto.ID} // Note o ID em maiúsculo
             onClick={() => {
                paginaLink(projeto)
              }}
            className="group"
          >
            <div className="bg-primary rounded-2xl p-4 aspect-[4/3] flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-sabi-lg cursor-pointer relative overflow-hidden">
              
              {/* Badge de Quantidade (Topo Direito) */}
              <div className="absolute top-2 left-2 bg-secondary/20 text-secondary-foreground text-[10px] px-2 py-1 rounded-full backdrop-blur-sm font-bold">
                {projeto.QTD_questoes} Questões / {projeto.QTD_provas} Provas
              </div>

              {/* Centro: Ícone/Letra Representativa */}
              <div className="flex-1 flex items-center justify-center text-6xl text-primary-foreground/20 font-display font-black mt-4">
                <Newspaper className="w-16 h-16" />
              </div>

            {/* Link de editar */}
            <Link
              to={`/projeto/${projeto.ID}/editar-provas`}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-2 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground"
            >

              <Pencil className="w-4 h-4" />
            </Link>


              

              {/* Informações Inferiores */}
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col truncate">
                    <span className="text-primary-foreground font-bold text-sm truncate">
                      {projeto.disciplina}
                    </span>
                    <span className="text-primary-foreground/70 text-[11px] font-medium">
                      Turma: {projeto.nome_turma}
                    </span>
                  </div>

                </div>
                
                <div className="mt-1 flex flex-wrap gap-1">
                  {projeto.temas && (Array.isArray(projeto.temas) ? projeto.temas : [projeto.temas]).map((tema, index) => (
                    <span 
                      key={index} 
                      className="bg-white/10 text-[9px] text-primary-foreground/80 px-2 py-0.5 rounded-md border border-white/5"
                    >
                      #{tema}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </button>
        ))}
        </div>
      {turmas.length > 0 ?
      <Button
        className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 py-6 shadow-lg gap-2"
        asChild
      >
         <Link to={`/projetos/turma/${id ? id : 0}/projeto/novo/config`}>
          <Plus className="w-5 h-5" />
          Novo Prova
        </Link>

      </Button>  : 
      <Button
        className="fixed bottom-12 right-8 h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 py-6 shadow-lg gap-2"
        onClick={(e) => {handleModal}}
        asChild
      >
         <Link to="/turmas">
          <Plus className="w-5 h-5" />
          Nova Prova
        </Link>

      </Button> 
      }
      </div>

    </DashboardLayout>
  );
}
