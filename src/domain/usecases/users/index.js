import UserRepository from "@/domain/repositories/UserRepository";
import User from "@/domain/models/User";

export const createUser = async (user) => {
  console.log("createUser");
  const userRepository = new UserRepository();
  if (user) {
    const existingUsers = await userRepository.getUsers();
    console.log("existingUsers");
    const existingUser = existingUsers.find((u) => u.uid === user.uid);

    if (existingUser) {
      console.log("El usuario ya existe en la base de datos");
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
      console.log("Usuario creado exitosamente");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  }
};

export const getUser = async () => {
  // Implementación pendiente
};

export const updateUser = async (userId, userData) => {
  // Implementación pendiente
};

export const deleteUser = async (userId) => {
  // Implementación pendiente
};
