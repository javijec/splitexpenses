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
  Fade,
  useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const DeleteGroupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { groupContext } = useAuth();
  const theme = useTheme();

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: (theme) => ({
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: theme.palette.error.main,
          },
          transition: "all 0.3s ease",
        }),
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <DialogTitle
        sx={(theme) => ({
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 1,
          pt: 2,
          px: 3,
        })}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
          Eliminar Grupo
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 3, bgcolor: "background.paper" }}>
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
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Button
          onClick={onClose}
          color="inherit"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.grey[500], 0.2),

            transition: "all 0.2s ease",
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={handleDeleteGroup}
          variant="contained"
          color="error"
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.error.main, 0.3)}`,

            transition: "all 0.2s ease",
          }}
        >
          ELIMINAR GRUPO
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteGroupModal;
