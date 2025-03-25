import React from "react";
import { useNavigate } from "react-router";
import { deleteGroup } from "@/domain/usecases/groups";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
} from "@mui/material";

const DeleteGroupModal = ({ isOpen, onClose, groupId }) => {
  const navigate = useNavigate();

  const handleDeleteGroup = async () => {
    try {
      // Delete all expenses
      // Delete all invitations
      // Delete group
      await deleteGroup(groupId);
      // Close modal
      onClose();
      // Redirect to home
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al eliminar el grupo:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Eliminar Grupo</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1">
            ¿Estás seguro que deseas eliminar este grupo? Esta acción no se
            puede deshacer.
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Se eliminarán todos los gastos e invitaciones asociadas a este
            grupo.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          CANCELAR
        </Button>
        <Button
          onClick={handleDeleteGroup}
          variant="contained"
          color="error"
          sx={{ fontWeight: "bold" }}
        >
          ELIMINAR GRUPO
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteGroupModal;
