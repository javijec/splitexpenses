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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>
          Esta acción eliminará permanentemente tu cuenta y todos tus datos
        </Typography>
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
