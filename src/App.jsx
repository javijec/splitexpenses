import React from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AuthProvider } from "@/application/contexts/AuthContext";
import Login from "@/presentation/screens/auth/LoginSceen";
import Main from "@/presentation/screens/dashboard/MainScreen";
import ProtectedRoute from "@/presentation/navigation/ProtectedRoute";
import Profile from "@/presentation/screens/profile/ProfileScreen";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/presentation/theme/theme";
import BottomAppBar from "@/presentation/components/BottomAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import { useAuthStatus } from "@/application/hooks/useAuthStatus";
import NotFound from "@/presentation/screens/NotFound";
import { Navigate } from "react-router";
import GroupDetail from "@/presentation/screens/groups/GroupDetail";
import { ModalProvider } from "@/application/contexts/ModalContext";

function App() {
  const { loading } = useAuthStatus();

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <AppRoutes />
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
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
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/group/:groupId"
            element={
              <ProtectedRoute>
                <GroupDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<Navigate to="/404" replace />} />
        </Routes>

        {location.pathname !== "/login" && <BottomAppBar />}
      </Container>
    </>
  );
}

export default App;
