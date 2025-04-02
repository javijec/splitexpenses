import React, { useState } from "react";
import { useAuth } from "@/application/contexts/AuthContext";

import { Box, Grid2 as Grid } from "@mui/material";

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
    <Box>
      <ProfileHeader />

      <Grid>
        <Grid>
          <UserInfoCard
            user={user}
            displayName={displayName}
            setDisplayName={setDisplayName}
            loading={loading}
            handleUpdateProfile={handleUpdateProfile}
          />
        </Grid>

        <Grid>
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
  );
};

export default ProfileScreen;
