import React from "react";
import {
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
  useTheme,
  alpha,
  Stack,
  Grid,
} from "@mui/material";
import {
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import ProfileUpdateForm from "@/presentation/components/profile/ProfileUpdateForm";

const UserInfoCard = ({
  user,
  displayName,
  setDisplayName,
  loading,
  handleUpdateProfile,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        overflow: "hidden",
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          borderBottom: "1px solid",
          borderColor: (theme) => alpha(theme.palette.divider, 0.1),
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
              color: "primary.main",
              width: 40,
              height: 40,
            }}
          >
            <PersonIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Información de Usuario
          </Typography>
        </Stack>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3 }}>
        {/* Información básica del usuario */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={user?.photoURL}
                  alt={user?.displayName || "Usuario"}
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                    color: theme.palette.primary.main,
                    border: "2px solid",
                    borderColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.3),
                  }}
                >
                  {user?.displayName?.charAt(0) || "U"}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {user?.displayName || "Usuario"}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <EmailIcon
                      sx={{
                        fontSize: "0.9rem",
                        color: (theme) =>
                          alpha(theme.palette.text.secondary, 0.7),
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Formulario de actualización */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.divider, 0.1),
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.15),
                color: "secondary.main",
                width: 36,
                height: 36,
              }}
            >
              <AccountCircleIcon fontSize="small" />
            </Avatar>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.primary"
            >
              Actualiza tu información de perfil
            </Typography>
          </Stack>

          <ProfileUpdateForm
            displayName={displayName}
            setDisplayName={setDisplayName}
            loading={loading}
            handleUpdateProfile={handleUpdateProfile}
          />
        </Paper>
      </Box>
    </Paper>
  );
};

export default UserInfoCard;
