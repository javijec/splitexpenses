// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useAuth } from "@/application/contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
