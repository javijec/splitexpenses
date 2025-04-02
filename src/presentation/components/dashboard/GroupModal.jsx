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
  Card,
  CardHeader,
  CardContent
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
    <Dialog open={isOpen} onClose={onClose}>
      <Card>
        <CardHeader
          avatar={<GroupAddIcon />}
          title={
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Crear Nuevo Grupo
            </Typography>
          }
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              required
              id="groupName"
              label="Nombre del Grupo"
              name="groupName"
              placeholder="Ej: Viaje a la playa, Gastos del apartamento..."

            />
            <Box>
              <Button onClick={onClose}>CANCELAR</Button>
              <Button
                type="submit"
                color="primary"
              >
                CREAR GRUPO
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>


    </Dialog>
  );
};

export default GroupModal;
