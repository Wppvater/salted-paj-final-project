const { makeRecipe } = require('../../entities');

const makeGetRecipes = ({ recipesDb, validator }) => {
  if(recipesDb === undefined){
    throw new Error('getRecipes requires a database to function');
  }
  return async ids => {
    validator.validateArray({data: ids, errorMessage: 'getRecipes needs an array of ids to function.'})
    ids.forEach(id => {
      validator.validateType({type: 'string', data: id, errorMessage:'getRecipes id needs to be a string'});
    });
    const dbResponses = await recipesDb.getByIds(ids);
    const recipes = dbResponses.map(response => makeRecipe(response));
    return recipes;
  };
};

module.exports = { makeGetRecipes };
