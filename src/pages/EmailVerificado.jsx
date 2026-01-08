import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { verificarEmail } from "../services/auth.service";

export default function EmailConfirmado() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [tokenCorreto, setTokenCorreto] = useState(false);

    useEffect(() => {
        const verify = async () => {
            try {
                const token = searchParams.get('token');

                if (token) {
                    await verificarEmail(token);
                    setTokenCorreto(true)
                }
            } catch (error) {
                console.error("Verification failed", error);
                setTokenCorreto(false)
            } finally {
                setIsLoading(false);
            }
        };

        verify();
    }, [searchParams]); // 3. Added searchParams to the dependency array



    return (
        <div className="min-h-screen bg-background">
            <header className="bg-sidebar py-4 px-6 flex items-center justify-between rounded-b-3xl">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-2xl">🦜</span>
                    </div>
                    <div>
                        <h1 className="font-display font-bold text-xl text-sidebar-foreground">SabI.A</h1>
                        <p className="text-[10px] text-sidebar-foreground/80">
                            Atividades & Provas com I.A
                        </p>
                    </div>
                </div>
            </header>

            <section className="flex items-center justify-center py-32 px-6 mt-4">
                <div className="max-w-xl bg-card rounded-3xl p-4 shadow-card text-center">

                    {!isLoading ? (tokenCorreto ?
                        <>
                            <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />


                            <h2 className="font-display text-3xl font-bold mb-4">
                                E-mail confirmado! 🎉
                            </h2>

                            <p className="text-muted-foreground mb-8">
                                Sua conta foi ativada com sucesso.
                                <br />
                                Você já cosegue acessar sua conta pelo Sabi.A
                            </p>
                        </> 
                        : 
                        <>
                            <CircleX className="w-16 h-16 text-secondary mx-auto mb-6" />


                            <h2 className="font-display text-3xl font-bold mb-4">
                                Token inválido
                            </h2>

                            <p className="text-muted-foreground mb-8">
                                Sua conta não foi ativada.
                                <br />
                                Ou esse link já foi utilizado.
                                <br />
                                Acesse a página da SabI.A e tente novamente!
                            </p>
                        </>) 
                        :
                        <h2 className="font-display text-3xl font-bold mb-4">
                            Confirmando...
                        </h2>}

                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 rounded-full px-10"
                        asChild
                    >
                        <Link to="/login">
                            Ir para o login <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
