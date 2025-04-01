import React, { useState, useEffect } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import Header from "@/presentation/components/dashboard/Header";
import Invitations from "@/presentation/components/dashboard/Invitations";
import Groups from "@/presentation/components/dashboard/Groups";
import GroupModal from "@/presentation/components/dashboard/GroupModal";
import { useModal } from "@/application/contexts/ModalContext";
import { addMember, getGroupsByUser } from "@/domain/usecases/groups";
import {
  deleteInvitation,
  getInvitationbyEmail,
} from "@/domain/usecases/invitations";
import { useAuth } from "@/application/contexts/AuthContext";

const Main = () => {
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const { user } = useAuth();
  const { isGroupModalOpen, closeGroupModal } = useModal();

  const [invitations, setInvitations] = useState([]);
  const [loadingInvitations, setLoadingInvitations] = useState(true);

  useEffect(() => {
    if (user?.email && user?.uid) {
      // Usar Promise.all para cargar invitaciones y grupos en paralelo
      setLoadingInvitations(true);
      setLoadingGroups(true);

      Promise.all([getInvitationbyEmail(user.email), getGroupsByUser(user.uid)])
        .then(([invitationsData, groupsData]) => {
          setInvitations(invitationsData || []);
          setGroups(groupsData || []);
        })
        .catch((error) => {
          console.error("Error cargando datos:", error);
          setInvitations([]);
          setGroups([]);
        })
        .finally(() => {
          setLoadingInvitations(false);
          setLoadingGroups(false);
        });
    }
  }, [user]);

  const handleAcceptInvitation = async (invitationId, groupId) => {
    try {
      // Ejecutar ambas operaciones en paralelo
      await Promise.all([
        addMember(groupId, user),
        deleteInvitation(invitationId),
      ]);

      // Cargar invitaciones y grupos en paralelo
      Promise.all([getInvitationbyEmail(user.email), getGroupsByUser(user.uid)])
        .then(([invitationsData, groupsData]) => {
          setInvitations(invitationsData || []);
          setGroups(groupsData || []);
        })
        .catch((error) => {
          console.error("Error cargando datos:", error);
        });
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleRejectInvitation = async (invitationId) => {
    try {
      await deleteInvitation(invitationId);
      loadInvitations();
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  const handleCreateGroup = async () => {
    loadGroups();
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        bgcolor: "background.paper",
        p: { xs: 2, sm: 3 },
        transition: "all 0.3s ease",
      }}
    >
      <Header />
      <Grid spacing={4} sx={{ mt: 1 }}>
        <Groups
          groups={groups}
          loadingGroups={loadingGroups}
          invitations={invitations}
          loadingInvitations={loadingInvitations}
          onAccept={handleAcceptInvitation}
          onReject={handleRejectInvitation}
        />
      </Grid>
      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={closeGroupModal}
        onGroupCreated={handleCreateGroup}
      />
    </Box>
  );
};

export default Main;
