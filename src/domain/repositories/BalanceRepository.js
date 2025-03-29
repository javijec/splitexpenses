import { withErrorHandling } from "@/utils/errorHandler";

class BalanceRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("balances");
    this.createBalance = withErrorHandling(
      this._createBalance.bind(this),
      "BalanceRepository.createBalance"
    );
    this.getBalances = withErrorHandling(
      this._getBalances.bind(this),
      "BalanceRepository.getBalances"
    );
    this.updateBalance = withErrorHandling(
      this._updateBalance.bind(this),
      "BalanceRepository.updateBalance"
    );
    this.deleteBalance = withErrorHandling(
      this._deleteBalance.bind(this),
      "BalanceRepository.deleteBalance"
    );
  }

  async _createBalance(balanceData) {
    return await this.firestoreCRUD.createDocument(balanceData);
  }

  async _getBalances() {
    return await this.firestoreCRUD.readDocuments();
  }

  async _updateBalance(balanceId, updatedData) {
    return await this.firestoreCRUD.updateDocument(balanceId, updatedData);
  }

  async _deleteBalance(balanceId) {
    return await this.firestoreCRUD.deleteDocument(balanceId);
  }
}

export default BalanceRepository;