import { useState, useEffect} from "react";
import { Plus, X, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { pegarTurmas } from "../services/turmas.service";
import { useRef } from "react";
import { criarProjeto, editarProjeto, pegarProjeto } from "../services/projetos.service";
import { set } from "date-fns";

const disciplinas = ["Matemática", "Português", "História", "Ciências", "Geografia", "Inglês"];
const turmasOptions = ["6º ano", "7º ano", "8º ano", "9º ano", "1º ano EM", "2º ano EM"];

export default function ConfigAtividades() {
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState("");
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




  useEffect(() => {
    const camposValidos = disciplina && turma && aulas.length > 0 && qtdQuestoes > 0 && qtdProvas;
    setCamposValidados(camposValidos);
  }, [disciplina,turma, aulas, qtdQuestoes, qtdProvas ]);


  useEffect(() => {
    async function carregarTudo() {
      try {
        setLoading(true);
        // Carrega turmas
        const dataTurmas = await pegarTurmas();
        setTurmas(dataTurmas)
        if (dataTurmas.length > 0 && !turma) {
          const turmaSelecionada = dataTurmas.find((t) => t.ID_turma == idTurma);
          if(turmaSelecionada){
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
    if (file) {
      setMaterial(file); // Salva o arquivo (PDF/Doc) no estado
      console.log("Arquivo selecionado:", file.name);
    }
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
        qtdProvas,
        qtdQuestoes,
        material
      };
      let resultado;
      if(!isEdit){
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
      alert("Falha ao gerar o projeto. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const cancelar = () => {
    if(turma){
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

  if (loading) return <div>Carregando...</div>;
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
            {turmas.map((t) => (
              <SelectItem key={t.ID_turma} value={t.ID_turma.toString()}>{t.nome_turma}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-0 w-full">
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
          {isEdit? "Salvar" : "Criar"}
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
