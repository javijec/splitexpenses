// src/pages/Dashboard.jsx
import { useAuth } from "@/application/contexts/AuthContext";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5">Bienvenido, {user?.email}</Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
