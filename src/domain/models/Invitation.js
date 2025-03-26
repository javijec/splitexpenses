class Invitation {
  constructor(
    groupId,
    groupName,
    invitedBy,
    invitedEmail,
    status = "pending",
    createdAt
  ) {
    this.groupId = groupId; // Reference to the group
    this.groupName = groupName; // Reference to the group
    this.invitedBy = invitedBy; // Reference to the user who invited the
    this.invitedEmail = invitedEmail; // Email of the invited person
    this.status = status; // Status of the invitation, default is 'pending'
    this.createdAt = createdAt; // Timestamp of when the invitation was created
  }
}

export default Invitation;
