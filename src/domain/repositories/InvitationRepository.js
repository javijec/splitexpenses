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

  async deleteInvitation(invitationId) {
    return await this.firestoreCRUD.deleteDocument(invitationId);
  }
}

export default InvitationRepository;
