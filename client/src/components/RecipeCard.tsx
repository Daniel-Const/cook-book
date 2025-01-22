import { Card, CardContent, Typography } from '@mui/material'
import { RecipeObject } from '../api'

export const RecipeCard = ({ recipe }: { recipe: Partial<RecipeObject> }) => {
  return (
    <Card
      sx={{
        padding: '2em',
        backgroundColor: '#314759',
        '&:hover': { backgroundColor: '#202f3b' },
      }}
    >
      <CardContent sx={{ color: 'white' }}>
        <Typography component="h2" variant="h3">
          {recipe.name}
        </Typography>
        <Typography component="p" variant="h5" sx={{ marginTop: '1em' }}>
          {recipe.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
