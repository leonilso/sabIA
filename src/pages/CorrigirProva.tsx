import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { corrigirGabarito } from "@/services/gabarito.service";
import { Link, useSearchParams } from 'react-router-dom';
import jsQR from "jsqr"; // Biblioteca leve para ler os pixels do canvas
import { Plus, X, FileText, Link as LinkIcon } from "lucide-react";
import { pegarAluno } from "../services/alunos.service";
import { DashboardLayout } from "@/components/layout";
import AlertModal from "../components/AlertModal";

export default function CorrigirProva() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dadosProva, setDadosProva] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [scanning, setScanning] = useState(true);
  const [paginaCorrigir, setpaginaCorrigir] = useState(null);
  const fileInputRef = useRef(null);
  const [loadingCanvas, setLoadingCanvas] = useState(false);
  const [dadosAluno, setDadosAluno] = useState(null);
  const [cameraLigada, setCameraLigada] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("")


  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
streamRef.current = stream; 

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraLigada(true);
        setScanning(true); // Garante que volta a escanear
      }
    } catch (err) {
      console.error("Erro ao acessar câmera", err);
    }
  };

const stopCamera = () => {
    setCameraLigada(false);
    setScanning(false);

    // Parar pelo streamRef (funciona mesmo se o vídeo sumiu da tela)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Limpa o elemento de vídeo se ele ainda existir
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };


  useEffect(() => {

    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    const idProjeto = searchParams.get('p');
    const idAluno = searchParams.get('a');
    const idGabarito = searchParams.get('g');
    const pagina = searchParams.get('pg');
    setDadosProva({ idProjeto, idAluno, pagina, idGabarito });
  }, [searchParams]);

  useEffect(() => {
    async function carregar() {
      try {
        if (dadosProva.idAluno) {
          const alunosApi = await pegarAluno(dadosProva.idAluno);
          setDadosAluno(alunosApi);
        }
      } catch (err) {
        console.error("Erro ao carregar alunos", err);
      }
    }
    carregar();
  }, [dadosProva]);


  useEffect(() => {
    let animFrame: number;

    const escanearFrame = () => {
      if (videoRef.current && canvasRef.current && scanning) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            try {
              const url = new URL(code.data);
              const novosParams = new URLSearchParams(url.search);

              if (novosParams.get('pg') !== searchParams.get('pg') ||
                novosParams.get('a') !== searchParams.get('a')) {

                setSearchParams(novosParams);
                if (navigator.vibrate) navigator.vibrate(100); // Feedback tátil
                console.log("QR Code detectado e parâmetros atualizados!");
              }
            } catch (e) {

            }
          }
        }
      }
      animFrame = requestAnimationFrame(escanearFrame);
    };

    escanearFrame();
    return () => cancelAnimationFrame(animFrame);
  }, [scanning, searchParams, setSearchParams]);

  const lerQRCodeDoCanvas = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (!code) return;

    try {
      const url = new URL(code.data);
      const novosParams = new URLSearchParams(url.search);

      if (
        novosParams.get("pg") !== searchParams.get("pg") ||
        novosParams.get("a") !== searchParams.get("a")
      ) {
        setSearchParams(novosParams);
        if (navigator.vibrate) navigator.vibrate(100);
        console.log("QR da imagem detectado e params atualizados");
      }
    } catch {
    }
  };



  const tirarFoto = async () => {
    if (!canvasRef.current || !dadosProva) return;

    setLoading(true);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      try {
        const response = await corrigirGabarito(
          dadosProva.idProjeto,
          dadosProva.idAluno,
          dadosProva.pagina,
          dadosProva.idGabarito,
          blob
        );
        setResultado(response);
      } catch {
              setMensagemModal("Falha ao corrigir o gabarito! tire a foto em um local iluminado, com a prova centrada da imagem. Evitando mostrar fora do enquadramento");
      setIsModalOpen(true);
      } finally {
        setLoading(false);
        if (!paginaCorrigir) setScanning(true);
      }
    }, "image/jpeg", 0.95);
  };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    stopCamera();

    setScanning(false);
    setLoadingCanvas(true);

    const imagemReduzida = await reduzirImagem(file);

    setpaginaCorrigir(
      new File([imagemReduzida], "pagina.jpg", { type: "image/jpeg" })
    );

    await renderBlobOnCanvas(imagemReduzida);
  };

  const renderBlobOnCanvas = async (blob: Blob) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      lerQRCodeDoCanvas();
      setLoadingCanvas(false);
    };

    img.src = URL.createObjectURL(blob);
  };



  const removerFoto = async () => {
    setpaginaCorrigir(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    await startCamera();
  };

  const renderFileOnCanvas = async (file: File) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (file.type.startsWith("image/")) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        lerQRCodeDoCanvas();
        setLoadingCanvas(false);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const getQuestaoInfo = (idQuestao) => {
    return resultado?.infoQuestoes?.questoes?.find(q => q.id === idQuestao);
  };

  const getAlternativa = (questao, letra) => {

    return questao?.alternativas?.find(item => item.alternativa === letra)?.conteudo;
  };

  const reduzirImagem = async (
    file: File,
    maxSize = 1600,
    quality = 0.85
  ) => {
    const bitmap = await createImageBitmap(file);

    const scale = Math.min(
      maxSize / bitmap.width,
      maxSize / bitmap.height,
      1
    );

    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);

    return new Promise<Blob>((resolve) =>
      canvas.toBlob(
        blob => resolve(blob!),
        "image/jpeg",
        quality
      )
    );
  };



  const letraPorIndice = (i) => ["A", "B", "C", "D", "E"][i];

  return (
    <DashboardLayout>
            {isModalOpen && (
        <AlertModal 
          message={mensagemModal}
          cancelText="ok"
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="max-w-md mx-auto space-y-4 p-4">

        {!paginaCorrigir && (
          <div
            className="
    relative
    w-full
    aspect-[210/297]
    overflow-hidden
    rounded-xl
    border-2 border-primary/30
    bg-black
  "
          >




            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Área guia da folha */}
            <div className="absolute inset-4 border-2 border-dashed border-white/40 pointer-events-none rounded-lg" />

            {/* Label opcional */}
            <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              Enquadre a folha A4
            </span>
          </div>
        )}

        <div className="relative">
          <div
            className={paginaCorrigir ? "relative w-full aspect-[210/297] overflow-hidden rounded-xl border-2 border-primary/30" : "relative hidden aspect-[210/297] overflow-hidden rounded-xl border-2 border-primary/30"}
          >
            <canvas
              ref={canvasRef}
              className={paginaCorrigir ? "w-full" : "hidden"}
            />

            {/* Área guia da folha */}
            <div className="absolute inset-4 border-2 border-dashed border-white/40 pointer-events-none rounded-lg" />
          </div>

          {loadingCanvas && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
              <div className="flex flex-col items-center gap-2 text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent" />
                <span className="text-sm">Carregando imagem…</span>
              </div>
            </div>
          )}
        </div>
        <div className="text-center">
          {cameraLigada == false ?
            <div className="overlay-permissao">
              <Button onClick={startCamera} className="mb-2">
                Ativar Câmera
              </Button>
            </div> : <></>
          }

          {dadosProva && (
            <p className="text-sm text-muted-foreground font-medium">
              Aluno {dadosAluno ? dadosAluno.nome : "Prova padrão"} | Pág: {dadosProva.pagina}
            </p>
          )}
        </div>
        <Button onClick={tirarFoto} disabled={loading || !dadosProva} className="w-full h-12">
          {loading ? "Processando Gabarito..." : "Corrigir Esta Página"}
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground rounded-full text-sm">
                {paginaCorrigir ?
                  <>
                    <div className="flex items-center justify-between bg-primary p-2 px-4 rounded-full border border-dashed border-primary">
                      <span className="text-sm text-secondary-foreground truncate max-w-[200px]">{paginaCorrigir.name}</span>
                      <button onClick={() => removerFoto()} className="text-destructive hover:scale-110">
                        <X className="ml-1 mt-1 w-4 h-4" />
                      </button>
                    </div>
                  </> : "Adicionar foto gabarito"

                }
              </span>
            </div>

            <Button
              onClick={() => fileInputRef.current.click()} // Aciona o input escondido
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full gap-2"
            >
              <Plus className="w-4 h-4" />
              {paginaCorrigir ? "Trocar" : "Adicionar"}
            </Button>
          </div>

          {/* Feedback visual do arquivo selecionado */}

        </div>

        {resultado && (
          <div className="space-y-4">
            {/* Resumo */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-xs uppercase font-bold text-green-700">Resultado</p>
              <p className="text-2xl font-black text-green-900">{resultado.nota} pts</p>
              <p className="text-sm text-green-800">
                Acertos: {resultado.acertos} / {resultado.totalAuto}
              </p>
            </div>

            {/* Questões corrigidas */}
            {resultado.detalhes.map((det) => {
              const questao = getQuestaoInfo(det.idQuestao);
              if (!questao) return null;

              return (
                <div
                  key={det.idQuestao}
                  className={`border rounded-lg p-4 space-y-2 ${det.acertou ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">
                      Questão {det.numeroQuestao}
                    </span>
                    <span
                      className={`text-xs font-bold ${det.acertou ? "text-green-700" : "text-red-700"
                        }`}
                    >
                      {det.acertou ? "ACERTOU" : "ERROU"}
                    </span>
                  </div>

                  {/* Enunciado */}
                  <p className="text-sm font-medium">{questao.pergunta}</p>

                  {/* Respostas */}
                  {questao.tipo === "objetiva" && (
                    <div className="text-sm space-y-1">
                      {det.acertou ? <>
                        <p>
                          <strong>Resposta correta:</strong>{" "}
                          <span className={"text-green-700"}>
                            {`${det.detectada}) - ${getAlternativa(questao, det.detectada)}`}
                          </span>
                        </p>
                      </>

                        : <>
                          <p>
                            <strong>Sua resposta:</strong>{" "}
                            <span className={"text-red-700"}>
                              {`${det.detectada}) - ${getAlternativa(questao, det.detectada)}`}
                            </span>
                          </p>
                          <p>
                            <strong>Resposta correta:</strong>{" "}
                            {`${det.correta}) - ${getAlternativa(questao, det.correta)}`}
                          </p>
                        </>

                      }

                    </div>
                  )}

                  {questao.tipo === "descritiva" && (
                    <p className="text-sm italic text-muted-foreground">
                      Questão descritiva (correção manual)
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!dadosProva && (
          <p className="text-xs text-center text-muted-foreground animate-pulse">
            Aponte para o QR Code no topo da página...
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}