const { ingredients, getAllIngredients, getIngredients } = require('./ingredients');

const root = {
  Query: {getAllIngredients}
}
module.exports = {root};
