const { recipesService } = require('../../use-cases/recipes')
const getAllRecipes = async () => {
  const recipes = await recipesService.getAllRecipes();
  const recipesToReturn = recipes.map(recipe => ({
    id: recipe.getId(),
    name: recipe.getName(),
    instructions: recipe.getInstructions(),
    portions: recipe.getPortions(),
    ingredients: recipe.getIngredients(),
    energy: recipe.getEnergy(),
    carbohydrates: recipe.getCarbohydrates(),
    fat: recipe.getFat(),
    protein: recipe.getProtein(),
    microNutrients: recipe.getMicroNutrients(),
  }));
  return recipesToReturn;
}

module.exports = { getAllRecipes }
