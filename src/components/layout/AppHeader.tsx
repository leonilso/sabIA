import { User, Settings, LogOut, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
// Importações do Dropdown Menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"; // Verifique se o caminho no seu projeto é este
import { AuthContext } from "../../contexts/AuthContext";
import sabia from "../../assets/sabiaNoEscritaBranco.png"

export function AppHeader() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
  };

  return (
<header className="w-full h-20 bg-sidebar flex items-center justify-between px-6 rounded-b-3xl">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-primary p-2 rounded-full flex items-center justify-center">
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
      </div>

      <div className="flex-1 px-8 max-w-2xl">
        <p className="text-center text-sm italic text-sidebar-foreground/90 font-medium line-clamp-2">
          SabI.A crie!
        </p>
      </div>

      <div className="flex items-center gap-3 mr-4">
        {/* MENU SUSPENSO DO USUÁRIO */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent rounded-full">
              <User className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => navigate("/perfil")}>
              <User className="mr-2 h-4 w-4" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            
            {/* <DropdownMenuItem onClick={() => navigate("/configuracoes")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem> */}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair do sistema</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <div className="w-px h-8 bg-sidebar-foreground/30" />
        
        <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
          <Settings className="w-6 h-6" />
        </Button> */}
      </div>
    </header>
  );
}