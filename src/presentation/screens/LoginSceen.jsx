import React, { useState } from "react";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useNavigate } from "react-router";
import { AuthService } from "@/application/services/AuthService";
import { Alert, Box, Snackbar } from "@mui/material";

export default function Login() {
  const authService = new AuthService();
  const providers = [{ id: "google", name: "Google" }];
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignIn = async (provider) => {
    try {
      if (provider.id === "google") {
        const result = await authService.login();
        if (result && !result.error) {
          navigate("/dashboard");
        } else if (result && result.error) {
          setError(result.error);
        }
      } else {
        setError(`Unsupported provider: ${provider.id}`);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message || "Failed to sign in. Please try again.");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box>
      <SignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{ form: { noValidate: true } }}
        sx={{
          "& form > .MuiStack-root": {
            marginTop: "2rem",
            rowGap: "0.5rem",
          },
        }}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
