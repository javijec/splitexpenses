import React, { useState } from "react";
import {
  Chip,
  Typography,
  Box,
  Avatar,
  Paper,
  Switch,
  Stack,
  alpha,
  useTheme,
  FormControlLabel,
  Fade,
} from "@mui/material";

import {
  AccountBalance as BalanceIcon,
  ArrowForward as ArrowForwardIcon,
  Payments as PaymentsIcon,
  AccountBalanceWallet as WalletIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

// Componente para mostrar un balance individual
const BalanceItem = ({ balance }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        mb: 2,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid",
        borderColor: (theme) =>
          balance.amount > 0
            ? alpha(theme.palette.success.main, 0.3)
            : balance.amount < 0
            ? alpha(theme.palette.error.main, 0.3)
            : alpha(theme.palette.divider, 0.5),
        bgcolor: (theme) =>
          balance.amount > 0
            ? alpha(theme.palette.success.main, 0.05)
            : balance.amount < 0
            ? alpha(theme.palette.error.main, 0.05)
            : "transparent",
        flexDirection: { xs: "row", sm: "row" },
        gap: { xs: 1, sm: 0 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: (theme) =>
              balance.amount > 0
                ? alpha(theme.palette.success.main, 0.2)
                : balance.amount < 0
                ? alpha(theme.palette.error.main, 0.2)
                : alpha(theme.palette.grey[500], 0.2),
            color: (theme) =>
              balance.amount > 0
                ? theme.palette.success.main
                : balance.amount < 0
                ? theme.palette.error.main
                : theme.palette.grey[500],
          }}
        >
          <PersonIcon />
        </Avatar>

        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {balance.displayName}
          </Typography>
        </Box>
      </Box>

      <Chip
        label={
          balance.amount > 0
            ? `Recibe: $${Math.abs(balance.amount).toFixed(2)}`
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
        variant={balance.amount === 0 ? "outlined" : "filled"}
        sx={{
          fontWeight: 600,
          px: 1.5,
        }}
      />
    </Paper>
  );
};

// Componente para mostrar una transacción
const TransactionItem = ({ transaction }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        mb: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "flex-start", sm: "center" },
          }}
        >
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
          >
            <PersonIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
          </Avatar>

          <Typography
            variant="subtitle1"
            fontWeight="medium"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {transaction.fromName}
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", sm: "block" },
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Chip
            icon={
              <PaymentsIcon sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} />
            }
            label={`$${transaction.amount.toFixed(2)}`}
            color="primary"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              px: 1,
              height: { xs: 28, sm: 32 },
            }}
          />
          <ArrowForwardIcon
            sx={{
              color: (theme) => alpha(theme.palette.text.secondary, 0.5),
              mx: 1,

              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "flex-start", sm: "center" },
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {transaction.toName}
          </Typography>

          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
              color: theme.palette.success.main,
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
          >
            <PersonIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
          </Avatar>
        </Box>
      </Box>
    </Paper>
  );
};

// Componente para mostrar cuando no hay balances o transacciones
const EmptyBalanceState = ({ isTransactions }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        border: "1px dashed",
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          width: 70,
          height: 70,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
          color: "primary.main",
          mb: 1,
        }}
      >
        {isTransactions ? (
          <PaymentsIcon sx={{ fontSize: "2rem" }} />
        ) : (
          <WalletIcon sx={{ fontSize: "2rem" }} />
        )}
      </Avatar>

      <Typography variant="h6" fontWeight="bold" color="text.primary">
        {isTransactions
          ? "No hay transacciones pendientes"
          : "No hay balances pendientes"}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 400, mx: "auto" }}
      >
        {isTransactions
          ? "Cuando haya pagos pendientes entre los miembros, aparecerán aquí"
          : "Cuando haya gastos registrados, los balances aparecerán aquí"}
      </Typography>
    </Paper>
  );
};

export const GroupBalanceCard = ({ balances, transactions }) => {
  const theme = useTheme();
  const [showTransactions, setShowTransactions] = useState(true);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: { xs: 2, sm: 5 },

          borderBottom: "1px solid",
          borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
              color: "primary.main",
              width: 40,
              height: 40,
            }}
          >
            <BalanceIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Balance del grupo
          </Typography>
        </Stack>

        <FormControlLabel
          control={
            <Switch
              checked={showTransactions}
              onChange={() => setShowTransactions(!showTransactions)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              {showTransactions ? "Ver transacciones" : "Ver balances"}
            </Typography>
          }
          labelPlacement="start"
          sx={{ mr: 1, ml: 0 }}
        />
      </Box>

      <Box sx={{ p: { xs: 2, sm: 4 }, flex: 1, overflow: "auto" }}>
        {!showTransactions ? (
          // Mostrar balances individuales
          balances && balances.length > 0 ? (
            <Fade in={true} timeout={500}>
              <Box>
                {balances.map((balance, index) => (
                  <BalanceItem key={index} balance={balance} />
                ))}
              </Box>
            </Fade>
          ) : (
            <EmptyBalanceState isTransactions={false} />
          )
        ) : // Mostrar transacciones simplificadas
        transactions && transactions.length > 0 ? (
          <Fade in={true} timeout={500}>
            <Box>
              {transactions.map((transaction, index) => (
                <TransactionItem
                  key={index}
                  transaction={transaction}
                  index={index}
                />
              ))}
            </Box>
          </Fade>
        ) : (
          <EmptyBalanceState isTransactions={true} />
        )}
      </Box>
    </Paper>
  );
};
