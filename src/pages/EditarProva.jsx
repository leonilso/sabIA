import { DashboardLayout } from "@/components/layout";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Trash2, Plus, CheckCircle2, X } from "lucide-react";
import { pegarProvas, salvarProvas } from "@/services/provas.service";
import { useNavigate } from "react-router-dom";
// import { pegarProjeto } from "../services/projetos.service"

// const vazio = {
//     ID: 0,
//     ID_usuario: 0,
//     disciplina: "",
//     ID_turma: 0,
//     QTD_questoes: 0,
//     QTD_provas: 0,
//     public_id: "",
//     status: "",
//     data_limite: null,
//     nome_turma: "",
//     temas: [],
// };

export default function EditarProva() {
    const { idProjeto } = useParams();
    const [loading, setLoading] = useState(true);
    const [provas, setProvas] = useState([]);
    const [provaIndex, setProvaIndex] = useState(0);
    const [modalAberto, setModalAberto] = useState(false);
    const [tipoQuestao, setTipoQuestao] = useState(null);
    const navigate = useNavigate();
    // const [projeto, setProjeto] = useState(vazio);

    const [novaQuestao, setNovaQuestao] = useState({
        enunciado: "",
        objetiva: {
            alternativas: [
                { alternativa: "A", conteudo: "", correta: false },
                { alternativa: "B", conteudo: "", correta: false },
                { alternativa: "C", conteudo: "", correta: false },
                { alternativa: "D", conteudo: "", correta: false }
            ]
        },
        associativa: {
            resposta: [
                { chave: "", valor: "" },
                { chave: "", valor: "" },
                { chave: "", valor: "" },
                { chave: "", valor: "" }
            ]
        },
        descritiva: { resposta_correta: "" }
    });


    const provaAtual = provas[provaIndex];
    const questoes = provaAtual?.questoes || [];

    // useEffect(() => {
    //     async function carregar() {
    //         try {
    //             const projetoApi = await pegarProjeto(idProjeto);
    //             setProjeto(projetoApi);
    //         } catch (err) {
    //             console.error("Erro ao carregar projeto", err);
    //         }
    //     }
    //     carregar();
    // }, [idProjeto]);

    useEffect(() => {
        async function carregarDados() {
            try {
                const dados = await pegarProvas(idProjeto);
                // const provasNormalizadas = normalizarProvas(dados);
                setProvas(dados);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        carregarDados();
    }, [idProjeto]);


    const atualizarQuestoesDaProva = (callback) => {
        setProvas(prev =>
            prev.map((prova, pIndex) =>
                pIndex === provaIndex
                    ? { ...prova, questoes: callback(prova.questoes) }
                    : prova
            )
        );
    };

    const atualizarQuestao = (qIndex, novosDados) => {
        atualizarQuestoesDaProva(questoes =>
            questoes.map((q, i) =>
                i === qIndex ? { ...q, ...novosDados } : q
            )
        );
    };



    const excluirQuestao = (qIndex) => {
        atualizarQuestoesDaProva(questoes =>
            questoes.filter((_, i) => i !== qIndex)
        );
    };

    const marcarCorreta = (qIndex, altIndex) => {
        atualizarQuestoesDaProva(questoes =>
            questoes.map((q, i) => {
                if (i !== qIndex) return q;

                return {
                    ...q,
                    objetiva: {
                        ...q.objetiva,
                        correta: q.objetiva.alternativas[altIndex].alternativa,
                        alternativas: q.objetiva.alternativas.map((a, idx) => ({
                            ...a,
                            correta: idx === altIndex
                        }))
                    }
                };
            })
        );
    };

    const editarAlternativa = (qIndex, altIndex, valor) => {
        atualizarQuestoesDaProva(questoes =>
            questoes.map((q, i) => {
                if (i !== qIndex) return q;

                const novasAlt = q.objetiva.alternativas.map((a, idx) =>
                    idx === altIndex ? { ...a, conteudo: valor } : a
                );

                return {
                    ...q,
                    objetiva: { ...q.objetiva, alternativas: novasAlt }
                };
            })
        );
    };
    const editarDescritiva = (qIndex, valor) => {
        atualizarQuestoesDaProva(questoes =>
            questoes.map((q, i) => {
                if (i !== qIndex) return q;


                return {
                    ...q,
                    descritiva: { ...q.descritiva, resposta_correta: valor }
                };
            })
        );
    };

    const removerAlternativa = (qIndex, altIndex) => {
        atualizarQuestoesDaProva(questoes =>
            questoes.map((q, i) => {
                if (i !== qIndex) return q;

                const novasAlt = q.objetiva.alternativas.filter((_, idx) => idx !== altIndex);

                return {
                    ...q,
                    objetiva: {
                        ...q.objetiva,
                        alternativas: novasAlt,
                        correta: novasAlt.find(a => a.correta)?.alternativa || null
                    }
                };
            })
        );
    };

    const atualizarAssociativa = (qIndex, chaveAntiga, novaChave, novoValor) => {
        atualizarQuestoesDaProva(questoes =>
            questoes.map((q, i) => {
                if (i !== qIndex) return q;

                const respostaOrdenada = Object.entries(q.associativa.resposta)
                    .map(([k, v]) =>
                        k === chaveAntiga ? [novaChave, novoValor] : [k, v]
                    );

                return {
                    ...q,
                    associativa: {
                        resposta: Object.fromEntries(respostaOrdenada)
                    }
                };
            })
        );
    };


    const proximaLetra = (alternativas) => {
        return String.fromCharCode(65 + alternativas.length); // A, B, C...
    };


    const adicionarAlternativa = (qIndex) => {
        atualizarQuestoesDaProva(questoes =>
            questoes.map((q, i) => {
                if (i !== qIndex) return q;

                const alternativas = q.objetiva.alternativas || [];
                const novaAlternativa = {
                    alternativa: proximaLetra(alternativas),
                    conteudo: "",
                    correta: false
                };

                return {
                    ...q,
                    objetiva: {
                        ...q.objetiva,
                        alternativas: [...alternativas, novaAlternativa]
                    }
                };
            })
        );
    };

    const abrirModal = () => {
        setTipoQuestao(null);
        setNovaQuestao({
            enunciado: "",
            objetiva: {
                alternativas: [
                    { alternativa: "A", conteudo: "", correta: false },
                    { alternativa: "B", conteudo: "", correta: false },
                    { alternativa: "C", conteudo: "", correta: false },
                    { alternativa: "D", conteudo: "", correta: false }
                ]
            },
            associativa: {
                resposta: [
                    { chave: "", valor: "" },
                    { chave: "", valor: "" },
                    { chave: "", valor: "" },
                    { chave: "", valor: "" }
                ]
            },
            descritiva: { resposta_correta: "" }
        });
        setModalAberto(true);
    };

    const confirmarCriacao = () => {

        atualizarQuestoesDaProva(questoes => {
            if (tipoQuestao === "objetiva") {
                return [...questoes, {
                    id: null,
                    tipo: "objetiva",
                    enunciado: novaQuestao.enunciado,
                    objetiva: {
                        correta: null,
                        alternativas: novaQuestao.objetiva.alternativas
                    }
                }];
            }

            if (tipoQuestao === "associativa") {
                const objetoFormatado = Object.fromEntries(
                    novaQuestao.associativa.resposta.map(item => [item.chave, item.valor])
                );

                return [...questoes, {
                    id: null,
                    tipo: "associativa",
                    enunciado: novaQuestao.enunciado,
                    associativa: {
                        resposta: objetoFormatado
                    }
                }];
            }

            if (tipoQuestao === "descritiva") {
                return [...questoes, {
                    id: null,
                    tipo: "descritiva",
                    enunciado: novaQuestao.enunciado,
                    descritiva: { resposta_correta: novaQuestao.descritiva.resposta_correta }
                }];
            }




            return questoes;
        });
        setModalAberto(false);
    };

    const enviarProvas = async () => {
        try {
            await salvarProvas(idProjeto, provas);
            navigate(`/impressao/${idProjeto}`)
        } catch (error) {
            console.error(err);
        }
    }





    if (loading) return <Loading />;

    return (
        <DashboardLayout title="Editar Prova">
            <div className="flex flex-col gap-2 items-center justify-between">

                    {/* Botão Flutuante de Salvar */}
                    <div className="w-full px-6 py-4 flex items-center justify-between">
                        <button
                            disabled={provaIndex === 0}
                            onClick={() => setProvaIndex(i => i - 1)}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary disabled:opacity-40 text-white"
                        >
                            ← Anterior
                        </button>

                        <div className="w-full sm:w-auto text-sm text-center">
                            <p className="font-semibold">
                                {provaAtual?.aluno?.tipo === "padrao"
                                    ? "Prova Padrão"
                                    : `Aluno: ${provaAtual?.aluno?.nome ? provaAtual?.aluno?.nome : "padrão"}`}
                            </p>
                            <p className="text-muted-foreground">
                                Prova {provaIndex + 1} de {provas.length}
                            </p>
                        </div>

                        <button
                            disabled={provaIndex === provas.length - 1}
                            onClick={() => setProvaIndex(i => i + 1)}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary disabled:opacity-40 text-white"
                        >
                            Próxima →
                        </button>

                    </div>


                {/* <div className="flex-1 overflow-y-auto p-6"> */}
                <div className="w-full space-y-6 pb-24">
                    {questoes.map((q, qIndex) => (
                        <div key={q.id || qIndex} className="bg-white border border-border/40 rounded-2xl p-6 shadow-sm mt-2">

                            {/* Header da Questão */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-primary/10 text-primary text-xs font-bold  py-1 rounded-full uppercase">
                                    {q.tipo === 'objetiva' ? 'Objetiva' : q.tipo === 'associativa' ? 'Associativa' : 'Descritiva'}
                                </span>
                                <button
                                    onClick={() => excluirQuestao(qIndex)}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            {/* Enunciado */}
                            <div className="mb-6">
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">Enunciado</label>
                                <textarea
                                    className="w-full bg-background border-none rounded-xl p-4 focus:ring-2 ring-primary/20 outline-none resize-none"
                                    rows={3}
                                    value={q.enunciado}
                                    onChange={(e) => atualizarQuestao(qIndex, { enunciado: e.target.value })}
                                />
                            </div>

                            {/* Renderização Condicional por Tipo */}

                            {/* 1. OBJETIVA */}
                            {q.tipo === 'objetiva' && (
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Alternativas</label>
                                    {q.objetiva.alternativas.map((alt, altIndex) => (
                                        <div key={altIndex} className="flex items-center gap-3 group/item">
                                            <button
                                                onClick={() => marcarCorreta(qIndex, altIndex)}
                                                className={`transition-colors ${q.correta === altIndex ? 'text-green-500' : 'text-slate-300 hover:text-slate-400'}`}
                                            >
                                                <CheckCircle2 size={24} fill={alt.correta ? 'currentColor' : 'transparent'} />
                                            </button>
                                            <div className="flex-1 bg-background rounded-lg px-4 py-2 flex flex-row justify-between">
                                                <div className="flex flex-row gap-2">
                                                    {/* 
                                                    <p>{alt.alternativa}</p> */}
                                                    <input
                                                        type="text"
                                                        className="flex-1 flex justify-between bg-background border-none focus:ring-1 ring-primary/30 outline-none"
                                                        value={alt.conteudo}
                                                        onChange={(e) => {
                                                            editarAlternativa(qIndex, altIndex, e.target.value);
                                                        }}
                                                    />
                                                </div>
                                                <button onClick={() => removerAlternativa(qIndex, altIndex)} className="">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        disabled={q.objetiva.alternativas.length > 3}
                                        onClick={() => adicionarAlternativa(qIndex)}
                                        className={q.objetiva.alternativas.length > 3 ? "flex items-center gap-2 text-muted-foreground text-sm font-semibold mt-4 cursor-default" : "flex items-center gap-2 text-primary text-sm font-semibold mt-4 hover:underline"}
                                    >
                                        <Plus size={16} /> Adicionar Alternativa
                                    </button>
                                </div>
                            )}

                            {/* 2. ASSOCIATIVA (Chave-Valor) */}
                            {q.tipo === 'associativa' && (
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Estas são as associações corretas, na prova do aluno elas serão embaralhadas</label>
                                    {Object.entries(q?.associativa?.resposta).map(([chave, valor], aIndex) => (
                                        <div key={aIndex} className="flex gap-2">
                                            <input
                                                placeholder="Chave"
                                                className="flex-1 min-w-0 bg-background border-none rounded-lg px-4 py-2 outline-none"
                                                value={chave}
                                                onChange={(e) => {
                                                    atualizarAssociativa(qIndex, chave, e.target.value, valor)
                                                }}
                                            />
                                            <input
                                                placeholder="Valor"
                                                className="flex-1 min-w-0 bg-background border-none rounded-lg px-4 py-2 outline-none"
                                                value={valor}
                                                onChange={(e) => {
                                                    atualizarAssociativa(qIndex, chave, chave, e.target.value)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 3. DESCRITIVA */}
                            {q.tipo === 'descritiva' && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Resposta Esperada</label>
                                    <textarea
                                        className="w-full bg-background border-none rounded-xl p-4 focus:ring-2 ring-primary/20 outline-none resize-none italic"
                                        rows={2}
                                        value={q?.descritiva?.resposta_correta}
                                        onChange={(e) => editarDescritiva(qIndex, e.target.value)}
                                        placeholder="Descreva o que se espera do aluno..."
                                    />
                                </div>
                            )}
                        </div>
                    ))}


                    <button
                        className="w-full py-4 border-2 border-dashed border-primary/30 rounded-full text-primary font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 mt-2"
                        onClick={abrirModal}
                    >
                        <Plus size={20} /> Nova Questão
                    </button>
                </div>
                {/* </div> */}
                <div className="flex-none p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                    <div className="max-w-3xl mx-auto flex justify-center">
                        <button
                            className="bg-primary text-white w-64 p-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                            onClick={() => enviarProvas()}
                        >
                            Salvar Alterações em Todas as Provas
                        </button>
                    </div>
                </div>
            </div>
            {modalAberto && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-background rounded-2xl w-full max-w-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

                        {/* ETAPA 1 – TIPO */}
                        {!tipoQuestao && (
                            <>
                                <h2 className="font-bold text-lg">Tipo da Questão</h2>
                                <div className="grid grid-cols-3 gap-2">
                                    {["objetiva", "associativa", "descritiva"].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTipoQuestao(t)}
                                            className="bg-primary text-white w-full py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* ETAPA 2 – CONTEÚDO */}
                        {tipoQuestao && (
                            <>
                                <h2 className="font-bold text-lg capitalize">{tipoQuestao}</h2>

                                <textarea
                                    placeholder="Enunciado"
                                    className="w-full rounded-xl p-3 bg-muted"
                                    value={novaQuestao.enunciado}
                                    onChange={e =>
                                        setNovaQuestao(q => ({ ...q, enunciado: e.target.value }))
                                    }
                                />

                                {/* OBJETIVA */}
                                {tipoQuestao === "objetiva" &&
                                    novaQuestao.objetiva.alternativas.map((alt, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            {/* Checkbox exclusivo */}
                                            <input
                                                type="checkbox"
                                                checked={alt.correta}
                                                onChange={() => {
                                                    const novas = novaQuestao.objetiva.alternativas.map((a, index) => ({
                                                        ...a,
                                                        correta: index === i, // só a marcada fica true
                                                    }));

                                                    setNovaQuestao(q => ({
                                                        ...q,
                                                        objetiva: { alternativas: novas }
                                                    }));
                                                }}
                                            />

                                            {/* Conteúdo da alternativa */}
                                            <input
                                                placeholder={`Alternativa ${alt.alternativa}`}
                                                className="w-full rounded-xl p-2 bg-muted"
                                                value={alt.conteudo}
                                                onChange={e => {
                                                    const novas = [...novaQuestao.objetiva.alternativas];
                                                    novas[i] = { ...novas[i], conteudo: e.target.value };

                                                    setNovaQuestao(q => ({
                                                        ...q,
                                                        objetiva: { alternativas: novas }
                                                    }));
                                                }}
                                            />
                                        </div>
                                    ))}

                                {/* ASSOCIATIVA */}
                                {tipoQuestao === "associativa" && (
                                    <div className="space-y-2">
                                        {novaQuestao.associativa.resposta.map((par, i) => (
                                            <div key={i} className="flex gap-2">
                                                <input
                                                    placeholder={`Chave ${i + 1}`}
                                                    className="flex-1 p-2 rounded-xl bg-muted"
                                                    value={par.chave}
                                                    onChange={e => {
                                                        const resposta = [...novaQuestao.associativa.resposta];
                                                        resposta[i] = { ...resposta[i], chave: e.target.value };
                                                        setNovaQuestao(q => ({
                                                            ...q,
                                                            associativa: { resposta }
                                                        }));
                                                    }}
                                                />

                                                <input
                                                    placeholder={`Valor ${i + 1}`}
                                                    className="flex-1 p-2 rounded-xl bg-muted"
                                                    value={par.valor}
                                                    onChange={e => {
                                                        const resposta = [...novaQuestao.associativa.resposta];
                                                        resposta[i] = { ...resposta[i], valor: e.target.value };
                                                        setNovaQuestao(q => ({
                                                            ...q,
                                                            associativa: { resposta }
                                                        }));
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* descrtiva */}
                                {tipoQuestao === "descritiva" &&

                                    <input
                                        placeholder={`Padrão de resposta`}
                                        className="w-full rounded-xl p-4 bg-muted"
                                        onChange={e => {
                                            setNovaQuestao(q => ({
                                                ...q,
                                                descritiva: { resposta_correta: e.target.value }
                                            }));
                                        }}
                                    />
                                }


                                {/* AÇÕES */}
                                <div className="flex justify-center gap-4 pt-4">                                            <button onClick={() => setModalAberto(false)}
                                    className="bg-primary text-white px-4 py-2 rounded-xl"
                                >Cancelar</button>
                                    <button
                                        onClick={confirmarCriacao}
                                        className="bg-primary text-white px-4 py-2 rounded-xl"
                                    >
                                        Criar Questão
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout >
    );
}