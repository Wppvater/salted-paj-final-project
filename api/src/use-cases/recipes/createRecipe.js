const { makeRecipe } = require('../../entities');

const makeCreateRecipe = ({ recipesDb, validator, Id, getIngredients }) => {
  if(recipesDb === undefined){
    throw new Error('getRecipes requires a database to function');
  }
  return async recipeInput => {
    recipeInput.id = Id.makeId();
    const recipeToDb = {...recipeInput};
    const ingredientIds = recipeInput.ingredients.map(ingredient => ingredient.id);
    const ingredientInfo = await getIngredients(ingredientIds);
    recipeInput.ingredientInfo = ingredientInfo.map(i => ({...i.getAll()}));
    const recipe = makeRecipe(recipeInput);

    await recipesDb.add(recipeToDb);
    const dbResponses = await recipesDb.getByIds([recipeInput.id]);
    const updatedResponses = await Promise.all(dbResponses.map(async response => {
      const ingredientIds = response.ingredients.map(ingredient => ingredient.id);
      const ingredientInfo = await getIngredients(ingredientIds);
      response.ingredientInfo = ingredientInfo.map(i => ({
        id: i.getId(),
        name: i.getName(),
        group: i.getGroup(),
        energy: i.getEnergy(),
        carbohydrates: i.getCarbohydrates(),
        fat: i.getFat(),
        protein: i.getProtein(),
        microNutrients: i.getMicroNutrients(),
      }));
      return response;
    }));
    const dbRecipe = updatedResponses.map(response => makeRecipe(response))[0];
    return dbRecipe;
  };
};

module.exports = { makeCreateRecipe };
