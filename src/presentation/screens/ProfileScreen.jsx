import React from "react";
import { Container, Box, Typography } from "@mui/material";

const ProfileScreen = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography>Profile</Typography>
      </Box>
    </Container>
  );
};

export default ProfileScreen;
