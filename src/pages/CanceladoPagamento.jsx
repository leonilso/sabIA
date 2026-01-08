import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

const permaneciaPagina = 10

export default function CanceladoPagamento() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(permaneciaPagina);

  useEffect(() => {
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    const redirect = setTimeout(() => navigate("/turmas"), permaneciaPagina * 1000);
    return () => { clearInterval(timer); clearTimeout(redirect); };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-sidebar py-4 px-6 flex items-center justify-between rounded-b-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">🦜</div>
          <h1 className="font-display font-bold text-xl text-sidebar-foreground">SabI.A</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-card rounded-3xl p-8 shadow-card text-center border border-border/50">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Compra Cancelada</h2>
          <p className="text-muted-foreground mb-8">Você interrompeu o processo de pagamento. Nenhuma cobrança foi realizada.</p>
          
          <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full h-12" asChild>
            <Link to="/turmas"><ArrowLeft className="mr-2 w-5 h-5" /> Voltar para Turmas</Link>
          </Button>

          <p className="mt-6 text-sm text-muted-foreground">
            Redirecionando em <span className="font-bold text-foreground font-mono">{countdown}s</span>
          </p>
        </div>
      </main>
    </div>
  );
}