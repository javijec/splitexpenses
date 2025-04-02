import { Box, Typography, Button, Avatar, Container } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export const HeaderGroupDetails = ({ group, isAdmin, onDelete }) => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Avatar>{group?.name?.charAt(0)}</Avatar>
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
