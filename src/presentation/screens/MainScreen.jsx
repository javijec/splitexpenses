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
    loadInvitations();
    loadGroups();
  }, [user]);

  const loadInvitations = async () => {
    if (!user?.email) return;
    try {
      setLoadingInvitations(true);
      const invitationsData = await getInvitationbyEmail(user.email);
      setInvitations(invitationsData || []);
    } catch (error) {
      console.error("Error fetching invitations:", error);
      setInvitations([]);
    } finally {
      setLoadingInvitations(false);
    }
  };

  const loadGroups = async () => {
    if (!user?.uid) return;
    try {
      setLoadingGroups(true);
      const groupsData = await getGroupsByUser(user.uid);
      setGroups(groupsData || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
      setGroups([]);
    } finally {
      setLoadingGroups(false);
    }
  };

  const handleAcceptInvitation = async (invitationId, groupId) => {
    try {
      await addMember(groupId, user);
      await deleteInvitation(invitationId);
      loadInvitations();
      loadGroups();
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
