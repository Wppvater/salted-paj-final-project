const { recipesService } = require('../../use-cases/recipes')
const getAllRecipes = async () => {
  const recipes = await recipesService.getAllRecipes();
  const recipesToReturn = recipes.map(recipe => ({ ...recipe.getAll() }));
  return recipesToReturn;
}

module.exports = { getAllRecipes }
