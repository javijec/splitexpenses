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
  Paper,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { Groups as GroupsIcon } from "@mui/icons-material";
import { Link } from "react-router";

const Groups = ({ groups, loadingGroups }) => {

  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Card>
        <CardHeader title="Mis Grupos" />
        <Divider />
        <CardContent>
          {loadingGroups ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : groups.length > 0 ? (
            <List sx={{ width: "100%" }}>
              {groups.map((group) => (
                <Paper
                  elevation={1}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                  }}
                  key={group.id}
                >
                  <ListItem
                    button
                    component={Link}
                    to={`/group/${group.id}`}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 45,
                          height: 45,
                        }}
                      >
                        {group.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: "medium" }}
                        >
                          {group.name}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <GroupsIcon
                            sx={{
                              fontSize: 16,
                              mr: 0.5,
                              color: "text.secondary",
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                          >
                            {`${group.members.length || 1} ${
                              (group.members.length || 1) === 1
                                ? "miembro"
                                : "miembros"
                            }`}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                No tienes grupos creados
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Groups;
