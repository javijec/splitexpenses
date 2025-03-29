import { withErrorHandling } from "@/utils/errorHandler";

class InvitationRepository {
  constructor() {
    this.firestoreCRUD = new FirestoreCRUD("invitations");
    this.createInvitation = withErrorHandling(
      this._createInvitation.bind(this),
      "InvitationRepository.createInvitation"
    );
    this.getInvitations = withErrorHandling(
      this._getInvitations.bind(this),
      "InvitationRepository.getInvitations"
    );
    this.deleteInvitation = withErrorHandling(
      this._deleteInvitation.bind(this),
      "InvitationRepository.deleteInvitation"
    );
  }

  async _createInvitation(invitationData) {
    return await this.firestoreCRUD.createDocument(invitationData);
  }

  async _getInvitations() {
    return await this.firestoreCRUD.readDocuments();
  }

  async _deleteInvitation(invitationId) {
    return await this.firestoreCRUD.deleteDocument(invitationId);
  }
}

export default InvitationRepository;
