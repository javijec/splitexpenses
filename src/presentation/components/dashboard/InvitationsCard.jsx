import {
  Grid2 as Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
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
} from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  MarkEmailRead as MarkEmailReadIcon,
} from "@mui/icons-material";
import Loading from "../common/Loading";

const InvitationsCard = ({
  onAccept,
  onReject,
  invitations,
  loadingInvitations,
}) => {
  return (
    <Grid>
      <Card>
        <CardHeader
          avatar={<EmailIcon />}
          title={<Typography>Invitaciones Pendientes</Typography>}
        />
        <Divider />
        <CardContent>
          {loadingInvitations ? (
            <Loading />
          ) : invitations.length > 0 ? (
            <Box>
              <List>
                {invitations.map((invitation) => (
                  <ListItem key={invitation.id}>
                    <ListItemText
                      primary={
                        <Box>
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
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default InvitationsCard;
