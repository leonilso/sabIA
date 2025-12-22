import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";

const tiposQuestao = [
  { id: "descritiva", label: "Descritiva" },
  { id: "dissertativa", label: "Dissertativa" },
  { id: "associativo", label: "Associativo" },
];

const temas = [
  "Revolução Francesa",
  "Segunda Guerra Mundial",
  "Era Vargas",
  "Idade Média",
  "Renascimento",
  "Descobrimento do Brasil",
];

export default function FormularioAluno() {
  const { linkId } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [questoes, setQuestoes] = useState({ descritiva: 5, dissertativa: 5, associativo: 5 });
  const [temaSelecionado, setTemaSelecionado] = useState("");
  const [adaptacoes, setAdaptacoes] = useState({ visao: false, dicas: false });

  const handleSubmit = () => {
    // Here would go the API call
    console.log({ email, questoes, temaSelecionado, adaptacoes });
    navigate("/aluno/obrigado");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <span className="text-2xl">🦜</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-primary">SabI.A</h1>
          <p className="text-[10px] text-muted-foreground">Atividades & Provas com I.A</p>
        </div>
      </div>

      <div className="text-right w-full max-w-md mb-6">
        <h2 className="font-display text-2xl font-bold text-primary leading-tight">
          Personalize<br />Sua<br />Atividade ou<br />Prova
        </h2>
      </div>

      <div className="w-full max-w-md space-y-4">
        {/* Email */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Digite seu @escola:</label>
          <Input
            type="email"
            placeholder="seu.email@escola.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary text-secondary-foreground border-0 rounded-lg h-12"
          />
        </div>

        {/* Configurar questões */}
        <div>
          <h3 className="font-display text-lg font-bold text-primary italic mb-3 text-center">
            Configure as questões
          </h3>
          <div className="flex justify-center gap-4">
            {tiposQuestao.map((tipo) => (
              <div key={tipo.id} className="flex flex-col items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={20}
                  value={questoes[tipo.id as keyof typeof questoes]}
                  onChange={(e) => setQuestoes({ ...questoes, [tipo.id]: parseInt(e.target.value) || 0 })}
                  className="w-16 h-10 text-center bg-muted border-0 rounded-full"
                />
                <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  {tipo.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tema */}
        <div className="bg-primary rounded-2xl p-4">
          <h3 className="font-display text-lg font-bold text-primary-foreground mb-3 text-center">
            Escolha o Tema para Prova
          </h3>
          <Select value={temaSelecionado} onValueChange={setTemaSelecionado}>
            <SelectTrigger className="bg-accent/30 text-primary-foreground border-0 rounded-lg">
              <SelectValue placeholder="temas..." />
            </SelectTrigger>
            <SelectContent>
              {temas.map((tema) => (
                <SelectItem key={tema} value={tema}>{tema}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Adaptações */}
        <div className="bg-primary rounded-2xl p-4">
          <h3 className="font-display text-lg font-bold text-primary-foreground mb-3 text-center">
            Adaptações
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="visao"
                checked={adaptacoes.visao}
                onCheckedChange={(checked) => setAdaptacoes({ ...adaptacoes, visao: !!checked })}
                className="border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
              />
              <label htmlFor="visao" className="text-primary-foreground text-sm">
                Dificuldade de Visão
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="dicas"
                checked={adaptacoes.dicas}
                onCheckedChange={(checked) => setAdaptacoes({ ...adaptacoes, dicas: !!checked })}
                className="border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
              />
              <label htmlFor="dicas" className="text-primary-foreground text-sm">
                Dicas
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 font-bold text-lg"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
