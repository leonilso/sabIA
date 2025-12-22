import { DashboardLayout } from "@/components/layout";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Aluno {
  id: number;
  nome: string;
  email: string;
  turma: string;
}

const alunosData: Aluno[] = [
  { id: 1, nome: "João Silva", email: "joao@escola.com", turma: "6 B" },
  { id: 2, nome: "Maria Santos", email: "maria@escola.com", turma: "6 B" },
  { id: 3, nome: "Pedro Oliveira", email: "pedro@escola.com", turma: "7 A" },
  { id: 4, nome: "Ana Costa", email: "ana@escola.com", turma: "8 A" },
];

export default function Alunos() {
  const [novoAluno, setNovoAluno] = useState({ nome: "", email: "" });
  const [alunos, setAlunos] = useState<Aluno[]>(alunosData);

  return (
    <DashboardLayout title="Gerenciar Alunos">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Form para adicionar aluno */}
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-primary">Aluno</label>
            <Input
              placeholder="Nome do aluno"
              value={novoAluno.nome}
              onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}
              className="bg-secondary text-secondary-foreground border-0 rounded-full px-6 font-semibold"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-primary">E-mail</label>
            <Input
              placeholder="email@escola.com"
              value={novoAluno.email}
              onChange={(e) => setNovoAluno({ ...novoAluno, email: e.target.value })}
              className="bg-secondary text-secondary-foreground border-0 rounded-full px-6 font-semibold"
            />
          </div>
        </div>

        <Button
          variant="outline"
          className="border-secondary text-secondary border-2 rounded-full px-6 gap-2 hover:bg-secondary hover:text-secondary-foreground"
        >
          <Plus className="w-4 h-4" />
          Adicionar aluno
        </Button>

        {/* Lista de alunos */}
        <div className="bg-muted/50 rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-4 mb-4 px-4">
            <span className="font-display font-bold text-primary italic">Nome</span>
            <span className="font-display font-bold text-primary italic">E-mail</span>
            <span className="font-display font-bold text-primary italic">Turma</span>
          </div>
          
          <div className="space-y-3">
            {alunos.map((aluno) => (
              <div key={aluno.id} className="grid grid-cols-3 gap-4">
                <div className="bg-primary rounded-full py-3 px-6 text-primary-foreground font-medium text-center">
                  {aluno.nome}
                </div>
                <div className="bg-primary rounded-full py-3 px-6 text-primary-foreground font-medium text-center">
                  {aluno.email}
                </div>
                <div className="bg-primary rounded-full py-3 px-6 text-primary-foreground font-medium text-center flex items-center justify-between">
                  <span className="flex-1">{aluno.turma}</span>
                  <button className="hover:scale-110 transition-transform">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
