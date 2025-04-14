import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  Paper,
  Divider,
  Stack,
  alpha,
  useTheme,
  Skeleton,
  Fade,
} from "@mui/material";
import {
  Groups as GroupsIcon,
  AddCircleOutline,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  GroupAdd as GroupAddIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { useModal } from "@/application/contexts/ModalContext";
import InvitationsDialog from "./InvitationsDialog";
import { Link } from "react-router";
import Loading from "../common/Loading";

// Componente para mostrar un grupo individual
const GroupItem = ({ group, isMobile }) => {
  const theme = useTheme();

  return (
    <Paper
      component={Link}
      to={`/group/${group.id}`}
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        mb: 2,
        borderRadius: 3,
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        cursor: "pointer",
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.divider, 0.7),
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.07)",
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
        },
        flexDirection: { xs: "row" },
        gap: { xs: 1, sm: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Avatar
          sx={{
            width: { xs: 45, sm: 50 },
            height: { xs: 45, sm: 50 },
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
            color: "primary.main",
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.2rem" },
            border: "2px solid",
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
          }}
        >
          {group.name.charAt(0).toUpperCase()}
        </Avatar>

        <Box sx={{ maxWidth: { xs: "calc(100% - 60px)", sm: "auto" } }}>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
              wordBreak: "break-word",
            }}
          >
            {group.name}
          </Typography>

          <Chip
            icon={<PeopleIcon sx={{ fontSize: "0.9rem !important" }} />}
            label={`${group.members?.length || 1} ${
              (group.members?.length || 1) === 1 ? "miembro" : "miembros"
            }`}
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              height: 24,
              fontSize: "0.75rem",
              fontWeight: 500,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
            }}
          />
        </Box>
      </Box>

      <IconButton
        size="small"
        sx={{
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
          },
          width: 36,
          height: 36,
        }}
      >
        <ArrowForwardIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

// Componente para mostrar cuando no hay grupos
const EmptyGroupsState = ({ openGroupModal }) => {
  const theme = useTheme();

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
        <GroupsIcon sx={{ fontSize: "2rem" }} />
      </Avatar>

      <Typography variant="h6" fontWeight="bold" color="text.primary">
        No tienes grupos creados
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 400, mx: "auto", mb: 1 }}
      >
        Crea tu primer grupo para comenzar a dividir gastos con amigos, familia
        o compañeros de trabajo
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<GroupAddIcon />}
        onClick={openGroupModal}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          py: 1,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Crear Grupo
      </Button>
    </Paper>
  );
};

// Componente para mostrar esqueletos de carga
const GroupsLoadingSkeleton = () => {
  return (
    <Box sx={{ mt: 1 }}>
      {[1, 2, 3].map((item) => (
        <Paper
          key={item}
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <Skeleton variant="circular" width={50} height={50} />
            <Box sx={{ width: "70%" }}>
              <Skeleton
                variant="text"
                width="60%"
                height={30}
                sx={{ mb: 0.5 }}
              />
              <Skeleton variant="rounded" width={100} height={24} />
            </Box>
          </Box>
          <Skeleton variant="circular" width={36} height={36} />
        </Paper>
      ))}
    </Box>
  );
};

// Componente principal de la lista de grupos
const GroupsListCard = ({
  groups,
  loadingGroups,
  invitations = [],
  loadingInvitations,
  onAccept,
  onReject,
  isMobile,
}) => {
  const theme = useTheme();
  const { openGroupModal } = useModal();
  const [isInvitationsDialogOpen, setIsInvitationsDialogOpen] = useState(false);

  return (
    <>
      <Box sx={{ m: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
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
              <GroupsIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Mis Grupos
            </Typography>
          </Stack>

          <Box>
            {invitations.length > 0 && (
              <Tooltip title="Ver invitaciones pendientes" arrow>
                <IconButton
                  onClick={() => setIsInvitationsDialogOpen(true)}
                  sx={{
                    mr: 1,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                    color: "info.main",
                    "&:hover": {
                      bgcolor: (theme) => alpha(theme.palette.info.main, 0.2),
                    },
                  }}
                >
                  <Badge
                    badgeContent={invitations.length}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.7rem",
                        height: 18,
                        minWidth: 18,
                      },
                    }}
                  >
                    <NotificationsIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <Button
              variant="contained"
              size="small"
              startIcon={<AddCircleOutline />}
              onClick={openGroupModal}
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
              Crear Grupo
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {loadingGroups ? (
          <GroupsLoadingSkeleton />
        ) : groups?.length > 0 ? (
          <Fade in={true} timeout={500}>
            <Box>
              {groups.map((group) => (
                <GroupItem key={group.id} group={group} isMobile={isMobile} />
              ))}
            </Box>
          </Fade>
        ) : (
          <EmptyGroupsState openGroupModal={openGroupModal} />
        )}
      </Box>

      <InvitationsDialog
        open={isInvitationsDialogOpen}
        onClose={() => setIsInvitationsDialogOpen(false)}
        invitations={invitations}
        loadingInvitations={loadingInvitations}
        onAccept={onAccept}
        onReject={onReject}
      />
    </>
  );
};

export default GroupsListCard;
