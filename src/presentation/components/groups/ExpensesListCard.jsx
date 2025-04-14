import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  Box,
  Paper,
  alpha,
  useTheme,
  Avatar,
  Stack,
  Button,
  Fade,
} from "@mui/material";
import {
  Receipt as ReceiptIcon,
  Add as AddIcon,
  ReceiptLong as ReceiptLongIcon,
} from "@mui/icons-material";
import { useModal } from "@/application/contexts/ModalContext";
import { ExpensesListTable } from "@/presentation/components/groups/ExpensesListTable";
import { deleteExpense, getExpense } from "@/domain/usecases/expenses";

// Componente para mostrar cuando no hay gastos
const EmptyExpensesState = ({ onAddExpense }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        border: "1px dashed",
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          width: 70,
          height: 70,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
          color: "primary.main",
          mb: 1,
        }}
      >
        <ReceiptLongIcon sx={{ fontSize: "2rem" }} />
      </Avatar>

      <Typography variant="h6" fontWeight="bold" color="text.primary">
        No hay gastos registrados
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 400, mx: "auto", mb: 1 }}
      >
        Registra tu primer gasto para comenzar a dividir los costos con los
        miembros del grupo
      </Typography>
    </Paper>
  );
};

export const ExpensesListCard = ({ expenses = [], setExpenses }) => {
  const theme = useTheme();
  const { setModalData, openExpenseModal } = useModal();

  if (!Array.isArray(expenses)) {
    console.error("Invalid expenses prop: expected an array.");
    return null;
  }

  const handleDeleteExpense = async (expenseId) => {
    const data = await deleteExpense(expenseId);
    setExpenses(data);
  };

  const handleEditExpense = async (expenseId) => {
    const data = await getExpense(expenseId);
    setModalData(data);
    openExpenseModal();
  };

  const handleAddExpense = () => {
    openExpenseModal();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        overflow: "hidden",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: 4,
          borderBottom: "1px solid",
          borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
              color: "primary.main",
              width: 40,
              height: 40,
            }}
          >
            <ReceiptIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Gastos del grupo
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 5 } }}>
        {expenses.length > 0 ? (
          <Fade in={true} timeout={500}>
            <Box>
              <ExpensesListTable
                expenses={expenses}
                onEditExpense={handleEditExpense}
                onDeleteExpense={handleDeleteExpense}
              />
            </Box>
          </Fade>
        ) : (
          <EmptyExpensesState onAddExpense={handleAddExpense} />
        )}
      </Box>
    </Paper>
  );
};
