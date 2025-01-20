import RecipeView from "../components/RecipeView";

const Recipe = () => {
  // const setIsEditing = (value: boolean) => {};

  const recipe = {
    id: "123",
    name: "Penne Pesto",
    description: "yummy penne pesto woohoo!",
    ingredients: [{ name: "Spaghetti", quantity: "1 packet" }],
    method: ["Put the pasta in the pot", "boil the pasta", "add the sauce"],
  };

  return (
    <>
      <RecipeView recipe={recipe} />
    </>
  );
};

export default Recipe;
