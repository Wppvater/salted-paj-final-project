const {getIngredients} = require('../../ingredients');
const {makeRecipeConstructor} = require('./recipeConstructor');

const recipeConstructor = makeRecipeConstructor({ getIngredients });

module.exports = {recipeConstructor}