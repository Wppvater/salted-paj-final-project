const { getAllIngredients } = require('./ingredients');
const { getAllRecipes } = require('./recipes');

const root = {
  Query: {getAllIngredients, getAllRecipes}
}
module.exports = {root};
