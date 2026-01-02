import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, BookOpen, FolderKanban, GraduationCap, Settings } from "lucide-react";

const menuItems = [
  { icon: Users, label: "Turmas", path: "/turmas" },
  { icon: BookOpen, label: "Material Complementar", path: "/materiais" },
  { icon: FolderKanban, label: "Meus Projetos", path: "/projetos" },
  // { icon: GraduationCap, label: "Alunos", path: "/alunos" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-36 min-h-screen bg-sidebar flex flex-col items-center py-6 rounded-r-3xl shadow-lg">
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
    </aside>
  );
}
