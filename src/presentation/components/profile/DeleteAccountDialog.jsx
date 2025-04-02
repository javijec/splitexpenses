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
} from "@mui/material";

const DeleteAccountDialog = ({ open, onClose, onDelete, loading }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>
          Esta acción eliminará permanentemente tu cuenta y todos tus datos
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, confirma que deseas eliminar tu cuenta. Esta acción no se
          puede deshacer y perderás acceso a todos tus grupos y gastos
          compartidos.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCELAR</Button>
        <Button onClick={onDelete} disabled={loading}>
          {loading ? <CircularProgress /> : "ELIMINAR CUENTA"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
