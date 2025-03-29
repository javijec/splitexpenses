import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";
import { withErrorHandling } from "@/utils/errorHandler";

class ExpenseRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("expenses");
    this.createExpense = withErrorHandling(
      this._createExpense.bind(this),
      "ExpenseRepository.createExpense"
    );
    this.getExpenses = withErrorHandling(
      this._getExpenses.bind(this),
      "ExpenseRepository.getExpenses"
    );
    this.updateExpense = withErrorHandling(
      this._updateExpense.bind(this),
      "ExpenseRepository.updateExpense"
    );
    this.deleteExpense = withErrorHandling(
      this._deleteExpense.bind(this),
      "ExpenseRepository.deleteExpense"
    );
  }

  async _createExpense(expenseData) {
    return await this.firestoreCRUD.createDocument(expenseData);
  }

  async _getExpenses() {
    return await this.firestoreCRUD.readDocuments();
  }

  async _updateExpense(expenseId, updatedData) {
    return await this.firestoreCRUD.updateDocument(expenseId, updatedData);
  }

  async _deleteExpense(expenseId) {
    return await this.firestoreCRUD.deleteDocument(expenseId);
  }
}

export default ExpenseRepository;