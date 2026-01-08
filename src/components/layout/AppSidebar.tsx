import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, BookOpen, FolderKanban, GraduationCap, Settings, Newspaper, FileChartPie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Users, label: "Turmas", path: "/turmas" },
  { icon: FolderKanban, label: "Meus Projetos", path: "/projetos" },
  { icon: Newspaper, label: "Minhas Provas", path: "/provas" },
  // { icon: FileChartPie, label: "Meus materiais", path: "/materiais" }
  // { icon: GraduationCap, label: "Alunos", path: "/alunos" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-36 h-[calc(100vh-5rem)] bg-sidebar flex flex-col items-center justify-between py-6 rounded-r-3xl">      
    <nav className="flex flex-col gap-2 w-full px-2">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path ||
          (item.path !== "/" && location.pathname.startsWith(item.path));

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-4 px-2 rounded-xl text-center transition-all duration-200",
              "text-sidebar-foreground hover:bg-sidebar-accent",
              isActive && "bg-sidebar-accent font-bold"
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
      <Button
        onClick={() => { navigate("/planos") }}

        className="rounded-full h-12 font-bold m-2">
        <Crown className="w-4 h-4 mr-2" />
        Premium
      </Button>
    </aside>
  );
}
