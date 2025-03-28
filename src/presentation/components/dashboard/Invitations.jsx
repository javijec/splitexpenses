import {
  Grid2 as Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography, // Added import for Typography
} from "@mui/material";

const Invitations = ({
  onAccept,
  onReject,
  invitations,
  loadingInvitations,
}) => {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card>
        <CardHeader title="Invitaciones Pendientes" />
        <Divider />
        <CardContent>
          {loadingInvitations ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : invitations.length > 0 ? (
            <List>
              {invitations.map((invitation) => (
                <ListItem key={invitation.id}>
                  <ListItemText
                    primary={`Invitación a ${invitation.groupName}`}
                    secondary={`De: ${invitation.invitedBy}`}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => onAccept(invitation.id, invitation.groupId)}
                  >
                    Aceptar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onReject(invitation.id)}
                  >
                    Rechazar
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                No tienes invitaciones
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Invitations;
