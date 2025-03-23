import React, { createContext, useState, useContext } from "react";

const GroupModalContext = createContext();

export const useGroupModal = () => useContext(GroupModalContext);

export const GroupModalProvider = ({ children }) => {
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);

  const openGroupModal = () => setGroupModalOpen(true);
  const closeGroupModal = () => setGroupModalOpen(false);

  return (
    <GroupModalContext.Provider
      value={{ isGroupModalOpen, openGroupModal, closeGroupModal }}
    >
      {children}
    </GroupModalContext.Provider>
  );
};
