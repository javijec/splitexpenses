import React from "react";
import {
  Typography,
  Button,
  Paper,
  Box,
  Stack,
  Avatar,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

const DangerZone = ({ onDeleteClick }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          borderBottom: "1px solid",
          borderColor: (theme) => alpha(theme.palette.divider, 0.1),
          bgcolor: (theme) => alpha(theme.palette.error.main, 0.05),
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.15),
              color: "error.main",
              width: 40,
              height: 40,
            }}
          >
            <DeleteForeverIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold" color="error.main">
            Zona de Peligro
          </Typography>
        </Stack>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.05),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.error.main, 0.2),
          }}
        >
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                color: theme.palette.warning.main,
                width: 40,
                height: 40,
              }}
            >
              <WarningIcon />
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="error.main"
                gutterBottom
              >
                Eliminar mi cuenta
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Una vez que elimines tu cuenta, no podrás recuperarla. Todos tus
                datos serán eliminados permanentemente.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={onDeleteClick}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  },
                }}
              >
                Eliminar mi cuenta
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Paper>
  );
};

export default DangerZone;
