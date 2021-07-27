const { recipesService } = require('../../use-cases/recipes')
const getRandomRecipes = async (parent, {numOfRecipes}) => {
  const recipes = await recipesService.getAllRecipes();
  let randomRecipes = [];
  for(let i = 0; i < numOfRecipes; i++){
    randomRecipes[i] = recipes[Math.floor(Math.random()*recipes.length)];
  }
  const recipesToReturn = randomRecipes.map(recipe => ({ ...recipe.getAll() }));
  return recipesToReturn;
}

module.exports = { getRandomRecipes }
