import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  IconButton,
  Typography,
  Box,
  Fade,
  Tooltip,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { getUserName } from "@/domain/usecases/users";

const ExpensesList = ({ expenses }) => {
  const changeIdToName = (id) => {
    // Usamos un valor por defecto mientras se carga el nombre real
    const [name, setName] = useState("Cargando...");

    useEffect(() => {
      const fetchUserName = async () => {
        try {
          const displayName = await getUserName(id);
          setName(displayName || "Unknown");
        } catch (error) {
          console.error("Error al obtener el nombre del usuario:", error);
          setName("Unknown");
        }
      };

      fetchUserName();
    }, [id]);

    return name;
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
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
          background: (theme) => `${theme.palette.success.main}`,
        },
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                color: "success.main",
                width: 40,
                height: 40,
                mr: 1.5,
              }}
            >
              <ReceiptIcon />
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              Gastos del Grupo
            </Typography>
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
      <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
        {expenses.length > 0 ? (
          <Fade in={true} timeout={500}>
            <Box sx={{ height: "100%", width: "100%", p: 2 }}>
              <DataGrid
                rows={expenses}
                getRowId={(row) => row.id}
                columns={[
                  {
                    field: "description",
                    headerName: "Descripción",
                    flex: 1,
                    minWidth: 50,
                    renderCell: (params) => (
                      <Box sx={{ display: "flex" }}>
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            mr: 1.5,
                            bgcolor: (theme) =>
                              alpha(theme.palette.success.main, 0.1),
                            color: "success.main",
                            fontSize: "0.8rem",
                          }}
                        >
                          {params.value.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            letterSpacing: 0.2,
                          }}
                        >
                          {params.value}
                        </Typography>
                      </Box>
                    ),
                  },
                  {
                    field: "amount",
                    headerName: "Monto",
                    renderCell: (params) => (
                      <Chip
                        label={`$${params.value}`}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{
                          height: 28,
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          bgcolor: (theme) =>
                            alpha(theme.palette.success.main, 0.05),
                          borderColor: (theme) =>
                            alpha(theme.palette.success.main, 0.3),
                        }}
                      />
                    ),
                  },
                  {
                    field: "paidBy.id",
                    headerName: "Pagado por",
                    width: 300,
                    renderCell: (params) => (
                      <Box>
                        {Array.isArray(params.row.paidBy) ? (
                          params.row.paidBy.map((payer, index) => (
                            <Typography
                              key={payer.id}
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                py: 0.5,
                                px: 1,
                                borderRadius: 1,
                                bgcolor: (theme) =>
                                  alpha(theme.palette.success.main, 0.04),
                                border: "1px solid",
                                borderColor: (theme) =>
                                  alpha(theme.palette.success.main, 0.1),
                              }}
                            >
                              {changeIdToName(payer.id)}
                              {index < params.row.paidBy.length - 1 && ", "}
                            </Typography>
                          ))
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              py: 0.5,
                              px: 1,
                              borderRadius: 1,
                              bgcolor: (theme) =>
                                alpha(theme.palette.success.main, 0.04),
                              border: "1px solid",
                              borderColor: (theme) =>
                                alpha(theme.palette.success.main, 0.1),
                            }}
                          >
                            {changeIdToName(params.row.paidBy?.id) || "Unknown"}
                          </Typography>
                        )}
                      </Box>
                    ),
                  },
                  {
                    field: "actions",
                    headerName: "Acciones",
                    sortable: false,
                    filterable: false,
                    renderCell: (params) => (
                      <Box>
                        <Tooltip title="Editar gasto">
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            size="small"
                            sx={{
                              width: 36,
                              height: 36,
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
                            size="small"
                            sx={{
                              width: 36,
                              height: 36,
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
                    ),
                  },
                ]}
                disableRowSelectionOnClick
                disableColumnMenu
                sx={{
                  border: "none",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  overflow: "hidden",
                  "& .MuiDataGrid-main": {
                    borderRadius: 2,
                    overflow: "hidden",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  },
                  "& .MuiDataGrid-row": {
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.success.main, 0.06),
                      transform: "translateY(-2px)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    },
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
                    borderBottom: "none",

                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontWeight: 700,
                      color: "text.primary",
                      letterSpacing: 0.2,
                    },
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.04),
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    bgcolor: "background.paper",
                  },
                }}
              />
            </Box>
          </Fade>
        ) : (
          <Fade in={true} timeout={500}>
            <Box
              sx={{
                p: 5,
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
                  p: 4,
                  borderRadius: 4,
                  bgcolor: (theme) => alpha(theme.palette.success.main, 0.04),
                  border: "1px dashed",
                  borderColor: (theme) =>
                    alpha(theme.palette.success.main, 0.2),
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                    color: "success.main",
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <ReceiptIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ mb: 1, fontWeight: 600 }}
                >
                  No hay gastos registrados
                </Typography>
              </Paper>
            </Box>
          </Fade>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
