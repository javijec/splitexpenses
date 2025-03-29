import React, { useState } from "react";
import { useAuth } from "@/application/contexts/AuthContext";
import { Box, Grid2 as Grid, Fade, useTheme } from "@mui/material";

// Componentes
import ProfileHeader from "@/presentation/components/profile/ProfileHeader";
import UserInfoCard from "@/presentation/components/profile/UserInfoCard";
import DangerZone from "@/presentation/components/profile/DangerZone";
import DeleteAccountDialog from "@/presentation/components/profile/DeleteAccountDialog";

const ProfileScreen = () => {
  const { user, deleteAccount, updateAccount } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const theme = useTheme();

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
    <Fade in={true} timeout={600}>
      <Box
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          bgcolor: "background.paper",
          p: { xs: 2, sm: 3 },
          transition: "all 0.3s ease",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          },
          "&:hover": {
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <ProfileHeader />

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <UserInfoCard
              user={user}
              displayName={displayName}
              setDisplayName={setDisplayName}
              loading={loading}
              handleUpdateProfile={handleUpdateProfile}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <DangerZone onDeleteClick={() => setDeleteDialogOpen(true)} />
          </Grid>
        </Grid>

        <DeleteAccountDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={handleDeleteAccount}
          loading={deleteLoading}
        />
      </Box>
    </Fade>
  );
};

export default ProfileScreen;
