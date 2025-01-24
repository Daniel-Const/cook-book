import { ArrowBack } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <div>
        <div className="absolute top-0 right-0 mt-8 mr-8 flex mx-auto items-center">
          {/* <Alert /> */}
        </div>
      </div>

      <main>
        {/* Top bar items */}
        <Box py="1em" bgcolor="#314759" textAlign={'center'}>
          <NavLink to="/">
            <Button variant="text">Home</Button>
          </NavLink>
          <NavLink to="/recipes">
            <Button variant="text" color="primary" sx={{ ml: '0.5em' }}>
              Recipes
            </Button>
          </NavLink>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            backgroundColor: '#292d33',
            // marginTop: "2em",
            paddingTop: '2em',
          }}
        >
          {location.pathname !== '/' ? (
            <Box
              sx={{ position: 'fixed', top: '6em', left: '4em', zIndex: 9999 }}
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
            ''
          )}
          <Outlet />
        </Box>
      </main>
    </div>
  )
}
