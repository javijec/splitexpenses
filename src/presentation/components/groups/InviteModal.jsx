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
        <Box>
          <Avatar>
            <PersonAddIcon />
          </Avatar>
          <Box>
            <Typography>Invitar Miembro</Typography>
            <Typography>
              Invita a amigos, familia o compañeros a unirse a este grupo
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Formato de email inválido" : ""}
            placeholder="Ingresa el email de la persona que quieres invitar"
          />
          {alertInfo.show && (
            <Alert
              severity={alertInfo.severity}
              onClose={() => setAlertInfo({ ...alertInfo, show: false })}
            >
              {alertInfo.message}
            </Alert>
          )}
          <Box>
            <Button onClick={handleClose}>CANCELAR</Button>
            <Button type="submit" disabled={!email || emailError}>
              ENVIAR INVITACIÓN
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
