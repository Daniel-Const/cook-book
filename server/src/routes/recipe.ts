import express, { Request, Response } from "express";
import {
  createRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe,
} from "../service/recipe";

const recipeRouter = express.Router();

recipeRouter.get("/", async (req: Request, res: Response) => {
  let recipes = await getRecipes();
  res.send(recipes);
});

recipeRouter.post("/", async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const recipeId = await createRecipe(name, description);
  if (!recipeId) {
    res.send({ error: "Failed to create recipe" });
  }
  res.send({ recipeId });
});

recipeRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("Fetching recipe with id ", id);
  const recipe = await getRecipeById(id);
  res.send(recipe);
});

recipeRouter.patch("/:id", async (req: Request, res: Response) => {
  const recipe = await updateRecipe(req.body);
  if (!recipe) {
    res.send({ error: "Failed to update recipe" });
  }
  res.send({ recipe });
});

export default recipeRouter;
