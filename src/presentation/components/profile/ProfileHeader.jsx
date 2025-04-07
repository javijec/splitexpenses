import React from "react";
import { Typography, Box, Avatar, Stack, alpha, useTheme } from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { useAuth } from "@/application/contexts/AuthContext";

const ProfileHeader = () => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <Avatar
        sx={{
          width: 80,
          height: 80,
          bgcolor: alpha(theme.palette.primary.main, 0.8),
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "3px solid white",
        }}
      >
        {user?.displayName?.charAt(0) || <AccountCircleIcon fontSize="large" />}
      </Avatar>

      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          sx={{ mb: 0.5 }}
        >
          {user?.displayName || "Mi Perfil"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona tu información personal y configuración de cuenta
        </Typography>
      </Box>
    </Stack>
  );
};

export default ProfileHeader;
