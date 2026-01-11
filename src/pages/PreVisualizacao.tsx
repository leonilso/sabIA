import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Edit, Download, Crown, ArrowLeft } from "lucide-react";
import { pegarProjeto } from "../services/projetos.service";
import { gerarProvas, pegarProvas, infoUser } from "../services/impressao.service";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const vazio = {
  ID_usuario: null,
  disciplina: "",
  ID_turma: 0,
  QTD_questoes: 0,
  QTD_provas: 0,
  ID: null,
  status: "",
  data_limite: null,
  nome_turma: "",
  temas: [],
};

export default function PreVisualizacao() {
  const { user } = useContext(AuthContext);
  const { idProjeto } = useParams();
  const [imprimirGabarito, setImprimirGabarito] = useState(false);
  const [projeto, setProjeto] = useState(vazio);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [provasRestantes, setProvasRestantes] = useState(0)
  const [statusAssinatura, setStatusAssinatura] = useState(false);
  const [zoom, setZoom] = useState(70);


  useEffect(() => {
    async function carregar() {
      try {
        const projetoApi = await pegarProjeto(idProjeto);
        setProjeto(projetoApi);
        setStatusAssinatura(user.statusAssinatura)
      } catch (err) {
        console.error("Erro ao carregar projeto", err);
      }
    }
    carregar();
  }, [idProjeto]);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 640) { // Mobile (sm)
      setZoom(30);
    } else if (window.innerWidth < 1024) { // Tablet (md/lg)
      setZoom(60);
    } else { // Desktop
      setZoom(65);
    }
  };

  handleResize(); // Executa ao montar
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  useEffect(() => {
    async function carregar() {
      try {
        if (projeto?.ID) {
          const pdfBlob = await pegarProvas(projeto?.ID, imprimirGabarito);

          const urlApi = window.URL.createObjectURL(
            new Blob([pdfBlob], { type: "application/pdf" })
          );
          setUrl(urlApi)
        }
      } catch (err) {
        console.error("Erro ao carregar pdf", err);
      }
    }
    carregar();
  }, [projeto.ID, imprimirGabarito]);


  useEffect(() => {
    async function carregar() {
      try {
        const response = await infoUser();
        setProvasRestantes(response.provas_restantes);
      } catch (err) {
        console.error("Erro ao carregar pdf", err);
      }
    }
    carregar();
  }, [url]);

  async function handleGerarPdf() {
    try {
      if (provasRestantes > 0 || statusAssinatura) {
        setLoadingPdf(true);
        const pdfBlob = await gerarProvas(projeto?.ID, imprimirGabarito);

        const urlApi = window.URL.createObjectURL(
          new Blob([pdfBlob], { type: "application/pdf" })
        );
        setProvasRestantes(provasRestantes - 1)
        setUrl(urlApi)
      } else {
        alert("Suas provas acabaram")
      }


      // window.open(url); // abre o PDF em nova aba
    } catch (err) {
      console.error("Erro ao gerar PDF", err);
    } finally {
      setLoadingPdf(false);
    }
  }
  async function handleEditar() {
    navigate(`/projeto/${projeto?.ID}/editar-provas`)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full">


        {/* Preview */}
        <div className="flex-[2] bg-card rounded-3xl p-6 shadow-card">
          <div className="flex flex-row gap-4">

            <Link to="/projetos">
              <ArrowLeft className="w-8 h-8 text-primary" />
            </Link>
            <h2 className="font-display text-2xl font-bold italic text-center mb-6">
              Pré-Visualização
            </h2>
          </div>

          <div className="bg-muted rounded-xl p-4 aspect-[3/4] flex items-center justify-center mb-6">
            {url ? (
              <iframe
                src={`${url}#zoom=${zoom}`}
                title="Preview PDF"
                className="w-full h-full rounded-lg bg-white"
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm text-xs">
                <div className="border-b pb-2 mb-4">
                  <h3 className="font-bold">PROVA</h3>
                  <p>Disciplina: {projeto?.disciplina}</p>
                  <p>Turma: {projeto?.nome_turma}</p>
                  <p>Questões: {projeto?.QTD_questoes}</p>
                  <p>Temas: {projeto?.temas.join(", ")}</p>
                </div>
                <p className="italic text-muted-foreground">
                  Pré-visualização simbólica. O conteúdo real será gerado no PDF.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 rounded-full h-12"
              disabled={!url}
              onClick={handleEditar}
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>

            <Button
              onClick={handleGerarPdf}
              disabled={loadingPdf}
              className="flex-1 rounded-full h-12"
            >
              <Download className="w-4 h-4 mr-2" />
              {loadingPdf ? "Gerando..." : "Gerar PDF"}
            </Button>
          </div>
        </div>

        {/* Resumo */}
        <div className="flex-1 bg-primary rounded-3xl p-6 text-primary-foreground flex flex-col">
          <div className="space-y-3 mb-6">
            <h3 className="font-display text-xl font-bold">
              Nº de Provas: <span>{projeto?.QTD_provas}</span>
            </h3>
            <p className="text-lg">
              Disciplina: <strong>{projeto?.disciplina}</strong>
            </p>
            <p className="text-lg">
              Turma: <strong>{projeto?.nome_turma}</strong>
            </p>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>

                <div className="flex items-center gap-3 mb-6">
                  <Checkbox
                    id="gabarito"
                    checked={imprimirGabarito}
                    disabled={!statusAssinatura}
                    className="bg-primary-foreground border border-input data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
                    onCheckedChange={(checked) => setImprimirGabarito(!!checked)}
                  />
                  <label htmlFor="gabarito" className="text-sm">
                    Imprimir gabarito
                  </label>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                Recurso exclusivo para premium
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>



          {statusAssinatura === false ?
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <FileText className="w-5 h-5" />
                <span className="text-sm italic">
                  Restam apenas {provasRestantes} provas grátis
                </span>
              </div>

              <Link to="/planos">
                <Button

                  className="w-full rounded-full h-12 font-bold bg-sidebar">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium
                </Button>
              </Link>
            </div>
            : <></>}
        </div>

      </div>
    </div>
  );
}
