import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Fade,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  GroupAdd as GroupAddIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
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
        sx: (theme) => ({
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: theme.palette.primary.main,
          },
          transition: "all 0.3s ease",
        }),
      }}
      TransitionComponent={Fade}
      transitionDuration={500}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={(theme) => ({
              bgcolor: theme.palette.primary.light,
              color: theme.palette.primary.main,
              width: 40,
              height: 40,
              mr: 1.5,
            })}
          >
            <GroupAddIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
            Crear Nuevo Grupo
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 3, bgcolor: "background.paper" }}>
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
            slotProps={{
              sx: {
                borderRadius: 2,

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
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
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontWeight: 600,

                transition: "all 0.2s ease",
              }}
              disableElevation
            >
              CREAR GRUPO
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog >
  );
};

export default GroupModal;
