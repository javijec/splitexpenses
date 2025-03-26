import GroupModal from "@/presentation/components/dashboard/GroupModal";
import { useEffect, useState } from "react";
import {
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
  Avatar,
  ListItemAvatar,
  Paper,
} from "@mui/material";
import { Groups as GroupsIcon } from "@mui/icons-material";
import { Link } from "react-router";
import { useModal } from "@/application/contexts/ModalContext";
import { getGroupsByUser, addMember } from "@/domain/usecases/groups";
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

  const loadData = async () => {
    if (!user?.uid) return;

    try {
      setLoading(true);
      const [groupsData, invitationsData] = await Promise.all([
        getGroupsByUser(user.uid),
        user.email ? getInvitationbyEmail(user.email) : Promise.resolve([]),
      ]);
      setGroups(groupsData || []);
      setInvitations(invitationsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setGroups([]);
      setInvitations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleAcceptInvitation = async (invitationId, groupId) => {
    try {
      await addMember(groupId, user);
      await deleteInvitation(invitationId);
      await loadData();
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleRejectInvitation = async (invitationId) => {
    try {
      await deleteInvitation(invitationId);
      await loadData();
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
                          onClick={() =>
                            handleAcceptInvitation(
                              invitation.id,
                              invitation.groupId
                            )
                          }
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
                <List sx={{ width: "100%" }}>
                  {groups.map((group) => (
                    <Paper
                      elevation={1}
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 3,
                        },
                      }}
                      key={group.id}
                    >
                      <ListItem
                        button
                        component={Link}
                        to={`/group/${group.id}`}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: "primary.main",
                              width: 45,
                              height: 45,
                            }}
                          >
                            {group.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{ fontWeight: "medium" }}
                            >
                              {group.name}
                            </Typography>
                          }
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 0.5,
                              }}
                            >
                              <GroupsIcon
                                sx={{
                                  fontSize: 16,
                                  mr: 0.5,
                                  color: "text.secondary",
                                }}
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                component="span"
                              >
                                {`${group.members.length || 1} ${
                                  (group.members.length || 1) === 1
                                    ? "miembro"
                                    : "miembros"
                                }`}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    </Paper>
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
