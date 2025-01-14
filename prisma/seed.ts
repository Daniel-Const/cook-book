import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const pesto = await prisma.ingredient.create({
        data: {
            name: 'pesto'
        }
    });

    const penne = await prisma.ingredient.create({
        data: {
            name: 'penne'
        }
    });

    const pennePestoRecipe = await prisma.recipe.create({
        data: {
            name: 'Penne & Pesto',
            description: 'Pasta with pesto sauce'
        }
    });

    const penneIngredient = await prisma.recipeIngredient.create({
        data: {
            ingredientId: penne.id,
            recipeId: pennePestoRecipe.id,
            quantity: '600g'
        }
    });

    const pestoIngredient = await prisma.recipeIngredient.create({
        data: {
            ingredientId: pesto.id,
            recipeId: pennePestoRecipe.id,
            quantity: '600g'
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
