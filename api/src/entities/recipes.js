const buildMakeRecipe = ({validator}) => {
  return ({
    id,
    name,
    instructions,
    portions,
    ingredients,
    ingredientInfo,
  } = {}) => {
    validator.validateType({type:'string', data: id, errorMessage:'Recipe must have id.'})
    validator.validateType({type:'string', data: name, errorMessage:'Recipe must have name and be a string.'})
    validator.validateArray({data: instructions, errorMessage:'Recipe must have an array of instructions.'})
    validator.validateType({type:'number', data: portions, errorMessage:'Recipe must have portions.'})
    validator.validateNumber({min: 1, data:portions, errorMessage: 'Recipe must have a positive number of portions.'})
    validator.validateArray({data: ingredients, errorMessage:'Recipe must have an array of ingredients.'});
    validator.validateArray({data: ingredientInfo, errorMessage:'Recipe must have an array of ingredientInfo.'});
    ingredients.forEach(ingredient => {
      validator.validateType({type: 'string', data: ingredient.id, errorMessage: 'Recipe\'s ingredients must have id and be a string.'});
      validator.validateType({type: 'string', data: ingredient.unit, errorMessage: 'Recipe\'s ingredients must have unit and it must be a string.'});
      validator.validateType({type: 'number', data: ingredient.amount, errorMessage: 'Recipe\'s ingredients must have amount and be a number.'});
      validator.validateType({type: 'number', data: ingredient.grams, errorMessage: 'Recipe\'s ingredients must have grams and it must be a number.'});
      validator.validateNumber({min: 1, data: ingredient.grams, errorMessage: 'Recipe\'s ingredients grams must be a positive number.'});
    })
    const nutrientCalculator = (total, ingredient, nutrient, index) => total + ingredient[nutrient]*ingredients[index].grams/100;
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