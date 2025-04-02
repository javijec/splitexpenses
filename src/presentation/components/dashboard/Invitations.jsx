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
  Typography,
  Fade,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
} from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  MarkEmailRead as MarkEmailReadIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const Invitations = ({
  onAccept,
  onReject,
  invitations,
  loadingInvitations,
}) => {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card
        elevation={3}
        sx={(theme) => ({
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
          height: "100%",
          transition: "all 0.3s ease",

          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette.info.main}, ${theme.palette.primary.main})`,
          },
        })}
      >
        <CardHeader
          avatar={<EmailIcon />}
          title={<Typography>Invitaciones Pendientes</Typography>}
        />
        <Divider />
        <CardContent>
          {loadingInvitations ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress size={40} thickness={4} />
            </Box>
          ) : invitations.length > 0 ? (
            <Fade in={true} timeout={500}>
              <List>
                {invitations.map((invitation) => (
                  <ListItem
                    key={invitation.id}
                    sx={{
                      py: 2.5,
                      px: 3,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",

                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: (theme) =>
                                alpha(theme.palette.info.main, 0.1),
                              color: "info.main",
                              width: 36,
                              height: 36,
                              mr: 2,
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {invitation.groupName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                mb: 0.5,
                                color: "text.primary",
                                letterSpacing: 0.2,
                              }}
                            >
                              {invitation.groupName}
                            </Typography>

                            <Chip
                              label={`De: ${invitation.invitedBy}`}
                              size="small"
                              color="info"
                              variant="outlined"
                              sx={{
                                height: 24,
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                bgcolor: (theme) =>
                                  alpha(theme.palette.info.main, 0.05),
                                borderColor: (theme) =>
                                  alpha(theme.palette.info.main, 0.3),
                              }}
                            />
                          </Box>
                        </Box>
                      }
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                    <Box sx={{ display: "flex", mt: { xs: 1, sm: 0 }, gap: 1 }}>
                      <Tooltip title="Aceptar invitación" placement="top">
                        <IconButton
                          color="success"
                          size="small"
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: (theme) =>
                              alpha(theme.palette.success.main, 0.1),
                            color: "success.main",
                            border: "1px solid",
                            borderColor: (theme) =>
                              alpha(theme.palette.success.main, 0.2),

                            transition: "all 0.2s ease",
                          }}
                          onClick={() =>
                            onAccept(invitation.id, invitation.groupId)
                          }
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Rechazar invitación" placement="top">
                        <IconButton
                          color="error"
                          size="small"
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: (theme) =>
                              alpha(theme.palette.error.main, 0.1),
                            color: "error.main",
                            border: "1px solid",
                            borderColor: (theme) =>
                              alpha(theme.palette.error.main, 0.2),

                            transition: "all 0.2s ease",
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
            <Fade in={true} timeout={800}>
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
                    border: "1px dashed",
                    borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
                    mb: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                      color: "info.main",
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    <MarkEmailReadIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    No tienes invitaciones pendientes
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Cuando alguien te invite a un grupo, aparecerá aquí
                  </Typography>
                </Paper>
              </Box>
            </Fade>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Invitations;
