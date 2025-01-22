
import { PrismaClient } from "@prisma/client";

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

const mapRecipe = (recipe: RecipeQueryObject | null) => {
  if (!recipe) return null;
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

export const createRecipe = async (name: string, description: string) => {
  try {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        method: "",
      },
    });
    return recipe.id;
  } catch (e) {
    return null;
  }
};

export const updateRecipe = async (recipe: RecipeResponse) => {
  console.log(recipe.ingredients);
  const response = await prisma.recipe.update({
    data: {
      name: recipe.name,
      description: recipe.description,
      method: recipe.method.join("||"),
    },
    where: { id: recipe.id },
  });

  // TODO: update the ingredients too in one go ??

  if (recipe.ingredients) {
    // Delete all recipe ingredients
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: recipe.id },
    });

    // Add new recipe ingredients
    await prisma.recipeIngredient.createMany({
      data: recipe.ingredients.map((ingredient) => ({
        ingredientId: ingredient.id,
        recipeId: recipe.id,
        quantity: ingredient.quantity,
      })),
    });
  }

  return response;
};
