import express, { Request, Response } from "express";
import { getAllIngredients } from "../service/ingredient";

export const ingredientRouter = express.Router();

ingredientRouter.get("/", async (req: Request, res: Response) => {
  let ingredients = await getAllIngredients();
  res.send(ingredients);
});
