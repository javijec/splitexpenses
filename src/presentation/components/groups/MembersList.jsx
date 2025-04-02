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
  Typography,
  Box,
  Fade,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
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
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease",

        mb: 3,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: theme.palette.primary.main,
        },
      })}
    >
      <CardHeader
        avatar={<PeopleIcon />}
        title={<Typography>Miembros</Typography>}
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
      />
      <Divider />
      <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
        <Fade in={true} timeout={500}>
          <List sx={{ p: 0 }}>
            {members.map((member) => (
              <ListItem
                key={member.id}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",

                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
                secondaryAction={
                  isAdmin &&
                  member.id !== group.createdBy.id && (
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

                          transition: "all 0.2s ease",
                          alignSelf: { xs: "flex-end", sm: "center" },
                          mt: { xs: 1, sm: 0 },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )
                }
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
              </ListItem>
            ))}
          </List>
        </Fade>
      </CardContent>
    </Card>
  );
};
