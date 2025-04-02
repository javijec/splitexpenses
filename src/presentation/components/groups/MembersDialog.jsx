import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Fade,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const MembersDialog = ({
  open,
  onClose,
  members,
  isAdmin,
  user,
  group,
  onDeleteMember,
  onInvite,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: (theme) => ({
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          overflow: "hidden",
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
          transition: "all 0.3s ease",
        }),
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <DialogTitle
        sx={(theme) => ({
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 1,
          pt: 2,
          px: 3,
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              width: 40,
              height: 40,
              mr: 1.5,
            })}
          >
            <PeopleIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
            Miembros
          </Typography>
        </Box>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onInvite();
            }}
            sx={(theme) => ({
              fontWeight: 600,
              textTransform: "none",
              borderRadius: theme.shape.borderRadius,
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,

              transition: "all 0.2s ease",
            })}
          >
            Invitar
          </Button>
        )}
      </DialogTitle>
      <DialogContent sx={{ p: 0, bgcolor: "background.paper" }}>
        <Fade in={true} timeout={500}>
          <List dense={true}>
            {members.map((member) => (
              <ListItem
                key={member.id}
                sx={{
                  py: 0.5,
                  px: 3,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",

                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
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
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )
                }
              >
                <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
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

                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      color: "text.primary",
                      letterSpacing: 0.2,
                    }}
                  >
                    {member.displayName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    {member.id === user.uid && (
                      <Chip size="small" label="Tú" sx={{ mr: 1 }} />
                    )}
                    {member.id === group.createdBy.id &&
                      member.id !== user.uid && (
                        <Chip
                          size="small"
                          color="primary"
                          label="Administrador"
                        />
                      )}
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Fade>
      </DialogContent>
      <DialogActions
        sx={{
          p: 1,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MembersDialog;
