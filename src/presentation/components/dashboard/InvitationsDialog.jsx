import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  MarkEmailRead as MarkEmailReadIcon,
} from "@mui/icons-material";
import Loading from "../common/Loading";

const InvitationsDialog = ({
  open,
  onClose,
  onAccept,
  onReject,
  invitations,
  loadingInvitations,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>Invitaciones Pendientes</Typography>
      </DialogTitle>
      <DialogContent>
        {loadingInvitations ? (
          <Loading />
        ) : invitations.length > 0 ? (
          <Box in={true} timeout={500}>
            <List>
              {invitations.map((invitation) => (
                <ListItem key={invitation.id}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar>
                          {invitation.groupName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography>{invitation.groupName}</Typography>
                          <Chip label={`De: ${invitation.invitedBy}`} />
                        </Box>
                      </Box>
                    }
                  />
                  <Box>
                    <Tooltip title="Aceptar invitación">
                      <IconButton
                        onClick={() =>
                          onAccept(invitation.id, invitation.groupId)
                        }
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rechazar invitación">
                      <IconButton onClick={() => onReject(invitation.id)}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Box>
            <Paper>
              <Avatar>
                <MarkEmailReadIcon />
              </Avatar>
              <Typography>No tienes invitaciones pendientes</Typography>
              <Typography>
                Cuando alguien te invite a un grupo, aparecerá aquí
              </Typography>
            </Paper>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationsDialog;
