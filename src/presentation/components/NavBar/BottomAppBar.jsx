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
import { Home, Add, Person, Logout, AccountCircle } from "@mui/icons-material";
import ThemeToggle from "./ThemeToggle";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
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
    await logoutAccount();
    navigate("/login");
  };
  const handleProfile = async () => {
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
        elevation={3}
        sx={{
          top: "auto",
          bottom: 0,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: "hidden",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? `linear-gradient(rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.95))`
              : `linear-gradient(rgba(255, 255, 255, 0.9), rgba(245, 245, 245, 0.95))`,
        }}
      >
        <Toolbar sx={{ padding: { xs: 1, sm: 2 }, minHeight: 64 }}>
          {location.pathname !== "/dashboard" && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDashboard}
              sx={{
                transition: "all 0.2s ease",
                "&:hover": { transform: "scale(1.1)" },
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
                color="secondary"
                onClick={handleAddButtonClick}
                sx={{
                  background:
                    "linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)",
                }}
              >
                <Add />
              </StyledFab>
            </Tooltip>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Cambiar tema" arrow>
            <Box sx={{ mx: 1 }}>
              <ThemeToggle />
            </Box>
          </Tooltip>

          <Tooltip title="Mi perfil" arrow>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{
                transition: "all 0.2s ease",
                p: 0.5,
                "&:hover": { transform: "scale(1.05)" },
                ml: 1,
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                color="secondary"
                invisible={!user}
              >
                <Avatar
                  src={user ? user.photoURL : ""}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid",
                    borderColor: "background.paper",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
              elevation: 3,
              sx: {
                borderRadius: 2,
                minWidth: 180,
                overflow: "visible",
                mt: 1.5,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: -10,
                  right: 14,
                  width: 20,
                  height: 20,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "bottom" }}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem
              sx={{
                py: 1.5,
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
                transition: "all 0.2s",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Person sx={{ mr: 1.5, color: "primary.main" }} />
              <Typography variant="body1">Perfil</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                color: "error.main",
                transition: "all 0.2s",
                "&:hover": { bgcolor: "error.light", color: "error.dark" },
              }}
            >
              <Logout sx={{ mr: 1.5 }} />
              <Typography variant="body1">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
