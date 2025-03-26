import ExpenseRepository from "@/domain/repositories/ExpenseRepository";
import Expense from "@/domain/models/Expense";

// Exporta los casos de uso relacionados con gastos

export const createExpense = async (expenseData) => {
  // Implementación pendiente
};

export const getExpense = async (expenseId) => {
  const data = await ExpenseRepository.getExpenses();
  return data.find((expense) => expense.id === expenseId);
};

export const updateExpense = async (expenseId, expenseData) => {
  // Implementación pendiente
};

export const deleteExpense = async (expenseId) => {
  await ExpenseRepository.deleteExpense(expenseId);
};

export const deleteExpensesByGroup = async (groupId) => {
  const expenses = await getGroupExpenses(groupId);
  const deletePromises = expenses.map((expense) => deleteExpense(expense.id));
  await Promise.all(deletePromises);
};

export const getGroupExpenses = async (groupId) => {
  const data = await ExpenseRepository.getExpenses();
  return data.filter((expense) => expense.groupId === groupId);
};

export const calculateSplits = async (expenseId) => {
  // Implementación pendiente
};
