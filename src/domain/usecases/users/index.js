import { UserRepository } from "@/domain/repositories/UserRepository";
import User from "@/domain/models/User";

export const createUser = async (user) => {
  if (!user) {
    console.error("User data is required");
    return;
  }

  const userRepository = new UserRepository();
  try {
    const existingUsers = await userRepository.getUsers();
    const existingUser = existingUsers.find((u) => u.uid === user.uid);

    if (existingUser) {
      console.warn("User already exists");
      return;
    }

    const userData = new User(
      user.uid,
      user.displayName,
      user.email,
      user.photoURL,
      user.providerData
    );

    await userRepository.createUser(userData);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const getUserName = async (id) => {
  if (!id) {
    console.error("User ID is required");
    return null;
  }

  const userRepository = new UserRepository();
  try {
    const user = await userRepository.getUser(id);
    return user?.displayName || null;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return null;
  }
};

export const updateUser = async (userId, userData) => {
  if (!userId || !userData) {
    console.error("User ID and data are required");
    return;
  }

  const userRepository = new UserRepository();
  try {
    await userRepository.updateUser(userId, userData);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const deleteUser = async (userId) => {
  if (!userId) {
    console.error("User ID is required");
    return;
  }

  const userRepository = new UserRepository();
  try {
    await userRepository.deleteUser(userId);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
