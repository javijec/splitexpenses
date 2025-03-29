import { UserRepository } from "@/domain/repositories/UserRepository";
import User from "@/domain/models/User";

export const createUser = async (user) => {
  const userRepository = new UserRepository();
  if (user) {
    const existingUsers = await userRepository.getUsers();
    const existingUser = existingUsers.find((u) => u.uid === user.uid);

    if (existingUser) {
      return;
    }

    const userData = new User(
      user.uid,
      user.displayName,
      user.email,
      user.photoURL,
      user.providerData
    );

    try {
      await userRepository.createUser(userData);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  }
};

export const getUserName = async (id) => {
  const userRepository = new UserRepository();
  const user = await userRepository.getUser(id);
  return user.data.displayName;
};

export const updateUser = async (userId, userData) => {
  // Implementación pendiente
};

export const deleteUser = async (userId) => {
  // Implementación pendiente
};
