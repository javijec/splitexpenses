import {
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Fade,
} from "@mui/material";
import { Delete as DeleteIcon, Email as EmailIcon } from "@mui/icons-material";

const InvitationsList = ({ invitations, isAdmin, onDeleteInvitation }) => {
  return (
    <>
      {invitations && invitations.length > 0 && (
        <Fade in={true} timeout={500}>
          <Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Invitaciones Pendientes
              </Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {invitations.map((invitation) => (
                <ListItem
                  key={invitation.id}
                  sx={{
                    py: 2,
                    px: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemText
                    primary={invitation.invitedEmail}
                    secondary={`Invitado por ${invitation.invitedBy}`}
                  />
                  {isAdmin && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDeleteInvitation(invitation.id)}
                      sx={{
                        bgcolor: "error.light",
                        color: "white",
                        "&:hover": {
                          bgcolor: "error.main",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Fade>
      )}
    </>
  );
};

export default InvitationsList;
