//  recipeIds,
// portions,
// days,
// mealsPerDay,

const buildMakeSchedule = ({validator}) => {
  return ({
    id,
    name,
    recipes,
    recipeObjects,
    categories,
  } = {}) => {
    validator.validateType({type:'string', data: id, errorMessage:'Schedule must have id.'})
    validator.validateType({type:'string', data: name, errorMessage:'Schedule must have name and be a string.'})
    validator.validateArray({data: recipes, errorMessage:'Schedule must have an array of recipes.'})
    validator.validateArray({data: recipeObjects, errorMessage:'Schedule must have an array of recipeObjects.'});
    recipes.forEach(recipe => {
      validator.validateType({type: 'string', data: recipe.id, errorMessage: 'Schedule\'s ingredients must have id and be a string.'});
      validator.validateType({type: 'number', data: recipe.portions, errorMessage: 'Schedule\'s ingredients must have portions and it must be a number.'});
      validator.validateType({type: 'number', data: recipe.day, errorMessage: 'Schedule\'s ingredients must have day and be a number.'});
      validator.validateType({type: 'number', data: recipe.mealInDay, errorMessage: 'Schedule\'s ingredients must have mealInDay and it must be a number.'});
    })
    const nutrientCalculator = (total, recipe, nutrient, index) => total + recipe[nutrient]*recipes[index].grams/100;
    const microNutrientCalculator = () => {
      let output = [];
      ingredientInfo.forEach((ingredient, index) =>{
        ingredient.microNutrients.forEach(microNutrient => {
          for(let j=0; j < output.length; j++){
            if(microNutrient.name === output[j].name){
              output[j].amount = Math.round(output[j].amount * 100 + microNutrient.amount*ingredients[index].grams)/100;
              break;
            }
            if(j === output.length -1){
              output.push({...microNutrient});
              output[j+1].amount = Math.round(output[j+1].amount*ingredients[index].grams)/100;
              break;
            }
          }
          if(output.length === 0){
            output.push({...microNutrient});
            output[0].amount = Math.round(output[0].amount*ingredients[index].grams)/100;
          }
        });
      });
      return output;
    }
    return Object.freeze({ 
      getId: () => id,
      getName: () => name,
      getInstructions: () => instructions,
      getPortions: () => portions,
      getEnergy: () => ingredientInfo.reduce((totalEnergy, ingredient, index) => nutrientCalculator(totalEnergy, ingredient, 'energy', index), 0),
      getCarbohydrates: () => ingredientInfo.reduce((totalCarbs, ingredient, index) => nutrientCalculator(totalCarbs, ingredient, 'carbohydrates', index), 0),
      getProtein: () => ingredientInfo.reduce((totalProtein, ingredient, index) => nutrientCalculator(totalProtein, ingredient, 'protein', index), 0),
      getFat: () => ingredientInfo.reduce((totalFat, ingredient, index) => nutrientCalculator(totalFat, ingredient, 'fat', index), 0),
      getMicroNutrients: () => microNutrientCalculator(),
      getIngredients: () => ingredients,
      getDbStore: () => ({
        id, name, instructions, ingredients, portions
      }),
      getAll: () => ({
        id, name, instructions, ingredients, portions,
        energy: ingredientInfo.reduce((totalEnergy, ingredient, index) => nutrientCalculator(totalEnergy, ingredient, 'energy', index), 0),
        carbohydrates: ingredientInfo.reduce((totalCarbs, ingredient, index) => nutrientCalculator(totalCarbs, ingredient, 'carbohydrates', index), 0),
        protein: ingredientInfo.reduce((totalProtein, ingredient, index) => nutrientCalculator(totalProtein, ingredient, 'protein', index), 0),
        fat: ingredientInfo.reduce((totalFat, ingredient, index) => nutrientCalculator(totalFat, ingredient, 'fat', index), 0),
        microNutrients: microNutrientCalculator(),
      })
    });
  };
};

module.exports.buildMakeRecipe = buildMakeRecipe;