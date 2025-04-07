import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Button,
  Typography,
  Tooltip,
  Paper,
  Box,
  alpha,
  useTheme,
  Stack,
  Fade,
} from "@mui/material";

import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

// Componente para mostrar un miembro individual
const MemberItem = ({
  member,
  isAdmin,
  isCurrentUser,
  isGroupAdmin,
  onDelete,
}) => {
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
        borderColor: (theme) =>
          isGroupAdmin
            ? alpha(theme.palette.secondary.main, 0.3)
            : isCurrentUser
            ? alpha(theme.palette.primary.main, 0.3)
            : alpha(theme.palette.divider, 0.5),
        bgcolor: (theme) =>
          isGroupAdmin
            ? alpha(theme.palette.secondary.main, 0.05)
            : isCurrentUser
            ? alpha(theme.palette.primary.main, 0.05)
            : "transparent",
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
            bgcolor: (theme) =>
              isGroupAdmin
                ? alpha(theme.palette.secondary.main, 0.2)
                : isCurrentUser
                ? alpha(theme.palette.primary.main, 0.2)
                : alpha(theme.palette.grey[500], 0.2),
            color: (theme) =>
              isGroupAdmin
                ? theme.palette.secondary.main
                : isCurrentUser
                ? theme.palette.primary.main
                : theme.palette.grey[700],
            width: 45,
            height: 45,
            border: "2px solid",
            borderColor: (theme) =>
              isGroupAdmin
                ? alpha(theme.palette.secondary.main, 0.3)
                : isCurrentUser
                ? alpha(theme.palette.primary.main, 0.3)
                : "transparent",
          }}
        >
          {member.displayName?.charAt(0).toUpperCase() || "U"}
        </Avatar>

        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {member.displayName}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            {isCurrentUser && (
              <Chip
                label="Tú"
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              />
            )}

            {isGroupAdmin && (
              <Chip
                icon={<AdminIcon sx={{ fontSize: "0.9rem !important" }} />}
                label="Administrador"
                size="small"
                color="secondary"
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              />
            )}
          </Stack>
        </Box>
      </Box>

      {isAdmin && !isGroupAdmin && (
        <Tooltip title="Eliminar miembro" arrow>
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

export const MembersListCard = ({
  members,
  isAdmin,
  user,
  group,
  onInvite,
  onDeleteMember,
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
            <PeopleIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Miembros del grupo
          </Typography>
        </Stack>

        {isAdmin && (
          <Button
            variant="contained"
            size="small"
            startIcon={<PersonAddIcon />}
            onClick={onInvite}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            Invitar
          </Button>
        )}
      </Box>

      <Box sx={{ p: 3 }}>
        <Fade in={true} timeout={500}>
          <Box>
            {members.map((member) => (
              <MemberItem
                key={member.id}
                member={member}
                isAdmin={isAdmin}
                isCurrentUser={member.id === user.uid}
                isGroupAdmin={member.id === group.createdBy.id}
                onDelete={() => onDeleteMember(member.id)}
              />
            ))}
          </Box>
        </Fade>
      </Box>
    </Paper>
  );
};
