import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { createInvitation } from "@/domain/usecases/invitations";

const InviteModal = ({ isOpen, onClose, group }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value && !validateEmail(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      return;
    }
    const invitation = {
      groupId: group.id,
      groupName: group.name,
      invitedBy: group.createdBy.name,
      invitedEmail: email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    await createInvitation(invitation);
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography>Invitar Miembro</Typography>
      </DialogTitle>
      <DialogContent>
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
            sx={{ mb: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 2,
            }}
          >
            <Button onClick={onClose} color="inherit">
              CANCELAR
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!email || emailError}
              sx={{ bgcolor: "primary.main" }}
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
