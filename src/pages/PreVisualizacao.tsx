import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Edit, Download, Crown } from "lucide-react";
import { pegarProjetoPorIdPublico } from "../services/projetos.service";
import { gerarProvas } from "../services/impressao.service";
import { useParams } from "react-router-dom";

const vazio = {
  ID: 0,
  ID_usuario: 0,
  disciplina: "",
  ID_turma: 0,
  QTD_questoes: 0,
  QTD_provas: 0,
  public_id: "",
  status: "",
  data_limite: null,
  nome_turma: "",
  temas: [],
};

export default function PreVisualizacao() {
  const { idProjeto } = useParams();
  const [imprimirGabarito, setImprimirGabarito] = useState(false);
  const [projeto, setProjeto] = useState(vazio);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [url, setUrl] = useState("")


  useEffect(() => {
    async function carregar() {
      try {
        const projetoApi = await pegarProjetoPorIdPublico(idProjeto);
        setProjeto(projetoApi);
      } catch (err) {
        console.error("Erro ao carregar projeto", err);
      }
    }
    carregar();
  }, [idProjeto]);

  async function handleGerarPdf() {
    try {
      setLoadingPdf(true);
      console.log(projeto.public_id)
      const pdfBlob = await gerarProvas(projeto.public_id);

      const urlApi = window.URL.createObjectURL(
        new Blob([pdfBlob], { type: "application/pdf" })
      );
      setUrl(urlApi)

      // window.open(url); // abre o PDF em nova aba
    } catch (err) {
      console.error("Erro ao gerar PDF", err);
    } finally {
      setLoadingPdf(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full">

        {/* Preview */}
        <div className="flex-[2] bg-card rounded-3xl p-6 shadow-card">
          <h2 className="font-display text-2xl font-bold italic text-center mb-6">
            Pré-Visualização
          </h2>

          <div className="bg-muted rounded-xl p-4 aspect-[3/4] flex items-center justify-center mb-6">
            {url ? (
              <iframe
                src={url}
                title="Preview PDF"
                className="w-full h-full rounded-lg bg-white"
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm text-xs">
                <div className="border-b pb-2 mb-4">
                  <h3 className="font-bold">PROVA</h3>
                  <p>Disciplina: {projeto.disciplina}</p>
                  <p>Turma: {projeto.nome_turma}</p>
                  <p>Questões: {projeto.QTD_questoes}</p>
                  <p>Temas: {projeto.temas.join(", ")}</p>
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
              Nº de Provas: <span>{projeto.QTD_provas}</span>
            </h3>
            <p className="text-lg">
              Disciplina: <strong>{projeto.disciplina}</strong>
            </p>
            <p className="text-lg">
              Turma: <strong>{projeto.nome_turma}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Checkbox
              id="gabarito"
              checked={imprimirGabarito}
              onCheckedChange={(checked) => setImprimirGabarito(!!checked)}
            />
            <label htmlFor="gabarito" className="text-sm">
              Imprimir gabarito
            </label>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <FileText className="w-5 h-5" />
              <span className="text-sm italic">
                Restam apenas 3 provas grátis
              </span>
            </div>

            <Button className="w-full rounded-full h-12 font-bold">
              <Crown className="w-4 h-4 mr-2" />
              Premium
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
