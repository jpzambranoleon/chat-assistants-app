import { Delete, PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";

const SetAvatar = ({ file, setFile }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography paragraph variant="body2">
          You can personalize your assisant even further. Why not give it a face
          to go with the name?
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<PhotoCamera />}
            size="small"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
            />
            Upload
          </Button>
          {file === null ? null : (
            <Button
              variant="contained"
              endIcon={<Delete />}
              size="small"
              onClick={(e) => setFile(null)}
              color="error"
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={!file ? "/broken-image.jpg" : URL.createObjectURL(file)}
            sx={{ height: 150, width: 150 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SetAvatar;
