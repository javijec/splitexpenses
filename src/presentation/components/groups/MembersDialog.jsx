import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemText,
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
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
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
          transition: "all 0.3s ease",
        },
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 2,
          pt: 3,
          px: 3,
        }}
      >
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
            sx={{
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              boxShadow: (theme) =>
                `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
              "&:hover": {
                bgcolor: "primary.dark",
                boxShadow: (theme) =>
                  `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
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
                  )
                }
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
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
