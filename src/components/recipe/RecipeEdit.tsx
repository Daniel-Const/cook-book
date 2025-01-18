'use client';

/**
 * Recipe page
 */

import {
    getRecipeById,
    IngredientData,
    RecipeData,
    updateRecipe
} from '@/pages/api/recipe';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import IngredientList, { Ingredient } from './IngredientList';

export default function RecipeEdit({
    recipe,
    onSubmit
}: {
    recipe: RecipeData;
    onSubmit: () => void;
}) {
    const [recipeData, setRecipeData] = useState({
        name: '',
        description: '',
        method: ''
    });

    const [ingredients, setIngredientsData] = useState<Ingredient[]>(
        recipe.ingredients
            .map((i) => ({
                name: i.ingredient.name,
                id: i.ingredient.id,
                quantity: i.quantity
            }))
            .filter((i) => i.name !== '')
    );
    const [name, setName] = useState(recipe.name);
    const [description, setDescription] = useState(recipe.description);
    const [method, setMethod] = useState(recipe.method);

    const ingredientData = recipe.ingredients.map((ingredient) => ({
        id: ingredient.ingredient.id,
        name: ingredient.ingredient.name,
        quantity: ingredient.quantity
    }));

    const saveRecipe = async () => {
        const newRecipe = {
            id: recipe.id,
            name,
            description,
            method,
            ingredients: ingredients.map((ingredient) => ({
                quantity: ingredient.quantity,
                ingredient: {
                    name: ingredient.name,
                    id: ingredient.id
                }
            }))
        };
        const response = await fetch('/api/recipe', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        });
        onSubmit();
    };

    return (
        <div className="">
            <Typography component="h2" variant="h5" color="white" pt="1em" pb="1em">
                Name
            </Typography>
            <TextField
                id="name"
                value={name}
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                className="bg-white text-2xl"
            />

            <Typography component="h2" variant="h5" color="white" pt="1em" pb="1em">
                Description
            </Typography>
            <div className="flex flex-row">
                <TextField
                    id="description"
                    value={description}
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-white text-2x w-full"
                />
            </div>

            <Typography component="h2" variant="h5" color="white" pt="1em" pb="1em">
                Ingredients
            </Typography>
            <IngredientList
                ingredients={ingredientData}
                onChange={(ingredients: Ingredient[]) => setIngredientsData(ingredients)}
            ></IngredientList>

            <Card style={{ backgroundColor: '#475569' }} className="mt-8">
                <CardHeader style={{ color: '#ffffff' }} title="Steps"></CardHeader>
                <CardContent>
                    <ul className="list-decimal p-4 text-white">
                        {method.split('||').map((step, i) => (
                            <li key={`steps-${i}`}>{step}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <div className="mt-4">
                <Button
                    type="button"
                    className="text-white pl-3 pr-3 pt-2 pb-2 rounded-full bg-blue-500 hover:bg-blue-300"
                    onClick={() => {
                        saveRecipe();
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}
