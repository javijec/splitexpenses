import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid2 as Grid,
  Divider,
  Fade,
  Paper,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ProfileUpdateForm from "@/presentation/components/profile/ProfileUpdateForm";

const UserInfoCard = ({
  user,
  displayName,
  setDisplayName,
  loading,
  handleUpdateProfile,
}) => {
  const theme = useTheme();
  return (
    <Fade in={true} timeout={500}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          height: "100%",
          transition: "all 0.3s ease",
          background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",

          mb: 1,
          border: `1px solid ${theme.palette.divider}`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          },
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PersonIcon
                sx={{
                  mr: 1.5,
                  color: "primary.main",
                  fontSize: 28,
                  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: 0.5,
                }}
              >
                Información de Usuario
              </Typography>
            </Box>
          }
          sx={{
            bgcolor: "background.paper",
            pb: 1.5,
            pt: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
            },
          }}
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 1,
              position: "relative",
              pt: 1,
            }}
          >
            <Box
              sx={{
                position: "relative",
                mb: 2.5,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -5,
                  left: -5,
                  right: -5,
                  bottom: -5,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  opacity: 0.15,
                  zIndex: 0,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                  zIndex: 1,
                  transition: "all 0.3s ease",

                }}
                src={user?.photoURL}
                alt={user?.displayName || "Usuario"}
              >
                {user?.displayName?.charAt(0) || "U"}
              </Avatar>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                letterSpacing: 0.5,
              }}
            >
              {user?.displayName || "Usuario"}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                opacity: 0.9,
                pb: 1,
                borderBottom: `1px dashed ${theme.palette.divider}`,
                px: 3,
              }}
            >
              {user?.email}
            </Typography>
          </Box>



          <Divider
            sx={{
              my: 4,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
              },
            }}
          />
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AccountCircleIcon sx={{ mr: 1.5, color: "primary.main" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                Actualiza tu información de perfil
              </Typography>
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
    </Fade>
  );
};

export default UserInfoCard;
