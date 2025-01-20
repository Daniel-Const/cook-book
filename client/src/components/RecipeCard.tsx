import { Card, CardContent } from "@mui/material";

export const RecipeCard = ({ recipe }: { recipe: any }) => {
  return (
      <Card>
        <CardContent>
          <h1 className="text-lg">{recipe.name}</h1>
          <p>{recipe.description}</p>
        </CardContent>
      </Card>
  );
};
