import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

export const MembersListDesktop = ({
  members,
  isAdmin,
  user,
  group,
  onInvite,
  onDeleteMember,
}) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
        },
        mb: 3,
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
      }}
    >
      <CardHeader
        title={
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
              <PeopleIcon />
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              Miembros
            </Typography>
          </Box>
        }
        action={
          isAdmin && (
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              size="small"
              onClick={onInvite}
            >
              Invitar
            </Button>
          )
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
            {members.map((member) => (
              <ListItem
                key={member.id}
                sx={{
                  py: 2.5,
                  px: 3,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                    transform: "translateY(-2px)",
                  },
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        width: 40,
                        height: 40,
                        mr: 2,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                        border: "2px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.2),
                      }}
                    >
                      {member.displayName?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                          color: "text.primary",
                          letterSpacing: 0.2,
                        }}
                      >
                        {member.displayName}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {member.id === user.uid && (
                          <Chip size="small" label="Tú" sx={{ mr: 1 }} />
                        )}
                        {member.id === group.createdBy.id && (
                          <Chip
                            size="small"
                            color="primary"
                            label="Administrador"
                          />
                        )}
                      </Box>
                    }
                    sx={{ mb: { xs: 1, sm: 0 } }}
                  />
                </Box>
                {isAdmin && member.id !== group.createdBy.id && (
                  <Tooltip title="Eliminar miembro" placement="top">
                    <IconButton
                      size="small"
                      onClick={() => onDeleteMember(member.id)}
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.1),
                        color: "error.main",
                        border: "1px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.error.main, 0.2),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.error.main, 0.2),
                          transform: "scale(1.05)",
                        },
                        transition: "all 0.2s ease",
                        alignSelf: { xs: "flex-end", sm: "center" },
                        mt: { xs: 1, sm: 0 },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </ListItem>
            ))}
          </List>
        </Fade>
      </CardContent>
    </Card>
  );
};

export const MembersListMobile = ({
  members,
  isAdmin,
  user,
  group,
  onInvite,
  onDeleteMember,
}) => {
  return (
    <Accordion
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
        },
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
            `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="members-content"
        id="members-header"
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 1.5,
          px: 2,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              width: 40,
              height: 40,
              mr: 1.5,
            }}
          >
            <PeopleIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
            Miembros
          </Typography>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onInvite();
              }}
              sx={{ ml: 2 }}
            >
              Invitar
            </Button>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Fade in={true} timeout={500}>
          <List sx={{ p: 0 }}>
            {members.map((member) => (
              <ListItem
                key={member.id}
                sx={{
                  py: 2.5,
                  px: 3,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                    transform: "translateY(-2px)",
                  },
                  flexDirection: { xs: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        width: 40,
                        height: 40,
                        mr: 2,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                        border: "2px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.2),
                      }}
                    >
                      {member.displayName?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                          color: "text.primary",
                          letterSpacing: 0.2,
                        }}
                      >
                        {member.displayName}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {member.id === user.uid && (
                          <Chip size="small" label="Tú" sx={{ mr: 1 }} />
                        )}
                        {member.id === group.createdBy.id && (
                          <Chip
                            size="small"
                            color="primary"
                            label="Administrador"
                          />
                        )}
                      </Box>
                    }
                    sx={{ mb: { xs: 1, sm: 0 } }}
                  />
                </Box>
                {isAdmin && member.id !== group.createdBy.id && (
                  <Tooltip title="Eliminar miembro" placement="top">
                    <IconButton
                      size="small"
                      onClick={() => onDeleteMember(member.id)}
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.1),
                        color: "error.main",
                        border: "1px solid",
                        borderColor: (theme) =>
                          alpha(theme.palette.error.main, 0.2),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.error.main, 0.2),
                          transform: "scale(1.05)",
                        },
                        transition: "all 0.2s ease",
                        alignSelf: { xs: "flex-end", sm: "center" },
                        mt: { xs: 1, sm: 0 },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </ListItem>
            ))}
          </List>
        </Fade>
      </AccordionDetails>
    </Accordion>
  );
};
