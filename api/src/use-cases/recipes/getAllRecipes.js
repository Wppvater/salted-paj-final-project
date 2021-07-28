const { makeRecipe } = require('../../entities');

const makeGetAllRecipes = ({ recipesDb, validator, recipeConstructor }) => {
  if(recipesDb === undefined){
    throw new Error('getRecipes requires a database to function');
  }
  return async () => {
    const dbResponses = await recipesDb.getAll();
    const recipes = await recipeConstructor(dbResponses);
    // const updatedResponses = await Promise.all(dbResponses.map(async response => {
    //   const ingredientIds = response.ingredients.map(ingredient => ingredient.id);
    //   const ingredientInfo = await getIngredients(ingredientIds);
    //   response.ingredientObjects = ingredientInfo;
    //   return response;
    // }));
    // const recipes = await updatedResponses.map(response => makeRecipe(response));
    return recipes;
  };
};

module.exports = { makeGetAllRecipes };
