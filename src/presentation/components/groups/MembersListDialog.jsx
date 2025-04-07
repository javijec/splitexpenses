import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  DialogActions,
  Button,
  Stack,
  Divider,
  alpha,
  useTheme,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

export const MembersListDialog = ({
  open,
  onClose,
  members,
  isAdmin,
  user,
  group,
  onDeleteMember,
  onInvite,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              width: 48,
              height: 48,
            }}
          >
            <PeopleIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Miembros del Grupo
          </Typography>
        </Stack>

        <Box>
          {isAdmin && (
            <Button
              variant="contained"
              size="small"
              startIcon={<PersonAddIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onInvite();
              }}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                mr: 1,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Invitar
            </Button>
          )}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mx: 3 }} />

      <DialogContent sx={{ p: 3 }}>
        <List sx={{ p: 0 }}>
          {members.map((member) => {
            const isCurrentUser = member.id === user.uid;
            const isGroupAdmin = member.id === group.createdBy.id;

            return (
              <Paper
                key={member.id}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
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
                    {member.displayName?.charAt(0).toUpperCase() || (
                      <PersonIcon />
                    )}
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
                          icon={
                            <AdminIcon sx={{ fontSize: "0.9rem !important" }} />
                          }
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
                </Stack>

                {isAdmin && !isGroupAdmin && (
                  <Tooltip title="Eliminar miembro" arrow placement="top">
                    <IconButton
                      onClick={() => onDeleteMember(member.id)}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        color: theme.palette.error.main,
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
          })}
        </List>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
