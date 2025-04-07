import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
  Chip,
  Stack,
  alpha,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Groups as GroupsIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export const HeaderGroupDetails = ({ group, isAdmin, onDelete }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Función para volver al dashboard
  const handleBack = () => navigate("/dashboard");

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

      {/* Contenido principal */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Tooltip title="Volver al inicio" arrow>
            <IconButton
              onClick={handleBack}
              sx={{
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
                "&:hover": {
                  bgcolor: (theme) =>
                    alpha(theme.palette.background.paper, 0.9),
                },
                mb: 1,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>

          {isAdmin && (
            <Tooltip title="Eliminar grupo" arrow>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={onDelete}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  },
                }}
              >
                Eliminar grupo
              </Button>
            </Tooltip>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2.5,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Avatar
            sx={{
              width: { xs: 60, sm: 70 },
              height: { xs: 60, sm: 70 },
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
              color: "white",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "2px solid white",
            }}
          >
            {group?.name?.charAt(0) || <GroupsIcon />}
          </Avatar>

          <Box sx={{ maxWidth: { xs: "100%", sm: "auto" } }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
              sx={{
                mb: 0.5,
                fontSize: { xs: "1.5rem", sm: "2rem" },
                wordBreak: "break-word",
              }}
            >
              {group?.name || "Cargando grupo..."}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ mt: { xs: 1, sm: 0 } }}
            >
              <Chip
                icon={<GroupsIcon sx={{ fontSize: "0.9rem !important" }} />}
                label={`${group?.members?.length || 0} ${
                  (group?.members?.length || 0) === 1 ? "miembro" : "miembros"
                }`}
                size="small"
                variant="outlined"
                color="primary"
                sx={{
                  height: 24,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  bgcolor: (theme) =>
                    alpha(theme.palette.background.paper, 0.7),
                }}
              />

              {isAdmin && (
                <Chip
                  icon={<EditIcon sx={{ fontSize: "0.9rem !important" }} />}
                  label="Administrador"
                  size="small"
                  color="secondary"
                  sx={{
                    height: 24,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                />
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
