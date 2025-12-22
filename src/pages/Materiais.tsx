import { DashboardLayout } from "@/components/layout";
import { Plus, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const materiais = [
  { id: 1, nome: "Material", tipo: "PDF" },
  { id: 2, nome: "nome projeto", tipo: "PDF" },
  { id: 3, nome: "nome projeto", tipo: "PDF" },
  { id: 4, nome: "nome projeto", tipo: "PDF" },
  { id: 5, nome: "nome projeto", tipo: "PDF" },
  { id: 6, nome: "nome projeto", tipo: "PDF" },
];

export default function Materiais() {
  return (
    <DashboardLayout title="Turma 6 B - Meus Projetos">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {materiais.map((material) => (
          <div
            key={material.id}
            className="group bg-primary rounded-2xl p-4 aspect-square flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-sabi-lg cursor-pointer"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-primary-foreground font-semibold text-xs truncate flex-1">
                {material.nome}
              </span>
              <FileText className="w-4 h-4 text-secondary ml-1" />
            </div>
          </div>
        ))}
      </div>

      <Button
        className="fixed bottom-8 right-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 py-6 shadow-lg gap-2"
      >
        <Plus className="w-5 h-5" />
        Novo Material
      </Button>
    </DashboardLayout>
  );
}
