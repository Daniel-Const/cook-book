import { Box, Typography } from '@mui/material'
import { HomeMenuOption } from '../components/HomeMenuOption'

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          placeItems: 'center',
        }}
      >
        <Typography component="h1" variant="h1">
          Cook Book
        </Typography>
        {/* Main Dashboard */}
        <Box mt="6em" width={'600px'}>
          <Box py="1em">
            <HomeMenuOption text="Recipes" to="/recipes" />
          </Box>
          {/* TODO */}
          <Box py="1em">
            <HomeMenuOption text="Ingredients" to="/ingredients" />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Home
