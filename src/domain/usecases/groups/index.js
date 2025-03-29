import GroupRepository from "@/domain/repositories/GroupRepository";
import Group from "@/domain/models/Group";

export const createGroup = async (groupData) => {
  if (!groupData) {
    console.error("Group data is required");
    return;
  }

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
    console.error("Error creating group:", error);
  }
};

export const getGroupByID = async (groupId) => {
  if (!groupId) {
    console.error("Group ID is required");
    return null;
  }

  const groupRepository = new GroupRepository();
  try {
    return await groupRepository.getGroupByID(groupId);
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    return null;
  }
};

export const getGroupsByUser = async (userId) => {
  if (!userId) {
    console.error("User ID is required");
    return [];
  }

  const groupRepository = new GroupRepository();
  try {
    const groups = await groupRepository.getGroups();
    return groups.filter(
      (group) =>
        group.createdBy === userId ||
        group.members.some((member) => member.id === userId)
    );
  } catch (error) {
    console.error("Error fetching groups by user:", error);
    return [];
  }
};

export const getMembersMailsGroup = async (groupId) => {
  if (!groupId) {
    console.error("Group ID is required");
    return [];
  }

  const groupRepository = new GroupRepository();
  try {
    const group = await groupRepository.getGroupByID(groupId);
    return group.members.map((member) => member.email);
  } catch (error) {
    console.error("Error fetching group members' emails:", error);
    return [];
  }
};

export const updateGroup = async (groupId, groupData) => {
  if (!groupId || !groupData) {
    console.error("Group ID and data are required");
    return;
  }

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
    console.error("Error updating group:", error);
  }
};

export const deleteGroup = async (groupId) => {
  if (!groupId) {
    console.error("Group ID is required");
    return;
  }

  const groupRepository = new GroupRepository();
  try {
    await groupRepository.deleteGroup(groupId);
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};

export const addMember = async (groupId, member) => {
  if (!groupId || !member) {
    console.error("Group ID and member data are required");
    return;
  }

  const groupRepository = new GroupRepository();
  const memberData = {
    id: member.uid,
    displayName: member.displayName,
    email: member.email,
  };
  try {
    const group = await groupRepository.getGroupByID(groupId);
    if (group) {
      const updatedMembers = [...group.members, memberData];
      const updatedGroup = new Group(
        group.name,
        group.createdBy,
        updatedMembers,
        group.createdAt,
        new Date()
      );
      await groupRepository.updateGroup(groupId, updatedGroup);
    }
  } catch (error) {
    console.error("Error adding member:", error);
  }
};

export const removeMember = async (groupId, memberId) => {
  if (!groupId || !memberId) {
    console.error("Group ID and member ID are required");
    return;
  }

  const groupRepository = new GroupRepository();
  try {
    const group = await groupRepository.getGroupByID(groupId);
    if (group) {
      const updatedMembers = group.members.filter((m) => m.id !== memberId);
      const updatedGroup = new Group(
        group.name,
        group.createdBy,
        updatedMembers,
        group.createdAt,
        new Date()
      );
      await groupRepository.updateGroup(groupId, updatedGroup);
    }
  } catch (error) {
    console.error("Error removing member:", error);
  }
};
