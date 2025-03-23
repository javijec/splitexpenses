import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";

class GroupRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("groups");
  }

  async createGroup(groupData) {
    return await this.firestoreCRUD.createDocument(groupData);
  }

  async getGroups() {
    return await this.firestoreCRUD.readDocuments();
  }

  async updateGroup(groupId, updatedData) {
    return await this.firestoreCRUD.updateDocument(groupId, updatedData);
  }

  async deleteGroup(groupId) {
    return await this.firestoreCRUD.deleteDocument(groupId);
  }
}

export default GroupRepository;