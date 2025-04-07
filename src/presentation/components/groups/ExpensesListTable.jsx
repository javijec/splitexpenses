import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  alpha,
  Avatar,
  Stack,
} from "@mui/material";
// No necesitamos importar useTheme porque usamos theme como parámetro en las funciones de callback
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
  CalendarMonth as CalendarIcon,
  Description as DescriptionIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";

export const ExpensesListTable = ({
  expenses,
  onEditExpense,
  onDeleteExpense,
}) => {
  // Necesitamos importar useTheme para los estilos inline, pero no necesitamos usarlo directamente
  // ya que lo usamos en funciones de callback en los estilos

  // Formatear fecha en formato legible
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.05),
              "& th": {
                borderBottom: "1px solid",
                borderColor: (theme) => alpha(theme.palette.divider, 0.1),
              },
            }}
          >
            <TableCell width={{ xs: "25%", sm: "20%" }} sx={{ py: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                  }}
                >
                  <CalendarIcon sx={{ fontSize: "0.9rem" }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="bold">
                  Fecha
                </Typography>
              </Stack>
            </TableCell>
            <TableCell sx={{ py: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: "0.9rem" }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="bold">
                  Descripción
                </Typography>
              </Stack>
            </TableCell>
            <TableCell width={"20%"} sx={{ py: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                  }}
                >
                  <MoneyIcon sx={{ fontSize: "0.9rem" }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="bold">
                  Monto
                </Typography>
              </Stack>
            </TableCell>
            <TableCell
              width={{ xs: "25%", sm: "20%" }}
              align="center"
              sx={{ py: 2 }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Acciones
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow
              key={expense.id}
              sx={{
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.02),
                },
                // Alternar colores de fondo para mejor legibilidad
                ...(index % 2 === 0 && {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.background.default, 0.5),
                }),
              }}
            >
              <TableCell sx={{ py: 2 }}>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {formatDate(expense.createdAt)}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ReceiptIcon
                    fontSize="small"
                    sx={{
                      color: (theme) =>
                        alpha(theme.palette.text.secondary, 0.7),
                      fontSize: "1rem",
                    }}
                  />
                  {expense.description}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Chip
                  label={`$${expense.amount}`}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    borderRadius: 1.5,
                  }}
                />
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <Tooltip title="Editar gasto" arrow placement="top">
                    <IconButton
                      onClick={() => onEditExpense(expense.id)}
                      size="small"
                      sx={{
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.2),
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar gasto" arrow placement="top">
                    <IconButton
                      onClick={() => onDeleteExpense(expense.id)}
                      size="small"
                      sx={{
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.1),
                        color: "error.main",
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.error.main, 0.2),
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
