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
} from "@mui/material";
import { Home, Add } from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
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
    } else {
      console.log("Open Default Modal");
    }
  };

  return (
    <Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          {location.pathname !== "/" && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDashboard}
            >
              <Home />
            </IconButton>
          )}
          {!location.pathname.startsWith("/profile") && (
            <StyledFab aria-label="add" onClick={handleAddButtonClick}>
              <Add />
            </StyledFab>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar src={user ? user.photoURL : ""} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>{user ? user.displayName : ""}</MenuItem>
            <MenuItem onClick={handleProfile}>Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
