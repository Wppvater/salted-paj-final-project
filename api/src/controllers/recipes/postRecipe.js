const { recipesService } = require('../../use-cases/recipes')
const postRecipe = async ({recipeInfo}) => {
  console.log(recipeInfo);
  // console.log(allParams[0].recipeInfo);
  const recipe = {
    name: recipeInfo.name,
    instructions: recipeInfo.instructions,
    portions: recipeInfo.portions,
    ingredients: recipeInfo.ingredients,
  }
  const newRecipe = await recipesService.createRecipe(recipe);
  const recipeToReturn = {
    id: newRecipe.getId(),
    name: newRecipe.getName(),
    instructions: newRecipe.getInstructions(),
    portions: newRecipe.getPortions(),
    ingredients: newRecipe.getIngredients(),
    energy: newRecipe.getEnergy(),
    carbohydrates: newRecipe.getCarbohydrates(),
    fat: newRecipe.getFat(),
    protein: newRecipe.getProtein(),
    microNutrients: newRecipe.getMicroNutrients(),
  }
  console.log(recipeToReturn);
  return { error: '', recipe:recipeToReturn }
}

module.exports = {postRecipe}