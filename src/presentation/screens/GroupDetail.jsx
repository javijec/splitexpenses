import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid2 as Grid, Box, Button, useTheme, Container } from "@mui/material";
import { Group, Email } from "@mui/icons-material";
import { useAuth } from "@/application/contexts/AuthContext";
import { useModal } from "@/application/contexts/ModalContext";

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

import { getGroupExpenses } from "@/domain/usecases/expenses";

import Loading from "@/presentation/components/common/Loading";

import calculateBalance from "@/utils/calculateBalance";
import simplifyBalance from "@/utils/simpliBalance";

import {
  ExpenseDialog,
  InviteMemberModal,
  DeleteGroupDialog,
  MembersListDialog,
  InvitationsListDialog,
  HeaderGroupDetails,
  MembersListCard,
  GroupBalanceCard,
  ExpensesListCard,
  InvitationsListCard,
} from "@/presentation/components/groups";

function GroupDetail() {
  const theme = useTheme();

  const { groupId } = useParams();
  const { user, groupContext, setGroupContext } = useAuth();
  const { isExpenseModalOpen, closeExpenseModal } = useModal();
  const { isInviteModalOpen, openInviteModal, closeInviteModal } = useModal();
  const {
    isDeleteGroupModalOpen,
    openDeleteGroupModal,
    closeDeleteGroupModal,
  } = useModal();
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [isInvitationsDialogOpen, setIsInvitationsDialogOpen] = useState(false);

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);

  // Función para actualizar los gastos y recalcular los balances
  const updateExpensesAndBalances = (newExpenses) => {
    setExpenses(newExpenses);
    const balanceData = calculateBalance(newExpenses);
    const transactions = simplifyBalance(balanceData);
    setBalances(balanceData);
    setTransactions(transactions);
  };
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [balances, setBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    severity: "error",
  });

  const loadInvitations = async () => {
    try {
      // Usar Promise.all para cargar invitaciones, datos del grupo y gastos en paralelo
      const [invitationData, groupData, expensesData] = await Promise.all([
        getGroupInvitations(groupId),
        getGroupByID(groupId),
        getGroupExpenses(groupId),
      ]);

      const balanceData = calculateBalance(expensesData);
      const transactions = simplifyBalance(balanceData);

      setGroupContext(groupData);
      setInvitations(invitationData);
      updateExpensesAndBalances(expensesData);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // Cargar datos del grupo y luego ejecutar loadInvitations en paralelo
        const data = await getGroupByID(groupId);
        setMembers(data.members);
        setIsAdmin(data.createdBy.id === user.uid);
        setGroup(data);

        await loadInvitations();
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
      // Cargar datos del grupo y actualizar invitaciones en paralelo
      const [data] = await Promise.all([
        getGroupByID(groupId),
        loadInvitations(),
      ]);
      setMembers(data.members);
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
    <Container>
      <HeaderGroupDetails
        group={group}
        isAdmin={isAdmin}
        onDelete={() => {
          setGroupContext(group);
          openDeleteGroupModal();
        }}
      />

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <MembersListCard
          members={members}
          isAdmin={isAdmin}
          user={user}
          group={group}
          onDeleteMember={handleDeleteMember}
          onInvite={openInviteModal}
        />
        <InvitationsListCard
          invitations={invitations}
          isAdmin={isAdmin}
          onDeleteInvitation={handleDeleteInvitation}
        />
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Button onClick={() => setIsMembersDialogOpen(true)}>
          <Group />
          Ver Miembros
        </Button>
        {invitations.length > 0 && (
          <Button onClick={() => setIsInvitationsDialogOpen(true)}>
            <Email />
            Ver Invitaciones
          </Button>
        )}
      </Box>

      <GroupBalanceCard balances={balances} transactions={transactions} />

      <ExpensesListCard
        expenses={expenses}
        user={user}
        setExpenses={updateExpensesAndBalances}
      />

      <ExpenseDialog
        isOpen={isExpenseModalOpen}
        onClose={closeExpenseModal}
        membersList={groupContext?.members}
        onExpenseAdded={updateExpensesAndBalances} // Usar la nueva función que actualiza balances
      />
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        handleSendInvitation={handleSendInvitation}
        alertInfo={alertInfo}
        validateEmail={validateEmail}
        setAlertInfo={setAlertInfo}
      />
      <DeleteGroupDialog
        isOpen={isDeleteGroupModalOpen}
        onClose={closeDeleteGroupModal}
      />
      <MembersListDialog
        open={isMembersDialogOpen}
        onClose={() => setIsMembersDialogOpen(false)}
        members={members}
        isAdmin={isAdmin}
        user={user}
        group={group}
        onDeleteMember={handleDeleteMember}
        onInvite={openInviteModal}
      />
      <InvitationsListDialog
        open={isInvitationsDialogOpen}
        onClose={() => setIsInvitationsDialogOpen(false)}
        invitations={invitations}
        isAdmin={isAdmin}
        onDeleteInvitation={handleDeleteInvitation}
      />
    </Container>
  );
}

export default GroupDetail;
