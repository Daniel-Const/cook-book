import { Box, Skeleton, Typography } from "@mui/material";
import { RecipeCard } from "../components/RecipeCard";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipeObject } from "./recipe";

const RecipeDashboard = () => {
  const [recipeList, setRecipeList] = useState<RecipeObject[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/recipe`)
      .then((res) => {
        return res.json();
      })
      .then((recipeList: any) => setRecipeList(recipeList))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Typography variant="h2" component="h1">
        Recipes
      </Typography>
      <Box width="100%" maxWidth="800px" mt="2em">
        {recipeList.length > 0 ? (
          recipeList.map((recipe) => (
            <Box pb="1em" key={recipe.id}>
              <NavLink to={`${recipe.id}`} style={{ textDecoration: "none" }}>
                <RecipeCard recipe={recipe} />
              </NavLink>
            </Box>
          ))
        ) : (
          <Skeleton variant="rectangular" height="200" />
        )}
      </Box>
    </>
  );
};

export default RecipeDashboard;
