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
  alpha,
  Avatar,
  Stack,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export const DeleteGroupDialog = ({ isOpen, onClose }) => {
  const theme = useTheme();
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
    <Dialog
      open={isOpen}
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
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Eliminar Grupo
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
                ¿Estás seguro que deseas eliminar este grupo? Se eliminarán
                permanentemente todos los gastos e invitaciones asociadas.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Los miembros del grupo ya no tendrán acceso a esta información.
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
          onClick={handleDeleteGroup}
          variant="contained"
          color="error"
          startIcon={<DeleteForeverIcon />}
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
          Eliminar Grupo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
