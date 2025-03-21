import {
  Container,
  Grid2 as Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router";

const Main = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestiona tus grupos y revisa invitaciones pendientes
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardHeader title="Mis Grupos" />
              <Divider />
              <CardContent>
                {
                  /*loading ? (
                             <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : groups.length > 0 ? (
                <List>
                  {groups.map((group) => (
                    <React.Fragment key={group.id}>
                      <ListItem
                        button
                        component={Link}
                        to={`/groups/${group.id}`}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" color="primary">
                              {group.name}
                            </Typography>
                          }
                          secondary={`${group.memberCount || 1} miembros`}
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
                ) : (*/
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="body1" color="text.secondary">
                      No tienes grupos creados
                    </Typography>
                  </Box>
                  //              )
                }
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardHeader title="Invitaciones Pendientes" />
              <Divider />
              <CardContent>
                {
                  /*loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : invitations.length > 0 ? (
                <List>
                  {invitations.map((invitation) => (
                    <ListItem key={invitation.id}>
                      <ListItemText
                        primary={`Invitación a ${invitation.groupName}`}
                        secondary={`De: ${invitation.senderName}`}
                      />
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleAcceptInvitation(invitation.id)}
                      >
                        Aceptar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleRejectInvitation(invitation.id)}
                      >
                        Rechazar
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (*/
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ p: 2 }}
                  >
                    No tienes invitaciones pendientes.
                  </Typography>
                  //             )
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Main;
