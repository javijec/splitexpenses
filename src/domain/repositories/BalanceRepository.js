import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";

class BalanceRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("balances");
  }

  async createBalance(balanceData) {
    return await this.firestoreCRUD.createDocument(balanceData);
  }

  async getBalances() {
    return await this.firestoreCRUD.readDocuments();
  }

  async updateBalance(balanceId, updatedData) {
    return await this.firestoreCRUD.updateDocument(balanceId, updatedData);
  }

  async deleteBalance(balanceId) {
    return await this.firestoreCRUD.deleteDocument(balanceId);
  }
}

export default BalanceRepository;