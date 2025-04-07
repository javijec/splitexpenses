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
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Formatear fecha en formato legible
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Componente para vista móvil de gastos
  const MobileExpenseItem = ({ expense, index }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        bgcolor: index % 2 === 0 ? alpha(theme.palette.background.default, 0.5) : 'transparent',
        '&:hover': {
          bgcolor: alpha(theme.palette.primary.main, 0.02),
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography 
          variant="subtitle2" 
          fontWeight="bold" 
          sx={{ 
            maxWidth: '70%', 
            wordBreak: 'break-word',
            fontSize: '0.875rem',
          }}
        >
          {expense.description}
        </Typography>
        <Chip 
          label={`$${expense.amount}`} 
          color="primary"
          variant="outlined"
          size="small"
          sx={{
            fontWeight: 'bold',
            borderRadius: 1.5,
            ml: 1,
            flexShrink: 0,
            height: 24,
          }}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarIcon sx={{ fontSize: '0.9rem', color: alpha(theme.palette.text.secondary, 0.7) }} />
          <Typography variant="caption" color="text.secondary">
            {formatDate(expense.createdAt)}
          </Typography>
        </Stack>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Editar gasto" arrow placement="top">
            <IconButton 
              onClick={() => onEditExpense(expense.id)}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                width: 30,
                height: 30,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <EditIcon sx={{ fontSize: '0.9rem' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar gasto" arrow placement="top">
            <IconButton 
              onClick={() => onDeleteExpense(expense.id)}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.error.main, 0.1),
                color: 'error.main',
                width: 30,
                height: 30,
                '&:hover': {
                  bgcolor: alpha(theme.palette.error.main, 0.2),
                },
              }}
            >
              <DeleteIcon sx={{ fontSize: '0.9rem' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );

  // Vista móvil
  if (isMobile) {
    return (
      <Box sx={{ p: 1 }}>
        {expenses.map((expense, index) => (
          <MobileExpenseItem 
            key={expense.id} 
            expense={expense} 
            index={index} 
          />
        ))}
      </Box>
    );
  }

  // Vista de tabla para pantallas más grandes
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha(theme.palette.divider, 0.1),
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              '& th': {
                borderBottom: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
              },
            }}
          >
            <TableCell 
              width={{ xs: "25%", sm: "20%" }}
              sx={{ py: 2 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                  }}
                >
                  <CalendarIcon sx={{ fontSize: '0.9rem' }} />
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
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: '0.9rem' }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="bold">
                  Descripción
                </Typography>
              </Stack>
            </TableCell>
            <TableCell 
              width={"20%"}
              sx={{ py: 2 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                  }}
                >
                  <MoneyIcon sx={{ fontSize: '0.9rem' }} />
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
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.02),
                },
                // Alternar colores de fondo para mejor legibilidad
                ...(index % 2 === 0 && {
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                }),
              }}
            >
              <TableCell sx={{ py: 2 }}>
                <Typography 
                  variant="body2" 
                  fontWeight="medium"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <ReceiptIcon 
                    fontSize="small" 
                    sx={{ 
                      color: alpha(theme.palette.text.secondary, 0.7),
                      fontSize: '1rem',
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
                    fontWeight: 'bold',
                    borderRadius: 1.5,
                  }}
                />
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Tooltip title="Editar gasto" arrow placement="top">
                    <IconButton 
                      onClick={() => onEditExpense(expense.id)}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
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
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        color: 'error.main',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.error.main, 0.2),
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
