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
} from "@mui/material";
import { Tooltip } from "@mui/material";

import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

export const MembersListCard = ({
  members,
  isAdmin,
  user,
  group,
  onInvite,
  onDeleteMember,
}) => {
  return (
    <Card>
      <CardHeader
        avatar={<PeopleIcon />}
        title={<Typography>Miembros</Typography>}
        action={
          isAdmin && (
            <Button startIcon={<PersonAddIcon />} onClick={onInvite}>
              Invitar
            </Button>
          )
        }
      />
      <CardContent>
        <List>
          {members.map((member) => (
            <ListItem
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
              <ListItemAvatar>
                <Avatar>
                  {member.displayName?.charAt(0).toUpperCase() || "U"}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography>{member.displayName}</Typography>}
                secondary={
                  <>
                    {member.id === user.uid && <Chip label="Tú" />}
                    {member.id === group.createdBy.id && (
                      <Chip label="Administrador" />
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
