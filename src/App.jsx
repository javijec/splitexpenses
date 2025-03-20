import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthContext } from "@/application/contexts/AuthContext";
import { Login } from "@/presentation/screens/LoginSceen";
import Dashboard from "@/presentation/screens/Dashboard";
import ProtectedRoute from "@/presentation/navigation/ProtectedRoute";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/presentation/theme/theme";
import BottomAppBar from "@/presentation/components/BottomAppBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
          <BottomAppBar />
        </BrowserRouter>
      </AuthContext>
    </ThemeProvider>
  );
}

export default App;
