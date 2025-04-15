import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  useTheme,
  Container,
  Typography,
  Fade,
  useMediaQuery,
  Stack,
  Chip,
} from "@mui/material";
import {
  People as PeopleIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
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
      const transactionsData = simplifyBalance(balanceData);
      setTransactions(transactionsData);

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

  // Asegurarnos de que todos los hooks se ejecuten en cada renderizado
  useMediaQuery(theme.breakpoints.down("md")); // No usado pero necesario para mantener el orden de los hooks

  if (loading) {
    return <Loading />;
  }

  return (
    <Fade in={true} timeout={800}>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Encabezado del grupo */}
        <HeaderGroupDetails
          group={group}
          isAdmin={isAdmin}
          onDelete={() => {
            setGroupContext(group);
            openDeleteGroupModal();
          }}
        />

        {/* Sección de miembros e invitaciones - Versión móvil */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 3,
            width: "100%",
            px: { xs: 2, sm: 0 },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsMembersDialogOpen(true)}
            startIcon={<PeopleIcon />}
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.5,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            Ver Miembros
          </Button>

          {invitations.length > 0 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsInvitationsDialogOpen(true)}
              startIcon={<NotificationsIcon />}
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                py: 1.5,
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Ver Invitaciones</Typography>
                <Chip
                  label={invitations.length}
                  color="primary"
                  size="small"
                  sx={{ height: 20, minWidth: 20, fontSize: "0.7rem" }}
                />
              </Stack>
            </Button>
          )}
        </Box>

        {/* Sección de miembros y balances - Versión desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, mb: 3 }}>
          {/* Miembros del grupo */}
          <Box sx={{ flex: 1 }}>
            <MembersListCard
              members={members}
              isAdmin={isAdmin}
              user={user}
              group={group}
              onDeleteMember={handleDeleteMember}
              onInvite={openInviteModal}
              invitations={invitations}
              onViewInvitations={() => setIsInvitationsDialogOpen(true)}
            />
          </Box>

          {/* Sección de balances */}
          <Box sx={{ flex: 1 }}>
            <GroupBalanceCard balances={balances} transactions={transactions} />
          </Box>
        </Box>

        {/* Sección de balances - Versión móvil */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <GroupBalanceCard balances={balances} transactions={transactions} />
        </Box>

        {/* Sección de gastos */}
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
    </Fade>
  );
}

export default GroupDetail;
