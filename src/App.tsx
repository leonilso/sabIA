import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Turmas from "./pages/Turmas";
import Materias from "./pages/Materias";
import Projetos from "./pages/Projetos";
import Alunos from "./pages/Alunos";
import Materiais from "./pages/Materiais";
import ConfigAtividades from "./pages/ConfigAtividades";
import FormularioAluno from "./pages/FormularioAluno";
import LinkGerado from "./pages/LinkGerado";
import PreVisualizacao from "./pages/PreVisualizacao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/turmas" element={<Turmas />} />
          <Route path="/turmas/:turmaId/materias" element={<Materias />} />
          <Route path="/turmas/:turmaId/materias/:materiaId/projetos" element={<Projetos />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projetos/:projetoId/config" element={<ConfigAtividades />} />
          <Route path="/projetos/novo/config" element={<ConfigAtividades />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/materiais" element={<Materiais />} />
          <Route path="/aluno/formulario/:linkId" element={<FormularioAluno />} />
          <Route path="/aluno/link/:linkId" element={<LinkGerado />} />
          <Route path="/preview" element={<PreVisualizacao />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
