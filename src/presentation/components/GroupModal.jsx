import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { createGroup } from "@/domain/usecases/groups";
import { useAuth } from "@/application/contexts/AuthContext";

const GroupModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const groupName = data.get("groupName");
    const groupData = {
      name: groupName,
      createdBy: { id: user.uid, name: user.displayName },
      members: [
        { id: user.uid, displayName: user.displayName, email: user.email },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createGroup(groupData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography gutterBottom>Crear Nuevo Grupo</Typography>
        <Typography variant="body1" color="text.secondary">
          Crea un grupo para compartir gastos con amigos, familia o compañeros
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit} // Add this line to connect the form to the handler
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="groupName"
            label="Nombre del Grupo"
            name="groupName"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Grupo
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GroupModal;
