import {
  Grid2 as Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Fade,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
  Badge,
} from "@mui/material";
import {
  Groups as GroupsIcon,
  AddCircleOutline,
  ArrowForward,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useModal } from "@/application/contexts/ModalContext";
import { useState } from "react";
import InvitationsDialog from "./InvitationsDialog";
import { Link } from "react-router";
import { alpha } from "@mui/material/styles";

const Groups = ({
  groups,
  loadingGroups,
  invitations = [],
  loadingInvitations,
  onAccept,
  onReject,
}) => {
  const { openGroupModal } = useModal();
  const [isInvitationsDialogOpen, setIsInvitationsDialogOpen] = useState(false);

  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          height: "100%",
          transition: "all 0.3s ease",

          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: (theme) => ` ${theme.palette.primary.main}`,
          },
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  width: 40,
                  height: 40,
                  mr: 1.5,
                }}
              >
                <GroupsIcon />
              </Avatar>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, letterSpacing: 0.2 }}
              >
                Mis Grupos
              </Typography>
            </Box>
          }
          action={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {invitations.length > 0 && (
                <Tooltip
                  title="Ver invitaciones pendientes"
                  arrow
                  placement="bottom"
                >
                  <IconButton
                    onClick={() => setIsInvitationsDialogOpen(true)}
                    sx={{
                      mr: 1,
                      position: "relative",
                    }}
                  >
                    <Badge
                      badgeContent={invitations.length}
                      color="error"
                      overlap="circular"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "0.7rem",
                          height: 18,
                          minWidth: 18,
                        },
                      }}
                    >
                      <NotificationsIcon color="info" />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          }
          sx={{
            bgcolor: "background.paper",
            pb: 2,
            pt: 3,
            px: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <Divider />
        <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
          {loadingGroups ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress size={40} thickness={4} />
            </Box>
          ) : groups?.length > 0 ? (
            <Fade in={true} timeout={500}>
              <List sx={{ p: 0 }}>
                {groups.map((group) => (
                  <ListItem
                    button
                    component={Link}
                    to={`/group/${group.id}`}
                    key={group.id}
                    sx={{
                      py: 2.5,
                      px: 3,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.04),
                        transform: "translateY(-2px)",
                      },
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, 0.1),
                              color: "primary.main",
                              width: 36,
                              height: 36,
                              mr: 2,
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {group.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                mb: 0.5,
                                color: "text.primary",
                                letterSpacing: 0.2,
                              }}
                            >
                              {group.name}
                            </Typography>

                            <Chip
                              label={`${group.members?.length || 1} ${
                                (group.members?.length || 1) === 1
                                  ? "miembro"
                                  : "miembros"
                              }`}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{
                                height: 24,
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                bgcolor: (theme) =>
                                  alpha(theme.palette.primary.main, 0.05),
                                borderColor: (theme) =>
                                  alpha(theme.palette.primary.main, 0.3),
                              }}
                            />
                          </Box>
                        </Box>
                      }
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                    <Box
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Ver detalles" placement="left">
                        <IconButton
                          size="small"
                          sx={{
                            color: "primary.main",
                            bgcolor: (theme) =>
                              alpha(theme.palette.primary.main, 0.1),
                            "&:hover": {
                              bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, 0.2),
                            },
                          }}
                        >
                          <ArrowForward fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Fade>
          ) : (
            <Fade in={true} timeout={800}>
              <Box
                sx={{
                  p: 5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                    border: "1px dashed",
                    borderColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.2),
                    mb: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    <GroupsIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    No tienes grupos creados
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Crea tu primer grupo para comenzar a dividir gastos
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={openGroupModal}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      boxShadow: (theme) =>
                        `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                  >
                    Crear Grupo
                  </Button>
                </Paper>
              </Box>
            </Fade>
          )}
        </CardContent>
      </Card>
      <InvitationsDialog
        open={isInvitationsDialogOpen}
        onClose={() => setIsInvitationsDialogOpen(false)}
        invitations={invitations}
        loadingInvitations={loadingInvitations}
        onAccept={onAccept}
        onReject={onReject}
      />
    </Grid>
  );
};

export default Groups;
