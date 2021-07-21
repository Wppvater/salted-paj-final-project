const { ingredientsService } = require('../../use-cases/ingredients')
const getAllIngredients = async () => {
  const ingredients = await ingredientsService.getAllIngredients();
  console.log(ingredients)
  const ingredientsToReturn = ingredients.map(i => ({
    id: i.getId(),
    name: i.getName(),
  }));
  return ingredientsToReturn;
}

module.exports = { getAllIngredients }