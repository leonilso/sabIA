import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCw } from "lucide-react";

export default function FracassoPagamento() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    const redirect = setTimeout(() => navigate("/turmas"), 5000);
    return () => { clearInterval(timer); clearTimeout(redirect); };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-sidebar py-4 px-6 flex items-center justify-between rounded-b-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">🦜</div>
          <div>
            <h1 className="font-display font-bold text-xl text-sidebar-foreground">SabI.A</h1>
            <p className="text-[10px] text-sidebar-foreground/80">Erro no Processamento</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-card rounded-3xl p-10 shadow-card text-center border border-border/50">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ops! Algo deu errado</h2>
          <p className="text-muted-foreground mb-8">Não conseguimos processar seu pagamento. Por favor, verifique os dados do cartão.</p>
          
          <div className="flex flex-col gap-3">
            <Button className="w-full bg-primary rounded-full h-12" asChild>
              <Link to="/checkout">Tentar novamente <RefreshCw className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button variant="ghost" className="w-full rounded-full" asChild>
              <Link to="/turmas">Voltar ao início</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Saindo desta tela em <span className="font-bold text-foreground font-mono">{countdown}s</span>
          </p>
        </div>
      </main>
    </div>
  );
}