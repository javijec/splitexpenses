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
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",

        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: (theme) => `${theme.palette.success.main}`,
        },
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                color: "success.main",
                width: 40,
                height: 40,
                mr: 1.5,
              }}
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
        sx={{
          bgcolor: "background.paper",
          pb: 1,
          pt: 2,
          px: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
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
