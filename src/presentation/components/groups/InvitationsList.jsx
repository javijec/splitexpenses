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
  Fade,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Delete as DeleteIcon, Email as EmailIcon } from "@mui/icons-material";

export const InvitationsListDesktop = ({
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
          <Divider />
          <CardContent>
            <List sx={{ p: 0 }}>
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
                  <ListItemAvatar>
                    <Avatar>
                      {invitation.invitedEmail.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box>
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
          </CardContent>
        </Card>
      )}
    </>
  );
};
