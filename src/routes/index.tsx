import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Index from "../pages/Index";
import Turmas from "../pages/Turmas";
import Materias from "../pages/Materias";
import Projetos from "../pages/Projetos";
import Alunos from "../pages/Alunos";
import Materiais from "../pages/Materiais";
import ConfigAtividades from "../pages/ConfigAtividades";
import FormularioAluno from "../pages/FormularioAluno";
import LinkGerado from "../pages/LinkGerado";
import PreVisualizacao from "../pages/PreVisualizacao";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import CriarConta from "../pages/CriarConta";
import CorrigirProva from "@/pages/CorrigirProva";
import Obrigado from "../pages/Obrigado"

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Index />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/criar-conta" element={<CriarConta />} />
      <Route path="/corrigir" element={<CorrigirProva />} />

      {/* Rotas protegidas */}
      <Route
        path="/turmas"
        element={
          <PrivateRoute>
            <Turmas />
          </PrivateRoute>
        }
      />

      <Route
        path="/materias"
        element={
          <PrivateRoute>
            <Materias />
          </PrivateRoute>
        }
      />

      <Route
        path="/projetos"
        element={
          <PrivateRoute>
            <Projetos />
          </PrivateRoute>
        }
      />

        <Route
            path="/projetos/turma/:id"
            element={
            <PrivateRoute>
                <Projetos />
            </PrivateRoute>
            }
      />

      <Route
        path="turmas/:id/editar"
        element={
          <PrivateRoute>
            <Alunos />
          </PrivateRoute>
        }
      />

    <Route
        path="turmas/criar"
        element={
          <PrivateRoute>
            <Alunos />
          </PrivateRoute>
        }
      />

      <Route
        path="/materiais"
        element={
          <PrivateRoute>
            <Materiais />
          </PrivateRoute>
        }
      />

      <Route
        path="projetos/turma/:idTurma/projeto/novo/config"
        element={
          <PrivateRoute>
            <ConfigAtividades />
          </PrivateRoute>
        }
      />

      <Route
        path="projetos/turma/:idTurma/projeto/:id/config"
        element={
          <PrivateRoute>
            <ConfigAtividades />
          </PrivateRoute>
        }
      />

      <Route
        path="/formulario-aluno/:idProjeto"
        element={
          <PrivateRoute>
            <FormularioAluno />
          </PrivateRoute>
        }
      />

      <Route
        path="/projetos/turma/:idTurma/projeto/:projetoId/link-gerado"
        element={
          <PrivateRoute>
            <LinkGerado />
          </PrivateRoute>
        }
      />
      <Route
        path="/aluno/obrigado"
        element={
          <PrivateRoute>
            <Obrigado />
          </PrivateRoute>
        }
      />

      <Route
        path="/impressao/:idProjeto"
        element={
          <PrivateRoute>
            <PreVisualizacao />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
