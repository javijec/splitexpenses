import { Box, Typography, Avatar } from "@mui/material";
import { useAuth } from "@/application/contexts/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
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
          {user?.displayName?.charAt(0) || "U"}
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
            ¡Hola, {user?.displayName || "Usuario"}!
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            Gestiona tus grupos y revisa invitaciones pendientes
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
