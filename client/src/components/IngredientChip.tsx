import { Chip } from '@mui/material'
import { IngredientObject } from '../api'

export const IngredientChip = ({
  ingredient,
  onDelete,
}: {
  ingredient: IngredientObject
  onDelete: () => void
}) => {
  return (
    <Chip
      label={`${ingredient.name}: ${ingredient.quantity}`}
      sx={{
        '& .MuiChip-label': { fontSize: 20 },
        color: 'white',
      }}
      onDelete={onDelete}
    />
  )
}
