import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { enviarProjetoAluno, pegarAlunosPorTurma } from "../services/alunos.service"
import { pegarProjetoPorIdPublico } from "../services/projetos.service";



const tiposQuestao = [
  { id: "descritiva", label: "Descritiva", descricao: "Questões de escrever" },
  { id: "objetiva", label: "Objetiva", descricao: "Questões de marcar X"},
  { id: "associativa", label: "Associativa", descricao: "Questões de associar" },
];

const MIN_POR_TIPO = {
  descritiva: 1,
  objetiva: 1,
  associativa: 1,
};




const temas = [
  "Free Fire",
  "Minecraft",
  "Roblox",
  "Fortnite",
  "Among Us",
  "Brawl Stars",
  "Clash Royale",
  "Clash of Clans",
  "FIFA",
  "EA Sports FC",
  "GTA V",
  "GTA Online",
  "Call of Duty",
  "Valorant",
  "League of Legends",
  "Pokémon",
  "Pokémon GO",
  "Super Mario",
  "Sonic",
  "Zelda",
  "Five Nights at Freddy's",
  "Undertale",
  "Cuphead",
  "Stumble Guys",
  "Subway Surfers",
  "Temple Run",
  "Geometry Dash",
  "Plants vs Zombies",
  "Angry Birds",
  "Candy Crush",
  "TikTok",
  "YouTube",
  "YouTubers",
  "Streamers",
  "Twitch",
  "Memes da internet",
  "Desafios da internet",
  "Redes sociais",
  "Filtros do Instagram",
  "Stories",
  "Harry Potter",
  "Star Wars",
  "Marvel",
  "Homem-Aranha",
  "Vingadores",
  "Batman",
  "Super-heróis",
  "Dragon Ball",
  "Naruto",
  "One Piece",
  "Demon Slayer",
  "Attack on Titan",
  "Jujutsu Kaisen",
  "Animes",
  "K-pop",
  "Pop internacional",
  "Rap",
  "Trap",
  "Funk",
  "Música eletrônica",
  "Beatbox",
  "Dança",
  "Coreografias do TikTok",
  "Skate",
  "Futebol",
  "Basquete",
  "E-sports",
  "Campeonatos online",
  "Celulares",
  "Tecnologia",
  "Inteligência Artificial",
  "Robôs",
  "Games online",
  "Realidade virtual",
  "Realidade aumentada",
  "Avatares",
  "Personagens virtuais",
  "Quadrinhos",
  "Mangás",
  "Histórias em quadrinhos",
  "Criadores de conteúdo",
  "Customização de personagens",
  "Mods de jogos",
  "Mapas criativos",
  "Construções no Minecraft",
  "Skins",
  "Pets virtuais"
];

const vazio = {
	"ID": 0,
	"ID_usuario": 0,
	"disciplina": "",
	"ID_turma": 0,
	"QTD_questoes": 0,
	"QTD_provas": 0,
	"public_id": "",
	"status": "",
	"data_limite": null,
	"nome_turma": "",
	"temas": []
}



export default function FormularioAluno() {

  const { idProjeto } = useParams();
  const navigate = useNavigate();
  const [questoes, setQuestoes] = useState({ descritiva: 2, objetiva: 2, associativa: 2 });
  const [temaSelecionado, setTemaSelecionado] = useState("");
  const [adaptacoes, setAdaptacoes] = useState({ visao: false, dicas: false });
  const [nomeSelecionado, setNomeSelecionado] = useState("");
  const [openTema, setOpenTema] = useState(false);
  const [camposValidados, setCamposValidados] = useState(false);
  const [totalQuestoes, setQuantidadeQuestoes] = useState(0);
  const [alunos, setAlunos] = useState([]);
  const [projeto, setProjeto] = useState(vazio);


  useEffect(() => {
    const camposValidos = (totalQuestoes == projeto.QTD_questoes && nomeSelecionado && temaSelecionado);
    setCamposValidados(camposValidos);
  }, [totalQuestoes, nomeSelecionado, temaSelecionado ]);

  useEffect( () => {
      async function carregar() {
        try {
          const alunosApi = await pegarAlunosPorTurma(idProjeto);
          setAlunos(alunosApi);
        } catch (err) {
          console.error("Erro ao carregar alunos", err);
        } 
      }
      carregar();
  }, [idProjeto])

  useEffect( () => {
      async function carregar() {
        try {
          const projetoApi = await pegarProjetoPorIdPublico(idProjeto);
          console.log(projetoApi)
          setProjeto(projetoApi);
        } catch (err) {
          console.error("Erro ao carregar projeto", err);
        } 
      }
      carregar();
  }, [idProjeto])

  useEffect(() => {
    const totQuestoes = Object.values(questoes).reduce(
    (acc, v) => acc + v,
    0
  );
    setQuantidadeQuestoes(totQuestoes);
  }, [questoes]);

  const handleSubmit = async () => {
    try {

        const dados = {
          id: nomeSelecionado, 
          questoes, 
          tema: temaSelecionado, 
          adaptacoes
        }
        const resultado = await enviarProjetoAluno(idProjeto, dados);
        navigate("/aluno/obrigado");
    } catch (error) {
      console.error("Erro ao configurar informações:", error);
      alert("Falha ao carregar informações.");
    }
  };

  

  // const totalQuestoes = Object.values(questoes).reduce(
  //   (acc, v) => acc + v,
  //   0
  // );



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

      <div className="text-center w-full max-w-md mb-6">
        <h2 className="font-display text-2xl font-bold text-primary leading-tight">
          Personalize sua atividade
        </h2>
      </div>

      <div className="w-full max-w-md space-y-4">

        {/* Informações */}
        <div className="bg-primary rounded-2xl p-4">
          <h4 className="font-display text-lg font-bold text-primary-foreground mb-3 text-center">
            Atividade da disciplina de {projeto.disciplina}
            <br />
            Turma {projeto.nome_turma}
          </h4>
          <div className="mt-1 flex flex-wrap gap-1">
            {projeto.temas && (Array.isArray(projeto.temas) ? projeto.temas : [projeto.temas]).map((tema, index) => (
              <span 
                key={index} 
                className="bg-white/10 text-[9px] text-primary-foreground/80 px-2 py-0.5 rounded-md border border-white/5"
              >
                #{tema}
              </span>
            ))}
          </div>
        </div>
        {/* Nome */}
        <div className="bg-primary rounded-2xl p-4">
          <h3 className="font-display text-lg font-bold text-primary-foreground mb-3 text-center">
            Selecione o seu nome
          </h3>
          <Select value={nomeSelecionado} onValueChange={setNomeSelecionado}>
            <SelectTrigger className="bg-accent/30 text-primary-foreground border-0 rounded-lg">
              <SelectValue placeholder="nome" />
            </SelectTrigger>
            <SelectContent>
              {alunos.map((aluno) => (
                <SelectItem key={aluno.ID_aluno} value={aluno.ID_aluno}>{aluno.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Configurar questões */}

        <div className="bg-primary rounded-2xl p-4">
          <h3 className="font-display text-lg font-bold text-primary-foreground mb-3 text-center">
            Você precisa distribuir {projeto.QTD_questoes} questões
          </h3>
          <div className="flex flex-row gap-2 justify-center">
            {tiposQuestao.map((tipo) => {
              const valor = questoes[tipo.id];
              const min = MIN_POR_TIPO[tipo.id];

              const podeAdicionar = totalQuestoes < projeto.QTD_questoes;
              const podeRemover = valor > min;

              return (
                <div key={tipo.id} className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-8 w-8"
                      disabled={!podeRemover}
                      onClick={() =>
                        setQuestoes({
                          ...questoes,
                          [tipo.id]: valor - 1,
                        })
                      }
                    >
                      −
                    </Button>

                    <span className="w-6 text-center font-bold text-primary">
                      {valor}
                    </span>

                    <Button
                      size="icon"
                      className="rounded-full h-8 w-8"
                      disabled={!podeAdicionar}
                      onClick={() =>
                        setQuestoes({
                          ...questoes,
                          [tipo.id]: valor + 1,
                        })
                      }
                    >
                      +
                    </Button>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium cursor-help">
                          {tipo.label}
                        </span>
                      </TooltipTrigger>

                      <TooltipContent>
                        {tipo.descricao}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {tipo.label}
                  </span> */}
                </div>
              );
            })}
          </div>
        </div>


        {/* Tema */}
        <div className="bg-primary rounded-2xl p-4">
          <h3 className="font-display text-lg font-bold text-primary-foreground mb-3 text-center">
            Escolha o tema para a atividade
          </h3>

          <Popover open={openTema} onOpenChange={setOpenTema}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-accent/30 text-primary-foreground border-0 rounded-lg"
              >
                {temaSelecionado || "Escolha um tema..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[--radix-popover-trigger-width] bg-primary bg-accent/30 p-0">
              <Command>
                <CommandInput placeholder="Pesquisar tema..." />
                <CommandEmpty>Nenhum tema encontrado.</CommandEmpty>

                <CommandGroup className="max-h-40 overflow-y-auto">
                  {temas.map((tema) => (
                    <CommandItem
                      key={tema}
                      value={tema}
                      onSelect={(value) => {
                        setTemaSelecionado(value);
                        setOpenTema(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          temaSelecionado === tema ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {tema}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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
          disabled={!camposValidados}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 font-bold text-lg"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
