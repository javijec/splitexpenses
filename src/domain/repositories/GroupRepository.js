import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";
import { withErrorHandling } from "@/utils/errorHandler";

class GroupRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("groups");
    this.createGroup = withErrorHandling(
      this._createGroup.bind(this),
      "GroupRepository.createGroup"
    );
    this.getGroups = withErrorHandling(
      this._getGroups.bind(this),
      "GroupRepository.getGroups"
    );
    this.getGroupByID = withErrorHandling(
      this._getGroupByID.bind(this),
      "GroupRepository.getGroupByID"
    );
    this.updateGroup = withErrorHandling(
      this._updateGroup.bind(this),
      "GroupRepository.updateGroup"
    );
    this.deleteGroup = withErrorHandling(
      this._deleteGroup.bind(this),
      "GroupRepository.deleteGroup"
    );
  }

  async _createGroup(groupData) {
    return await this.firestoreCRUD.createDocument(groupData);
  }

  async _getGroups() {
    return await this.firestoreCRUD.readDocuments();
  }

  async _getGroupByID(groupId) {
    return await this.firestoreCRUD.readDocument(groupId);
  }

  async _updateGroup(groupId, updatedData) {
    return await this.firestoreCRUD.updateDocument(groupId, updatedData);
  }

  async _deleteGroup(groupId) {
    return await this.firestoreCRUD.deleteDocument(groupId);
  }
}

export default GroupRepository;
