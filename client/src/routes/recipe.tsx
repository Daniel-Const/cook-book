import { useParams } from "react-router-dom";
import RecipeView from "../components/RecipeView";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

export interface RecipeObject {
  id: number;
  name: string;
  method: string[];
  ingredients: {
    id: number;
    name: string;
    quantity: string;
  }[];
}

const Recipe = () => {
  const params = useParams();
  const id = params.id;

  const [recipe, setRecipe] = useState<RecipeObject | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((recipe: RecipeObject) => setRecipe(recipe))
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      });
  }, []);

  if (notFound) {
    return (
      <>
        <h2>Recipe does not exist...</h2>
      </>
    );
  }

  return (
    <>
      {recipe ? (
        <RecipeView recipe={recipe} />
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </>
  );
};

export default Recipe;
