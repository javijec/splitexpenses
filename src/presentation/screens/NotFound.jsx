import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          textAlign: "center",
          typography: "body1",
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          La página que estás buscando no existe o ha sido movida.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Volver al Dashboard
        </Button>
      </Box>
    </>
  );
}

export default NotFound;
