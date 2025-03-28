import {
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const InvitationsList = ({ invitations, isAdmin, onDeleteInvitation }) => {
  return (
    <>
      {invitations && invitations.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Invitaciones Pendientes
          </Typography>
          <List>
            {invitations.map((invitation) => (
              <ListItem key={invitation.id}>
                <ListItemText
                  primary={invitation.invitedEmail}
                  secondary={`Invitado por ${invitation.invitedBy}`}
                />
                {isAdmin && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDeleteInvitation(invitation.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default InvitationsList;
