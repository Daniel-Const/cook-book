/**
 * Basic skeleton to get things started...
 */

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import recipeRouter from "./routes/recipe";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Cookbook app :)");
});

app.use("/recipe", recipeRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
