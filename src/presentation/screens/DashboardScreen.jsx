import { useAuth } from "@/application/contexts/AuthContext";
import { Container, Typography, Box } from "@mui/material";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography>DashBoard</Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
