class Expense {
  constructor(
    description,
    amount,
    groupId,
    paidBy,
    splitType,
    splits,
    active,
    createdAt,
    updatedAt
  ) {
    this.description = description; // Description of the expense
    this.amount = amount; // Amount of the expense
    this.groupId = groupId; // Reference to the group
    this.paidBy = paidBy; // Array of objects with memberId and value
    this.splitType = splitType; // Type of split ('equal', 'amount', 'percentage')
    this.splits = splits; // Array of objects with memberId and value
    this.active = active; // Boolean indicating if the expense is active
    this.createdAt = createdAt; // Timestamp of when the expense was created
    this.updatedAt = updatedAt; // Timestamp of when the expense was last updated
  }
}

export default Expense;
