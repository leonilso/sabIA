import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";

export default function PremiumModal() {
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleButton = () => {
    navigate(-2); 
    closeModal();
  }
  const handleButtonConfirm = () => {
    navigate("/planos"); 
    closeModal();
  }



  return (
<>
  {/* Título */}
  <h2 className="text-2xl font-semibold text-slate-900 mb-2">
    Conteúdo Premium
  </h2>

  {/* Descrição */}
  <p className="text-slate-600 mb-6 leading-relaxed">
    Este recurso é exclusivo para usuários premium.
    Faça o upgrade para desbloquear todas as funcionalidades.
  </p>

  {/* Ações */}
  <div className="flex items-center justify-end gap-3">
    <button
      onClick={handleButton}
      className="px-4 py-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
    >
      Agora não
    </button>

    <button
      onClick={handleButtonConfirm}
      className="
        px-5 py-2 rounded-lg
        bg-primary text-white font-semibold
        shadow-md hover:shadow-lg
        hover:brightness-110
        transition
      "
    >
      Ver planos
    </button>
  </div>
</>
  );
}
