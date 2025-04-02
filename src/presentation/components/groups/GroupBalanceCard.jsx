import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  Box,
  Avatar,
  Paper,
  Switch,
  Container,
} from "@mui/material";

import { AccountBalance as BalanceIcon } from "@mui/icons-material";

import { useState } from "react";

export const GroupBalanceCard = ({ balances, transactions }) => {
  const [showTransactions, setShowTransactions] = useState(true);

  return (
    <Card>
      <CardHeader
        avatar={<BalanceIcon />}
        title={<Typography>Balance</Typography>}
        action={
          <Switch
            checked={showTransactions}
            onChange={() => setShowTransactions(!showTransactions)}
            color="info"
            label={showTransactions ? "Transacciones" : "Balances"}
          />
        }
      />
      <CardContent>
        {!showTransactions ? (
          // Mostrar balances individuales
          balances && balances.length > 0 ? (
            <List>
              {balances.map((balance) => (
                <ListItem>
                  <ListItemText
                    primary={
                      <Container
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography>{balance.displayName}</Typography>
                        <Chip
                          label={
                            balance.amount > 0
                              ? `Recibe: $${Math.abs(balance.amount).toFixed(
                                  2
                                )}`
                              : balance.amount < 0
                              ? `Paga: $${Math.abs(balance.amount).toFixed(2)}`
                              : "Balance: $0"
                          }
                          color={
                            balance.amount > 0
                              ? "success"
                              : balance.amount < 0
                              ? "error"
                              : "default"
                          }
                        />
                      </Container>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box>
              <Avatar>
                <BalanceIcon />
              </Avatar>
              <Typography>No hay balances pendientes</Typography>
            </Box>
          )
        ) : // Mostrar transacciones simplificadas
        transactions && transactions.length > 0 ? (
          <Box>
            <List>
              {transactions.map((transaction, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <Container
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography>{transaction.fromName}</Typography>
                        <Typography>le debe</Typography>
                        <Chip
                          label={`$${transaction.amount.toFixed(2)}`}
                        />{" "}
                        <Typography>a</Typography>
                        <Typography>{transaction.toName}</Typography>
                      </Container>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Box>
            <Avatar>
              <BalanceIcon sx={{ fontSize: 30 }} />
            </Avatar>
            <Typography>No hay transacciones pendientes</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
