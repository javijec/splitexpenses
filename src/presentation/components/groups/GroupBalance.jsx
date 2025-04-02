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
  Avatar,
  Paper,
  Switch,
} from "@mui/material";

import { AccountBalance as BalanceIcon } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

const GroupBalance = ({ balances, transactions }) => {
  const [showTransactions, setShowTransactions] = useState(true);

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
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
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.info.main}, ${theme.palette.primary.main})`,
        },
      }}
    >
      <CardHeader
        avatar={<BalanceIcon />}
        title={<Typography>Balance</Typography>

        }
        action={<><Typography>
          {showTransactions ? "Transacciones" : "Balances"}
        </Typography>
          <Switch
            checked={showTransactions}
            onChange={() => setShowTransactions(!showTransactions)}
            color="info"
          /></>}

      />
      <Divider />
      <CardContent sx={{ p: 0, m: 0 }}>
        {!showTransactions ? (
          // Mostrar balances individuales
          balances && balances.length > 0 ? (
            <Fade in={true} timeout={500}>
              <List sx={{ p: 0, m: 0 }}>
                {balances.map((balance) => (
                  <ListItem
                    key={balance.id}
                    sx={{
                      py: 1,
                      px: 3,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",

                      flexDirection: { xs: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                              letterSpacing: 0.2,
                            }}
                          >
                            {balance.displayName}
                          </Typography>
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
                            sx={{
                              height: 24,
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
                              fontWeight: 500,
                              color: (theme) =>
                                theme.palette.mode === "dark" ? "#fff" : "#000",
                              bgcolor: (theme) =>
                                alpha(
                                  theme.palette[
                                    balance.amount > 0
                                      ? "success"
                                      : balance.amount < 0
                                        ? "error"
                                        : "default"
                                  ].main,
                                  0.3
                                ),
                              borderColor: (theme) =>
                                alpha(
                                  theme.palette[
                                    balance.amount > 0
                                      ? "success"
                                      : balance.amount < 0
                                        ? "error"
                                        : "default"
                                  ].main,
                                  0.3
                                ),
                            }}
                          />
                        </Box>
                      }
                      sx={{ mb: { xs: 0, sm: 0 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Fade>
          ) : (
            <Fade in={true} timeout={500}>
              <Box
                sx={{
                  p: 1,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 4,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
                    border: "1px dashed",
                    borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                      color: "info.main",
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    <BalanceIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    No hay balances pendientes
                  </Typography>
                </Paper>
              </Box>
            </Fade>
          )
        ) : // Mostrar transacciones simplificadas
          transactions && transactions.length > 0 ? (
            <Fade in={true} timeout={500}>
              <List sx={{ p: 0, m: 0 }}>
                {transactions.map((transaction, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      py: 1,
                      px: 3,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",

                      flexDirection: { xs: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                color: "text.primary",
                              }}
                            >
                              {transaction.fromName}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ mx: 1, color: "text.secondary" }}
                          >
                            le debe
                          </Typography>
                          <Chip
                            color="primary"
                            label={`$${transaction.amount.toFixed(2)}`}
                            sx={{
                              height: 28,
                              fontSize: "0.85rem",
                              fontWeight: 500,
                              bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? alpha(theme.palette.primary.main, 0.2)
                                  : alpha(theme.palette.primary.main, 0.1),
                              borderColor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? alpha(theme.palette.primary.main, 0.4)
                                  : alpha(theme.palette.primary.main, 0.3),
                              color: (theme) =>
                                theme.palette.mode === "dark"
                                  ? theme.palette.primary.light
                                  : theme.palette.primary.main,
                            }}
                          />{" "}
                          <Typography
                            variant="body2"
                            sx={{ mx: 1, color: "text.secondary" }}
                          >
                            a
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                color: "text.primary",
                              }}
                            >
                              {transaction.toName}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Fade>
          ) : (
            <Fade in={true} timeout={500}>
              <Box
                sx={{
                  p: 1,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 4,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
                    border: "1px dashed",
                    borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                      color: "info.main",
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    <BalanceIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    No hay transacciones pendientes
                  </Typography>
                </Paper>
              </Box>
            </Fade>
          )}
      </CardContent>
    </Card>
  );
};

export default GroupBalance;
