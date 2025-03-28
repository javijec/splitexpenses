import { Box, Typography } from "@mui/material";
import { useAuth } from "@/application/contexts/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        mb: 4,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido a tu Panel de Control, {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Gestiona tus grupos y revisa invitaciones pendientes
      </Typography>
    </Box>
  );
};

export default Header;