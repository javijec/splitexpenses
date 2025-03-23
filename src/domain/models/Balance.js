class Balance {
  constructor(id, balances, updatedAt) {
    this.id = id; // ID equal to groupId
    this.balances = balances; // Object mapping userId to balance details
    this.updatedAt = updatedAt; // Timestamp of when the balance was last updated
  }
}

export default Balance;