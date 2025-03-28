import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const ExpensesList = ({ expenses, user }) => {
  return (
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
  );
};

export default ExpensesList;