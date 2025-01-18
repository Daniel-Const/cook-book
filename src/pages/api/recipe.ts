import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { Recipe } from '@prisma/client';

export interface RecipeData {
    name: string;
    id: number;
    description: string;
    method: string;
    ingredients: IngredientData[];
}

export interface IngredientData {
    quantity: string;
    ingredient: {
        name: string;
        id: number;
    };
}

interface IngredientPayload {
    quantity: string;
    name: string;
    id?: number;
}

interface RecipePayload {
    ingredients: IngredientPayload[];
    name: string;
    description: string;
    method: string[];
}

export async function createRecipe(recipeData: RecipePayload) {
    const recipe = await prisma.recipe.create({
        data: {
            name: recipeData.name,
            description: recipeData.description,
            method: recipeData.method.join('||')
        }
    });

    // Ingredients (Create if ingredient doesn't exist yet)
    recipeData.ingredients.forEach(async (ingredient: IngredientPayload) => {
        let ingredientId;
        if (ingredient.id) {
            ingredientId = ingredient.id;
        } else {
            const ingredientItem = await prisma.ingredient.create({
                data: {
                    name: ingredient.name
                }
            });
            ingredientId = ingredientItem.id;
        }

        // Attach to recipe
        await prisma.recipeIngredient.create({
            data: {
                ingredientId,
                recipeId: recipe.id,
                quantity: ingredient.quantity
            }
        });
    });
}

export async function updateRecipe(recipe: RecipeData) {
    console.log('Updating Recipe');
    console.log(recipe);
    await prisma.recipe.update({
        where: { id: recipe.id },
        data: {
            name: recipe.name,
            description: recipe.description,
            method: recipe.method
        }
    });

    // Delete existing ingredients
    await prisma.recipeIngredient.deleteMany({
        where: { recipeId: recipe.id }
    });

    // Add new ingredients

    const ingredients = Promise.all(
        recipe.ingredients.map(async (ingredient) => {
            if (!ingredient.ingredient.id) {
                const newIngredient = await prisma.ingredient.create({
                    data: {
                        name: ingredient.ingredient.name
                    }
                });
                return {
                    quantity: ingredient.quantity,
                    ingredient: { id: newIngredient.id, name: newIngredient.name }
                };
            }
            return ingredient;
        })
    );

    await prisma.recipeIngredient.createMany({
        data: (
            await ingredients
        ).map((ingredient) => ({
            ingredientId: ingredient.ingredient.id,
            recipeId: recipe.id,
            quantity: ingredient.quantity
        }))
    });
}

export async function getRecipes() {
    const recipes = await prisma.recipe.findMany();
    return recipes;
}

export async function getRecipeById(id: number): Promise<RecipeData | null> {
    console.log(id);
    return await prisma.recipe.findUnique({
        where: { id },
        select: {
            name: true,
            description: true,
            method: true,
            id: true,
            ingredients: {
                select: {
                    ingredient: { select: { name: true, id: true } },
                    quantity: true
                }
            }
        }
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        // createRecipe();
    } else if (req.method == 'PATCH') {
        updateRecipe(req.body).then(() => {
            res.status(200).json({ message: 'Succesfully updated recipe!' });
        });
    } else if (req.method == 'GET') {
        getRecipes().then((recipes) => {
            res.status(200).json(recipes);
        });
    }
}
