import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
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
  Chip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  AlternateEmail as AlternateEmailIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

export const InvitationsListDialog = ({
  open,
  onClose,
  invitations,
  isAdmin,
  onDeleteInvitation,
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
            <EmailIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Invitaciones Pendientes
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 3 }} />

      <DialogContent sx={{ p: 3 }}>
        {invitations.length > 0 ? (
          <List sx={{ p: 0 }}>
            {invitations.map((invitation) => (
              <Paper
                key={invitation.id}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      width: 40,
                      height: 40,
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
                          color: alpha(theme.palette.text.secondary, 0.7),
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Invitado por {invitation.invitedBy}
                      </Typography>
                    </Stack>

                    <Chip
                      size="small"
                      label="Pendiente"
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
                </Stack>

                {isAdmin && (
                  <Tooltip title="Eliminar invitación" arrow placement="top">
                    <IconButton
                      onClick={() => onDeleteInvitation(invitation.id)}
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
            ))}
          </List>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              textAlign: "center",
              border: "1px dashed",
              borderColor: alpha(theme.palette.primary.main, 0.3),
              bgcolor: alpha(theme.palette.primary.main, 0.03),
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
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
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
              Cuando invites a nuevos miembros al grupo, las invitaciones
              aparecerán aquí
            </Typography>
          </Paper>
        )}
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
