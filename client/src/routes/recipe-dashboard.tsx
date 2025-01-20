import { Box, Typography } from "@mui/material";
import { RecipeCard } from "../components/RecipeCard";
import { NavLink } from "react-router-dom";

const RecipeDashboard = () => {
  const recipes = [
    {
      id: "123",
      name: "penne pesto",
      description: "yummy penne pesto woohoo!",
    },
    {
      id: "323",
      name: "Spaghetti",
      description: "A classic! Quick and easy",
    },
  ];

  return (
    <>
      <Typography variant="h2" component="h1">
        Recipes
      </Typography>
      <Box width="100%" maxWidth="60%" mt="2em">
        {recipes.map((recipe) => (
          <Box pb="1em" key={recipe.id}>
            <NavLink to={`${recipe.id}`}>
              <RecipeCard recipe={recipe} />
            </NavLink>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default RecipeDashboard;
