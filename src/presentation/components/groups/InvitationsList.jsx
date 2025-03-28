import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Email as EmailIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

export const InvitationsListDesktop = ({
  invitations,
  isAdmin,
  onDeleteInvitation,
}) => {
  return (
    <>
      {invitations && invitations.length > 0 && (
        <Card
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            height: "100%",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
            mb: 3,
          }}
        >
          <CardHeader
            title={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Invitaciones Pendientes
                </Typography>
              </Box>
            }
            sx={{
              bgcolor: "background.paper",
              pb: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          />
          <Divider />
          <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
            <Fade in={true} timeout={500}>
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
            </Fade>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export const InvitationsListMobile = ({
  invitations,
  isAdmin,
  onDeleteInvitation,
}) => {
  return (
    <>
      {invitations && invitations.length > 0 && (
        <Accordion
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
            mb: 3,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="invitations-content"
            id="invitations-header"
            sx={{
              bgcolor: "background.paper",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Invitaciones Pendientes
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Fade in={true} timeout={500}>
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
            </Fade>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};
