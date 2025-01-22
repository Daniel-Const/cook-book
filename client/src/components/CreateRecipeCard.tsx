import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import api from '../api'

export const CreateRecipeCard = ({
  onSubmit,
}: {
  onSubmit: (id: string) => void
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmitRecipe = async () => {
    api.createRecipe(name, description).then((id: string) => {
      onSubmit(id)
    })
  }

  return (
    <Card>
      <CardHeader title="Create a recipe"></CardHeader>
      <CardContent>
        <Typography></Typography>
        <Box display="flex" flexDirection="column">
          <Box sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}>
            <TextField
              id="name"
              label="Name"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' } }}>
            <TextField
              id="description"
              label="Description"
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </Box>

        <Button sx={{ m: 1 }} onClick={handleSubmitRecipe}>
          Create
        </Button>
      </CardContent>
    </Card>
  )
}
