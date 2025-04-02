import { Box, Typography, Button, Avatar } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const GroupHeader = ({ group, isAdmin, onDelete }) => {
  return (
    <Box>
      <Box>
        <Avatar>{group?.name?.charAt(0) || "G"}</Avatar>
        <Box>
          <Typography>{group?.name}</Typography>
          <Typography>Gestionar grupo</Typography>
        </Box>
      </Box>
      {isAdmin && (
        <Button startIcon={<DeleteIcon />} onClick={onDelete}>
          Eliminar
        </Button>
      )}
    </Box>
  );
};

export default GroupHeader;
