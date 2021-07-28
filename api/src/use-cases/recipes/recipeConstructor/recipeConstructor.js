const { makeRecipe } = require('../../../entities');

const makeRecipeConstructor = ({ getIngredients }) => {
  return async recipeInputs => {
    const updatedInputs = await Promise.all(recipeInputs.map(async input => {
      const ingredientIds = input.ingredients.map(ingredient => ingredient.id);
      const ingredientInfo = await getIngredients(ingredientIds);
      input.ingredientObjects = ingredientInfo;
      return input;
    }));
    const recipes = updatedInputs.map(response => makeRecipe(response));
    return recipes;
  };
};

module.exports = { makeRecipeConstructor };
