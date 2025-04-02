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
} from "@mui/material";
import { Delete as DeleteIcon, Email as EmailIcon } from "@mui/icons-material";

const GroupInvitationsDialog = ({
  open,
  onClose,
  invitations,
  isAdmin,
  onDeleteInvitation,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box>
          <Avatar>
            <EmailIcon />
          </Avatar>
          <Typography>Invitaciones Pendientes</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          {invitations.map((invitation) => (
            <ListItem
              key={invitation.id}
              secondaryAction={
                isAdmin && (
                  <Tooltip title="Eliminar invitación">
                    <IconButton
                      onClick={() => onDeleteInvitation(invitation.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )
              }
            >
              <ListItemText
                primary={
                  <Box>
                    <Avatar>
                      {invitation.invitedEmail.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography>{invitation.invitedEmail}</Typography>
                      <Typography>
                        {`Invitado por ${invitation.invitedBy}`}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupInvitationsDialog;
