import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MailCheck, ArrowRight } from "lucide-react";

export default function VerificarEmail() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-sidebar py-4 px-6 flex items-center justify-between rounded-b-3xl">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-2xl">🦜</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-sidebar-foreground">SabI.A</span>
            <span className="text-[10px] text-sidebar-foreground/80 -mt-1">Atividades & Provas com I.A</span>
          </div>
        </Link>
      </div>
              <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link to="/turmas">Acessar Dashboard</Link>
        </Button>
      </header>

      <section className="flex items-center justify-center py-32 px-6">
        <div className="max-w-xl bg-card rounded-3xl p-4 shadow-card text-center mt-4">
          <MailCheck className="w-16 h-16 text-primary mx-auto mb-6" />

          <h2 className="font-display text-3xl font-bold mb-4">
            Verifique seu e-mail 📬
          </h2>

          <p className="text-muted-foreground mb-6">
            Enviamos um link de confirmação para o seu e-mail.
            <br />
            Clique no link para ativar sua conta.
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            Não encontrou o e-mail? Verifique a caixa de spam ou tente o cadastro novamente
          </p>
        </div>
      </section>
    </div>
  );
}
