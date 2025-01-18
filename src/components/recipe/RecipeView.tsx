'use client';

/**
 * Recipe page
 */

import { getRecipeById, RecipeData } from '@/pages/api/recipe';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

export default function RecipeView({ recipe }: { recipe: RecipeData }) {
    const [isEditing, setIsEditing] = useState(false);

    const editButtonIsEditing =
        'text-white pl-3 pr-3 pt-2 pb-2 rounded-full bg-green-500 hover:bg-green-300';
    const editButtonIsNotEditing =
        'text-white pl-3 pr-3 pt-2 pb-2 rounded-full bg-blue-500 hover:bg-blue-300';

    return (
        <div className="">
            <div className="flex flex-row">
                <h1 className="text-6xl text-center">{recipe.name}</h1>
                <p>{isEditing}</p>
                <div className="flex flex-col items-center justify-center ml-8">
                    <button
                        type="button"
                        className={
                            isEditing ? editButtonIsEditing : editButtonIsNotEditing
                        }
                        onClick={() => {
                            setIsEditing(!isEditing);
                        }}
                    >
                        <EditIcon></EditIcon>
                    </button>
                </div>
            </div>
            <Typography component="p" variant="h5" color="white" pt="1em" pb="1em">
                {recipe.description}
            </Typography>
            <Card style={{ backgroundColor: '#475569' }}>
                <CardHeader title="Ingredients" style={{ color: '#ffffff' }}></CardHeader>
                <CardContent>
                    <ul className="p-4 text-white list-disc">
                        {recipe.ingredients.map((ingredient, i) => (
                            <li key={`ingredient-${i}`}>
                                {ingredient.ingredient.name}: {ingredient.quantity}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card style={{ backgroundColor: '#475569' }} className="mt-8">
                <CardHeader style={{ color: '#ffffff' }} title="Steps"></CardHeader>
                <CardContent>
                    <ul className="list-decimal p-4 text-white">
                        {recipe.method.split('||').map((step, i) => (
                            <li key={`steps-${i}`}>{step}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
