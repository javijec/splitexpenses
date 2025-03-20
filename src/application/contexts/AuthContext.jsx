import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/infrastructure/config/firebase-config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { handleRedirectResult } from "@/infrastructure/services/firebaseAuthService";
import { useNavigate } from "react-router"; // Import useNavigate

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const checkRedirectResult = async () => {
      const redirectUser = await handleRedirectResult();
      if (redirectUser) {
        setUser(redirectUser);
        navigate("/dashboard"); // Redirect to dashboard
      }
    };

    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [navigate]); // Add navigate to dependency array

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
