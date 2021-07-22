const { ingredientsService } = require('../../use-cases/ingredients')
const getAllIngredients = async () => {
  const ingredients = await ingredientsService.getAllIngredients();
  const ingredientsToReturn = ingredients.map(i => ({ ...i.getAll() }));
  return ingredientsToReturn;
}

module.exports = { getAllIngredients }