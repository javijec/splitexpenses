import {
  Grid2 as Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Groups as GroupsIcon,
  AddCircleOutline,
  ArrowForward,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useModal } from "@/application/contexts/ModalContext";
import { useState } from "react";
import InvitationsDialog from "./InvitationsDialog";
import { Link } from "react-router";
import Loading from "../common/Loading";

const GroupsListCard = ({
  groups,
  loadingGroups,
  invitations = [],
  loadingInvitations,
  onAccept,
  onReject,
}) => {
  const { openGroupModal } = useModal();
  const [isInvitationsDialogOpen, setIsInvitationsDialogOpen] = useState(false);

  return (
    <Grid>
      <Card>
        <CardHeader
          avatar={<GroupsIcon />}
          title={<Typography>Mis Grupos</Typography>}
          action={
            invitations.length > 0 && (
              <Tooltip title="Ver invitaciones pendientes">
                <IconButton onClick={() => setIsInvitationsDialogOpen(true)}>
                  <Badge badgeContent={invitations.length}>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )
          }
        />
        <CardContent>
          {loadingGroups ? (
            <Loading />
          ) : groups?.length > 0 ? (
            <List>
              {groups.map((group) => (
                <ListItem
                  button
                  component={Link}
                  to={`/group/${group.id}`}
                  key={group.id}
                >
                  <ListItemAvatar>
                    <Avatar>{group.name.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography>{group.name}</Typography>}
                    secondary={
                      <Chip
                        label={`${group.members?.length || 1} ${
                          (group.members?.length || 1) === 1
                            ? "miembro"
                            : "miembros"
                        }`}
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box>
              <Avatar>
                <GroupsIcon />
              </Avatar>
              <Typography>No tienes grupos creados</Typography>
              <Typography>
                Crea tu primer grupo para comenzar a dividir gastos
              </Typography>
              <Button startIcon={<AddCircleOutline />} onClick={openGroupModal}>
                Crear Grupo
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
      <InvitationsDialog
        open={isInvitationsDialogOpen}
        onClose={() => setIsInvitationsDialogOpen(false)}
        invitations={invitations}
        loadingInvitations={loadingInvitations}
        onAccept={onAccept}
        onReject={onReject}
      />
    </Grid>
  );
};

export default GroupsListCard;
