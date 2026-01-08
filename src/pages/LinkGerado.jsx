import { Button } from "@/components/ui/button";
import { Check, Copy, QrCode as QrIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Importação do QR Code
import { useState } from "react";
import sabia from "../assets/sabia.png"

export default function LinkGerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copiado, setCopiado] = useState(false);
  
  const { resultado } = location.state || {};

  // Se não houver dados (ex: F5 na página), redireciona ou mostra erro
  if (!resultado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate("/projetos")}>Voltar aos Projetos</Button>
      </div>
    );
  }

  // Construção da URL real para o aluno
  const urlAlunos = `${window.location.origin}/formulario-aluno/${resultado.ID}`;

  const copiarLink = () => {
    navigator.clipboard.writeText(urlAlunos);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary">
            Link Gerado com Sucesso!
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            {resultado.disciplina} • Turma {resultado.nome_turma}
          </p>
        </div>

        {/* Container do QR Code */}
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-4 mx-auto w-fit">
          <QRCodeCanvas 
            value={urlAlunos} 
            size={200}
            level={"H"} // Alta tolerância a erros
            includeMargin={true}
            imageSettings={{
                src: sabia, // Opcional: logo no centro do QR
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
          />
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Aponte a câmera para testar
          </p>
        </div>

        {/* Input de link para copiar */}
        <div className="bg-background border rounded-2xl p-2 flex items-center gap-2">
          <input 
            readOnly 
            value={urlAlunos}
            className="bg-transparent flex-1 text-xs px-2 outline-none text-muted-foreground truncate"
          />
          <Button 
            size="sm" 
            variant={copiado ? "success" : "secondary"}
            onClick={copiarLink}
            className="rounded-xl transition-all"
          >
            {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="ml-2">{copiado ? "Copiado" : "Copiar"}</span>
          </Button>
        </div>

        <div className="pt-4">
          <Button 
            onClick={() => navigate(`/impressao/${resultado.ID}`)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 h-12 font-bold w-full"
          >
            Abrir página de Impressão
          </Button>
        </div>
        <div className="pt-4">
          <Button 
            onClick={() => navigate(`/projetos/turma/${resultado.ID_turma}`)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 h-12 font-bold w-full"
          >
            Finalizar e Sair
          </Button>
        </div>

      </div>
    </div>
  );
}