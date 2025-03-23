import FirestoreCRUD from "@/infrastructure/database/FirestoreCRUD";

class InvitationRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("invitations");
  }

  async createInvitation(invitationData) {
    return await this.firestoreCRUD.createDocument(invitationData);
  }

  async getInvitations() {
    return await this.firestoreCRUD.readDocuments();
  }

  async updateInvitation(invitationId, updatedData) {
    return await this.firestoreCRUD.updateDocument(invitationId, updatedData);
  }

  async deleteInvitation(invitationId) {
    return await this.firestoreCRUD.deleteDocument(invitationId);
  }
}

export default InvitationRepository;