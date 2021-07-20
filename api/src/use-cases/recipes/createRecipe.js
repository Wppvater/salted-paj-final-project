const { makeRecipe } = require('../../entities');

const makeCreateRecipe = ({ recipesDb, validator, Id }) => {
  if(recipesDb === undefined){
    throw new Error('getRecipes requires a database to function');
  }
  return async recipeInput => {
    recipeInput.id = Id.makeId();
    const recipe = makeRecipe(recipeInput);
    // validator.validateArray({data: ids, errorMessage: 'getRecipes needs an array of ids to function.'})
    // ids.forEach(id => {
    //   validator.validateType({type: 'string', data: id, errorMessage:'getRecipes id needs to be a string'});
    // });
    await recipesDb.add(recipeInput);
    const dbResponse = await recipesDb.getByIds([recipeInput.id]);
    const dbRecipe = dbResponse.map(response => makeRecipe(response))[0];
    return dbRecipe;
  };
};

module.exports = { makeCreateRecipe };
