import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
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
  Grid2 as Grid,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

import { useAuth } from "@/application/contexts/AuthContext";
import { useExpenseModal } from "@/application/contexts/ExpenseModalContext";
import ExpenseModal from "@/presentation/components/ExpenseModal";

function GroupDetail() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { isExpenseModalOpen, closeExpenseModal } = useExpenseModal();

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Dialog states
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form states
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  /* useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setLoading(true)

        // Fetch group details
        const groupRef = doc(db, "groups", groupId)
        const groupSnap = await getDoc(groupRef)

        if (!groupSnap.exists()) {
          showSnackbar("Grupo no encontrado", "error")
          navigate("/")
          return
        }

        const groupData = { id: groupSnap.id, ...groupSnap.data() }
        setGroup(groupData)

        // Check if current user is admin
        setIsAdmin(groupData.adminId === user.uid)

        // Fetch expenses
        const expensesQuery = query(collection(db, "expenses"), where("groupId", "==", groupId))

        const expensesSnapshot = await getDocs(expensesQuery)
        const expensesList = expensesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setExpenses(expensesList)

        // Fetch members
        const membersPromises = groupData.members.map(async (memberId) => {
          const memberRef = doc(db, "users", memberId)
          const memberSnap = await getDoc(memberRef)
          return { id: memberSnap.id, ...memberSnap.data() }
        })

        const membersData = await Promise.all(membersPromises)
        setMembers(membersData)

        // Calculate balances
        calculateBalances(expensesList, membersData)
      } catch (error) {
        console.error("Error fetching group data:", error)
        showSnackbar("Error al cargar los datos del grupo", "error")
      } finally {
        setLoading(false)
      }
    }

    if (groupId && user) {
      fetchGroupData()
    }
  }, [groupId, user, navigate])*/

  const calculateBalances = (expensesList, membersData) => {};
  /*const calculateBalances = (expensesList, membersData) => {
    // Simple balance calculation logic
    // In a real app, this would be more complex
    const balanceMap = {}

    // Initialize balances for all members
    membersData.forEach((member) => {
      balanceMap[member.id] = 0
    })

    // Calculate expenses
    expensesList.forEach((expense) => {
      // Add to payer's balance
      balanceMap[expense.paidById] += Number.parseFloat(expense.amount)

      // Subtract equal shares from all members
      const shareAmount = Number.parseFloat(expense.amount) / membersData.length
      membersData.forEach((member) => {
        balanceMap[member.id] -= shareAmount
      })
    })

    // Convert to array for display
    const balancesArray = Object.entries(balanceMap).map(([userId, amount]) => {
      const member = membersData.find((m) => m.id === userId)
      return {
        userId,
        name: member?.displayName || "Usuario",
        amount: Number.parseFloat(amount.toFixed(2)),
      }
    })

    setBalances(balancesArray)
  }*/

  const handleAddExpense = async () => {};
  /*const handleAddExpense = async () => {
    if (!expenseDescription || !expenseAmount) {
      showSnackbar("Por favor completa todos los campos", "error")
      return
    }

    try {
      const amount = Number.parseFloat(expenseAmount)
      if (isNaN(amount) || amount <= 0) {
        showSnackbar("El monto debe ser un número positivo", "error")
        return
      }

      const newExpense = {
        description: expenseDescription,
        amount: amount,
        groupId: groupId,
        paidById: user.uid,
        paidByName: user.displayName,
        date: serverTimestamp(),
      }

      await addDoc(collection(db, "expenses"), newExpense)

      // Refresh expenses
      const expensesQuery = query(collection(db, "expenses"), where("groupId", "==", groupId))

      const expensesSnapshot = await getDocs(expensesQuery)
      const expensesList = expensesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setExpenses(expensesList)
      calculateBalances(expensesList, members)

      setExpenseDescription("")
      setExpenseAmount("")
      showSnackbar("Gasto añadido correctamente", "success")
    } catch (error) {
      console.error("Error adding expense:", error)
      showSnackbar("Error al añadir el gasto", "error")
    }
  }*/

  const handleInviteMember = async () => {};
  /*const handleInviteMember = async () => {
    if (!inviteEmail) {
      showSnackbar("Por favor ingresa un correo electrónico", "error")
      return
    }

    try {
      // Check if user is already a member
      const userQuery = query(collection(db, "users"), where("email", "==", inviteEmail))

      const userSnapshot = await getDocs(userQuery)

      if (userSnapshot.empty) {
        showSnackbar("No se encontró ningún usuario con ese correo", "error")
        return
      }

      const userData = userSnapshot.docs[0].data()
      const userId = userSnapshot.docs[0].id

      if (group.members.includes(userId)) {
        showSnackbar("Este usuario ya es miembro del grupo", "error")
        return
      }

      // Create invitation
      const invitation = {
        groupId: groupId,
        groupName: group.name,
        senderId: user.uid,
        senderName: user.displayName,
        recipientId: userId,
        recipientEmail: inviteEmail,
        status: "pending",
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "invitations"), invitation)

      setInviteDialogOpen(false)
      setInviteEmail("")
      showSnackbar("Invitación enviada correctamente", "success")
    } catch (error) {
      console.error("Error inviting member:", error)
      showSnackbar("Error al enviar la invitación", "error")
    }
  }*/

  const handleDeleteGroup = async () => {};
  /*const handleDeleteGroup = async () => {
    try {
      // Delete all expenses
      const expensesQuery = query(collection(db, "expenses"), where("groupId", "==", groupId))

      const expensesSnapshot = await getDocs(expensesQuery)
      const deleteExpensesPromises = expensesSnapshot.docs.map((doc) => deleteDoc(doc.ref))

      await Promise.all(deleteExpensesPromises)

      // Delete all invitations
      const invitationsQuery = query(collection(db, "invitations"), where("groupId", "==", groupId))

      const invitationsSnapshot = await getDocs(invitationsQuery)
      const deleteInvitationsPromises = invitationsSnapshot.docs.map((doc) => deleteDoc(doc.ref))

      await Promise.all(deleteInvitationsPromises)

      // Delete group
      await deleteDoc(doc(db, "groups", groupId))

      navigate("/")
      showSnackbar("Grupo eliminado correctamente", "success")
    } catch (error) {
      console.error("Error deleting group:", error)
      showSnackbar("Error al eliminar el grupo", "error")
    }
  }*/

  /*if (loading) {
    return (
      <AppLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }*/

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {group?.name}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader title="Gastos del Grupo" />
            <Divider />
            <CardContent>
              {expenses.length > 0 ? (
                <List>
                  {expenses.map((expense) => (
                    <ListItem
                      key={expense.id}
                      secondaryAction={
                        expense.paidById === user.uid && (
                          <Box>
                            <IconButton edge="end" aria-label="edit">
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )
                      }
                    >
                      <ListItemText
                        primary={expense.description}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              ${expense.amount}
                            </Typography>
                            {` - Pagado por ${expense.paidByName}`}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ p: 2, textAlign: "center" }}
                >
                  No hay gastos registrados
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Balance del Grupo" />
            <Divider />
            <CardContent>
              {balances.length > 0 ? (
                <List>
                  {balances.map((balance) => (
                    <ListItem key={balance.userId}>
                      <ListItemText
                        primary={balance.name}
                        secondary={
                          balance.amount > 0
                            ? `Debe recibir: $${Math.abs(balance.amount)}`
                            : balance.amount < 0
                            ? `Debe pagar: $${Math.abs(balance.amount)}`
                            : "Balance: $0"
                        }
                      />
                      <Chip
                        color={
                          balance.amount > 0
                            ? "success"
                            : balance.amount < 0
                            ? "error"
                            : "default"
                        }
                        label={`$${balance.amount.toFixed(2)}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ p: 2, textAlign: "center" }}
                >
                  No hay balances pendientes.
                </Typography>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Miembros del Grupo"
              action={
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    size="small"
                    onClick={() => setInviteDialogOpen(true)}
                    sx={{ mr: 1 }}
                  >
                    Invitar
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      size="small"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      Eliminar
                    </Button>
                  )}
                </Box>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {members.length} {members.length === 1 ? "miembro" : "miembros"}
              </Typography>
              <List>
                {members.map((member) => (
                  <ListItem key={member.id}>
                    <ListItemAvatar>
                      <Avatar>{member.displayName?.charAt(0) || "U"}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.displayName}
                      secondary={
                        <>
                          {member.id === user.uid && (
                            <Chip size="small" label="Tú" sx={{ mr: 1 }} />
                          )}
                          {member.id === group.adminId && (
                            <Chip
                              size="small"
                              color="primary"
                              label="Administrador"
                            />
                          )}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={closeExpenseModal}
        onAddExpense={handleAddExpense}
      />
    </>
  );
}

export default GroupDetail;
