import * as React from "react";
import { useNavigate } from "react-router";
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
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = async () => {
    navigate("/");
  };
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const handleProfile = async () => {
    navigate("/profile");
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDashboard}
          >
            <Home />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <Add />
          </StyledFab>
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
    </React.Fragment>
  );
}
