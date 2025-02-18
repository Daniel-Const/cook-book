import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllIngredients = async () => {
  let ingredients = await prisma.ingredient.findMany();
  return ingredients;
};

export const createIngredient = async (name: string) => {
  const ingredient = await prisma.ingredient.create({ data: { name } });
  return ingredient;
};

export const createManyIngredients = async (names: string[]) => {
  const ingredients = await prisma.ingredient.createManyAndReturn({
    data: names.map((name) => ({ name })),
  });
  return ingredients;
};
