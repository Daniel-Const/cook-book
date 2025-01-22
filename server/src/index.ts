/**
 * Basic skeleton to get things started...
 */

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { ingredientRouter } from "./routes/ingredients";
import recipeRouter from "./routes/recipe";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Cookbook app :)");
});

app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
