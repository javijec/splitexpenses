import { Container, Typography, Box } from "@mui/material";

const Main = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography>Main</Typography>
      </Box>
    </Container>
  );
};

export default Main;
