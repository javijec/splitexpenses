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
      <Table
        size="small"
        sx={{ "& .MuiTableCell-root": { py: { xs: 1, sm: 1.5 } } }}
      >
        <TableHead
          sx={{
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
          }}
        >
          <TableRow>
            <TableCell
              width={{ xs: "25%", sm: "20%" }}
              sx={{ px: { xs: 1, sm: 2 } }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Fecha
              </Typography>
            </TableCell>
            <TableCell
              width={{ xs: "30%", sm: "40%" }}
              sx={{ px: { xs: 1, sm: 2 } }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Descripción
              </Typography>
            </TableCell>
            <TableCell width={"20%"} sx={{ px: { xs: 1, sm: 2 } }}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Monto
              </Typography>
            </TableCell>
            <TableCell
              width={{ xs: "25%", sm: "20%" }}
              sx={{
                px: { xs: 1, sm: 2 },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Acciones
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow
              key={expense.id}
              sx={{
                transition: "all 0.3s ease",

              }}
            >
              <TableCell sx={{ px: { xs: 1, sm: 2, py: { xs: 1, sm: 1.5 } } }}>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {new Date(
                    expense.createdAt.seconds * 1000
                  ).toLocaleDateString("es-ES")}
                </Typography>
              </TableCell>
              <TableCell sx={{ px: { xs: 1, sm: 2, py: { xs: 1, sm: 1.5 } } }}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {expense.description}
                </Typography>
              </TableCell>
              <TableCell sx={{ px: { xs: 1, sm: 2, py: { xs: 1, sm: 1.5 } } }}>
                <Chip
                  label={`$${expense.amount}`}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{
                    height: {
                      xs: 24,
                      sm: 28,
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                        fontWeight: 500,
                        bgcolor: (theme) =>
                          alpha(theme.palette.success.main, 0.05),
                        borderColor: (theme) =>
                          alpha(theme.palette.success.main, 0.3),
                        maxWidth: "100%",
                      },
                    },
                  }}
                />
              </TableCell>
              <TableCell
                sx={{
                  px: {
                    xs: 1,
                    sm: 2,
                    py: {
                      xs: 1,
                      sm: 1.5,
                      textAlign: { xs: "center", sm: "left" },
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Tooltip title="Editar gasto">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      size="small"
                      onClick={() => onEditExpense(expense.id)}
                      sx={{
                        mr: { xs: 0.5, sm: 1 },
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        p: { xs: 0.5, sm: 1 },
                        bgcolor: (theme) =>
                          alpha(theme.palette.success.main, 0.1),
                        color: "success.main",
                        border: "1px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.success.main, 0.2),

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
                      size="small"
                      onClick={() => onDeleteExpense(expense.id)}
                      sx={{
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        p: { xs: 0.5, sm: 1 },
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.1),
                        color: "error.main",
                        border: "1px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.error.main, 0.2),

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
