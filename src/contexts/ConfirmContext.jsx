import React, { createContext, useContext, useState, useCallback } from "react";
import ConfirmModal from "../components/ConfirmModal"; 

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  const confirm = useCallback(({ title, message, confirmText, cancelText }) => {
    return new Promise((resolve) => {
      setConfig({
        title,
        message,
        confirmText,
        cancelText,
        resolve,
      });
    });
  }, []);

  const handleClose = (value) => {
    if (config?.resolve) {
      config.resolve(value); // Resolve a promessa com true ou false
    }
    setConfig(null); // Fecha o modal
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {config && (
        <ConfirmModal
          title={config.title}
          message={config.message}
          confirmText={config.confirmText}
          cancelText={config.cancelText}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);