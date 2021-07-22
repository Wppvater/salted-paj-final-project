const { ingredientsService } = require('../../use-cases/ingredients')
const getAllIngredients = async () => {
  const ingredients = await ingredientsService.getAllIngredients();
  const ingredientsToReturn = ingredients.map(i => ({
    id: i.getId(),
    name: i.getName(),
    group: i.getGroup(),
    energy: i.getEnergy(),
    carbohydrates: i.getCarbohydrates(),
    fat: i.getFat(),
    protein: i.getProtein(),
    microNutrients: i.getMicroNutrients(),
  }));
  return ingredientsToReturn;
}

module.exports = { getAllIngredients }