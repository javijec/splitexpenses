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
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DangerZone = ({ onDeleteClick }) => {
  const theme = useTheme();
  return (
    <Fade in={true} timeout={500}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          transition: "all 0.3s ease",
          background: `linear-gradient(145deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
          "&:hover": {
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-4px)",
          },
          border: `1px solid ${theme.palette.divider}`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette.error.dark}, ${theme.palette.error.main})`,
          },
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DeleteIcon
                sx={{
                  mr: 1.5,
                  color: "error.contrastText",
                  fontSize: 28,
                  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                Zona de Peligro
              </Typography>
            </Box>
          }
          sx={{
            bgcolor: "transparent",
            color: "error.contrastText",
            pb: 2.5,
            pt: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
            },
          }}
        />
        <Divider />
        <CardContent
          sx={{
            bgcolor: "transparent",
            color: "error.contrastText",
            pt: 3,
            pb: 3,
          }}
        >
          <Typography
            variant="body2"
            color="error.contrastText"
            sx={{
              mb: 3,
              opacity: 0.9,
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
              lineHeight: 1.6,
            }}
          >
            Una vez que elimines tu cuenta, no podrás recuperarla. Todos tus
            datos serán eliminados permanentemente.
          </Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              fontWeight: 500,
              bgcolor: "error.dark",
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "error.dark",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              },
              "&:active": {
                transform: "translateY(0)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
