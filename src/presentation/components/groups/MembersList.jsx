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
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import InvitationsList from "@/presentation/components/groups/InvitationsList";

export const MembersListDesktop = ({
  members,
  isAdmin,
  user,
  group,
  onInvite,
  onDeleteInvitation,
  onDeleteMember,
  invitations, // Ensure this is correctly passed
}) => {
  return (
    <Card>
      <CardHeader
        title="Miembros"
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
      <CardContent>
        <List>
          {members.map((member) => (
            <ListItem key={member.id}>
              <ListItemAvatar>
                <Avatar>{member.displayName?.charAt(0) || "U"}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.displayName}
                secondary={
                  <>
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
                    {isAdmin && member.id !== group.createdBy.id && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDeleteMember(member.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <InvitationsList
          invitations={invitations} // Ensure this is correctly passed
          isAdmin={isAdmin}
          onDeleteInvitation={onDeleteInvitation}
        />
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
  onDeleteInvitation, // Ensure this is correctly passed
  invitations,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="members-content"
        id="members-header"
      >
        <Typography>Miembros</Typography>
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
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {members.map((member) => (
            <ListItem key={member.id}>
              <ListItemAvatar>
                <Avatar>{member.displayName?.charAt(0) || "U"}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.displayName}
                secondary={
                  <>
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
                    {isAdmin && member.id !== group.createdBy.id && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDeleteMember(member.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <InvitationsList
          invitations={invitations}
          isAdmin={isAdmin}
          onDeleteInvitation={onDeleteInvitation}
        />
      </AccordionDetails>
    </Accordion>
  );
};
