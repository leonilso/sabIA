// import { Link, useLocation } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { Users, BookOpen, FolderKanban, GraduationCap, Settings, Newspaper, FileChartPie } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Crown } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const menuItems = [
//   { icon: Users, label: "Turmas", path: "/turmas" },
//   { icon: FolderKanban, label: "Meus Projetos", path: "/projetos" },
//   { icon: Newspaper, label: "Minhas Provas", path: "/provas" },
//   // { icon: FileChartPie, label: "Meus materiais", path: "/materiais" }
//   // { icon: GraduationCap, label: "Alunos", path: "/alunos" },
// ];

// export function AppSidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   return (
//     <aside className="hidden md:flex w-36 h-[calc(100vh-5rem)] bg-sidebar flex-col items-center justify-between py-6 rounded-r-3xl">
//     <nav className="flex flex-col gap-2 w-full px-2">
//       {menuItems.map((item) => {
//         const isActive = location.pathname === item.path ||
//           (item.path !== "/" && location.pathname.startsWith(item.path));

//         return (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={cn(
//               "flex flex-col items-center justify-center py-4 px-2 rounded-xl text-center transition-all duration-200",
//               "text-sidebar-foreground hover:bg-sidebar-accent",
//               isActive && "bg-sidebar-accent font-bold"
//             )}
//           >
//             <item.icon className="w-5 h-5 mb-1" />
//             <span className="text-xs font-semibold leading-tight">{item.label}</span>
//           </Link>
//         );
//       })}
//     </nav>
//       <Button
//         onClick={() => { navigate("/planos") }}

//         className="rounded-full h-12 font-bold m-2">
//         <Crown className="w-4 h-4 mr-2" />
//         Premium
//       </Button>
//     </aside>
//   );
// }

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, FolderKanban, Newspaper, Crown, Menu, Focus} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { icon: Users, label: "Turmas", path: "/turmas" },
  { icon: FolderKanban, label: "Meus Projetos", path: "/projetos" },
  { icon: Newspaper, label: "Minhas Provas", path: "/provas" },
  { icon: Focus, label: "Corrigir provas", path: "/corrigir" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Componente de conteúdo do menu (reutilizável)
  const MenuContent = () => (
    <div className="flex flex-col h-full justify-between py-6">
      <nav className="flex flex-col gap-2 w-full px-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)} // Fecha o drawer ao clicar no mobile
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
        onClick={() => { 
          navigate("/planos");
          setOpen(false);
        }}
        className="fixed bottom-4 left-1 rounded-full h-12 font-bold m-2 bg-primary hover:bg-sidebar-accent"
      >
        <Crown className="w-4 h-4 mr-2" />
        Premium
      </Button>
    </div>
  );

  return (
    <>
      {/* VERSÃO DESKTOP: Visível apenas em telas 'md' para cima */}
      <aside className="hidden md:flex w-36 h-[calc(100vh-5rem)] bg-sidebar flex-col items-center justify-between py-6 rounded-r-3xl">
        <MenuContent />
      </aside>

      {/* VERSÃO MOBILE: Botão Flutuante e Drawer */}
      <div className="md:hidden fixed bottom-12 left-4 z-40">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              size="icon" 
              className="w-12 h-12 rounded-full bg-sidebar hover:bg-orange-600 shadow-lg"
            >
              <Menu className="w-6 h-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-36 p-0 bg-sidebar border-none">
            <MenuContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}