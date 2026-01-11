import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CircleDollarSign, Zap, Star, Crown, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pagar } from "../services/pagamento.service"
import { useState } from "react";

const planos = [
    {
        code: "free",
        nome: "Free Tier",
        prazo: "ilimitado",
        preco: "R$ 0,00",
        descricao: "Experimente as funcionalidades básicas sem custo.",
        icon: <CircleDollarSign className="w-7 h-7 text-primary" />,
        destaque: false,
        recursos: [
            "Acesso à plataforma",
            "Criação limitada de provas",
            "Exportação em PDF com marca d'água",
        ],
    },
    {
        code: "mensal",
        nome: "Mensal",
        prazo: "30 dias",
        preco: "R$ 29,90",
        descricao: "Ideal para testar o poder total da IA nas suas aulas.",
        icon: <Zap className="w-7 h-7 text-primary" />,
        destaque: false,
        recursos: [
            "Provas ilimitadas",
            "Exportação em PDF limpo",
            "Suporte via e-mail",
            "Correção automática",
            "Edição na Plataforma",
        ],
    },
    {
        code: "trimestral",
        nome: "Trimestral",
        prazo: "90 dias",
        preco: "R$ 79,90",
        descricao: "O melhor equilíbrio para o seu semestre letivo.",
        icon: <Star className="w-7 h-7 text-secondary" />,
        destaque: true,
        recursos: ["Tudo do Mensal", "Prioridade na geração", "Economia de 10%"],
    },
    {
        code: "semestral",
        nome: "Semestral",
        prazo: "180 dias",
        preco: "R$ 119,90",
        descricao: "Foco total no ano letivo com o melhor custo-benefício.",
        icon: <Crown className="w-7 h-7 text-primary" />,
        destaque: false,
        recursos: [
            "Tudo do Trimestral",
            "Suporte VIP",
            "Acesso antecipado a funções",
            "Melhor preço por dia",
        ],
    },
];

export default function Planos() {
    const navigate = useNavigate()
    const [carregando, setCarregando] = useState(false)
    const [nomePlano, setNomePlano] = useState("")


    const assinar = async (plano) => {
        if (plano.code === "free") {
            navigate('/turmas')
        } else {
            setCarregando(true)
            setNomePlano(plano.nome)
            const res = await pagar(plano.code, plano.nome)
            setCarregando(false)
            window.location.href = res.url;
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="bg-sidebar py-4 px-6 flex items-center justify-between rounded-b-3xl">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-2xl">🦜</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-xl text-sidebar-foreground">SabI.A</span>
                        <span className="text-[10px] text-sidebar-foreground/80 -mt-1">Atividades & Provas com I.A</span>
                    </div>
                </Link>
                <Button className="bg-primary hover:bg-primary/90" asChild>
                    <Link to="/turmas">Acessar Dashboard</Link>
                </Button>
            </header>


            <section className="py-20 px-6 bg-background">
                <div className="max-w-7xl mx-auto text-center mb-14">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Escolha o plano ideal para você
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Comece grátis e evolua conforme sua necessidade.
                    </p>
                </div>
                <div className="w-full">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 items-stretch">



                            {planos.map((plano, i) => (
                                <div
                                    key={i}
                                    className={`
              relative bg-card rounded-3xl p-8 border-2
              transition-transform duration-300
              hover:-translate-y-1
              flex flex-col
              ${plano.destaque
                                            ? "border-secondary shadow-xl scale-[1.03]"
                                            : "border-border"
                                        }
            `}
                                >
                                    {plano.destaque && (
                                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                                            Mais Popular
                                        </span>
                                    )}

                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                                            {plano.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl font-bold">{plano.nome}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {plano.prazo}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-4xl font-bold mb-1">{plano.preco}</p>
                                        <p className="text-muted-foreground">{plano.descricao}</p>
                                    </div>

                                    <ul className="space-y-3 mb-8 flex-1">
                                        {plano.recursos.map((r, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                                <span>{r}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        onClick={() => assinar(plano)}
                                        className={`rounded-full ${plano.destaque
                                            ? "bg-secondary hover:bg-secondary/90"
                                            : "bg-primary hover:bg-primary/90"
                                            }`}
                                        disabled={carregando}

                                    >
                                        {plano.nome === "Free Tier" ? "Começar Grátis" : carregando && nomePlano == plano.nome ? "Carregando" : "Assinar Plano"}

                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
