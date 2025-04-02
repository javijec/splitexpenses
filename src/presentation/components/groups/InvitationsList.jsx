import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Box,
  Fade,
  Avatar,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Delete as DeleteIcon, Email as EmailIcon } from "@mui/icons-material";

export const InvitationsListDesktop = ({
  invitations,
  isAdmin,
  onDeleteInvitation,
}) => {
  return (
    <>
      {invitations && invitations.length > 0 && (
        <Card
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            height: "100%",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",

            mb: 3,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.info.main}, ${theme.palette.primary.main})`,
            },
          }}
        >
          <CardHeader
            title={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                    color: "info.main",
                    width: 40,
                    height: 40,
                    mr: 1.5,
                  }}
                >
                  <EmailIcon />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, letterSpacing: 0.2 }}
                >
                  Invitaciones Pendientes
                </Typography>
              </Box>
            }
            sx={{
              bgcolor: "background.paper",
              pb: 2,
              pt: 3,
              px: 3,
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
                      py: 2.5,
                      px: 3,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",

                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                    secondaryAction={
                      isAdmin && (
                        <Tooltip title="Eliminar invitación" placement="top">
                          <IconButton
                            size="small"
                            onClick={() => onDeleteInvitation(invitation.id)}
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
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )
                    }
                  >
                    <ListItemAvatar>
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
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                          border: "2px solid",
                          borderColor: (theme) =>
                            alpha(theme.palette.info.main, 0.2),
                        }}
                      >
                        {invitation.invitedEmail.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                              {invitation.invitedEmail}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {`Invitado por ${invitation.invitedBy}`}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
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
