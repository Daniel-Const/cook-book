import express, { Request, Response } from "express";
import { createIngredient, getAllIngredients } from "../service/ingredient";

export const ingredientRouter = express.Router();

ingredientRouter.get("/", async (req: Request, res: Response) => {
  let ingredients = await getAllIngredients();
  res.send(ingredients);
});

ingredientRouter.post("/", async (req: Request, res: Response) => {
  let ingredient = await createIngredient(req.body.name);
  res.send(ingredient);
});
