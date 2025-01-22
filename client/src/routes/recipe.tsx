import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api, { RecipeObject } from '../api'
import { RecipeEdit } from '../components/RecipeEdit'
import RecipeView from '../components/RecipeView'

const Recipe = () => {
  const params = useParams()
  const id = params.id

  const [recipe, setRecipe] = useState<RecipeObject | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const fetchRecipe = async () => {
    api
      .getRecipeById(`${id}`)
      .then((recipe: RecipeObject) => setRecipe(recipe))
      .catch((err) => {
        console.error(err)
        setNotFound(true)
      })
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  if (notFound) {
    return (
      <>
        <h2>Recipe does not exist...</h2>
      </>
    )
  }

  return (
    <>
      {recipe ? (
        isEditing ? (
          <RecipeEdit
            recipe={recipe}
            onSubmit={() => {
              setIsEditing(false)
              fetchRecipe()
            }}
          />
        ) : (
          <RecipeView
            recipe={recipe}
            handleStartEditing={() => {
              setIsEditing(true)
            }}
          />
        )
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </>
  )
}

export default Recipe
