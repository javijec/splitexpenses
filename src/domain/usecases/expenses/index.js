import ExpenseRepository from "@/domain/repositories/ExpenseRepository";
import Expense from "@/domain/models/Expense";

export const createExpense = async (expenseData) => {
  if (!expenseData) {
    console.error("Expense data is required");
    return;
  }

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
  try {
    await expenseRepository.createExpense(expense);
    return expense;
  } catch (error) {
    console.error("Error creating expense:", error);
    return null;
  }
};

export const getExpense = async (expenseId) => {
  if (!expenseId) {
    console.error("Expense ID is required");
    return null;
  }

  const expenseRepository = new ExpenseRepository();
  try {
    const expenses = await expenseRepository.getExpenses();
    return expenses.find((expense) => expense.id === expenseId) || null;
  } catch (error) {
    console.error("Error fetching expense:", error);
    return null;
  }
};

export const getExpenses = async () => {
  const expenseRepository = new ExpenseRepository();
  try {
    return await expenseRepository.getExpenses();
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};

export const updateExpense = async (expenseId, expenseData) => {
  if (!expenseId || !expenseData) {
    console.error("Expense ID and data are required");
    return;
  }

  const expenseRepository = new ExpenseRepository();
  try {
    await expenseRepository.updateExpense(expenseId, expenseData);
  } catch (error) {
    console.error("Error updating expense:", error);
  }
};



export const deleteExpense = async (expenseId) => {
  if (!expenseId) {
    console.error("Expense ID is required");
    return;
  }

  const expenseRepository = new ExpenseRepository();
  try {
    await expenseRepository.deleteExpense(expenseId);
    return await getExpenses();
  } catch (error) {
    console.error("Error deleting expense:", error);
    return [];
  }
};

export const deleteGroupExpenses = async (groupId) => {
  if (!groupId) {
    console.error("Group ID is required");
    return;
  }

  try {
    const expenses = await getGroupExpenses(groupId);
    const deletePromises = expenses.map((expense) => deleteExpense(expense.id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting group expenses:", error);
  }
};

export const getGroupExpenses = async (groupId) => {
  if (!groupId) {
    console.error("Group ID is required");
    return [];
  }

  try {
    const expenses = await getExpenses();
    return expenses.filter((expense) => expense.groupId === groupId);
  } catch (error) {
    console.error("Error fetching group expenses:", error);
    return [];
  }
};

export const calculateSplits = async (expenseId) => {
  if (!expenseId) {
    console.error("Expense ID is required");
    return null;
  }

  // Implementación pendiente
};
