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
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: (theme) => `${theme.palette.primary.main}`,
          },
          transition: "all 0.3s ease",
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
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 2,
          pt: 3,
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              width: 40,
              height: 40,
              mr: 1.5,
            }}
          >
            <GroupAddIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              Crear Nuevo Grupo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crea un grupo para compartir gastos con amigos, familia o
              compañeros
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "error.main",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.error.main, 0.2),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
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
            InputProps={{
              sx: {
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.5),
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              onClick={onClose}
              color="inherit"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.grey[500], 0.2),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.05),
                },
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
                boxShadow: (theme) =>
                  `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: (theme) =>
                    `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
              disableElevation
            >
              CREAR GRUPO
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GroupModal;
