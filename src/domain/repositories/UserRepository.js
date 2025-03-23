import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";

class UserRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("users");
  }

  async createUser(userData) {
    return await this.firestoreCRUD.createDocument(userData);
  }

  async getUsers() {
    return await this.firestoreCRUD.readDocuments();
  }

  async updateUser(userId, updatedData) {
    return await this.firestoreCRUD.updateDocument(userId, updatedData);
  }

  async deleteUser(userId) {
    return await this.firestoreCRUD.deleteDocument(userId);
  }
}

export default UserRepository;