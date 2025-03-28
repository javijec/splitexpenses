import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
} from "@mui/material";

const GroupBalance = ({ balances }) => {
  return (
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
  );
};

export default GroupBalance;