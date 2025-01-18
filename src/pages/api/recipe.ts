import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { Recipe } from '@prisma/client';

export interface RecipeData {
    name: string;
    id: number;
    description: string;
    method: string;
    ingredients: {
        quantity: string;
        ingredient: {
            name: string;
        };
    }[];
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

async function createRecipe(recipeData: RecipePayload) {
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

export async function getRecipes() {
    const recipes = await prisma.recipe.findMany();
    return recipes;
}

export async function getRecipeById(id: number) {
    console.log(id);
    return await prisma.recipe.findUnique({
        where: { id },
        select: {
            name: true,
            description: true,
            method: true,
            id: true,
            ingredients: {
                select: { ingredient: { select: { name: true } }, quantity: true }
            }
        }
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Recipe[]>) {
    if (req.method === 'POST') {
        // createRecipe();
    } else if (req.method == 'GET') {
        getRecipes().then((recipes) => {
            res.status(200).json(recipes);
        });
    }
}
