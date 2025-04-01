import React from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Fade,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const ProfileUpdateForm = ({
  displayName,
  setDisplayName,
  loading,
  handleUpdateProfile,
}) => {
  return (
    <Fade in={true} timeout={500}>
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
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={loading ? null : <SaveIcon />}
          sx={{
            mt: 1,
            py: 1,
            fontWeight: "medium",
            textTransform: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Actualizar Perfil"}
        </Button>
      </Box>
    </Fade>
  );
};

export default ProfileUpdateForm;
