import React from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const ProfileUpdateForm = ({
  displayName,
  setDisplayName,
  loading,
  handleUpdateProfile,
}) => {
  return (
    <Box component="form" onSubmit={handleUpdateProfile}>
      <TextField
        id="displayName"
        label="Nombre de Usuario"
        name="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        disabled={loading}
      />
      <Button
        type="submit"
        startIcon={loading ? null : <SaveIcon />}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Actualizar Perfil"}
      </Button>
    </Box>
  );
};

export default ProfileUpdateForm;
