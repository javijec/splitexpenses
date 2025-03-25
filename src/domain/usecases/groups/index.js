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
    const result = await groupRepository.getGroupById(groupId);

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
    // Get all groups
    const result = await groupRepository.getGroups();

    if (result.success) {
      // Business logic: Filter groups where the user is a member or the creator
      const userGroups = result.data.filter(
        (group) =>
          group.createdBy === userId ||
          (group.members && group.members.includes(userId))
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

export const updateGroup = async (groupId, groupData) => {
  // Implementación pendiente
};

export const deleteGroup = async (groupId) => {
  // Implementación pendiente
};

export const addMember = async (groupId, memberId) => {
  // Implementación pendiente
};

export const removeMember = async (groupId, memberId) => {
  // Implementación pendiente
};
