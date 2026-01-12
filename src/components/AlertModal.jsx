import React from "react";
import { Button } from "./ui/button";

export default function AlertModal({
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onClose
}) {

    // Impede que o clique dentro do modal feche ele (bolha de evento)
    const handleContainerClick = (e) => e.stopPropagation();

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose} // Fecha ao clicar no fundo escuro
        >
            <div
                className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl transform transition-all"
                onClick={handleContainerClick}
            >
                {/* Título */}
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {title}
                </h2>

                {/* Mensagem/Conteúdo */}
                <p className="text-slate-600 mb-6 leading-relaxed font-semibold">
                    {message}
                </p>

                {/* Ações */}
                <div className="flex items-center justify-end gap-3">
                    {onClose && (
                        <Button
                            onClick={onClose}
                        >
                            {cancelText}
                        </Button>
                    )}

                    {confirmText &&
                        <Button
                            onClick={onConfirm}

                        >
                            {confirmText}
                        </Button>}

                </div>
            </div>
        </div>
    );
}