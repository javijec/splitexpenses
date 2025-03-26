import Invitation from "@/domain/models/Invitation";
import InvitationRepository from "@/domain/repositories/InvitationRepository";

// Exporta los casos de uso relacionados con invitaciones

export const createInvitation = async (invitationData) => {
  const invitationRepository = new InvitationRepository();
  const data = new Invitation(
    invitationData.groupId,
    invitationData.groupName,
    invitationData.invitedBy,
    invitationData.invitedEmail,
    invitationData.status,
    invitationData.createdAt
  );
  console.log(data);
  try {
    await invitationRepository.createInvitation(data);
  } catch (error) {
    console.error("Error al crear la invitación:", error);
  }
};

export const getInvitationbyEmail = async (userEmail) => {
  try {
    const invitationRepository = new InvitationRepository();
    const result = await invitationRepository.getInvitations();

    if (result.success) {
      // Business logic: Filter groups where the user is a member or the creator
      const userInvitations = result.data.filter(
        (invitation) => invitation.invitedEmail === userEmail
      );
      return userInvitations;
    } else {
      console.error("Error al obtener invitaciones del usuario:", result.error);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener las invitaciones del usuario:", error);
    return [];
  }
};

export const deleteInvitation = async (invitationId) => {
  // Implementación pendiente
};
