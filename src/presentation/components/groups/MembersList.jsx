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
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        mb: 3,
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PeopleIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                  py: 2,
                  px: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
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
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        mb: 3,
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
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PeopleIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
            sx={{ ml: 2 }}
          >
            Invitar
          </Button>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Fade in={true} timeout={500}>
          <List sx={{ p: 0 }}>
            {members.map((member) => (
              <ListItem
                key={member.id}
                sx={{
                  py: 2,
                  px: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
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
        </Fade>
      </AccordionDetails>
    </Accordion>
  );
};
