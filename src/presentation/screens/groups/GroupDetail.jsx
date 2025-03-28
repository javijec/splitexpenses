import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid2 as Grid, Box } from "@mui/material";
import { useAuth } from "@/application/contexts/AuthContext";
import { useModal } from "@/application/contexts/ModalContext";
import ExpenseModal from "@/presentation/components/groups/ExpenseModal";
import InviteModal from "@/presentation/components/groups/InviteModal";
import DeleteGroupModal from "@/presentation/components/groups/DeleteGroupModal";
import {
  getGroupByID,
  removeMember,
  getMembersMailsGroup,
} from "@/domain/usecases/groups";
import {
  getGroupInvitations,
  createInvitation,
  deleteInvitation,
  getInvitationByEmailAndGroup,
} from "@/domain/usecases/invitations";
import Loading from "@/presentation/components/common/Loading";
import GroupHeader from "@/presentation/components/groups/GroupHeader";
import {
  MembersListDesktop,
  MembersListMobile,
} from "@/presentation/components/groups/MembersList";
import GroupBalance from "@/presentation/components/groups/GroupBalance";
import ExpensesList from "@/presentation/components/groups/ExpensesList";
import {
  InvitationsListDesktop,
  InvitationsListMobile,
} from "@/presentation/components/groups/InvitationsList";

function GroupDetail() {
  const { groupId } = useParams();
  const { user, setGroupContext } = useAuth();
  const { isExpenseModalOpen, closeExpenseModal } = useModal();
  const { isInviteModalOpen, openInviteModal, closeInviteModal } = useModal();
  const {
    isDeleteGroupModalOpen,
    openDeleteGroupModal,
    closeDeleteGroupModal,
  } = useModal();

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    severity: "error",
  });

  const loadInvitations = async () => {
    try {
      const invitationData = await getGroupInvitations(groupId);
      setInvitations(invitationData);
    } catch (error) {
      console.error("Error fetching invitations:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getGroupByID(groupId);
        await loadInvitations();
        setMembers(data.members);
        setIsAdmin(data.createdBy.id === user.uid);
        setGroup(data);
      } catch (error) {
        console.error("Error fetching group data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (groupId) {
      load();
    }
  }, [groupId]);

  const handleDeleteInvitation = async (invitationId) => {
    try {
      await deleteInvitation(invitationId);
      loadInvitations();
    } catch (error) {
      console.error("Error deleting invitation:", error);
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await removeMember(groupId, memberId);
      // Recargar miembros después de eliminar un miembro
      const data = await getGroupByID(groupId);
      setMembers(data.members);
      loadInvitations();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleSendInvitation = async (email) => {
    try {
      if (!email || !validateEmail(email)) {
        setEmailError(true);
        return false;
      }
      const membersId = await getMembersMailsGroup(groupId);
      if (membersId.includes(email)) {
        setAlertInfo({
          show: true,
          message: "El usuario ya es miembro del grupo",
          severity: "error",
        });
        return false; // Return false to indicate failure
      }

      const existingInvitation = await getInvitationByEmailAndGroup(
        email,
        groupId
      );
      if (existingInvitation) {
        setAlertInfo({
          show: true,
          message: "Ya existe una invitación pendiente para este email",
          severity: "error",
        });
        return false; // Return false to indicate failure
      }

      const invitation = {
        groupId: group.id,
        groupName: group.name,
        invitedBy: group.createdBy.name,
        invitedEmail: email,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      await createInvitation(invitation);
      loadInvitations();
      return true; // Return true to indicate success
    } catch (error) {
      console.error("Error sending invitation:", error);
      return false; // Return false to indicate failure
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  if (loading) {
    return <Loading />;
  }

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
      <GroupHeader
        group={group}
        isAdmin={isAdmin}
        onDelete={() => {
          setGroupContext(group);
          openDeleteGroupModal();
        }}
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: { xs: "none", md: "block" }, mb: 3 }}>
            <MembersListDesktop
              members={members}
              isAdmin={isAdmin}
              user={user}
              group={group}
              onDeleteMember={handleDeleteMember}
              onInvite={openInviteModal}
            />
            <InvitationsListDesktop
              invitations={invitations} // Ensure this is correctly passed
              isAdmin={isAdmin}
              onDeleteInvitation={handleDeleteInvitation}
            />
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" }, mb: 3 }}>
            <MembersListMobile
              members={members}
              isAdmin={isAdmin}
              user={user}
              group={group}
              onInvite={openInviteModal}
              onDeleteMember={handleDeleteMember}
            />
            <InvitationsListMobile
              invitations={invitations} // Ensure this is correctly passed
              isAdmin={isAdmin}
              handleDeleteInvitation={handleDeleteInvitation}
            />
          </Box>

          <GroupBalance balances={balances} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <ExpensesList expenses={expenses} user={user} />
        </Grid>
      </Grid>
      <ExpenseModal isOpen={isExpenseModalOpen} onClose={closeExpenseModal} />
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        handleSendInvitation={handleSendInvitation}
        alertInfo={alertInfo}
        validateEmail={validateEmail}
        setAlertInfo={setAlertInfo}
      />
      <DeleteGroupModal
        isOpen={isDeleteGroupModalOpen}
        onClose={closeDeleteGroupModal}
      />
    </Box>
  );
}

export default GroupDetail;
