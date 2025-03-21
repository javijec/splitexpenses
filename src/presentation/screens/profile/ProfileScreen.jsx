import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Avatar,
  Grid2 as Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "@/application/contexts/AuthContext";

const ProfileScreen = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para actualizar el perfil del usuario
  };

  const handleDeleteAccount = async () => {
    // Aquí puedes agregar la lógica para eliminar la cuenta del usuario
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Información de la Cuenta
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              sx={{ width: 80, height: 80, mb: 2 }}
              src={user?.photoURL}
              alt={user?.displayName || "Usuario"}
            >
              {user?.displayName?.charAt(0) || "U"}
            </Avatar>
            <Typography variant="h6">
              {user?.displayName || "Usuario"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                ID de Usuario
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ wordBreak: "break-all" }}
              >
                {user.uid}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Email Verificado
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.emailVerified ? "Sí" : "No"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box component="form" onSubmit={handleUpdateProfile} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="Nombre de Usuario"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "ACTUALIZAR PERFIL"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: "error.dark" }}>
        <CardContent>
          <Typography variant="h6" color="error.contrastText">
            Zona de Peligro
          </Typography>
          <Typography variant="body2" color="error.contrastText" sx={{ mt: 1 }}>
            Una vez que elimines tu cuenta, no podrás recuperarla. Todos tus
            datos serán eliminados permanentemente.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              mt: 2,
              bgcolor: "error.contrastText",
              borderColor: "error.contrastText",
            }}
            onClick={() => setDeleteDialogOpen(true)}
          >
            Eliminar mi cuenta
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Eliminar Cuenta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción eliminará permanentemente tu cuenta y todos tus datos.
            Por favor, ingresa tu contraseña para confirmar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            color="error"
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress size={24} /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileScreen;
