const { makeRecipe } = require('../../entities');

const makeCreateRecipe = ({ recipesDb, validator, Id, getIngredients }) => {
  if(recipesDb === undefined){
    throw new Error('getRecipes requires a database to function');
  }
  return async recipeInput => {
    console.log(Id.makeId())
    recipeInput.id = Id.makeId();
    const recipeToDb = {...recipeInput};
    const ingredientIds = recipeInput.ingredients.map(ingredient => ingredient.id);
    const ingredientInfo = await getIngredients(ingredientIds);
    recipeInput.ingredientInfo = ingredientInfo.map(i => ({
      id: i.getId(),
      name: i.getName(),
      group: i.getGroup(),
      energy: i.getEnergy(),
      carbohydrates: i.getCarbohydrates(),
      fat: i.getFat(),
      protein: i.getProtein(),
      microNutrients: i.getMicroNutrients(),
    }));
    const recipe = makeRecipe(recipeInput);
    // validator.validateArray({data: ids, errorMessage: 'getRecipes needs an array of ids to function.'})
    // ids.forEach(id => {
    //   validator.validateType({type: 'string', data: id, errorMessage:'getRecipes id needs to be a string'});
    // });
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
