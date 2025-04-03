import React from "react";
import { Typography, Box, Avatar } from "@mui/material";
import { useAuth } from "@/application/contexts/AuthContext";

const ProfileHeader = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      <Avatar>{user?.displayName?.charAt(0) || "U"}</Avatar>
      <Box>
        <Typography>Información de la Cuenta</Typography>
        <Typography>Gestiona tu perfil y configuración personal</Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
