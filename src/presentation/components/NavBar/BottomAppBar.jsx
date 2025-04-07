import React from "react";
import { useModal } from "@/application/contexts/ModalContext";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "@/application/contexts/AuthContext";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Fab,
  Avatar,
  Typography,
  Tooltip,
  Container,
  alpha,
  Zoom,
  Slide,
} from "@mui/material";
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import ThemeToggle from "@/presentation/components/common/ThemeToggle";

export default function BottomAppBar() {
  const { user, logoutAccount } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { openExpenseModal, openGroupModal } = useModal();

  // Determinar si estamos en la página de dashboard
  const isDashboard = location.pathname === "/dashboard";
  // Determinar si estamos en la página de perfil
  const isProfile = location.pathname.startsWith("/profile");
  // Determinar si estamos en la página de un grupo
  const isGroup = location.pathname.startsWith("/group");

  // Navegar al dashboard
  const handleDashboard = () => navigate("/dashboard");

  // Navegar al perfil
  const handleProfile = () => navigate("/profile");

  // Cerrar sesión
  const handleLogout = async () => {
    await logoutAccount();
    navigate("/login");
  };

  // Manejar el clic en el botón de acción principal
  const handleAddButtonClick = () => {
    if (isGroup) {
      openExpenseModal(); // Abrir modal de gasto en página de grupo
    } else if (isDashboard) {
      openGroupModal(); // Abrir modal de grupo en dashboard
    }
  };

  // Obtener el texto del botón de acción principal
  const getActionButtonText = () => {
    if (isDashboard) return "Nuevo Grupo";
    if (isGroup) return "Nuevo Gasto";
    return "";
  };

  // Obtener el icono del botón de acción principal
  const getActionButtonIcon = () => {
    if (isDashboard) return <GroupIcon sx={{ mr: 1 }} />;
    if (isGroup) return <ReceiptIcon sx={{ mr: 1 }} />;
    return <AddIcon sx={{ mr: 1 }} />;
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(10px)",
          borderTop: "1px solid",
          borderColor: (theme) => alpha(theme.palette.divider, 0.1),
          boxShadow: (theme) =>
            `0 -4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              padding: { xs: 1, sm: 1.5 },
              minHeight: { xs: 64, sm: 70 },
              justifyContent: "space-between",
            }}
          >
            {/* Botón de inicio - visible cuando no estamos en dashboard */}
            <Zoom in={!isDashboard} timeout={500}>
              <Box>
                {!isDashboard && (
                  <Tooltip title="Ir al inicio" arrow placement="top">
                    <IconButton
                      onClick={handleDashboard}
                      sx={{
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.2),
                          transform: "translateY(-3px)",
                        },
                        width: 44,
                        height: 44,
                      }}
                    >
                      <HomeIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Zoom>

            {/* Espacio flexible para centrar el botón de acción */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Botón de acción principal - no visible en perfil */}
            {!isProfile && (
              <Zoom in={!isProfile} timeout={700}>
                <Fab
                  variant="extended"
                  color="primary"
                  aria-label={isDashboard ? "crear grupo" : "añadir gasto"}
                  onClick={handleAddButtonClick}
                  sx={{
                    position: "fixed",
                    bottom: 10,
                    left: "45%",
                    transform: "translateX(-50%)",
                    width: "auto",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                    letterSpacing: 0.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
                      transform: "translateX(-50%) translateY(-3px)",
                    },
                    zIndex: 1100,
                  }}
                >
                  {getActionButtonIcon()}
                  <Typography variant="button" fontWeight="600">
                    {getActionButtonText()}
                  </Typography>
                </Fab>
              </Zoom>
            )}

            {/* Espacio flexible para centrar el botón de acción */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Botones de la derecha */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Selector de tema siempre visible */}
              <ThemeToggle />

              {/* Botón de perfil o logout dependiendo de la página */}
              {isProfile ? (
                <Tooltip title="Cerrar sesión" arrow placement="top">
                  <IconButton
                    onClick={handleLogout}
                    sx={{
                      bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                      color: "error.main",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.2),
                        transform: "translateY(-3px)",
                      },
                      width: 44,
                      height: 44,
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Mi perfil" arrow placement="top">
                  <IconButton
                    onClick={handleProfile}
                    sx={{
                      p: 0.5,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Avatar
                      src={user?.photoURL || ""}
                      sx={{
                        width: 38,
                        height: 38,
                        border: "2px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.3),
                        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                      }}
                    >
                      {!user?.photoURL && <PersonIcon />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
