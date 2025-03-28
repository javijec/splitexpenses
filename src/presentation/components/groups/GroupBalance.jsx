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
  Box,
  Fade,
} from "@mui/material";
import { AccountBalance as BalanceIcon } from "@mui/icons-material";

const GroupBalance = ({ balances }) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        mb: 3,
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BalanceIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Balance del Grupo
            </Typography>
          </Box>
        }
        sx={{
          bgcolor: "background.paper",
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <Divider />
      <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
        {balances.length > 0 ? (
          <Fade in={true} timeout={500}>
            <List sx={{ p: 0 }}>
              {balances.map((balance) => (
                <ListItem
                  key={balance.userId}
                  sx={{
                    py: 2,
                    px: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
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
          </Fade>
        ) : (
          <Fade in={true} timeout={500}>
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BalanceIcon
                sx={{
                  fontSize: 40,
                  color: "text.disabled",
                  mb: 2,
                  opacity: 0.6,
                }}
              />
              <Typography variant="body1" color="text.secondary">
                No hay balances pendientes.
              </Typography>
            </Box>
          </Fade>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupBalance;
