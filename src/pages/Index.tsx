import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Users, Crown } from "lucide-react";
import sabia from "../assets/sabiaNoEscritaBranco.png.png"

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-sidebar py-4 px-6 flex items-center justify-between rounded-b-3xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <img
              src={sabia}
              alt="logo"
              className="overflow-hidden rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-sidebar-foreground">SabI.A</span>
            <span className="text-[10px] text-sidebar-foreground/80 -mt-1">Atividades & Provas com I.A</span>
          </div>
        </Link>
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link to="/turmas">Acessar Dashboard</Link>
        </Button>
      </header>

      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-5xl font-bold text-foreground mb-6 leading-tight">
            Transforme suas aulas em <span className="text-primary">provas personalizadas</span> com IA
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Você inspira. Eles escolhem. SabI.A transforma cada prova em uma descoberta personalizada.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8" asChild>
            <Link to="/turmas">
              Começar Agora <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-3xl p-8 text-center shadow-card">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-display text-xl font-bold mb-3">Geração com IA</h4>
            <p className="text-muted-foreground">Provas personalizadas baseadas nos interesses de cada aluno</p>
          </div>
          <div className="bg-card rounded-3xl p-8 text-center shadow-card">
            <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h4 className="font-display text-xl font-bold mb-3">Personalização</h4>
            <p className="text-muted-foreground">Alunos escolhem temas e adaptações para suas provas</p>
          </div>
          <div className="bg-card rounded-3xl p-8 text-center shadow-card">
            <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-display text-xl font-bold mb-3">PDF Automático</h4>
            <p className="text-muted-foreground">Gere e baixe provas prontas para impressão</p>
          </div>
        </div>
      </section>
    </div>
  );
}
