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
  Avatar,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const ExpensesList = ({ expenses, user }) => {
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
            <List sx={{ p: 0 }}>
              {expenses.map((expense) => (
                <ListItem
                  key={expense.id}
                  sx={{
                    py: 2.5,
                    px: 3,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.success.main, 0.04),
                      transform: "translateY(-2px)",
                    },
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                  }}
                  secondaryAction={
                    expense.paidById === user.uid && (
                      <Box>
                        <Tooltip title="Editar gasto" placement="top">
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            size="small"
                            sx={{
                              width: 36,
                              height: 36,
                              mr: 1,
                              bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, 0.1),
                              color: "primary.main",
                              border: "1px solid",
                              borderColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.2),
                              "&:hover": {
                                bgcolor: (theme) =>
                                  alpha(theme.palette.primary.main, 0.2),
                                transform: "scale(1.05)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar gasto" placement="top">
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
                              },
                              transition: "all 0.2s ease",
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
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: (theme) =>
                              alpha(theme.palette.success.main, 0.1),
                            color: "success.main",
                            width: 36,
                            height: 36,
                            mr: 2,
                            fontSize: "1rem",
                            fontWeight: "bold",
                          }}
                        >
                          {expense.description.charAt(0).toUpperCase()}
                        </Avatar>
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
                            {expense.description}
                          </Typography>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ fontWeight: 500 }}
                            >
                              ${expense.amount}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ ml: 1 }}
                            >
                              {` - Pagado por ${expense.paidByName}`}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
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
