import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container>
      <Typography>404</Typography>
      <Typography>Página no encontrada</Typography>
      <Typography>
        La página que estás buscando no existe o ha sido movida.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Volver al Dashboard
      </Button>
    </Container>
  );
}

export default NotFound;
