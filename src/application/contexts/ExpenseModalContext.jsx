import React, { createContext, useState, useContext } from "react";

const ExpenseModalContext = createContext();

export const useExpenseModal = () => useContext(ExpenseModalContext);

export const ExpenseModalProvider = ({ children }) => {
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);

  const openExpenseModal = () => setExpenseModalOpen(true);
  const closeExpenseModal = () => setExpenseModalOpen(false);

  return (
    <ExpenseModalContext.Provider
      value={{ isExpenseModalOpen, openExpenseModal, closeExpenseModal }}
    >
      {children}
    </ExpenseModalContext.Provider>
  );
};
