import React from "react";
import { useNavigate } from "react-router";
import { deleteGroup } from "@/domain/usecases/groups";
import { deleteGroupExpenses } from "@/domain/usecases/expenses";
import { deleteGroupInvitations } from "@/domain/usecases/invitations";
import { useAuth } from "@/application/contexts/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  useTheme,
} from "@mui/material";

const DeleteGroupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { groupContext } = useAuth();

  const handleDeleteGroup = async () => {
    try {
      const groupId = groupContext.id;
      // Delete all expenses
      await deleteGroupExpenses(groupId);
      // Delete all invitations
      await deleteGroupInvitations(groupId);
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography>Eliminar Grupo</Typography>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography>
            ¿Estás seguro que deseas eliminar este grupo? Esta acción no se
            puede deshacer.
          </Typography>
          <Typography>
            Se eliminarán todos los gastos e invitaciones asociadas a este
            grupo.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCELAR</Button>
        <Button onClick={handleDeleteGroup}>ELIMINAR GRUPO</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteGroupModal;
