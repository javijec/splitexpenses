import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);

  const openExpenseModal = () => setExpenseModalOpen(true);
  const closeExpenseModal = () => setExpenseModalOpen(false);
  const openGroupModal = () => setGroupModalOpen(true);
  const closeGroupModal = () => setGroupModalOpen(false);
  const value = {
    isExpenseModalOpen,
    openExpenseModal,
    closeExpenseModal,
    isGroupModalOpen,
    openGroupModal,
    closeGroupModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
