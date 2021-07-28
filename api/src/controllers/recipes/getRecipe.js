const { recipesService } = require('../../use-cases/recipes')
const getRecipe = async (parent, {id}) => {
  const recipe = await recipesService.getRecipes([id]);
  const recipeToReturn = { ...recipe[0].getAll() };
  return recipeToReturn;
}

module.exports = { getRecipe }
