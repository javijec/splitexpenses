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
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

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
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "calc(100% - 40px)", sm: "auto" },
          }}
        >
          <Avatar
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              mr: { xs: 0, sm: 1.5 },
              mb: { xs: 1, sm: 0 },
            })}
          >
            <PersonAddIcon />
          </Avatar>
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h6"
              sx={(theme) => ({
                fontWeight: 700,
                letterSpacing: 0.2,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              })}
            >
              Invitar Miembro
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={(theme) => ({ fontSize: { xs: "0.8rem", sm: "0.875rem" } })}
            >
              Invita a amigos, familia o compañeros a unirse a este grupo
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            position: { xs: "absolute", sm: "relative" },
            top: { xs: 8, sm: "auto" },
            right: { xs: 8, sm: "auto" },
            color: "error.main",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.error.main, 0.2),

            transition: "all 0.2s ease",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          p: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 3 },
          bgcolor: "background.paper",
        }}
      >
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
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.5),
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              mt: 4,
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Button
              onClick={handleClose}
              color="inherit"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.grey[500], 0.2),

                transition: "all 0.2s ease",
                width: { xs: "100%", sm: "auto" },
                order: { xs: 2, sm: 1 },
              }}
            >
              CANCELAR
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!email || emailError}
              sx={{
                py: { xs: 1.2, sm: 1.5 },
                px: 3,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: (theme) =>
                  `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,

                transition: "all 0.2s ease",
                width: { xs: "100%", sm: "auto" },
                order: { xs: 1, sm: 2 },
              }}
              disableElevation
            >
              ENVIAR INVITACIÓN
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
