import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Fade,
} from "@mui/material";
import {
  Close as CloseIcon,
  DeleteForever as DeleteIcon,
} from "@mui/icons-material";

const DeleteAccountDialog = ({ open, onClose, onDelete, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        },
      }}
      slots={{ transition: Fade }}
      slotsProps={{ transition: { timeout: 400 } }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: "error.light",
          color: "white",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
          >
            <DeleteIcon sx={{ mr: 1 }} /> Eliminar Cuenta
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: "90%" }}>
            Esta acción eliminará permanentemente tu cuenta y todos tus datos
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "white",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 3, m: 2 }}>
        <DialogContentText sx={{ mb: 1 }}>
          Por favor, confirma que deseas eliminar tu cuenta. Esta acción no se
          puede deshacer y perderás acceso a todos tus grupos y gastos
          compartidos.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 500,
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={onDelete}
          variant="contained"
          color="error"
          disabled={loading}
          sx={{
            ml: 2,
            py: 1,
            px: 3,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(211, 47, 47, 0.4)",
            },
          }}
          disableElevation
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "ELIMINAR CUENTA"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
