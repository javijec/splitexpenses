import React from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  alpha,
  useTheme,
  Grid,
} from "@mui/material";
import { Save as SaveIcon, Person as PersonIcon } from "@mui/icons-material";

const ProfileUpdateForm = ({
  displayName,
  setDisplayName,
  loading,
  handleUpdateProfile,
}) => {
  const theme = useTheme();

  return (
    <Box component="form" onSubmit={handleUpdateProfile}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="displayName"
            label="Nombre de Usuario"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
            variant="outlined"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={loading ? null : <SaveIcon />}
              disabled={loading}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Guardar Cambios"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileUpdateForm;
