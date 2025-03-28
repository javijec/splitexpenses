import { useState, useEffect } from "react";
import {
  Grid2 as Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Fade,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Groups as GroupsIcon, AddCircleOutline } from "@mui/icons-material";
import { useModal } from "@/application/contexts/ModalContext";
import { Link } from "react-router";

const Groups = ({ groups, loadingGroups }) => {
  const { openGroupModal } = useModal();

  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Card
        elevation={2}
        sx={{
          borderRadius: 2, // Consistente con MuiCard
          overflow: "hidden",
          height: "100%",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <GroupsIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Mis Grupos
              </Typography>
            </Box>
          }
          action={
            <Tooltip title="Crear nuevo grupo" arrow>
              <Button
                onClick={openGroupModal}
                startIcon={<AddCircleOutline />}
                sx={{
                  fontWeight: "medium",
                  textTransform: "none",
                  mr: 1,
                }}
              >
                Nuevo
              </Button>
            </Tooltip>
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
          {loadingGroups ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress size={40} thickness={4} />
            </Box>
          ) : groups?.length > 0 ? (
            <Fade in={true} timeout={500}>
              <List sx={{ p: 0 }}>
                {groups.map((group) => (
                  <ListItem
                    button
                    component={Link}
                    to={`/group/${group.id}`}
                    key={group.id}
                    sx={{
                      py: 2,
                      px: 2,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 500,
                              mb: 0.5,
                              color: "text.primary",
                            }}
                          >
                            {group.name}
                          </Typography>

                          <Chip
                            label={`${group.members?.length || 1} ${
                              (group.members?.length || 1) === 1
                                ? "miembro"
                                : "miembros"
                            }`}
                            size="small"
                            variant="outlined"
                            sx={{
                              height: 24,
                              fontSize: "0.75rem",
                              bgcolor: "background.paper",
                            }}
                          />
                        </Box>
                      }
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Fade>
          ) : (
            <Fade in={true} timeout={500}>
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <GroupsIcon
                  sx={{
                    fontSize: 40,
                    color: "text.disabled",
                    mb: 2,
                    opacity: 0.6,
                  }}
                />
                <Typography variant="body1" color="text.secondary">
                  No tienes grupos creados
                </Typography>
              </Box>
            </Fade>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Groups;
