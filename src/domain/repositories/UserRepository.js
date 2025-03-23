import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";

class UserRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("users");
  }

  async createUser(userData) {
    return await this.firestoreCRUD.createDocument(userData);
  }

  async getUsers() {
    console.log("getUsers");
    const Users = await this.firestoreCRUD.readDocuments();
    console.log(Users);
    return Users;
  }
  async getUser(userId) {
    console.log(userId);
    return await this.firestoreCRUD.readDocument(userId);
  }

  async updateUser(userId, updatedData) {
    return await this.firestoreCRUD.updateDocument(userId, updatedData);
  }

  async deleteUser(userId) {
    return await this.firestoreCRUD.deleteDocument(userId);
  }
}

export default UserRepository;
