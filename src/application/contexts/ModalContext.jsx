import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isDeleteGroupModalOpen, setDeleteGroupModalOpen] = useState(false);

  const openExpenseModal = () => setExpenseModalOpen(true);
  const closeExpenseModal = () => setExpenseModalOpen(false);
  const openGroupModal = () => setGroupModalOpen(true);
  const closeGroupModal = () => setGroupModalOpen(false);
  const openInviteModal = () => setInviteModalOpen(true);
  const closeInviteModal = () => setInviteModalOpen(false);
  const openDeleteGroupModal = () => setDeleteGroupModalOpen(true);
  const closeDeleteGroupModal = () => setDeleteGroupModalOpen(false);

  // Provide the value to the contex
  const value = {
    isExpenseModalOpen,
    openExpenseModal,
    closeExpenseModal,
    isGroupModalOpen,
    openGroupModal,
    closeGroupModal,
    isInviteModalOpen,
    openInviteModal,
    closeInviteModal,
    isDeleteGroupModalOpen,
    openDeleteGroupModal,
    closeDeleteGroupModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
