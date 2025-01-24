import { Card, CardContent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const HomeMenuOption = ({ text, to }: { text: string; to: string }) => {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          backgroundColor: '#314759',
          color: 'white',
          '&:hover': { backgroundColor: '#466680' },
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography component="h2" variant="h2">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </NavLink>
  )
}
