export interface IngredientObject {
  id: number
  name: string
  quantity: string
}

export interface RecipeObject {
  id: number
  name: string
  description: string
  method: string[]
  ingredients: IngredientObject[]
}

const BASE_URL = 'http://localhost:3000'

const createRecipe = async (
  name: string,
  description: string
): Promise<string> => {
  const id = await fetch(`${BASE_URL}/recipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  })
    .then((res) => res.json())
    .then((res) => res.recipeId)

  return `${id}`
}

// TODO (server): return updated recipe...
const updateRecipe = (recipe: RecipeObject): void => {
  fetch(`${BASE_URL}/recipe/${recipe.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  })
}

const getRecipeById = async (id: string): Promise<RecipeObject> => {
  const response = await fetch(`${BASE_URL}/recipe/${id}`).then((res) =>
    res.json()
  )
  return response
}

const getAllRecipes = async (): Promise<Partial<RecipeObject>[]> => {
  const response = await fetch(`${BASE_URL}/recipe`).then((res) => res.json())
  return response
}

const getAllIngredients = async (): Promise<IngredientObject[]> => {
  const response = await fetch(`${BASE_URL}/ingredient`).then((res) =>
    res.json()
  )
  return response
}

export default {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  getAllIngredients,
}
