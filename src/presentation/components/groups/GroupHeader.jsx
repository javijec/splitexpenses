import { Box, Typography, Button, Avatar } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const GroupHeader = ({ group, isAdmin, onDelete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        pb: 2,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.3), transparent)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            width: 50,
            height: 50,
            mr: 2,
            bgcolor: "primary.main",
            display: { xs: "none", sm: "flex" },
          }}
        >
          {group?.name?.charAt(0) || "G"}
        </Avatar>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 0.5,
            }}
          >
            {group?.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            Gestionar grupo
          </Typography>
        </Box>
      </Box>
      {isAdmin && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          size="medium"
          onClick={onDelete}
          sx={{
            mt: { xs: 2, sm: 0 },
          }}
        >
          Eliminar
        </Button>
      )}
    </Box>
  );
};

export default GroupHeader;
