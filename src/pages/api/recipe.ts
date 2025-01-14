import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { Recipe } from '@prisma/client';

async function createRecipe() {}

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
            ingredients: {
                select: { ingredient: { select: { name: true } }, quantity: true }
            }
        }
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Recipe[]>) {
    //   res.status(200).json({ message: 'Hello from Next.js!' })
    if (req.method === 'POST') {
        createRecipe();
    } else if (req.method == 'GET') {
        getRecipes().then((recipes) => {
            res.status(200).json(recipes);
        });
    }
}
