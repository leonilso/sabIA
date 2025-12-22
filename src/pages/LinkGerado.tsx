import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export default function LinkGerado() {
  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center py-8 px-4">
      <h2 className="font-display text-xl font-bold text-primary text-center mb-8">
        Link de Personalização de Atividades<br />para o Aluno
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="w-48 h-48 bg-muted flex items-center justify-center">
          <QrCode className="w-32 h-32 text-foreground" />
        </div>
      </div>

      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 h-12 font-bold">
        Finalizar
      </Button>
    </div>
  );
}
