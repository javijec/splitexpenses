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
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const ExpensesTable = ({ expenses, onEditExpense, onDeleteExpense }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Table>
        <TableHead
          sx={{
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
          }}
        >
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Fecha</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Descripción</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Monto</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Acciones</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow
              key={expense.id}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.success.main, 0.06),
                },
              }}
            >
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(
                    expense.createdAt.seconds * 1000
                  ).toLocaleDateString("es-ES")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.primary">
                  {expense.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={`$${expense.amount}`}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{
                    height: 28,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.05),
                    borderColor: (theme) =>
                      alpha(theme.palette.success.main, 0.3),
                  }}
                />
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="Editar gasto">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      size="large"
                      onClick={() => onEditExpense(expense.id)}
                      sx={{
                        mr: 1,
                        bgcolor: (theme) =>
                          alpha(theme.palette.success.main, 0.1),
                        color: "success.main",
                        border: "1px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.success.main, 0.2),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.success.main, 0.2),
                          transform: "scale(1.05)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar gasto">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      size="large"
                      onClick={() => onDeleteExpense(expense.id)}
                      sx={{
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.1),
                        color: "error.main",
                        border: "1px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.error.main, 0.2),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.error.main, 0.2),
                          transform: "scale(1.05)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                        },
                        transition: "all 0.2s ease",
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

export default ExpensesTable;
