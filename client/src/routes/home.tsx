import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Box className="flex flex-col items-center place-items-center">
        <h1 className="text-5xl">Cook Book</h1>
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
