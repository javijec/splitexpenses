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
  useMediaQuery,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";

const ExpensesTable = ({ expenses, onEditExpense, onDeleteExpense }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead
          sx={{
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
          }}
        >
          <TableRow>
            <TableCell
              width={isMobile ? "25%" : "20%"}
              sx={{ px: isMobile ? 1 : 2 }}
            >
              <Typography variant={isMobile ? "caption" : "subtitle2"}>
                Fecha
              </Typography>
            </TableCell>
            <TableCell
              width={isMobile ? "30%" : "40%"}
              sx={{ px: isMobile ? 1 : 2 }}
            >
              <Typography variant={isMobile ? "caption" : "subtitle2"}>
                Descripción
              </Typography>
            </TableCell>
            <TableCell
              width={isMobile ? "20%" : "20%"}
              sx={{ px: isMobile ? 1 : 2 }}
            >
              <Typography variant={isMobile ? "caption" : "subtitle2"}>
                Monto
              </Typography>
            </TableCell>
            <TableCell
              width={isMobile ? "25%" : "20%"}
              sx={{
                px: isMobile ? 1 : 2,
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <Typography variant={isMobile ? "caption" : "subtitle2"}>
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
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.success.main, 0.06),
                },
              }}
            >
              <TableCell sx={{ px: isMobile ? 1 : 2, py: isMobile ? 1 : 1.5 }}>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {new Date(
                    expense.createdAt.seconds * 1000
                  ).toLocaleDateString("es-ES")}
                </Typography>
              </TableCell>
              <TableCell sx={{ px: isMobile ? 1 : 2, py: isMobile ? 1 : 1.5 }}>
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
              <TableCell sx={{ px: isMobile ? 1 : 2, py: isMobile ? 1 : 1.5 }}>
                <Chip
                  label={`$${expense.amount}`}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{
                    height: isMobile ? 24 : 28,
                    fontSize: isMobile ? "0.75rem" : "0.85rem",
                    fontWeight: 500,
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.05),
                    borderColor: (theme) =>
                      alpha(theme.palette.success.main, 0.3),
                    maxWidth: "100%",
                  }}
                />
              </TableCell>
              <TableCell
                sx={{
                  px: isMobile ? 1 : 2,
                  py: isMobile ? 1 : 1.5,
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: isMobile ? "center" : "flex-start",
                  }}
                >
                  <Tooltip title="Editar gasto">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      size={isMobile ? "small" : "medium"}
                      onClick={() => onEditExpense(expense.id)}
                      sx={{
                        mr: isMobile ? 0.5 : 1,
                        width: isMobile ? 32 : 40,
                        height: isMobile ? 32 : 40,
                        p: isMobile ? 0.5 : 1,
                        bgcolor: (theme) =>
                          alpha(theme.palette.success.main, 0.1),
                        color: "success.main",
                        border: "1px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.success.main, 0.2),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.success.main, 0.2),
                          transform: isMobile ? "scale(1.02)" : "scale(1.05)",
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
                      size={isMobile ? "small" : "medium"}
                      onClick={() => onDeleteExpense(expense.id)}
                      sx={{
                        width: isMobile ? 32 : 40,
                        height: isMobile ? 32 : 40,
                        p: isMobile ? 0.5 : 1,
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.1),
                        color: "error.main",
                        border: "1px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.error.main, 0.2),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.error.main, 0.2),
                          transform: isMobile ? "scale(1.02)" : "scale(1.05)",
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
