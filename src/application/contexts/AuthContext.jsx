import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logoutAccount = async () => authRepository.logout();

  const deleteAccount = async () => {
    try {
      await authRepository.deleteUser(user);
      await userRepository.deleteUser(user.uid);
      console.log("User deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateAccount = async (userData) => {
    try {
      await authRepository.updateUser(user.uid, userData);
      console.log("User updated");
      setUser({ ...user, ...userData });
      await userRepository.updateUser(user.uid, userData);
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
