type Recipe = {
  title: string;
  instructions: string;
  ingredients: ingredientType[];
};

type ingredientType = {
  name: string;
  quantity: string;
}

const processRecipe = (recipe: Recipe) => {
  // Do something with the recipe in here
  console.log(recipe.title);
  console.log(recipe.instructions);
  console.log(recipe.ingredients);
};

processRecipe({
  title: "Chocolate Chip Cookies",
  ingredients: [
    { name: "Flour", quantity: "2 cups" },
    { name: "Sugar", quantity: "1 cup" },
  ],
  instructions: "...",
});