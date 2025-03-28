import GroupRepository from "@/domain/repositories/GroupRepository";
import Group from "@/domain/models/Group";

export const createGroup = async (groupData) => {
  const groupRepository = new GroupRepository();
  const data = new Group(
    groupData.name,
    groupData.createdBy,
    groupData.members,
    groupData.createdAt,
    groupData.updatedAt
  );
  try {
    await groupRepository.createGroup(data);
  } catch (error) {
    console.error("Error al crear el grupo:", error);
  }
};

export const getGroupByID = async (groupId) => {
  try {
    // Access the FirestoreCRUD directly for this specific operation
    const groupRepository = new GroupRepository();
    const result = await groupRepository.getGroupByID(groupId);

    if (result.success) {
      return result.data;
    } else {
      console.error("Error al obtener el grupo:", result.error);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el grupo:", error);
    return null;
  }
};

export const getGroupsByUser = async (userId) => {
  try {
    const groupRepository = new GroupRepository();
    const result = await groupRepository.getGroups();

    if (result.success) {
      // Business logic: Filter groups where the user is a member or the creator
      const userGroups = result.data.filter(
        (group) =>
          group.createdBy === userId ||
          group.members.some((member) => member.id === userId)
      );
      return userGroups;
    } else {
      console.error("Error al obtener los grupos del usuario:", result.error);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los grupos del usuario:", error);
    return [];
  }
};

export const getMembersMailsGroup = async (groupId) => {
  try {
    const groupRepository = new GroupRepository();
    const result = await groupRepository.getGroupByID(groupId);

    if (result.success) {
      const group = result.data;
      return group.members.map((member) => member.email);
    }
  } catch (error) {
    console.error("Error al obtener los miembros del grupo:", error);
    return [];
  }
};

export const updateGroup = async (groupId, groupData) => {
  const groupRepository = new GroupRepository();
  const data = new Group(
    groupData.name,
    groupData.createdBy,
    groupData.members,
    groupData.createdAt,
    groupData.updatedAt
  );
  try {
    await groupRepository.updateGroup(groupId, data);
  } catch (error) {
    console.error("Error al actualizar el grupo:", error);
  }
};

export const deleteGroup = async (groupId) => {
  const groupRepository = new GroupRepository();
  try {
    await groupRepository.deleteGroup(groupId);
  } catch (error) {
    console.error("Error al eliminar el grupo:", error);
  }
};

export const addMember = async (groupId, member) => {
  const groupRepository = new GroupRepository();
  const memberData = {
    id: member.uid,
    displayName: member.displayName,
    email: member.email,
  };
  try {
    const group = await groupRepository.getGroupByID(groupId);
    if (group) {
      const updatedMembers = [...group.data.members, memberData];
      const updatedGroup = new Group(
        group.data.name,
        group.data.createdBy,
        updatedMembers,
        group.data.createdAt,
        new Date()
      );
      await groupRepository.updateGroup(groupId, updatedGroup);
    }
  } catch (error) {
    console.error("Error al agregar el miembro:", error);
  }
};

export const removeMember = async (groupId, memberId) => {
  const groupRepository = new GroupRepository();
  try {
    const group = await groupRepository.getGroupByID(groupId);
    if (group) {
      const updatedMembers = group.data.members.filter(
        (m) => m.id !== memberId
      );
      const updatedGroup = new Group(
        group.data.name,
        group.data.createdBy,
        updatedMembers,
        group.data.createdAt,
        new Date()
      );
      await groupRepository.updateGroup(groupId, updatedGroup);
    }
  } catch (error) {
    console.error("Error al eliminar el miembro:", error);
  }
};
