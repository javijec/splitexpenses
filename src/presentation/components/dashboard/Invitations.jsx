import {
  Grid2 as Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Fade,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

const Invitations = ({
  onAccept,
  onReject,
  invitations,
  loadingInvitations,
}) => {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          height: "100%",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 6,
          },
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
          }}
        />
        <Divider />
        <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
          {loadingInvitations ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress size={40} thickness={4} />
            </Box>
          ) : invitations.length > 0 ? (
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
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500, mb: 0.5 }}
                        >
                          {invitation.groupName}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <Chip
                            label={`De: ${invitation.invitedBy}`}
                            size="small"
                            variant="outlined"
                            sx={{
                              height: 24,
                              fontSize: "0.75rem",
                              bgcolor: "background.paper",
                            }}
                          />
                        </Box>
                      }
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                    <Box sx={{ display: "flex", mt: { xs: 1, sm: 0 } }}>
                      <Tooltip title="Aceptar invitación">
                        <IconButton
                          color="primary"
                          size="small"
                          sx={{
                            mr: 1,
                            bgcolor: "primary.light",
                            color: "white",
                            "&:hover": {
                              bgcolor: "primary.main",
                            },
                          }}
                          onClick={() =>
                            onAccept(invitation.id, invitation.groupId)
                          }
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Rechazar invitación">
                        <IconButton
                          color="error"
                          size="small"
                          sx={{
                            bgcolor: "error.light",
                            color: "white",
                            "&:hover": {
                              bgcolor: "error.main",
                            },
                          }}
                          onClick={() => onReject(invitation.id)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Fade>
          ) : (
            <Fade in={true} timeout={500}>
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: 40,
                    color: "text.disabled",
                    mb: 2,
                    opacity: 0.6,
                  }}
                />
                <Typography variant="body1" color="text.secondary">
                  No tienes invitaciones pendientes
                </Typography>
              </Box>
            </Fade>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Invitations;
