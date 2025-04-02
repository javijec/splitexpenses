import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Fade,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
  CircularProgress,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  MarkEmailRead as MarkEmailReadIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const InvitationsDialog = ({
  open,
  onClose,
  onAccept,
  onReject,
  invitations,
  loadingInvitations,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: (theme) => ({
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
          boxShadow: theme.shadows[3],
        }),
      }}
    >
      <DialogTitle
        sx={(theme) => ({
          bgcolor: theme.palette.background.paper,
          pb: 2,
          pt: 3,
          px: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={(theme) => ({
              bgcolor: theme.palette.info.light,
              color: theme.palette.info.main,
              width: 40,
              height: 40,
              mr: 1.5,
            })}
          >
            <EmailIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
            Invitaciones Pendientes
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {loadingInvitations ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress size={40} thickness={4} />
          </Box>
        ) : invitations.length > 0 ? (
          <Fade in={true} timeout={500}>
            <List>
              {invitations.map((invitation) => (
                <ListItem
                  key={invitation.id}
                  sx={{
                    py: 2.5,
                    px: 3,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s ease",

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
                              alpha(theme.palette.info.main, 0.1),
                            color: "info.main",
                            width: 36,
                            height: 36,
                            mr: 2,
                            fontSize: "1rem",
                            fontWeight: "bold",
                          }}
                        >
                          {invitation.groupName.charAt(0).toUpperCase()}
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
                            {invitation.groupName}
                          </Typography>

                          <Chip
                            label={`De: ${invitation.invitedBy}`}
                            size="small"
                            color="info"
                            variant="outlined"
                            sx={{
                              height: 24,
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              bgcolor: (theme) =>
                                alpha(theme.palette.info.main, 0.05),
                              borderColor: (theme) =>
                                alpha(theme.palette.info.main, 0.3),
                            }}
                          />
                        </Box>
                      </Box>
                    }
                    sx={{ mb: { xs: 1, sm: 0 } }}
                  />
                  <Box sx={{ display: "flex", mt: { xs: 1, sm: 0 }, gap: 1 }}>
                    <Tooltip title="Aceptar invitación" placement="top">
                      <IconButton
                        color="success"
                        size="small"
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: (theme) =>
                            alpha(theme.palette.success.main, 0.1),
                          color: "success.main",
                          border: "1px solid",
                          borderColor: (theme) =>
                            alpha(theme.palette.success.main, 0.2),

                          transition: "all 0.2s ease",
                        }}
                        onClick={() =>
                          onAccept(invitation.id, invitation.groupId)
                        }
                      >
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rechazar invitación" placement="top">
                      <IconButton
                        color="error"
                        size="small"
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: (theme) =>
                            alpha(theme.palette.error.main, 0.1),
                          color: "error.main",
                          border: "1px solid",
                          borderColor: (theme) =>
                            alpha(theme.palette.error.main, 0.2),

                          transition: "all 0.2s ease",
                        }}
                        onClick={() => onReject(invitation.id)}
                      >
                        <CloseIcon fontSize="small" />
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
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
                  border: "1px dashed",
                  borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                    color: "info.main",
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <MarkEmailReadIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ mb: 1, fontWeight: 600 }}
                >
                  No tienes invitaciones pendientes
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Cuando alguien te invite a un grupo, aparecerá aquí
                </Typography>
              </Paper>
            </Box>
          </Fade>
        )}
      </DialogContent>
      <DialogActions
        sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationsDialog;
