import { useState, useEffect } from "react";
import { Plus, X, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { pegarTurmas } from "../services/turmas.service";
import { useRef } from "react";
import { criarProjeto, editarProjeto, pegarProjeto } from "../services/projetos.service";
import { set } from "date-fns";
import Loading from "./Loading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import sabia from "../assets/sabiaNoEscrita.png"
import AlertModal from "../components/AlertModal";

const disciplinas = [
  "Língua Portuguesa",
  "Matemática",
  "História",
  "Geografia",
  "Ciências",
  "Arte",
  "Educação Física",
  "Língua Inglesa",
  "Ensino Religioso",
  "Biologia",
  "Física",
  "Química",
  "Sociologia",
  "Filosofia",
  "Pensamento Computacional"
];
const turmasOptions = ["6º ano", "7º ano", "8º ano", "9º ano", "1º ano EM", "2º ano EM"];

const tiposQuestao = [
  { id: "descritiva", label: "Descritiva", descricao: "Questões de escrever" },
  { id: "objetiva", label: "Objetiva", descricao: "Questões de marcar X" },
  { id: "associativa", label: "Associativa", descricao: "Questões de associar" },
];


export default function ConfigAtividades() {
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState("");
  const [questoes, setQuestoes] = useState({ descritiva: 0, objetiva: 0, associativa: 0 });
  const [turma, setTurma] = useState("");
  const [aulas, setAulas] = useState([]);
  const [novaAula, setNovaAula] = useState("");
  const [qtdProvas, setQtdProvas] = useState();
  const [qtdQuestoes, setQtdQuestoes] = useState();
  const [turmas, setTurmas] = useState([]);
  const { idTurma } = useParams();
  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState(null);
  const fileInputRef = useRef(null);
  const [camposValidados, setCamposValidados] = useState(false);
  const { id } = useParams();
  const isEdit = id;
  const [totalQuestoes, setQuantidadeQuestoes] = useState(0);
  const [erroArquivo, setErroArquivo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("")



  useEffect(() => {
    const camposValidos = disciplina && turma && aulas.length > 0 && qtdQuestoes > 0 && qtdProvas;
    setCamposValidados(camposValidos);
  }, [disciplina, turma, aulas, qtdQuestoes, qtdProvas]);


  useEffect(() => {
    async function carregarTudo() {
      try {
        setLoading(true);
        // Carrega turmas
        const dataTurmas = await pegarTurmas();
        setTurmas(dataTurmas)
        if (dataTurmas.length > 0 && !turma) {
          const turmaSelecionada = dataTurmas.find((t) => t.ID_turma == idTurma);
          if (turmaSelecionada) {
            setTurma(turmaSelecionada.ID_turma.toString());
          } else {
            setTurma("")
          }
        }

        // Se for edição, carrega o projeto também
        if (isEdit) {
          const dataProj = await pegarProjeto(id);
          setDisciplina(dataProj.disciplina);
          setTurma(dataProj.ID_turma.toString());
          setQuestoes({ descritiva: dataProj.questoes_descritivas, objetiva: dataProj.questoes_objetivas, associativa: dataProj.questoes_associativas })
          setAulas(dataProj.temas || []);
          setQtdProvas(dataProj.QTD_provas); // Verifique se é QTD_provas ou qtdProvas
          setQtdQuestoes(dataProj.QTD_questoes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    carregarTudo();
  }, [id, isEdit]);


  useEffect(() => {
    const totQuestoes = Object.values(questoes).reduce(
      (acc, v) => acc + v,
      0
    );
    setQuantidadeQuestoes(totQuestoes);
  }, [questoes]);

  useEffect(() => {
    if (totalQuestoes > qtdQuestoes) {

      setQuestoes({ descritiva: 0, objetiva: 0, associativa: 0 });
    }
  }, [qtdQuestoes]);


  // useEffect(() => {
  //   async function carregar() {
  //     try {
  //       const data = await pegarTurmas();
  //       setTurmas(data);
  //     } catch (err) {
  //       console.error("Erro ao carregar turmas", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   carregar();
  // }, []);

  // useEffect(() => {
  //   if (!isEdit) return;

  //   async function carregarProjeto() {
  //     try {
  //       const data = await pegarProjeto(id);
  //         setDisciplina(data.Disciplina);
  //         setTurma(data.ID_turma);
  //         setAulas(data.temas);
  //         setQtdProvas(data.qtdProvas);
  //         setQtdQuestoes(data.qtdQuestoes);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   carregarProjeto();
  // }, [id, isEdit, turmas]);



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErroArquivo(""); // Reseta o erro ao trocar de arquivo

    if (file && file.size > 10 * 1024 * 1024) {
      setErroArquivo("O arquivo excede o limite de 10MB.");
      e.target.value = "";
      return;
    }

    setMaterial(file);
  };

  const adicionarAula = () => {
    if (novaAula.trim()) {
      setAulas([...aulas, novaAula.trim()]);
      setNovaAula("");
    }
  };

  const removerAula = (index) => {
    setAulas(aulas.filter((_, i) => i !== index));
  };

  const gerarLink = async () => {
    try {
      setLoading(true);

      const dadosParaEnviar = {
        disciplina,
        turma,
        aulas,
        questoes,
        qtdProvas,
        qtdQuestoes,
        material
      };
      let resultado;
      if (!isEdit) {
        resultado = await criarProjeto(dadosParaEnviar);
        navigate(`/projetos/turma/${resultado.ID_turma}/projeto/${resultado.ID}/link-gerado`, {
          state: { resultado }
        });
      } else {
        resultado = await editarProjeto(id, dadosParaEnviar);
        navigate(`/projetos/turma/${resultado.ID_turma}`)
      }
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      setMensagemModal("Falha ao gerar o projeto. Verifique os dados e tente novamente.");
      setIsModalOpen(true);
      // alert("Falha ao gerar o projeto. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const cancelar = () => {
    if (turma) {
      navigate(`/projetos/turma/${turma}`)
    } else {
      navigate(`/projetos`)
    }

  };

  const removerMaterial = () => {
    setMaterial(null);
    // Isso "reseta" o input para que ele aceite o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (loading) return <Loading />
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      {isModalOpen && (
        <AlertModal 
          message={mensagemModal}
          cancelText="ok"
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <img
              src={sabia}
              alt="logo"
              className="overflow-hidden rounded-full"
            />       
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
            {turmas.map((t) => (
              <SelectItem key={t.ID_turma} value={t.ID_turma.toString()}>{t.nome_turma}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Input para Quantidade de Provas */}
          <input
            type="number"
            placeholder="Provas"
            min="1"
            value={qtdProvas}
            className="bg-primary text-primary-foreground border-0 rounded-full h-12 px-4 focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-primary-foreground/70"
            onChange={(e) => setQtdProvas(e.target.value)}
          />

          {/* Input para Quantidade de Questões */}
          <input
            type="number"
            placeholder="Questões"
            min="1"
            value={qtdQuestoes}
            className="bg-primary text-primary-foreground border-0 rounded-full h-12 px-4 focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-primary-foreground/70"
            onChange={(e) => setQtdQuestoes(e.target.value)}
          />
        </div>

        {qtdQuestoes > 0 && (
          <div className="bg-primary rounded-2xl p-4">
            <h3 className="font-display text-lg font-bold text-primary-foreground mb-2 text-center">
              Distribua o mínimo de cada tipo de questão
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">      {tiposQuestao.map((tipo) => {
              const valor = questoes[tipo.id] || 0;
              const min = 0;

              const podeAdicionar = totalQuestoes < qtdQuestoes;
              const podeRemover = valor > min;

              // Função para lidar com a digitação direta
              const handleInputChange = (e) => {
                const novoValor = parseInt(e.target.value) || 0;
                const diferenca = novoValor - valor;

                // Valida se a alteração manual respeita o limite total e o mínimo
                if (totalQuestoes + diferenca <= qtdQuestoes && novoValor >= 0) {
                  setQuestoes({
                    ...questoes,
                    [tipo.id]: novoValor,
                  });
                }
              };

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

                    <input
                      type="text"
                      placeholder={tipo.label}
                      value={valor}
                      onChange={handleInputChange}
                      className="w-10 text-center font-bold text-primary bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />

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
                        <p>{tipo.descricao}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              );
            })}
            </div>
          </div>
        )}

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
        {erroArquivo && <p className="text-destructive text-xs mt-1">{erroArquivo}</p>}
        {/* Material Complementar */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                {material ? "Alterar Material Complementar" : "Adicionar Material Complementar"}
                <br />
                <span>Máximo 10 Mb</span>
              </span>
              <FileText className={`w-5 h-5 "text-primary"`} />
            </div>


            <Button
              onClick={() => fileInputRef.current.click()} // Aciona o input escondido
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full gap-2"
            >
              <Plus className="w-4 h-4" />
              {material ? "Trocar" : "Adicionar"}
            </Button>
          </div>

          {/* Feedback visual do arquivo selecionado */}
          {material && (
            <div className="flex items-center justify-between bg-secondary/30 p-2 px-4 rounded-full border border-dashed border-primary">
              <span className="text-xs font-medium truncate max-w-[200px]">{material.name}</span>
              <button onClick={() => removerMaterial()} className="text-destructive hover:scale-110">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Adicionar Material Complementar</span>
            <FileText className="w-5 h-5 text-destructive" />
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div> */}

        {/* Gerar Link */}
        <Button
          disabled={!camposValidados || loading}
          onClick={gerarLink}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 font-bold text-lg"
        >
          {isEdit ? "Salvar" : "Criar"}
        </Button>
        <Button
          onClick={cancelar}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 font-bold text-lg mt-2"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
