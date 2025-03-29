import ExpenseRepository from "@/domain/repositories/ExpenseRepository";
import Expense from "@/domain/models/Expense";

// Exporta los casos de uso relacionados con gastos

export const createExpense = async (expenseData) => {
  const expenseRepository = new ExpenseRepository();
  const expense = new Expense(
    expenseData.description,
    expenseData.amount,
    expenseData.groupId,
    expenseData.paidBy,
    expenseData.splitType,
    expenseData.splits,
    expenseData.active,
    new Date(),
    new Date()
  );
  console.log(expense);
  await expenseRepository.createExpense(expense);
  return expense;
};

export const getExpense = async (expenseId) => {
  const data = await ExpenseRepository.getExpenses();
  return data.find((expense) => expense.id === expenseId);
};

export const getExpenses = async () => {
  const expenseRepository = new ExpenseRepository();
  return await expenseRepository.getExpenses();
};

export const updateExpense = async (expenseId, expenseData) => {
  // Implementación pendiente
};

export const deleteExpense = async (expenseId) => {
  await ExpenseRepository.deleteExpense(expenseId);
};

export const deleteGroupExpenses = async (groupId) => {
  const expenses = await getGroupExpenses(groupId);
  const deletePromises = expenses.map((expense) => deleteExpense(expense.id));
  await Promise.all(deletePromises);
};

export const getGroupExpenses = async (groupId) => {
  const data = await getExpenses();
  console.log("data", data.data);
  // Ensure data is an array before filtering
  if (!Array.isArray(data.data)) {
    return [];
  }
  const result = data.data.filter((expense) => expense.groupId === groupId);
  return result;
};

export const calculateSplits = async (expenseId) => {
  // Implementación pendiente
};
