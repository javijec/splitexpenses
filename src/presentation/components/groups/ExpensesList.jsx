import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  Box,
  Fade,
  Avatar,
} from "@mui/material";
import { Receipt as ReceiptIcon } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useModal } from "@/application/contexts/ModalContext";
import ExpensesTable from "@/presentation/components/groups/ExpensesTable";
import { deleteExpense, getExpense } from "@/domain/usecases/expenses";

const ExpensesList = ({ expenses = [], setExpenses }) => {
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

  return (
    <Card
      elevation={3}
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease",
        boxShadow: theme.shadows[2],
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: theme.palette.success.main,
        },
      })}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.success.main, 0.1),
                color: theme.palette.success.main,
                width: 40,
                height: 40,
                mr: 1.5,
              })}
            >
              <ReceiptIcon />
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              Gastos
            </Typography>
          </Box>
        }
        sx={(theme) => ({
          bgcolor: theme.palette.background.paper,
          pb: 1,
          pt: 2,
          px: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      />
      <Divider />
      <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
        {expenses.length > 0 ? (
          <Fade in={expenses.length > 0} timeout={500}>
            <Box>
              <ExpensesTable
                expenses={expenses}
                onEditExpense={handleEditExpense}
                onDeleteExpense={handleDeleteExpense}
              />
            </Box>
          </Fade>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 2 }}
          >
            No hay gastos para mostrar.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
