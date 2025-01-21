import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          placeItems: "center",
        }}
      >
        <Typography component="h1" variant="h2">
          Cook Book
        </Typography>
        {/* Main Dashboard */}
        <NavLink to="/recipes">
          <Box mt="2em">
            <Button variant="contained">
              <h2>Recipes</h2>
            </Button>
          </Box>
        </NavLink>
      </Box>
    </>
  );
};

export default Home;
