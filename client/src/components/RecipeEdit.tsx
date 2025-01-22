import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import api, { IngredientObject, RecipeObject } from '../api'
import { IngredientChip } from './IngredientChip'

export const RecipeEdit = ({
  recipe,
  onSubmit,
}: {
  recipe: RecipeObject
  onSubmit: () => void
}) => {
  const [name, setName] = useState(recipe.name)
  const [description, setDescription] = useState(recipe.description)
  const [method, setMethod] = useState(recipe.method)

  const [ingredientValue, setIngredientValue] = useState<any>('')
  const [ingredientOptions, setIngredientOptions] = useState<
    IngredientObject[]
  >([])
  const [ingredientQuantity, setIngredientQuantity] = useState('')
  const [ingredients, setIngredients] = useState(recipe.ingredients)

  useEffect(() => {
    api.getAllIngredients().then((ingredients) => {
      setIngredientOptions(ingredients)
    })
  }, [])

  const saveIngredientOption = () => {
    // TODO: Implement creating new ingredient
    let newIngredient = { id: 1, name: 'potato', quantity: '100g' }
    const existing = ingredientOptions.find(
      (o: IngredientObject) => o.name === ingredientValue
    )
    if (!existing) {
      // Create new ingredient...
    } else {
      console.log('using existing', existing)
      newIngredient = existing
    }

    setIngredients([
      ...ingredients,
      { ...newIngredient, quantity: ingredientQuantity },
    ])

    // Clean up inputs
    setIngredientValue('')
    setIngredientQuantity('')
  }

  const deleteIngredientAtIndex = (index: number) => {
    console.log('deleting ', index)
    let newIngredients = [...ingredients]
    newIngredients.splice(index, 1)
    setIngredients(newIngredients)
  }

  const saveRecipe = async () => {
    fetch(`http://localhost:3000/recipe/${recipe.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: recipe.id,
        name,
        description,
        method: recipe.method,
        ingredients,
      }),
    })
      .then((res) => res.json())
      .then(() => onSubmit())
  }

  return (
    <>
      <Box>
        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}>
          <TextField
            id="name"
            label="Name"
            variant="filled"
            value={name}
            sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' } }}>
          <TextField
            id="description"
            label="Description"
            variant="filled"
            value={description}
            sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '40%',
          }}
        >
          <Card
            sx={{
              backgroundColor: '#475569',
              marginTop: '2em',
              padding: '1em',
            }}
          >
            <CardHeader
              title="Ingredients"
              style={{ color: '#ffffff' }}
            ></CardHeader>
            <CardContent>
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row">
                  <Autocomplete
                    options={ingredientOptions}
                    freeSolo
                    sx={{ width: 250 }}
                    getOptionLabel={(option: IngredientObject | string) => {
                      if (typeof option === 'object') return option.name
                      return option
                    }}
                    value={ingredientValue}
                    onChange={(_, value) => {
                      if (!value) return
                      if (typeof value === 'object') {
                        setIngredientValue(value.name)
                      } else {
                        setIngredientValue(value)
                      }
                    }}
                    onInputChange={(_, value) => setIngredientValue(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Ingredient" />
                    )}
                  />
                  <Box
                    sx={{ '& .MuiTextField-root': { ml: 1, width: '25ch' } }}
                  >
                    <TextField
                      label="quantity"
                      value={ingredientQuantity}
                      onChange={(e) => {
                        setIngredientQuantity(e.target.value)
                      }}
                    />
                  </Box>
                  <Button onClick={saveIngredientOption}>
                    <AddIcon></AddIcon>
                  </Button>
                </Box>

                <Stack
                  width="600px"
                  direction="row"
                  spacing={1}
                  marginTop="1em"
                  useFlexGap
                  sx={{ flexWrap: 'wrap' }}
                >
                  {ingredients.map(
                    (ingredient: IngredientObject, i: number) => (
                      <IngredientChip
                        key={i}
                        ingredient={ingredient}
                        onDelete={() => deleteIngredientAtIndex(i)}
                      />
                    )
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: '#475569',
              marginTop: '2em',
              padding: '1em',
            }}
          >
            <CardHeader style={{ color: '#ffffff' }} title="Steps"></CardHeader>
            <CardContent>
              <List
                sx={{
                  listStyle: 'upper-roman',
                  color: 'white',
                  paddingX: '1em',
                }}
              >
                {recipe.method.map((step: string, i: number) => (
                  <ListItem sx={{ display: 'list-item' }} key={`steps-${i}`}>
                    <Typography fontSize={'1.2em'}>{step}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Button
            type="button"
            sx={{ marginTop: '1em' }}
            onClick={() => {
              saveRecipe()
            }}
          >
            <SaveIcon></SaveIcon>
            {/* Save */}
          </Button>
        </Box>
      </Box>
    </>
  )
}
