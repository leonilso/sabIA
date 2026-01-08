import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";

const permaneciaPagina = 10
export default function SucessoPagamento() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(permaneciaPagina);
  const { refreshUser } = useContext(AuthContext);

  useEffect(() => {
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    const redirect = setTimeout(() => {
      handleAuth()
      navigate("/turmas")

    
    }, permaneciaPagina * 1000);
    return () => { clearInterval(timer); clearTimeout(redirect); };
  }, [navigate]);


  const handleAuth = async () => {
    await refreshUser();
  }


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-sidebar py-4 px-6 flex items-center justify-between rounded-b-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">🦜</div>
          <div>
            <h1 className="font-display font-bold text-xl text-sidebar-foreground">SabI.A</h1>
            <p className="text-[10px] text-sidebar-foreground/80">Pagamento Confirmado</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-3xl p-8 shadow-card text-center border border-border/50">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Tudo pronto!</h2>
          <p className="text-muted-foreground mb-8">Sua solicitação de assinatura foi recebida com sucesso. Logo após a confirmação do pagamento seu plano será ativado.</p>
          
          <Button onClick={handleAuth} className="w-full bg-primary hover:bg-primary/90 rounded-full h-12" asChild>
            <Link to="/turmas">Ir para o Dashboard agora <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>

          <p className="mt-6 text-sm text-muted-foreground">
            Redirecionando automaticamente em <span className="font-bold text-primary font-mono">{countdown}s</span>
          </p>
        </div>
      </main>
    </div>
  );
}