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
  try {
    await invitationRepository.createInvitation(data);
  } catch (error) {
    console.error("Error al crear la invitación:", error);
  }
};

export const getInvitations = async () => {
  try {
    const invitationRepository = new InvitationRepository();
    const result = await invitationRepository.getInvitations();

    return result;
  } catch (error) {
    console.error("Error al obtener invitaciones:", error);
  }
};

export const getInvitationbyEmail = async (userEmail) => {
  try {
    const invitationRepository = new InvitationRepository();
    const result = await invitationRepository.getInvitations();


      const userInvitations = result.filter(
        (invitation) => invitation.invitedEmail === userEmail
      );
      return userInvitations;

  } catch (error) {
    console.error("Error al obtener las invitaciones del usuario:", error);
    return [];
  }
};

export const getGroupInvitations = async (groupId) => {
  try {
    const result = await getInvitations();
    return result.filter((invitation) => invitation.groupId === groupId);
  } catch (error) {
    console.error("Error al obtener invitaciones del grupo:", error);
    return [];
  }
};

export const getInvitationByEmailAndGroup = async (userEmail, groupId) => {
  try {
    const invitations = await getInvitationbyEmail(userEmail);
    return invitations.find((invitation) => invitation.groupId === groupId);
  } catch (error) {
    console.error("Error al obtener invitaciones del usuario:", error);
    return null;
  }
};

export const deleteInvitation = async (invitationId) => {
  try {
    const invitationRepository = new InvitationRepository();
    await invitationRepository.deleteInvitation(invitationId);
  } catch (error) {
    console.error("Error al eliminar la invitación:", error);
  }
};

export const deleteGroupInvitations = async (groupId) => {
  const invitations = await getGroupInvitations(groupId);
  const deletePromises = invitations.map((invitation) => {
    deleteInvitation(invitation.id);
  });
  await Promise.all(deletePromises);
};
