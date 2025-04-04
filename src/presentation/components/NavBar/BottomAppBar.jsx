import { useState } from "react";
import { useModal } from "@/application/contexts/ModalContext";
import { useNavigate, useLocation } from "react-router"; // Importa useLocation
import { useAuth } from "@/application/contexts/AuthContext";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Fab,
  Avatar,
  Typography,
  Badge,
  Tooltip,
  Container,
} from "@mui/material";
import { Home, Logout } from "@mui/icons-material";
import ThemeToggle from "./ThemeToggle";

export default function BottomAppBar() {
  const { user, logoutAccount } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Obtén el path actual

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = async () => {
    navigate("/dashboard");
  };
  const handleLogout = async () => {
    handleMenuClose();
    await logoutAccount();
    navigate("/login");
  };
  const handleProfile = async () => {
    handleMenuClose();
    navigate("/profile");
  };

  const { openExpenseModal, openGroupModal } = useModal();

  const handleAddButtonClick = () => {
    if (location.pathname.startsWith("/group")) {
      openExpenseModal(); // Abre el modal usando el contexto
    } else if (location.pathname === "/dashboard") {
      openGroupModal(); // Abre el modal usando el contexto
    }
  };

  return (
    <Container>
      <AppBar
        position="fixed"
        elevation={3}
        sx={{
          top: "auto",
          bottom: 0,

          overflow: "hidden",
          backdropFilter: "blur(15px)",
          height: "auto",
        }}
      >
        <Toolbar
          sx={{
            padding: { xs: 0.8, sm: 1.5 },
            minHeight: 0,
            justifyContent: "space-between",
          }}
        >
          {location.pathname !== "/dashboard" && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDashboard}
              sx={{
                transition: "all 0.2s ease",
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.04)",
                p: 1.5,
              }}
            >
              <Home fontSize="small" />
            </IconButton>
          )}
          {!location.pathname.startsWith("/profile") && (
            <Tooltip
              title={
                location.pathname === "/dashboard"
                  ? "Crear grupo"
                  : "Añadir gasto"
              }
              arrow
              placement="top"
            >
              <Fab
                variant="extended"
                aria-label="add"
                onClick={handleAddButtonClick}
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "#d32f2f" // darker red for dark mode
                      : "#f44336", // lighter red for light mode
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "#ffffff" // white text for dark mode
                      : "#ffffff", // white text for light mode
                  fontWeight: "bold",
                  zIndex: 1000,
                }}
              >
                {location.pathname !== "/dashboard" ? (
                  <Typography>Nuevo Gasto</Typography>
                ) : (
                  <Typography>Nuevo Grupo</Typography>
                )}
              </Fab>
            </Tooltip>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {location.pathname === "/profile" ? (
            <>
              <ThemeToggle />
              <Tooltip title="Logout" arrow>
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    transition: "all 0.2s ease",
                    p: 1.5,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 0, 0, 0.37)"
                        : "rgba(0, 0, 0, 0.04)",

                    ml: 1,
                  }}
                >
                  <Logout fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Mi perfil">
                <IconButton
                  color="inherit"
                  onClick={handleProfile}
                  sx={{
                    transition: "all 0.2s ease",
                    p: 0.8,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.04)",

                    ml: 1,
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color="secondary"
                    invisible={!user}
                    sx={{
                      "& .MuiBadge-badge": {
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        boxShadow: (theme) =>
                          theme.palette.mode === "dark"
                            ? "0 0 0 2px rgba(30, 30, 35, 0.99)"
                            : "0 0 0 2px white",
                        bgcolor: (theme) =>
                          theme.palette.mode === "dark"
                            ? theme.palette.secondary.light
                            : theme.palette.secondary.main,
                      },
                    }}
                  >
                    <Avatar
                      src={user ? user.photoURL : ""}
                      sx={{
                        width: 32,
                        height: 32,
                        border: "2px solid",
                        borderColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.2)"
                            : "rgba(255, 255, 255, 0.9)",
                        boxShadow: (theme) =>
                          theme.palette.mode === "dark"
                            ? "0 3px 10px rgba(0, 0, 0, 0.3)"
                            : "0 3px 10px rgba(0, 0, 0, 0.15)",
                        transition: "all 0.2s ease",
                        bgcolor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.04)",
                      }}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}
