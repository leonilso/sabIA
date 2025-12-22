import { DashboardLayout } from "@/components/layout";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

const materias = [
  { id: 1, nome: "Português" },
  { id: 2, nome: "Matemática" },
  { id: 3, nome: "História" },
  { id: 4, nome: "Ciências" },
  { id: 5, nome: "Inglês" },
  { id: 6, nome: "Geografia" },
];

export default function Materias() {
  const { turmaId } = useParams();

  return (
    <DashboardLayout title={`Turma 6 B - Matérias`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materias.map((materia) => (
          <Link
            key={materia.id}
            to={`/turmas/${turmaId}/materias/${materia.id}/projetos`}
            className="group"
          >
            <div className="bg-primary rounded-2xl p-6 aspect-[4/3] flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-sabi-lg cursor-pointer">
              <div className="w-full flex-1 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-primary-foreground/80" />
              </div>
              <span className="text-primary-foreground font-bold text-lg mt-4">
                {materia.nome}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Button
        className="fixed bottom-8 right-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 py-6 shadow-lg gap-2"
      >
        <Plus className="w-5 h-5" />
        Nova Matéria
      </Button>
    </DashboardLayout>
  );
}
