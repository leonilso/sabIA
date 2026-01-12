import React from "react";

export default function ConfirmModal({ 
  title, 
  message, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar", 
  onConfirm, 
  onCancel 
}) {
  
  // Impede que cliques dentro do modal fechem ele acidentalmente
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      onClick={onCancel} // Se clicar fora, executa a ação de cancelar
    >
      <div 
        className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200"
        onClick={stopPropagation}
      >
        {/* Título - Estilo idêntico ao PremiumModal */}
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          {title}
        </h2>

        {/* Mensagem */}
        <p className="text-slate-600 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Ações (Botões) */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition font-medium"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="
              px-5 py-2 rounded-lg
              bg-primary text-white font-semibold
              shadow-md hover:shadow-lg
              hover:brightness-110
              transition
            "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}