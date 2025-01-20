import { Ingredient, Recipe, RecipeIngredient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

interface RecipeIngredientQueryObject {
  ingredient: {
    id: number;
    name: string;
  };
  quantity: string;
}

interface RecipeQueryObject {
  id: number;
  name: string;
  description: string;
  method: string;
  ingredients?: RecipeIngredientQueryObject[];
}

interface RecipeIngredientResponse {
  id: number;
  name: string;
  quantity: string;
}

interface RecipeResponse {
  id: number;
  name: string;
  description: string;
  method: string[];
  ingredients?: RecipeIngredientResponse[];
}

const mapRecipe = (recipe: RecipeQueryObject) => {
  const mappedRecipe: RecipeResponse = {
    ...recipe,
    method: recipe.method.split("||"),
    ingredients: [],
  };

  // If response has recipeIngredients - flatten ingredients field
  if (recipe.ingredients) {
    mappedRecipe.ingredients = recipe.ingredients.map((ingredient) => ({
      id: ingredient.ingredient.id,
      name: ingredient.ingredient.name,
      quantity: ingredient.quantity,
    }));

    return mappedRecipe;
  }

  return mappedRecipe;
};

export const getRecipes = async () => {
  let recipes = await prisma.recipe.findMany();
  return recipes.map(mapRecipe);
};

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(id) },
    select: {
      name: true,
      description: true,
      method: true,
      id: true,
      ingredients: {
        select: {
          ingredient: { select: { name: true, id: true } },
          quantity: true,
        },
      },
    },
  });
  console.log(recipe);
  return mapRecipe(recipe);
};
