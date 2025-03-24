import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/infrastructure/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { AuthRepository } from "@/domain/repositories/AuthRepository";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userRepository = new UserRepository();
  const authRepository = new AuthRepository();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logoutAccount = async () => authRepository.logout();

  const deleteAccount = async (user) => {
    try {
      await authRepository.deleteAccount();
      await userRepository.deleteUser(user.uid);
      console.log("User deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateAccount = async (userData) => {
    console.log(user.uid);
    console.log(userData);
    try {
      await userRepository.updateUser(user.uid, userData);
      setUser({ ...user, ...userData });
      console.log("User updated");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const value = {
    user,
    loading,
    logoutAccount,
    deleteAccount,
    updateAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
