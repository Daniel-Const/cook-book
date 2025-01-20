import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const RecipeView = ({ recipe }: { recipe: any }) => {
  const setIsEditing = (value: boolean) => {};

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" component="h1">
          {recipe.name}
        </Typography>
        <Button
          type="button"
          className="text-white pl-3 pr-3 pt-2 pb-2 rounded-full bg-blue-500 hover:bg-blue-300"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <EditIcon></EditIcon>
        </Button>
      </Box>

      <Typography component="p" variant="h5" color="white" pt="1em" pb="1em">
        {recipe.description}
      </Typography>

      <Card style={{ backgroundColor: "#475569", minWidth: "30%" }}>
        <CardHeader
          title="Ingredients"
          style={{ color: "#ffffff" }}
        ></CardHeader>
        <CardContent>
          <List sx={{ color: "white" }}>
            {recipe.ingredients.map((ingredient: any, i: number) => (
              <ListItem key={`ingredient-${i}`}>
                {ingredient.name}: {ingredient.quantity}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card
        style={{ backgroundColor: "#475569", minWidth: "30%" }}
        className="mt-8"
      >
        <CardHeader style={{ color: "#ffffff" }} title="Steps"></CardHeader>
        <CardContent>
          <List sx={{ color: "white" }}>
            {recipe.method.map((step: string, i: number) => (
              <ListItem key={`steps-${i}`}>{step}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default RecipeView;
