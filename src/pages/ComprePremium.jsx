import { DashboardLayout } from "@/components/layout";
import { Trash2, Plus, CheckCircle2, X } from "lucide-react";

export default function ComprePremium() {


    const questoes =[{
        enunciado: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, molestiae qui! Vero debitis similique, saepe voluptatem eos accusantium nemo rerum quas, ad laboriosam vel amet libero omnis quis veniam repudiandae.",
        objetiva: {
            alternativas: [
                { alternativa: "A", conteudo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ", correta: true },
                { alternativa: "B", conteudo: "Sapiente eveniet soluta voluptate esse error, ", correta: false },
                { alternativa: "C", conteudo: "mollitia dolores laudantium laborum quo sequi!", correta: false },
                { alternativa: "D", conteudo: "Illo qui soluta quia asperiores modi. Nulla, accusamus qui? Quo.", correta: false }
            ]
        },
        tipo: "objetiva"
    }];


    return (

        
            <div style={{ filter: 'blur(5px)' }} className="relative"> {/* Container pai relativo */}
    
    <DashboardLayout title="Editar Prova" >
        <div className="blur-sm pointer-events-none select-none">
            {/* CONTROLE DE PROVAS */}
            <div className="h-12">
                {/* Botão Flutuante de Salvar */}
                <div className="max-w-[35vw] mx-auto px-4 py-1 flex items-center justify-between">

                    <button
                        className="px-4 py-2 rounded-lg bg-primary disabled:opacity-40 text-white"
                    >
                        ← Anterior
                    </button>

                    <div className="text-sm text-center">
                        <p className="font-semibold">
                            Prova Padrão
                        </p>
                        <p className="text-muted-foreground">
                            Prova 1 de 2
                        </p>
                    </div>

                    <button
                        className="px-4 py-2 rounded-lg bg-primary disabled:opacity-40 text-white"
                    >
                        Próxima →
                    </button>

                </div>
            </div>

            <div className="h-[70vh] flex flex-col">
                <div className="flex-1 overflow-y-auto min-h-0 space-y-8 pb-20">
                    {questoes.map((q, qIndex) => (
                        <div key={q.id || qIndex} className="bg-white border border-border/40 rounded-2xl p-6 shadow-sm mt-2">

                            {/* Header da Questão */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-primary/10 text-primary text-xs font-bold  py-1 rounded-full uppercase">
                                    objetiva
                                </span>
                                <button
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
                                                className={`transition-colors ${q.correta === altIndex ? 'text-green-500' : 'text-slate-300 hover:text-slate-400'}`}
                                            >
                                                <CheckCircle2 size={24} fill={alt.correta ? 'currentColor' : 'transparent'} />
                                            </button>
                                            <div className="flex-1 bg-background rounded-lg px-4 py-2 flex flex-row justify-between">
                                                <div className="flex flex-row gap-2">

                                                    <p>{alt.alternativa}</p>
                                                    <input
                                                        type="text"
                                                        className="bg-background border-none focus:ring-1 ring-primary/30 outline-none"
                                                        value={alt.conteudo}
                                                    />
                                                </div>
                                                <button className="">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        className="flex items-center gap-2 text-primary text-sm font-semibold mt-4 hover:underline"
                                    >
                                        <Plus size={16} /> Adicionar Alternativa
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}


                    <button
                        className="w-full py-4 border-2 border-dashed border-primary/30 rounded-full text-primary font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                        <Plus size={20} /> Nova Questão
                    </button>





                </div>
                <div className="relative bottom-0 flex items-center justify-center mt-2">
                    <button
                        className="bg-primary text-white w-64 p-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                    >
                        Salvar Alterações em Todas as Provas
                    </button>
                </div>
            </div>





</div>
        </DashboardLayout>
</div>
    );
}