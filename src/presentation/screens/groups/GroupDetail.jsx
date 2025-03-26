import { useState, useEffect } from "react";
import { useParams } from "react-router";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import { useAuth } from "@/application/contexts/AuthContext";
import { useModal } from "@/application/contexts/ModalContext";
import ExpenseModal from "@/presentation/components/ExpenseModal";
import InviteModal from "@/presentation/components/InviteModal";
import DeleteGroupModal from "@/presentation/components/DeleteGroupModal";
import { getGroupByID } from "@/domain/usecases/groups";

function GroupDetail() {
  const { groupId } = useParams();
  const { user, groupContext, setGroupContext } = useAuth();

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
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form states
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  useEffect(() => {
    const loadGroup = async () => {
      try {
        setLoading(true);
        const data = await getGroupByID(groupId);
        setGroup(data);
        setMembers(data.members);
        setIsAdmin(data.createdBy.id === user.uid);
      } catch (error) {
        console.error("Error fetching group data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (groupId) {
      loadGroup();
    }
  }, [groupId]);

  const calculateBalances = (expensesList, membersData) => {
    // Simple balance calculation logic
    // In a real app, this would be more complex
    // Initialize balances for all members
    // Calculate expenses
    // Subtract equal shares from all members
    // Convert to array for display
  };

  const handleInviteModal = () => {
    openInviteModal();
  };

  const handleDeleteModal = () => {
    setGroupContext(group);
    openDeleteGroupModal();
  };

  if (loading) {
    return (
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
    );
  }

  return (
    <>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {group?.name}
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteModal();
            }}
          >
            Eliminar Grupo
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: { xs: "block", md: "none" }, mb: 3 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="members-content"
                id="members-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5">Miembros</Typography>
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInviteModal();
                      }}
                      sx={{ mr: 1 }}
                    >
                      Invitar
                    </Button>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {members.map((member) => (
                    <ListItem key={member.id + "a"}>
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
                            {member.id == group.createdBy.id && (
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
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" }, mb: 3 }}>
            <Card>
              <CardHeader
                title="Miembros"
                action={
                  <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    size="small"
                    onClick={handleInviteModal}
                  >
                    Invitar
                  </Button>
                }
              />
              <Divider />
              <CardContent>
                <List>
                  {members.map((member) => (
                    <ListItem key={member.id + "a"}>
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
                            {member.id == group.createdBy.id && (
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
          </Box>

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
        </Grid>
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
      </Grid>
      <ExpenseModal isOpen={isExpenseModalOpen} onClose={closeExpenseModal} />
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        group={group}
      />
      <DeleteGroupModal
        isOpen={isDeleteGroupModalOpen}
        onClose={closeDeleteGroupModal}
      />
    </>
  );
}

export default GroupDetail;
