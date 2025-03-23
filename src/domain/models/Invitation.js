class Invitation {
  constructor(id, groupId, invitedEmail, invitedBy, status = 'pending', createdAt) {
    this.id = id; // Automatically generated ID
    this.groupId = groupId; // Reference to the group
    this.invitedEmail = invitedEmail; // Email of the invited person
    this.invitedBy = invitedBy; // ID of the user who invites
    this.status = status; // Status of the invitation, default is 'pending'
    this.createdAt = createdAt; // Timestamp of when the invitation was created
  }
}

export default Invitation;