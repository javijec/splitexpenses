import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  IconButton,
  Fade,
} from "@mui/material";
import {
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

const InviteModal = ({
  isOpen,
  onClose,
  handleSendInvitation,
  alertInfo,
  validateEmail,
  setAlertInfo,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value && !validateEmail(value));
    setAlertInfo({ show: false, message: "", severity: "error" });
  };

  const handleClose = () => {
    setEmail("");
    setEmailError(false);
    setAlertInfo({ show: false, message: "", severity: "error" });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSendInvitation(email);
    if (!result) {
      // If the result is false, do not close the modal
      return;
    }

    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        },
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: "primary.light",
          color: "white",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
          >
            <PersonAddIcon sx={{ mr: 1 }} /> Invitar Miembro
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: "90%" }}>
            Invita a amigos, familia o compañeros a unirse a este grupo
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "white",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 3 }}>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Formato de email inválido" : ""}
            placeholder="Ingresa el email de la persona que quieres invitar"
            InputProps={{
              sx: {
                borderRadius: 2,
              },
            }}
            sx={{ mb: 3 }}
          />
          {alertInfo.show && (
            <Alert
              severity={alertInfo.severity}
              onClose={() => setAlertInfo({ ...alertInfo, show: false })}
              sx={{ mb: 2 }}
            >
              {alertInfo.message}
            </Alert>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!email || emailError}
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                },
              }}
              disableElevation
            >
              ENVIAR INVITACIÓN
            </Button>
            <Button
              onClick={handleClose}
              color="inherit"
              fullWidth
              sx={{
                borderRadius: 2,
                fontWeight: 500,
              }}
            >
              CANCELAR
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
