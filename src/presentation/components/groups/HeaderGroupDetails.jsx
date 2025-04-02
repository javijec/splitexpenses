import { Box, Typography, Button, Avatar, Container } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export const HeaderGroupDetails = ({ group, isAdmin, onDelete }) => {
  return (
    <Container>
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
    </Container>
  );
};
