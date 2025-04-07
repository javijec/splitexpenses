import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  useTheme,
  alpha,
  Chip,
  Stack,
} from "@mui/material";
import { useAuth } from "@/application/contexts/AuthContext";
import { WavingHand } from "@mui/icons-material";

const HeaderDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();

  // Obtener la hora del día para personalizar el saludo
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.12
          )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
        mb: 3,
      }}
    >
      {/* Círculos decorativos */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: (theme) => alpha(theme.palette.primary.main, 0.1),
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          right: 40,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: (theme) => alpha(theme.palette.primary.main, 0.07),
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Avatar
          sx={{
            width: 60,
            height: 60,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "2px solid white",
          }}
        >
          {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
        </Avatar>

        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 0.5 }}
          >
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              {getGreeting()}, {user?.displayName?.split(" ")[0] || "Usuario"}
            </Typography>
            <WavingHand sx={{ color: theme.palette.warning.main, ml: 0.5 }} />
          </Stack>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ opacity: 0.9 }}
          >
            Gestiona tus grupos y revisa tus invitaciones pendientes
          </Typography>

          {user?.email && (
            <Chip
              label={user.email}
              size="small"
              variant="outlined"
              sx={{
                mt: 1,
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
                fontSize: "0.75rem",
                height: 24,
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default HeaderDashboard;
