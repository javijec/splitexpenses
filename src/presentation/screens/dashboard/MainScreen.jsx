import GroupModal from "@/presentation/components/GroupModal";
import { Fragment, useEffect, useState } from "react";
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
import { useModal } from "@/application/contexts/ModalContext";
import { getGroupsByUser } from "@/domain/usecases/groups";
import {
  getInvitationbyEmail,
  deleteInvitation,
} from "@/domain/usecases/invitations";
import { useAuth } from "@/application/contexts/AuthContext";

const Main = () => {
  const { isGroupModalOpen, closeGroupModal } = useModal();
  const [groups, setGroups] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoading(true);
        const data = await getGroupsByUser(user.uid);
        setGroups(data || []);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };
    const loadInvitations = async () => {
      try {
        const data = await getInvitationbyEmail(user.email);
        setInvitations(data || []);
      } catch (error) {
        console.error("Error fetching invitations:", error);
        setInvitations([]);
      }
    };

    if (user?.uid) {
      loadGroups();
      loadInvitations();
    }
  }, [user, isGroupModalOpen]); // Add isGroupModalOpen to dependencies to reload when modal closes

  const handleAcceptInvitation = async (invitationId) => {
    console.log("Aceptar invitación:", invitationId);
  };

  const handleRejectInvitation = async (invitationId) => {
    try {
      await deleteInvitation(invitationId);
      // Recargar las invitaciones después de rechazar
      const data = await getInvitationbyEmail(user.email);
      setInvitations(data || []);
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          mb: 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a tu Panel de Control, {user?.displayName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona tus grupos y revisa invitaciones pendientes
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {(loading || invitations.length > 0) && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardHeader title="Invitaciones Pendientes" />
              <Divider />
              <CardContent>
                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                    <CircularProgress />
                  </Box>
                ) : (
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
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader title="Mis Grupos" />
            <Divider />
            <CardContent>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : groups.length > 0 ? (
                <List>
                  {groups.map((group) => (
                    <Fragment key={group.id}>
                      <ListItem
                        button
                        component={Link}
                        to={`/group/${group.id}`}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" color="primary">
                              {group.name}
                            </Typography>
                          }
                          secondary={`${group.members.length || 1} miembros`}
                        />
                      </ListItem>
                      <Divider component="li" />
                    </Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    No tienes grupos creados
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <GroupModal isOpen={isGroupModalOpen} onClose={closeGroupModal} />
    </>
  );
};

export default Main;
