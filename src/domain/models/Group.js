class Group {
  constructor(name, createdBy, members, createdAt, updatedAt) {
    this.name = name; // Name of the group
    this.createdBy = createdBy; // map ID and mail of the owner
    this.members = members; // Array of member IDs
    this.createdAt = createdAt; // Timestamp of when the group was created
    this.updatedAt = updatedAt; // Timestamp of when the group was last updated
  }
}

export default Group;
