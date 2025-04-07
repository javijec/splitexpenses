import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
  Avatar,
  Stack,
  Divider,
  alpha,
  useTheme,
  Paper,
  IconButton,
} from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const DeleteAccountDialog = ({ open, onClose, onDelete, loading }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
              width: 48,
              height: 48,
            }}
          >
            <DeleteForeverIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" color="error.main">
            Eliminar Cuenta
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 3 }} />

      <DialogContent sx={{ p: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.error.main, 0.05),
            border: "1px solid",
            borderColor: alpha(theme.palette.error.main, 0.2),
          }}
        >
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                color: theme.palette.warning.main,
                width: 40,
                height: 40,
              }}
            >
              <WarningIcon />
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="error.main"
                gutterBottom
              >
                Esta acción no se puede deshacer
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Por favor, confirma que deseas eliminar tu cuenta. Esta acción
                eliminará permanentemente todos tus datos.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Perderás acceso a todos tus grupos y gastos compartidos.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onDelete}
          variant="contained"
          color="error"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <DeleteForeverIcon />
            )
          }
          disabled={loading}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(211, 47, 47, 0.3)",
            },
          }}
        >
          {loading ? "Eliminando..." : "Eliminar Cuenta"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
