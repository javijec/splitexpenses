import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
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

export const MembersListDialog = ({
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
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
            startIcon={<PersonAddIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onInvite();
            }}
          >
            Invitar
          </Button>
        )}
      </DialogTitle>
      <DialogContent>
        <Box>
          <List>
            {members.map((member) => (
              <ListItem
                key={member.id}
                secondaryAction={
                  isAdmin &&
                  member.id !== group.createdBy.id && (
                    <Tooltip title="Eliminar miembro">
                      <IconButton onClick={() => onDeleteMember(member.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )
                }
              >
                <Box>
                  <ListItemAvatar>
                    <Avatar>
                      {member.displayName?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                  </ListItemAvatar>

                  <Typography>{member.displayName}</Typography>
                  <Box>
                    {member.id === user.uid && <Chip label="Tú" />}
                    {member.id === group.createdBy.id &&
                      member.id !== user.uid && <Chip label="Administrador" />}
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
