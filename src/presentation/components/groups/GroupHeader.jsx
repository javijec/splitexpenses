import { Box, Typography, Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const GroupHeader = ({ group, isAdmin, onDelete }) => {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {group?.name}
      </Typography>
      {isAdmin && (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={onDelete}
        >
          Eliminar Grupo
        </Button>
      )}
    </Box>
  );
};

export default GroupHeader;