import { DashboardLayout } from "@/components/layout";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for classes
const turmas = [
  { id: 1, nome: "Turma 6 B", alunos: 25 },
  { id: 2, nome: "Turma 1 D", alunos: 30 },
  { id: 3, nome: "Turma 7 A", alunos: 28 },
  { id: 4, nome: "Turma 6 C", alunos: 22 },
  { id: 5, nome: "Turma 8 A", alunos: 27 },
  { id: 6, nome: "Turma 2 B", alunos: 24 },
];

export default function Turmas() {
  return (
    <DashboardLayout title="Minhas Turmas">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {turmas.map((turma) => (
          <Link
            key={turma.id}
            to={`/turmas/${turma.id}/materias`}
            className="group"
          >
            <div className="bg-primary rounded-2xl p-6 aspect-[4/3] flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-sabi-lg cursor-pointer">
              <div className="w-full flex-1 flex items-center justify-center">
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-16 h-16 text-primary-foreground/80" />
                </div>
              </div>
              <span className="text-primary-foreground font-bold text-lg mt-4">
                {turma.nome}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Button
        className="fixed bottom-8 right-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 py-6 shadow-lg gap-2"
      >
        <Plus className="w-5 h-5" />
        Nova Turma
      </Button>
    </DashboardLayout>
  );
}
