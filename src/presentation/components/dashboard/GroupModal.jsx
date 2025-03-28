import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
  Fade,
} from "@mui/material";
import {
  Close as CloseIcon,
  GroupAdd as GroupAddIcon,
} from "@mui/icons-material";
import { createGroup } from "@/domain/usecases/groups";
import { useAuth } from "@/application/contexts/AuthContext";

const GroupModal = ({ isOpen, onClose, onGroupCreated }) => {
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
    onGroupCreated(); // Call the callback function to update groups
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        },
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: "primary.light",
          color: "white",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
          >
            <GroupAddIcon sx={{ mr: 1 }} /> Crear Nuevo Grupo
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: "90%" }}>
            Crea un grupo para compartir gastos con amigos, familia o compañeros
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
      <DialogContent sx={{ p: 3, pt: 3 }}>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="groupName"
            label="Nombre del Grupo"
            name="groupName"
            autoFocus
            variant="outlined"
            placeholder="Ej: Viaje a la playa, Gastos del apartamento..."
            InputProps={{
              sx: {
                borderRadius: 2,
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
              },
            }}
            disableElevation
          >
            CREAR GRUPO
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GroupModal;
