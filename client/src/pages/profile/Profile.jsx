import { Assistant, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  LinearProgress,
  List,
  Paper,
  Skeleton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import AICard from "./components/AICard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const { username, page } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // const { assistants } = useSelector((state) => state.assistants);
  const [user, setUser] = useState({});
  const [assistants, setAssistants] = useState([]);
  const [loadingAssistants, setLoadingAssistants] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const tabNameToIndex = {
    0: "assistants",
    assistants: 0,
  };

  const [selectedTab, setSelectedTab] = useState(tabNameToIndex[page]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setLoadingUser(true);
    const fetchUser = async () => {
      const res = await userRequest.get(`/users?username=${username}`);
      setUser(res.data);
      setLoadingUser(false);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    setLoadingAssistants(true);
    const getAssistants = async () => {
      try {
        const res = await userRequest.get(
          `/assistants/get/all/${currentUser.username}`
        );
        console.log(res.data);
        setAssistants(res.data);
        setLoadingAssistants(false);
      } catch (err) {
        console.log(err);
      }
    };
    getAssistants();
  }, [currentUser.username]);

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
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              {loadingUser ? (
                <Skeleton variant="circular" sx={{ height: 140, width: 140 }} />
              ) : (
                <Avatar
                  src={!user.profilePic ? "/broken-image.jpg" : user.profilePic}
                  sx={{ height: 140, width: 140 }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="h1" variant="h5">
                {loadingUser ? <Skeleton width={80} /> : user.username}
              </Typography>
              <Button
                size="small"
                variant="contained"
                component={Link}
                to="/account"
                sx={{ ml: 2 }}
              >
                Edit profile
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" fontSize="15px">
                {loadingUser ? (
                  <Skeleton width={210} style={{ marginBottom: 6 }} />
                ) : (
                  <b>{user.name}</b>
                )}
              </Typography>
              <Typography
                variant="body2"
                fontSize="15px"
                sx={{ whiteSpace: "pre-line" }}
              >
                {loadingUser ? (
                  <>
                    <Skeleton width={210} />
                    <Skeleton width={210} />
                    <Skeleton width={150} />
                  </>
                ) : (
                  user.bio
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectedTab} onChange={handleChange} centered>
            <Tab
              label="Assistants"
              component={Link}
              to={`/profile/${username}/assistants`}
            />
          </Tabs>
        </Box>
        <TabPanel value={selectedTab} index={0}>
          {loadingAssistants ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {assistants.length === 0 ? (
                <Container maxWidth="xs">
                  <Avatar
                    sx={{
                      height: 60,
                      width: 60,
                      margin: "auto",
                      bgcolor: blue[500],
                    }}
                  >
                    <Assistant />
                  </Avatar>
                  <Typography paragraph textAlign="center" mt={2}>
                    You don't have any assistants created at the moment
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Button
                      size="small"
                      variant="contained"
                      component={Link}
                      to="/assistant/create"
                    >
                      Create assistant
                    </Button>
                  </Box>
                </Container>
              ) : (
                <Stack direction="column" sx={{ flexWrap: "wrap", gap: 1 }}>
                  {assistants.map((a) => (
                    <div>
                      <AICard
                        modelId={a._id}
                        name={a.name}
                        avatar={a.avatar}
                        model={a.model}
                        strengths={a.strengths}
                        prompt={a.prompt}
                      />
                    </div>
                  ))}
                </Stack>
              )}
            </>
          )}
        </TabPanel>
      </Container>
    </Box>
  );
}
