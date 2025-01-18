'use client';

import { FormEvent, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { AlertContext, AlertType } from '@/context/AlertContext';
import { Box, Card, CardContent, Typography } from '@mui/material';
import IngredientList from '../../../components/recipe/IngredientList';

export default function CreateRecipe() {
    const router = useRouter();

    const alertContext = useContext(AlertContext);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title');

        const ingredients = [];
        let value = formData.get('list-0');
        let i = 1;
        while (value != null) {
            ingredients.push(value);
            value = formData.get(`list-${i}`);
            i++;
        }

        const method = formData.get('method');

        // TODO: API Request to save recipe
        // On save -> Check status of request, trigger alert and go back to recipe list
        router.push('/recipe');
        alertContext?.trigger(AlertType.Info, 'Succesfully created new recipe!');
    }

    return (
        <>
            <h1 className="text-2xl">Add a recipe!</h1>
            <form onSubmit={onSubmit} className="mt-8">
                <Card style={{ backgroundColor: '#475569' }}>
                    <CardContent sx={{}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', columns: 2 }}>
                            <div>
                                <Typography
                                    component="div"
                                    variant="h5"
                                    color="white"
                                    pb="0.5em"
                                >
                                    Title
                                </Typography>
                                <input
                                    className="pl-2 mt-2"
                                    type="text"
                                    id="title"
                                    name="title"
                                />

                                <Typography
                                    component="div"
                                    variant="h5"
                                    color="white"
                                    pb="0.5em"
                                    pt="1em"
                                >
                                    Ingredients
                                </Typography>
                                <IngredientList ingredients={[]} />
                            </div>
                            <div className="ml-8">
                                <Typography
                                    component="div"
                                    variant="h5"
                                    color="white"
                                    pb="0.5em"
                                >
                                    Method
                                </Typography>
                                <textarea
                                    className="text-black pl-2"
                                    id="method"
                                    name="method"
                                    rows={8}
                                    cols={40}
                                />
                            </div>
                        </Box>
                        <button
                            className="text-white px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-300"
                            type="submit"
                        >
                            Save
                        </button>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}
