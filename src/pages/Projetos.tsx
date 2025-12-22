import { DashboardLayout } from "@/components/layout";
import { Plus, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

const projetos = [
  { id: 1, nome: "Atividade 6 B - História do Brasil", imagem: "🗺️" },
  { id: 2, nome: "Prova 5 C Ciências", imagem: "🔬" },
  { id: 3, nome: "Prova Auxiliar", imagem: "📄" },
  { id: 4, nome: "nome projeto", imagem: "📚" },
  { id: 5, nome: "Atividade Caça - Palavras", imagem: "🔤" },
  { id: 6, nome: "nome projeto", imagem: "📖" },
];

export default function Projetos() {
  const { turmaId, materiaId } = useParams();

  return (
    <DashboardLayout title="Turma 6 B - Meus Projetos">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetos.map((projeto) => (
          <Link
            key={projeto.id}
            to={`/projetos/${projeto.id}/config`}
            className="group"
          >
            <div className="bg-primary rounded-2xl p-4 aspect-[4/3] flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-sabi-lg cursor-pointer">
              <div className="flex-1 flex items-center justify-center text-6xl">
                {projeto.imagem}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary-foreground font-semibold text-sm truncate flex-1">
                  {projeto.nome}
                </span>
                <div className="flex gap-2 ml-2">
                  <button className="text-secondary hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="text-secondary hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Button
        className="fixed bottom-8 right-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 py-6 shadow-lg gap-2"
        asChild
      >
        <Link to="/projetos/novo/config">
          <Plus className="w-5 h-5" />
          Novo Projeto
        </Link>
      </Button>
    </DashboardLayout>
  );
}
