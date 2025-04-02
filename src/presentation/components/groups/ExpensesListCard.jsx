import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Receipt as ReceiptIcon } from "@mui/icons-material";
import { useModal } from "@/application/contexts/ModalContext";
import { ExpensesListTable } from "@/presentation/components/groups/ExpensesListTable";
import { deleteExpense, getExpense } from "@/domain/usecases/expenses";

export const ExpensesListCard = ({ expenses = [], setExpenses }) => {
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
    <Card>
      <CardHeader
        avatar={<ReceiptIcon />}
        title={<Typography>Gastos</Typography>}
      />
      <Divider />
      <CardContent>
        {expenses.length > 0 ? (
          <Box>
            <ExpensesListTable
              expenses={expenses}
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </Box>
        ) : (
          <Typography>No hay gastos para mostrar.</Typography>
        )}
      </CardContent>
    </Card>
  );
};
