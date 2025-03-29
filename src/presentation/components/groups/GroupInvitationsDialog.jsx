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
  IconButton,
  Tooltip,
  Avatar,
  DialogActions,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Email as EmailIcon } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const GroupInvitationsDialog = ({
  open,
  onClose,
  invitations,
  isAdmin,
  onDeleteInvitation,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: (theme) => `${theme.palette.primary.main}`,
          },
          transition: "all 0.3s ease",
        },
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <DialogTitle
        sx={{
          bgcolor: "background.paper",
          pb: 2,
          pt: 3,
          px: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
              color: "info.main",
              width: 40,
              height: 40,
              mr: 1.5,
            }}
          >
            <EmailIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
            Invitaciones Pendientes
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 0, bgcolor: "background.paper" }}>
        <Fade in={true} timeout={500}>
          <List sx={{ p: 0 }} dense={true}>
            {invitations.map((invitation) => (
              <ListItem
                key={invitation.id}
                sx={{
                  py: 2.5,
                  px: 3,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
                    transform: "translateY(-2px)",
                  },
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
                secondaryAction={
                  isAdmin && (
                    <Tooltip title="Eliminar invitación" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => onDeleteInvitation(invitation.id)}
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: (theme) =>
                            alpha(theme.palette.error.main, 0.1),
                          color: "error.main",
                          border: "1px solid",
                          borderColor: (theme) =>
                            alpha(theme.palette.error.main, 0.2),
                          "&:hover": {
                            bgcolor: (theme) =>
                              alpha(theme.palette.error.main, 0.2),
                            transform: "scale(1.05)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )
                }
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
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                          border: "2px solid",
                          borderColor: (theme) =>
                            alpha(theme.palette.info.main, 0.2),
                        }}
                      >
                        {invitation.invitedEmail.charAt(0).toUpperCase()}
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
                          {invitation.invitedEmail}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Invitado por ${invitation.invitedBy}`}
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ mb: { xs: 1, sm: 0 } }}
                />
              </ListItem>
            ))}
          </List>
        </Fade>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
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

export default GroupInvitationsDialog;
