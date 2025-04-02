import React, { useState, useEffect } from "react";
import { Grid2 as Grid, Box, useTheme, Container } from "@mui/material";
import Header from "@/presentation/components/dashboard/HeaderDashboard";
import Invitations from "@/presentation/components/dashboard/InvitationsCard";
import Groups from "@/presentation/components/dashboard/GroupsListCard";
import GroupModal from "@/presentation/components/dashboard/CreateGroupDialog";
import { useModal } from "@/application/contexts/ModalContext";
import { addMember, getGroupsByUser } from "@/domain/usecases/groups";
import {
  deleteInvitation,
  getInvitationbyEmail,
} from "@/domain/usecases/invitations";
import { useAuth } from "@/application/contexts/AuthContext";

const Main = () => {
  const theme = useTheme();

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
    <Container>
      <Header />

      <Groups
        groups={groups}
        loadingGroups={loadingGroups}
        invitations={invitations}
        loadingInvitations={loadingInvitations}
        onAccept={handleAcceptInvitation}
        onReject={handleRejectInvitation}
      />

      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={closeGroupModal}
        onGroupCreated={handleCreateGroup}
      />
    </Container>
  );
};

export default Main;
