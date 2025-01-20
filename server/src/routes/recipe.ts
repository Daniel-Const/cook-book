import express, { Request, Response } from "express";
import { getRecipeById, getRecipes } from "../service/recipe";
import { Recipe } from "@prisma/client";

const recipeRouter = express.Router();

recipeRouter.get("/", async (req: Request, res: Response) => {
  let recipes = await getRecipes();
  res.send(recipes);
});

recipeRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("Fetching recipe with id ", id);
  const recipe = await getRecipeById(id);
  res.send(recipe);
});

export default recipeRouter;
