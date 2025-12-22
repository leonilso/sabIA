import { useState } from "react";
import { Plus, X, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const disciplinas = ["Matemática", "Português", "História", "Ciências", "Geografia", "Inglês"];
const turmasOptions = ["6º ano", "7º ano", "8º ano", "9º ano", "1º ano EM", "2º ano EM"];

export default function ConfigAtividades() {
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState("");
  const [turma, setTurma] = useState("");
  const [aulas, setAulas] = useState<string[]>([]);
  const [novaAula, setNovaAula] = useState("");

  const adicionarAula = () => {
    if (novaAula.trim()) {
      setAulas([...aulas, novaAula.trim()]);
      setNovaAula("");
    }
  };

  const removerAula = (index: number) => {
    setAulas(aulas.filter((_, i) => i !== index));
  };

  const gerarLink = () => {
    navigate("/aluno/formulario/temp123");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
          <span className="text-3xl">🦜</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-primary">SabI.A</h1>
          <p className="text-xs text-muted-foreground">Atividades & Provas com I.A</p>
        </div>
      </div>

      <h2 className="font-display text-3xl font-bold text-primary mb-8 text-center">
        Configurações<br />Das Atividades
      </h2>

      <div className="w-full max-w-md space-y-4">
        {/* Disciplina */}
        <Select value={disciplina} onValueChange={setDisciplina}>
          <SelectTrigger className="bg-primary text-primary-foreground border-0 rounded-full h-12">
            <SelectValue placeholder="Disciplina: Selecione" />
          </SelectTrigger>
          <SelectContent>
            {disciplinas.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Turma */}
        <Select value={turma} onValueChange={setTurma}>
          <SelectTrigger className="bg-primary text-primary-foreground border-0 rounded-full h-12">
            <SelectValue placeholder="Turma: Selecione" />
          </SelectTrigger>
          <SelectContent>
            {turmasOptions.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Adicionar Aulas */}
        <div className="flex gap-2">
          <Input
            placeholder="Nome da aula/tema"
            value={novaAula}
            onChange={(e) => setNovaAula(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && adicionarAula()}
            className="flex-1 bg-secondary text-secondary-foreground border-0 rounded-full"
          />
          <Button
            onClick={adicionarAula}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Aulas
          </Button>
        </div>

        {/* Lista de Aulas */}
        <div className="border-2 border-sabi-green rounded-2xl p-4 min-h-[120px]">
          {aulas.length === 0 ? (
            <p className="text-muted-foreground text-center text-sm">
              Nenhuma aula adicionada
            </p>
          ) : (
            <div className="space-y-2">
              {aulas.map((aula, index) => (
                <div
                  key={index}
                  className="bg-primary text-primary-foreground rounded-full py-2 px-4 flex items-center justify-between"
                >
                  <span className="font-medium">{aula}</span>
                  <button
                    onClick={() => removerAula(index)}
                    className="hover:scale-110 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Material Complementar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Adicionar Material Complementar</span>
            <FileText className="w-5 h-5 text-destructive" />
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>

        {/* Gerar Link */}
        <Button
          onClick={gerarLink}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 font-bold text-lg"
        >
          Gerar Link Alunos
        </Button>
      </div>
    </div>
  );
}
