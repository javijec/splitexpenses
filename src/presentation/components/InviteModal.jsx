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
} from "@mui/material";
import {
  createInvitation,
  getInvitationByEmailAndGroup,
} from "@/domain/usecases/invitations";
import { getMembersMailsGroup } from "@/domain/usecases/groups";

const InviteModal = ({ isOpen, onClose, group }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    severity: "error",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value && !validateEmail(value));
  };

  const handleClose = () => {
    setEmail("");
    setEmailError(false);
    setAlertInfo({
      show: false,
      message: "",
      severity: "error",
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      return;
    }
    const membersId = await getMembersMailsGroup(group.id);
    console.log(membersId);
    if (membersId.includes(email)) {
      setAlertInfo({
        show: true,
        message: "El usuario ya es miembro del grupo",
        severity: "error",
      });
      return;
    }

    const existingInvitation = await getInvitationByEmailAndGroup(
      email,
      group.id
    );
    if (existingInvitation) {
      setAlertInfo({
        show: true,
        message: "Ya existe una invitación pendiente para este email",
        severity: "error",
      });
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
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
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
              justifyContent: "flex-end",
              gap: 2,
              mt: 2,
            }}
          >
            <Button onClick={handleClose} color="inherit">
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
