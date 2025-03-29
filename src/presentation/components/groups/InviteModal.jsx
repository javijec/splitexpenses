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
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: (theme) => `${theme.palette.primary.main}`,
          },
          transition: "all 0.3s ease",
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
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 2,
          pt: 3,
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              width: 40,
              height: 40,
              mr: 1.5,
            }}
          >
            <PersonAddIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              Invitar Miembro
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Invita a amigos, familia o compañeros a unirse a este grupo
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "error.main",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.error.main, 0.2),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 3, bgcolor: "background.paper" }}>
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              onClick={handleClose}
              color="inherit"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.grey[500], 0.2),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.05),
                },
                transition: "all 0.2s ease",
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
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: (theme) =>
                  `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: (theme) =>
                    `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
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
