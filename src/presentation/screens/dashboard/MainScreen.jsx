import React, { useState, useEffect } from "react";
import { Grid2 as Grid } from "@mui/material";
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
    <>
      <Header />
      <Grid container spacing={3}>
        <Invitations
          invitations={invitations}
          loading={loadingInvitations}
          onAccept={handleAcceptInvitation}
          onReject={handleRejectInvitation}
        />
        {console.log(groups)}
        {console.log(loadingGroups)}

        <Groups groups={groups} loadingGroups={loadingGroups} />
      </Grid>
      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={closeGroupModal}
        onGroupCreated={handleCreateGroup}
      />
    </>
  );
};

export default Main;
