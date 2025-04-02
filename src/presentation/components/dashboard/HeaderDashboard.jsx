import { Box, Typography, Avatar, Container } from "@mui/material";
import { useAuth } from "@/application/contexts/AuthContext";

const HeaderDashboard = () => {
  const { user } = useAuth();

  return (
    <Container
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      <Avatar>{user?.displayName?.charAt(0) || "U"}</Avatar>
      <Box>
        <Typography>¡Hola, {user?.displayName || "Usuario"}!</Typography>
        <Typography>
          Gestiona tus grupos y revisa invitaciones pendientes
        </Typography>
      </Box>
    </Container>
  );
};

export default HeaderDashboard;
