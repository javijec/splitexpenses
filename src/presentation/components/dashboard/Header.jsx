import { Box, Typography, Avatar } from "@mui/material";
import { useAuth } from "@/application/contexts/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Avatar>{user?.displayName?.charAt(0) || "U"}</Avatar>
      <Box>
        <Typography>¡Hola, {user?.displayName || "Usuario"}!</Typography>
        <Typography>
          Gestiona tus grupos y revisa invitaciones pendientes
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
