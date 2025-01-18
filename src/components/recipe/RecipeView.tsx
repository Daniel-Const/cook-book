'use client';

/**
 * Recipe page
 */

import { RecipeData } from '@/pages/api/recipe';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function RecipeView({
    recipe,
    setIsEditing
}: {
    recipe: RecipeData;
    setIsEditing: (value: boolean) => void;
}) {
    return (
        <div className="">
            <div className="flex flex-row">
                <div className="flex flex-row">
                    <h1 className="text-6xl text-center">{recipe.name}</h1>
                </div>
                <Button
                    type="button"
                    className="text-white pl-3 pr-3 pt-2 pb-2 rounded-full bg-blue-500 hover:bg-blue-300"
                    onClick={() => {
                        setIsEditing(true);
                    }}
                >
                    <EditIcon></EditIcon>
                </Button>
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
