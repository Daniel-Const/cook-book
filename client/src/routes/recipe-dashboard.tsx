import { Box, Button, Modal, Skeleton, Typography } from '@mui/material'

import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import api, { RecipeObject } from '../api'
import { CreateRecipeCard } from '../components/CreateRecipeCard'
import { RecipeCard } from '../components/RecipeCard'

const RecipeDashboard = () => {
  const [recipeList, setRecipeList] = useState<Partial<RecipeObject>[]>([])

  // Fetch recipe list
  useEffect(() => {
    api
      .getAllRecipes()
      .then((recipeList: Partial<RecipeObject>[]) => setRecipeList(recipeList))
      .catch((err) => {
        console.error(err)
      })
  }, [])

  // Add recipe modal control
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const navigate = useNavigate()

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 600,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CreateRecipeCard
            onSubmit={(recipeId: string) => navigate(recipeId)}
          ></CreateRecipeCard>
        </Box>
      </Modal>
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" component="h1">
          Recipes
        </Typography>
        <Button onClick={handleOpen}>Add Recipe</Button>
      </Box>
      <Box width="100%" maxWidth="800px" mt="2em">
        {recipeList.length > 0 ? (
          recipeList.map((recipe) => (
            <Box pb="1em" key={recipe.id}>
              <NavLink to={`${recipe.id}`} style={{ textDecoration: 'none' }}>
                <RecipeCard recipe={recipe} />
              </NavLink>
            </Box>
          ))
        ) : (
          <Skeleton variant="rectangular" height="200" />
        )}
      </Box>
    </>
  )
}

export default RecipeDashboard
