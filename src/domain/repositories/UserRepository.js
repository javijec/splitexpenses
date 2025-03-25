import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";
import { withErrorHandling } from "@/utils/errorHandler";

export class UserRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("users");
    this.createUser = withErrorHandling(
      this._createUser.bind(this),
      "UserRepository.createUser"
    );
    this.getUsers = withErrorHandling(
      this._getUsers.bind(this),
      "UserRepository.getUsers"
    );
    this.getUser = withErrorHandling(
      this._getUser.bind(this),
      "UserRepository.getUser"
    );
    this.updateUser = withErrorHandling(
      this._updateUser.bind(this),
      "UserRepository.updateUser"
    );
    this.deleteUser = withErrorHandling(
      this._deleteUser.bind(this),
      "UserRepository.deleteUser"
    );
  }

  async _createUser(userData) {
    return await this.firestoreCRUD.createDocument(userData);
  }

  async _getUsers() {
    return await this.firestoreCRUD.readDocuments();
  }

  async _getUser(userId) {
    return await this.firestoreCRUD.readDocument(userId);
  }

  async _updateUser(userId, updatedData) {
    return await this.firestoreCRUD.updateDocument(userId, updatedData);
  }

  async _deleteUser(userId) {
    return await this.firestoreCRUD.deleteDocument(userId);
  }
}
