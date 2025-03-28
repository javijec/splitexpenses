import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  CardHeader,
  Divider,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DangerZone = ({ onDeleteClick }) => {
  return (
    <Fade in={true} timeout={500}>
      <Card
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DeleteIcon sx={{ mr: 1, color: "error.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Zona de Peligro
              </Typography>
            </Box>
          }
          sx={{
            bgcolor: "error.light",
            color: "error.contrastText",
            pb: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <Divider />
        <CardContent
          sx={{ bgcolor: "error.light", color: "error.contrastText" }}
        >
          <Typography variant="body2" color="error.contrastText" sx={{ mb: 3 }}>
            Una vez que elimines tu cuenta, no podrás recuperarla. Todos tus
            datos serán eliminados permanentemente.
          </Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              fontWeight: "medium",
              bgcolor: "error.dark",
              "&:hover": {
                bgcolor: "error.dark",
                opacity: 0.9,
              },
            }}
            onClick={onDeleteClick}
          >
            Eliminar mi cuenta
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default DangerZone;
