import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ObrigadoAluno() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-primary/20 shadow-lg p-6 space-y-6 text-center">
        
        {/* Ícone */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-foreground">
          Obrigado pela participação!
        </h1>

        {/* Mensagem */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          Suas respostas foram enviadas com sucesso.
          <br />
          Agora é só aguardar a correção.
        </p>

        {/* Aviso */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-primary font-medium">
            Você já pode fechar esta página com segurança.
          </p>
        </div>

        {/* Rodapé */}
        <p className="text-xs text-muted-foreground">
          Sistema de Avaliação • Envio confirmado
        </p>
      </div>
    </div>
  );
}
