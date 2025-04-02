import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Box,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Delete as DeleteIcon, Email as EmailIcon } from "@mui/icons-material";

export const InvitationsListCard = ({
  invitations,
  isAdmin,
  onDeleteInvitation,
}) => {
  return (
    <>
      {invitations && invitations.length > 0 && (
        <Card>
          <CardHeader
            avatar={<EmailIcon />}
            title={<Typography>Invitaciones Pendientes</Typography>}
          />
          <CardContent>
            <List>
              {invitations.map((invitation) => (
                <ListItem
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
                  <ListItemAvatar>
                    <Avatar>
                      {invitation.invitedEmail.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography>{invitation.invitedEmail}</Typography>}
                    secondary={
                      <Typography>
                        {`Invitado por ${invitation.invitedBy}`}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};
