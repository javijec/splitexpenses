import React from "react";
import {
  Typography,
  Box,
  Avatar,
  Tooltip,
  IconButton,
  Paper,
  Stack,
  alpha,
  useTheme,
  Chip,
  Fade,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Email as EmailIcon,
  MarkEmailRead as MarkEmailReadIcon,
  AlternateEmail as AlternateEmailIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

// Componente para mostrar una invitación individual
const InvitationItem = ({ invitation, isAdmin, onDelete }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            color: theme.palette.primary.main,
            width: 45,
            height: 45,
            border: "2px solid",
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
          }}
        >
          <AlternateEmailIcon />
        </Avatar>

        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {invitation.invitedEmail}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 0.5, alignItems: "center" }}
          >
            <PersonIcon
              sx={{
                fontSize: "0.9rem",
                color: (theme) => alpha(theme.palette.text.secondary, 0.7),
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Invitado por {invitation.invitedBy}
            </Typography>
          </Stack>

          <Chip
            icon={<MarkEmailReadIcon sx={{ fontSize: "0.9rem !important" }} />}
            label="Pendiente"
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              mt: 1,
              height: 22,
              fontSize: "0.7rem",
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>

      {isAdmin && (
        <Tooltip title="Eliminar invitación" arrow>
          <IconButton
            onClick={onDelete}
            size="small"
            sx={{
              color: theme.palette.error.main,
              bgcolor: alpha(theme.palette.error.main, 0.1),
              "&:hover": {
                bgcolor: alpha(theme.palette.error.main, 0.2),
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Paper>
  );
};

// Componente para mostrar cuando no hay invitaciones
const EmptyInvitationsState = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        border: "1px dashed",
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          width: 70,
          height: 70,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
          color: "primary.main",
          mb: 1,
        }}
      >
        <EmailIcon sx={{ fontSize: "2rem" }} />
      </Avatar>

      <Typography variant="h6" fontWeight="bold" color="text.primary">
        No hay invitaciones pendientes
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 400, mx: "auto" }}
      >
        Cuando invites a nuevos miembros al grupo, las invitaciones aparecerán
        aquí
      </Typography>
    </Paper>
  );
};

export const InvitationsListCard = ({
  invitations = [],
  isAdmin,
  onDeleteInvitation,
}) => {
  // Si no hay invitaciones y no estamos en modo admin, no mostramos nada
  if (!invitations.length && !isAdmin) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        overflow: "hidden",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          pl: 3,
          borderBottom: "1px solid",
          borderColor: (theme) => alpha(theme.palette.divider, 0.1),
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
            <EmailIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Invitaciones pendientes
          </Typography>
        </Stack>

        {invitations.length > 0 && (
          <Chip
            label={invitations.length}
            color="primary"
            size="small"
            sx={{
              height: 24,
              minWidth: 24,
              fontWeight: "bold",
            }}
          />
        )}
      </Box>

      <Box sx={{ p: 3 }}>
        {invitations.length > 0 ? (
          <Fade in={true} timeout={500}>
            <Box>
              {invitations.map((invitation) => (
                <InvitationItem
                  key={invitation.id}
                  invitation={invitation}
                  isAdmin={isAdmin}
                  onDelete={() => onDeleteInvitation(invitation.id)}
                />
              ))}
            </Box>
          </Fade>
        ) : (
          <EmptyInvitationsState />
        )}
      </Box>
    </Paper>
  );
};
