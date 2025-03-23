class Group {
  constructor(id, name, description, createdBy, members, createdAt, updatedAt) {
    this.id = id; // Automatically generated ID
    this.name = name; // Name of the group
    this.description = description; // Description of the group
    this.createdBy = createdBy; // ID of the owner
    this.members = members; // Array of member IDs
    this.createdAt = createdAt; // Timestamp of when the group was created
    this.updatedAt = updatedAt; // Timestamp of when the group was last updated
  }
}

export default Group;