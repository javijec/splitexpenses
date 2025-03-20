import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "@/application/contexts/AuthContext";
import Login from "@/presentation/screens/LoginSceen";
import Dashboard from "@/presentation/screens/Dashboard";
import ProtectedRoute from "@/presentation/navigation/ProtectedRoute";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/presentation/theme/theme";
import BottomAppBar from "@/presentation/components/BottomAppBar";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <BottomAppBar />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
