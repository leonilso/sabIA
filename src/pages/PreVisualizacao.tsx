import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Edit, Download, Crown } from "lucide-react";

export default function PreVisualizacao() {
  const [imprimirGabarito, setImprimirGabarito] = useState(false);

  // Mock data
  const provaInfo = {
    qtdProvas: 5,
    disciplina: "Matemática",
    turma: "8º ano",
    provasRestantes: 2,
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full">
        {/* Preview Card */}
        <div className="flex-[2] bg-card rounded-3xl p-6 shadow-card">
          <h2 className="font-display text-2xl font-bold text-foreground italic text-center mb-6">
            Pré-Visualização
          </h2>

          <div className="bg-muted rounded-xl p-4 aspect-[3/4] flex items-center justify-center mb-6 overflow-hidden">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
              <div className="border-b-2 border-foreground pb-2 mb-4">
                <h3 className="font-bold">PROVA 1</h3>
                <p className="text-xs text-muted-foreground">Tipo: Prova Personalizada (Aluno ID: 1)</p>
                <p className="text-xs text-muted-foreground">Temática: minecraft</p>
                <p className="text-xs text-muted-foreground">Adaptações: Inclui Dicas</p>
              </div>
              <div className="space-y-4 text-xs">
                <div>
                  <p className="font-medium">1. Steve está construindo uma casa no Minecraft...</p>
                  <div className="ml-4 space-y-1 mt-1">
                    <p>(A) 128</p>
                    <p>(B) 192</p>
                    <p>(C) 256</p>
                    <p>(D) 64</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-full h-12"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full h-12">
              <Download className="w-4 h-4 mr-2" />
              Gerar PDF
            </Button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="flex-1 bg-primary rounded-3xl p-6 text-primary-foreground flex flex-col">
          <div className="space-y-3 mb-6">
            <h3 className="font-display text-xl font-bold">
              Nº de Provas: <span>{provaInfo.qtdProvas}</span>
            </h3>
            <p className="text-lg">
              Disciplina: <strong>{provaInfo.disciplina}</strong>
            </p>
            <p className="text-lg">
              Turma: <strong>{provaInfo.turma}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Checkbox
              id="gabarito"
              checked={imprimirGabarito}
              onCheckedChange={(checked) => setImprimirGabarito(!!checked)}
              className="border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
            />
            <label htmlFor="gabarito" className="text-sm">
              Imprimir gabarito
            </label>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <FileText className="w-5 h-5" />
              <span className="text-sm italic">
                restam apenas {provaInfo.provasRestantes} provas grátis
              </span>
            </div>

            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full h-12 font-bold">
              <Crown className="w-4 h-4 mr-2" />
              Premium
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
