import { User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="h-20 bg-sidebar flex items-center justify-between px-6 rounded-b-3xl shadow-md">
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

      <div className="flex-1 px-8 max-w-2xl">
        <p className="text-center text-sm italic text-sidebar-foreground/90 font-medium">
          "Você inspira. Eles escolhem. SabI.A transforma cada prova em uma descoberta 
          personalizada — onde o professor guia e o aluno cria."
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
          <User className="w-6 h-6" />
        </Button>
        <div className="w-px h-8 bg-sidebar-foreground/30" />
        <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
          <Settings className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
