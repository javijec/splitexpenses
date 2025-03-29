import { useState, Fragment } from "react";
import { useModal } from "@/application/contexts/ModalContext";
import { useNavigate, useLocation } from "react-router"; // Importa useLocation
import { useAuth } from "@/application/contexts/AuthContext";

import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Fab,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Badge,
  Tooltip,
} from "@mui/material";
import { Home, Add, Person, Logout } from "@mui/icons-material";
import ThemeToggle from "./ThemeToggle";

const StyledFab = styled(Fab)({
  position: "absolute",
  left: 0,
  right: 0,
  margin: "0 auto",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});

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
    <Fragment>
      <AppBar
        position="fixed"
        color="primary"
        elevation={4}
        sx={{
          top: "auto",
          bottom: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(15px)",

          backgroundColor: (theme) => theme.palette.primary, // Color del tema Material UI
          border: "1px solid",
          borderColor: (theme) => theme.palette.divider,
        }}
      >
        <Toolbar
          sx={{
            padding: { xs: 1.5, sm: 2.5 },
            minHeight: 10,
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
                p: 1.2,
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Home />
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
              <StyledFab
                aria-label="add"
                onClick={handleAddButtonClick}
                sx={{
                  background: "red",
                  color: "white",
                  fontWeight: "bold",
                  width: 56,
                  height: 56,

                  "&:hover": {
                    background: "red",

                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Add />
              </StyledFab>
            </Tooltip>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ mx: 1.5, display: "flex", alignItems: "center" }}>
            <ThemeToggle />
          </Box>

          {location.pathname === "/profile" ? (
            <Tooltip title="Logout" arrow>
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{
                  transition: "all 0.2s ease",
                  p: 1.3,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(0, 0, 0, 0.08)",
                  },
                  ml: 1,
                }}
              >
                <Logout />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <Tooltip title="Mi perfil" arrow>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{
                    transition: "all 0.2s ease",
                    p: 1.3,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.04)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.08)",
                    },
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
                        width: 10,
                        height: 10,
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
                        width: 42,
                        height: 42,
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
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 5,
                  sx: {
                    borderRadius: 3,
                    minWidth: 200,
                    overflow: "visible",
                    mt: 1.5,
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 8px 20px rgba(0, 0, 0, 0.3)"
                        : "0 8px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "bottom" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                arrow
              >
                <MenuItem
                  sx={{
                    py: 2,
                    px: 2.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {user ? user.displayName : ""}
                    </Typography>
                    {user?.email && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.8rem" }}
                      >
                        {user.email}
                      </Typography>
                    )}
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={handleProfile}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "action.hover",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <Person sx={{ mr: 1.5, color: "primary.main" }} />
                  <Typography variant="body1">Perfil</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    color: "error.main",
                    transition: "all 0.2s",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    mt: 1,
                    "&:hover": {
                      bgcolor: "error.light",
                      color: "error.dark",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <Logout sx={{ mr: 1.5 }} />
                  <Typography variant="body1">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
