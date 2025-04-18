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
  const [groupContext, setGroupContext] = useState(null);
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
      await userRepository.deleteUser(user.uid);
      await logoutAccount();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateAccount = async (userData) => {
    try {
      setLoading(true);
      await userRepository.updateUser(user.uid, userData);
      setUser({ ...user, ...userData });
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    groupContext,
    setGroupContext,
    loading,
    logoutAccount,
    deleteAccount,
    updateAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
