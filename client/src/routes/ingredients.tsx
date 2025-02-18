import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api, { RecipeObject } from '../api'
import { RecipeEdit } from '../components/RecipeEdit'
import RecipeView from '../components/RecipeView'

type ingredients = { name: string }[]

const Recipe = () => {
  const [ingredients, setIngredients] = useState<ingredients>([])
  const [notFound, setNotFound] = useState(false)

  const fetchRecipe = async () => {
    api
      .getAllIngredients()
      .then((ingredients: ingredients) => setIngredients(ingredients))
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
      {ingredients ? (
        ingredients.map((ingredient) => <h2>{ingredient.name}</h2>)
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </>
  )
}

export default Recipe
