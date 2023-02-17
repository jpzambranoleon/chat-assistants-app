import {
  Box,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography paragraph variant="h4" fontWeight={550} textAlign="center">
          Chatbot Assistants
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ p: 2 }}>
              <Typography textAlign="center">
                Create your very own chatbot assistant.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 2 }}>
              <Typography textAlign="center">
                You can give your assistant a personality.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 2 }}>
              <Typography textAlign="center">
                Customize your assistant anyway you want.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
