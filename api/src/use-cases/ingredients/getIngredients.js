const { makeIngredient } = require('../../entities');

const makeGetIngredients = ({ ingredientsDb, validator }) => {
  if(ingredientsDb === undefined){
    throw new Error('GetIngredients requires a database to function');
  }
  return ids => {
    validator.validateArray({data: ids, errorMessage: 'GetIngredients needs an array of ids to function.'})
    ids.forEach(id => {
      validator.validateType({type: 'string', data: id, errorMessage:'getIngredients id needs to be a string'});
    });
    const dbResponses = ingredientsDb.getByIds(ids);
    const ingredients = dbResponses.map(response => makeIngredient(response));
    return ingredients;
  };
};

module.exports = { makeGetIngredients };
