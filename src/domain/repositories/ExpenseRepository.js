import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";

class ExpenseRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("expenses");
  }

  async createExpense(expenseData) {
    return await this.firestoreCRUD.createDocument(expenseData);
  }

  async getExpenses() {
    return await this.firestoreCRUD.readDocuments();
  }

  async updateExpense(expenseId, updatedData) {
    return await this.firestoreCRUD.updateDocument(expenseId, updatedData);
  }

  async deleteExpense(expenseId) {
    return await this.firestoreCRUD.deleteDocument(expenseId);
  }
}

export default ExpenseRepository;