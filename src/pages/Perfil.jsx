import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, Mail, LogOut, Trash2, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteUser, setarNovaSenha } from "../services/auth.service";
import AlertModal from "../components/AlertModal";
import { useConfirm } from "../contexts/ConfirmContext"

export default function Perfil() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deletando, setDeletando] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [salvandoSenha, setSalvandoSenha] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("");
  const confirm = useConfirm();


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando perfil...</p>
      </div>
    );
  }

  function validarSenha(s) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(s);
  }

  async function handleAlterarSenha() {
    setErroSenha("");

    if (!senha || !confirmarSenha) {
      setErroSenha("Preencha os dois campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem.");
      return;
    }

    if (!validarSenha(senha)) {
      setErroSenha(
        "A senha deve ter no mínimo 8 caracteres, letras e números."
      );
      return;
    }

    try {
      setSalvandoSenha(true);
      await setarNovaSenha(senha);
            setMensagemModal("Senha alterada com sucesso");
      setIsModalOpen(true);
      setSenha("");
      setConfirmarSenha("");
    } catch (err) {
      console.error(err);
      setErroSenha("Erro ao alterar senha.");
    } finally {
      setSalvandoSenha(false);
    }
  }

  async function handleDeletarConta() {
    // const confirmar = window.confirm(
    //   "⚠️ Tem certeza que deseja excluir sua conta?\nEssa ação não pode ser desfeita."
    // );

    const confirmar = await confirm({
      title: "Excluir conta?",
      message: "Tem certeza que deseja excluir sua conta?\nEssa ação não pode ser desfeita. E você perderá todos os eus projetos, qualquer valor de assinatura restante não será restituído!",
      confirmText: "Sim, excluir conta",
      cancelText: "Não, cancelar"
    });


    if (!confirmar) return;

    try {
      setDeletando(true);
      await deleteUser();
      logout();
      navigate("/");
    } catch (err) {
            setMensagemModal("Erro ao excluir conta");
      setIsModalOpen(true);
      console.error(err);
    } finally {
      setDeletando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
            {isModalOpen && (
        <AlertModal 
          message={mensagemModal}
          cancelText="ok"
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="w-full max-w-md bg-card rounded-3xl p-6 shadow-card">

        {/* Cabeçalho */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>

          <h2 className="text-2xl font-bold">{user.nome || "Usuário"}</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {user.email}
          </p>
        </div>

        {/* Alterar senha */}
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Alterar senha
          </h3>

          <input
            type="password"
            placeholder="Nova senha"
            className="w-full rounded-xl p-2 bg-muted"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar nova senha"
            className="w-full rounded-xl p-2 bg-muted"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
          />

          {erroSenha && (
            <p className="text-sm text-destructive">{erroSenha}</p>
          )}

          <Button
            className="w-full rounded-full"
            onClick={handleAlterarSenha}
            disabled={salvandoSenha}
          >
            {salvandoSenha ? "Salvando..." : "Salvar nova senha"}
          </Button>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>

          <Button
            variant="destructive"
            className="w-full rounded-full"
            onClick={handleDeletarConta}
            disabled={deletando}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {deletando ? "Excluindo conta..." : "Excluir conta"}
          </Button>
        </div>
      </div>
    </div>
  );
}
