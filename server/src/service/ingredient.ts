const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const getAllIngredients = async () => {
  let ingredients = await prisma.ingredient.findMany();
  return ingredients;
};
