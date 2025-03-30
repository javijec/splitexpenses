import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
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
import { getUserName } from "@/domain/usecases/users";
import { useState, useEffect } from "react";

const GroupBalance = ({ balances, transactions }) => {
  const [userNames, setUserNames] = useState({});
  const [showTransactions, setShowTransactions] = useState(true);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const balance of balances) {
        const name = await getUserName(balance.id);
        if (name) {
          names[balance.id] = name;
        }
      }
      setUserNames(names);
    };

    if (balances && balances.length > 0) {
      fetchUserNames();
    }
  }, [balances]);

  const getUserDisplayName = (userId) => {
    return userNames[userId] || userId;
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
        },
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
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                color: "info.main",
                width: 40,
                height: 40,
                mr: 1.5,
              }}
            >
              <BalanceIcon />
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              Balance
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                {showTransactions ? "Transacciones" : "Balances"}
              </Typography>
              <Switch
                checked={showTransactions}
                onChange={() => setShowTransactions(!showTransactions)}
                color="info"
              />
            </Box>
          </Box>
        }
        sx={{
          bgcolor: "background.paper",
          pb: 2,
          pt: 3,
          px: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        {!showTransactions ? (
          // Mostrar balances individuales
          balances && balances.length > 0 ? (
            <Fade in={true} timeout={500}>
              <List sx={{ p: 0 }}>
                {balances.map((balance) => (
                  <ListItem
                    key={balance.id}
                    sx={{
                      py: 2.5,
                      px: 3,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.info.main, 0.04),
                        transform: "translateY(-2px)",
                      },
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: (theme) =>
                            alpha(theme.palette.info.main, 0.1),
                          color: "info.main",
                          width: 36,
                          height: 36,
                          mr: 2,
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        {getUserDisplayName(balance.id).charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              color: "text.primary",
                              letterSpacing: 0.2,
                            }}
                          >
                            {getUserDisplayName(balance.id)}
                          </Typography>
                        </Box>
                      }
                      sx={{ mb: { xs: 1, sm: 0 } }}
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {balance.amount > 0
                            ? `Debe recibir: $${Math.abs(
                                balance.amount
                              ).toFixed(2)}`
                            : balance.amount < 0
                            ? `Debe pagar: $${Math.abs(balance.amount).toFixed(
                                2
                              )}`
                            : "Balance: $0"}
                        </Typography>
                      }
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
            <List sx={{ p: 0 }}>
              {transactions.map((transaction, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 2.5,
                    px: 3,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
                      transform: "translateY(-2px)",
                    },
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: (theme) =>
                                alpha(theme.palette.error.main, 0.1),
                              color: "error.main",
                              width: 36,
                              height: 36,
                              mr: 1,
                              fontSize: "0.9rem",
                              fontWeight: "bold",
                            }}
                          >
                            {getUserDisplayName(transaction.from)
                              .charAt(0)
                              .toUpperCase()}
                          </Avatar>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                            }}
                          >
                            {getUserDisplayName(transaction.from)}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ mx: 1, color: "text.secondary" }}
                        >
                          →
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: (theme) =>
                                alpha(theme.palette.success.main, 0.1),
                              color: "success.main",
                              width: 36,
                              height: 36,
                              mr: 1,
                              fontSize: "0.9rem",
                              fontWeight: "bold",
                            }}
                          >
                            {getUserDisplayName(transaction.to)
                              .charAt(0)
                              .toUpperCase()}
                          </Avatar>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                            }}
                          >
                            {getUserDisplayName(transaction.to)}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, color: "text.secondary" }}
                        >
                          Debe pagar
                        </Typography>
                        <Chip
                          color="primary"
                          label={`$${transaction.amount.toFixed(2)}`}
                          sx={{
                            height: 28,
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            bgcolor: (theme) =>
                              alpha(theme.palette.primary.main, 0.1),
                            borderColor: (theme) =>
                              alpha(theme.palette.primary.main, 0.3),
                            mt: { xs: 1, sm: 0 },
                          }}
                        />
                      </>
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
