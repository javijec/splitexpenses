import React, { useState } from "react";
import { useAuth } from "@/application/contexts/AuthContext";

import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  alpha,
  useTheme,
  Fade,
  Divider,
} from "@mui/material";

// Componentes
import ProfileHeader from "@/presentation/components/profile/ProfileHeader";
import UserInfoCard from "@/presentation/components/profile/UserInfoCard";
import DangerZone from "@/presentation/components/profile/DangerZone";
import DeleteAccountDialog from "@/presentation/components/profile/DeleteAccountDialog";

const ProfileScreen = () => {
  const theme = useTheme();
  const { user, deleteAccount, updateAccount } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateAccount({ displayName });
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    deleteAccount(user)
      .then(() => {
        setDeleteLoading(false);
        setDeleteDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        setDeleteLoading(false);
      });
  };

  return (
    <Fade in={true} timeout={800}>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.12
              )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden",
            mb: 4,
          }}
        >
          {/* Círculos decorativos */}
          <Box
            sx={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: (theme) => alpha(theme.palette.primary.main, 0.1),
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              right: 40,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: (theme) => alpha(theme.palette.primary.main, 0.07),
              zIndex: 0,
            }}
          />

          {/* Contenido principal */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <ProfileHeader />
          </Box>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <UserInfoCard
              user={user}
              displayName={displayName}
              setDisplayName={setDisplayName}
              loading={loading}
              handleUpdateProfile={handleUpdateProfile}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <DangerZone onDeleteClick={() => setDeleteDialogOpen(true)} />
          </Grid>
        </Grid>

        <DeleteAccountDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={handleDeleteAccount}
          loading={deleteLoading}
        />
      </Container>
    </Fade>
  );
};

export default ProfileScreen;
