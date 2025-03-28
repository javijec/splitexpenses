import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Fade,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";

const ExpensesList = ({ expenses, user }) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ReceiptIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Gastos del Grupo //voy a hacerlo con x-data-grid
            </Typography>
          </Box>
        }
        sx={{
          bgcolor: "background.paper",
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <Divider />
      <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
        {expenses.length > 0 ? (
          <Fade in={true} timeout={500}>
            <List sx={{ p: 0 }}>
              {expenses.map((expense) => (
                <ListItem
                  key={expense.id}
                  sx={{
                    py: 2,
                    px: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                  secondaryAction={
                    expense.paidById === user.uid && (
                      <Box>
                        <Tooltip title="Editar gasto">
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            size="small"
                            sx={{
                              mr: 1,
                              bgcolor: "primary.light",
                              color: "white",
                              "&:hover": {
                                bgcolor: "primary.main",
                              },
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
                              bgcolor: "error.light",
                              color: "white",
                              "&:hover": {
                                bgcolor: "error.main",
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )
                  }
                >
                  <ListItemText
                    primary={expense.description}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          ${expense.amount}
                        </Typography>
                        {` - Pagado por ${expense.paidByName}`}
                      </>
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
                p: 4,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ReceiptIcon
                sx={{
                  fontSize: 40,
                  color: "text.disabled",
                  mb: 2,
                  opacity: 0.6,
                }}
              />
              <Typography variant="body1" color="text.secondary">
                No hay gastos registrados
              </Typography>
            </Box>
          </Fade>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
