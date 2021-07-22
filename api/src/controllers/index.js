const { getAllIngredients } = require('./ingredients');
const { getAllRecipes, postRecipe } = require('./recipes');

const root = {
  Query: {getAllIngredients, getAllRecipes},
  Mutation: {
    postRecipe: (obj, args) => postRecipe(args),
  }
}
module.exports = {root};
