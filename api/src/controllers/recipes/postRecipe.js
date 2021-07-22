const { recipesService } = require('../../use-cases/recipes')
const postRecipe = async ({recipeInfo}) => {
  const recipe = {
    name: recipeInfo.name,
    instructions: recipeInfo.instructions,
    portions: recipeInfo.portions,
    ingredients: recipeInfo.ingredients,
  }
  const newRecipe = await recipesService.createRecipe(recipe);
  const recipeToReturn = { ...newRecipe.getAll() }
  return { error: '', recipe:recipeToReturn }
}

module.exports = { postRecipe }
