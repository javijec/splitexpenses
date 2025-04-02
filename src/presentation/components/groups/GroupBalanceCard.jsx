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
  Avatar,
  Paper,
  Switch,
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
          <Box>
            <Switch
              checked={showTransactions}
              onChange={() => setShowTransactions(!showTransactions)}
              color="info"
            />
            <Typography>
              {showTransactions ? "Transacciones" : "Balances"}
            </Typography>
          </Box>
        }
      />
      <Divider />
      <CardContent>
        {!showTransactions ? (
          // Mostrar balances individuales
          balances && balances.length > 0 ? (
            <Box>
              <List>
                {balances.map((balance) => (
                  <ListItem key={balance.id}>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography>{balance.displayName}</Typography>
                          <Chip
                            label={
                              balance.amount > 0
                                ? `Recibe: $${Math.abs(balance.amount).toFixed(
                                    2
                                  )}`
                                : balance.amount < 0
                                ? `Paga: $${Math.abs(balance.amount).toFixed(
                                    2
                                  )}`
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
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Box>
              <Paper>
                <Avatar>
                  <BalanceIcon />
                </Avatar>
                <Typography>No hay balances pendientes</Typography>
              </Paper>
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
                      <Box>
                        <Box>
                          <Typography>{transaction.fromName}</Typography>
                        </Box>
                        <Typography>le debe</Typography>
                        <Chip
                          label={`$${transaction.amount.toFixed(2)}`}
                        />{" "}
                        <Typography>a</Typography>
                        <Box>
                          <Typography>{transaction.toName}</Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Box in={true} timeout={500}>
            <Box>
              <Paper>
                <Avatar>
                  <BalanceIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography>No hay transacciones pendientes</Typography>
              </Paper>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
