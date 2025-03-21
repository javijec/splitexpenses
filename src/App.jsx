import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AuthProvider } from "@/application/contexts/AuthContext";
import Login from "@/presentation/screens/LoginSceen";
import Main from "@/presentation/screens/MainScreen";
import ProtectedRoute from "@/presentation/navigation/ProtectedRoute";
import Profile from "@/presentation/screens/ProfileScreen";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/presentation/theme/theme";
import BottomAppBar from "@/presentation/components/BottomAppBar";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>

      {location.pathname !== "/login" && <BottomAppBar />}
    </>
  );
}

export default App;
