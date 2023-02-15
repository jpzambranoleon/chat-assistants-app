import logo from "./logo.svg";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <CssBaseline />
          {currentUser ? (
            <Router>
              <MuiDrawer />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:username/:page" element={<Profile />} />
                <Route path="/account" element={<Account />} />
                <Route path="/assistant/create" element={<CreateAssistant />} />
                <Route
                  path="/assistant/:assistantId/chat"
                  element={<Chats />}
                />
              </Routes>
            </Router>
          ) : (
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/send/verification/:email"
                  element={<SendEmail />}
                />
                <Route
                  path="/verify/email/:username/:token"
                  element={<VerifyEmail />}
                />
              </Routes>
            </Router>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
