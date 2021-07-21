const { makeIngredient } = require('../../entities');

const makeGetAllIngredients = ({ ingredientsDb, validator }) => {
  if(ingredientsDb === undefined){
    throw new Error('GetIngredients requires a database to function');
  }
  return async () => {
    const dbResponses = await ingredientsDb.getAll();
    const ingredients = dbResponses.map(response => makeIngredient(response));
    return ingredients;
  };
};

module.exports = { makeGetAllIngredients };
