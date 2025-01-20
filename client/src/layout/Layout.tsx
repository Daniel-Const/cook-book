import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-gray-900">
      <div className="flex">
        <div className="absolute top-0 right-0 mt-8 mr-8 flex mx-auto items-center">
          {/* <Alert /> */}
        </div>
      </div>

      {/* Top bar items */}
      <Box py="1em" bgcolor="#0d1321">
        <NavLink to="/">
          <Button>Home</Button>
        </NavLink>
        <NavLink to="/">
          <Button>Recipes</Button>
        </NavLink>
      </Box>

      <main className="flex min-h-screen flex-col items-center mt-8">
        {location.pathname !== "/" ? (
          <Box
            sx={{ position: "fixed", top: "5em", left: "4em", zIndex: 9999 }}
          >
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{ borderRadius: 8 }}
            >
              <ArrowBack />
            </Button>
          </Box>
        ) : (
          ""
        )}
        <Outlet />
      </main>
    </div>
  );
}
