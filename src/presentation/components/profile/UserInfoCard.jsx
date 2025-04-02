import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileUpdateForm from "@/presentation/components/profile/ProfileUpdateForm";

const UserInfoCard = ({
  user,
  displayName,
  setDisplayName,
  loading,
  handleUpdateProfile,
}) => {
  return (
    <Box>
      <Card>
        <CardHeader
          avatar={<PersonIcon />}
          title={<Typography>Información de Usuario</Typography>}
        />
        <Divider />
        <CardContent>
          <Box>
            <Box>
              <Avatar src={user?.photoURL} alt={user?.displayName || "Usuario"}>
                {user?.displayName?.charAt(0) || "U"}
              </Avatar>
            </Box>
            <Typography>{user?.displayName || "Usuario"}</Typography>
            <Typography>{user?.email}</Typography>
          </Box>

          <Divider />
          <Box>
            <Box>
              <AccountCircleIcon />
              <Typography>Actualiza tu información de perfil</Typography>
            </Box>
          </Box>
          <ProfileUpdateForm
            displayName={displayName}
            setDisplayName={setDisplayName}
            loading={loading}
            handleUpdateProfile={handleUpdateProfile}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserInfoCard;
