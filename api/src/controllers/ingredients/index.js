const {getAllIngredients} = require('./getAllIngredients');

const ingredients = {
  getAll: getAllIngredients
}
// const getIngredients = getAllIngredients();

module.exports = { ingredients, getAllIngredients };