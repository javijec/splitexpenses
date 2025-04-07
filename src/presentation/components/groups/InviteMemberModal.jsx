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
  Avatar,
  Stack,
  Divider,
  alpha,
  useTheme,
  Paper,
  InputAdornment,
} from "@mui/material";
import {
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  Send as SendIcon,
} from "@mui/icons-material";

export const InviteMemberModal = ({
  isOpen,
  onClose,
  handleSendInvitation,
  alertInfo,
  validateEmail,
  setAlertInfo,
}) => {
  const theme = useTheme();
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
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              width: 48,
              height: 48,
            }}
          >
            <PersonAddIcon />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Invitar Miembro
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Invita a amigos, familia o compañeros a unirse a este grupo
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 3 }} />

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              ¿A quién quieres invitar?
            </Typography>

            <TextField
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "Formato de email inválido" : ""}
              placeholder="Ingresa el email de la persona que quieres invitar"
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Paper>

          {alertInfo.show && (
            <Alert
              severity={alertInfo.severity}
              onClose={() => setAlertInfo({ ...alertInfo, show: false })}
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {alertInfo.message}
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!email || emailError}
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
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
              Enviar Invitación
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
