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

export const ExpensesListTable = ({
  expenses,
  onEditExpense,
  onDeleteExpense,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={{ xs: "25%", sm: "20%" }}>
              <Typography>Fecha</Typography>
            </TableCell>
            <TableCell>
              <Typography>Descripción</Typography>
            </TableCell>
            <TableCell width={"20%"}>
              <Typography>Monto</Typography>
            </TableCell>
            <TableCell width={{ xs: "25%", sm: "20%" }}>
              <Typography>Acciones</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                <Typography noWrap>
                  {new Date(
                    expense.createdAt.seconds * 1000
                  ).toLocaleDateString("es-ES")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>{expense.description}</Typography>
              </TableCell>
              <TableCell>
                <Chip label={`$${expense.amount}`} />
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="Editar gasto">
                    <IconButton onClick={() => onEditExpense(expense.id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar gasto">
                    <IconButton onClick={() => onDeleteExpense(expense.id)}>
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
