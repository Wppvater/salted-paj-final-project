const { makeRecipe } = require('../../entities');

const makeCreateRecipe = ({ recipesDb, validator, Id, getIngredients, recipeConstructor }) => {
  if(recipesDb === undefined){
    throw new Error('getRecipes requires a database to function');
  }
  return async recipeInput => {
    recipeInput.id = Id.makeId();
    const recipeToDb = {...recipeInput};
    const recipe = await recipeConstructor([recipeInput])
    // const ingredientIds = recipeInput.ingredients.map(ingredient => ingredient.id);
    // const ingredientInfo = await getIngredients(ingredientIds);
    // recipeInput.ingredientObjects = ingredientInfo;
    // const recipe = makeRecipe(recipeInput);

    await recipesDb.add(recipeToDb);
    const dbResponses = await recipesDb.getByIds([recipeInput.id]);
    const dbRecipes = await recipeConstructor(dbResponses)
    // const updatedResponses = await Promise.all(dbResponses.map(async response => {
    //   const ingredientIds = response.ingredients.map(ingredient => ingredient.id);
    //   const ingredientInfo = await getIngredients(ingredientIds);
    //   response.ingredientObjects = ingredientInfo;
    //   return response;
    // }));
    // const dbRecipe = updatedResponses.map(response => makeRecipe(response))[0];
    return dbRecipes[0];
  };
};

module.exports = { makeCreateRecipe };
