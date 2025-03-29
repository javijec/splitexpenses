import Invitation from "@/domain/models/Invitation";
import InvitationRepository from "@/domain/repositories/InvitationRepository";

export const createInvitation = async (invitationData) => {
  if (!invitationData) {
    console.error("Invitation data is required");
    return;
  }

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
    console.error("Error creating invitation:", error);
  }
};

export const getInvitations = async () => {
  const invitationRepository = new InvitationRepository();
  try {
    return await invitationRepository.getInvitations();
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return [];
  }
};

export const getInvitationbyEmail = async (userEmail) => {
  if (!userEmail) {
    console.error("User email is required");
    return [];
  }

  try {
    const invitations = await getInvitations();
    return invitations.filter((invitation) => invitation.invitedEmail === userEmail);
  } catch (error) {
    console.error("Error fetching user invitations:", error);
    return [];
  }
};

export const getGroupInvitations = async (groupId) => {
  if (!groupId) {
    console.error("Group ID is required");
    return [];
  }

  try {
    const invitations = await getInvitations();
    return invitations.filter((invitation) => invitation.groupId === groupId);
  } catch (error) {
    console.error("Error fetching group invitations:", error);
    return [];
  }
};

export const getInvitationByEmailAndGroup = async (userEmail, groupId) => {
  if (!userEmail || !groupId) {
    console.error("User email and group ID are required");
    return null;
  }

  try {
    const invitations = await getInvitationbyEmail(userEmail);
    return invitations.find((invitation) => invitation.groupId === groupId);
  } catch (error) {
    console.error("Error fetching invitation by email and group:", error);
    return null;
  }
};

export const deleteInvitation = async (invitationId) => {
  if (!invitationId) {
    console.error("Invitation ID is required");
    return;
  }

  const invitationRepository = new InvitationRepository();
  try {
    await invitationRepository.deleteInvitation(invitationId);
  } catch (error) {
    console.error("Error deleting invitation:", error);
  }
};

export const deleteGroupInvitations = async (groupId) => {
  if (!groupId) {
    console.error("Group ID is required");
    return;
  }

  try {
    const invitations = await getGroupInvitations(groupId);
    const deletePromises = invitations.map((invitation) => deleteInvitation(invitation.id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting group invitations:", error);
  }
};
