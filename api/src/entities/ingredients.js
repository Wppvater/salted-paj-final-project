const buildMakeIngredient = () => {
  return ({
    id,
    name,
    group,
    energy,
    carbohydrates,
    protein,
    fat,
    microNutrients,
  } = {}) => {
    if (!id) {
      throw new Error('Ingredient must have id.'); 
    }
    if (!name) {
      throw new Error('Ingredient must have name.'); 
    }
    if (!group) {
      throw new Error('Ingredient must have group.');
    }
    if (energy === undefined) {
      throw new Error('Ingredient must have energy.'); 
    }
    if (typeof energy !== 'number' || energy < 0) {
      throw new Error('Ingredient must have a positive number of energy.')
    }
    if (carbohydrates === undefined) {
      throw new Error('Ingredient must have carbohydrates.');
    }
    if (typeof carbohydrates !== 'number' || carbohydrates < 0) {
      throw new Error('Ingredient must have a positive number of carbohydrates.')
    }
    if (protein === undefined) {
      throw new Error('Ingredient must have protein.'); 
    }
    if (typeof protein !== 'number' || protein < 0) {
      throw new Error('Ingredient must have a positive number of protein.')
    }
    if (fat === undefined) {
      throw new Error('Ingredient must have fat.'); 
    }
    if (typeof fat !== 'number' || fat < 0) {
      throw new Error('Ingredient must have a positive number of fat.')
    }
    if (microNutrients === undefined) {
      throw new Error('Ingredient must have microNutrients.'); 
    }
    if(typeof microNutrients !== 'object' || microNutrients.length == 0){
      throw new Error('Ingredient must have a microNutrients array.'); 
    }
    microNutrients.forEach(microNutrient => {
      if(!microNutrient.name){
        throw new Error('Ingredient\'s microNutrients must have name.')
      }
      if(!microNutrient.unit){
        throw new Error('Ingredient\'s microNutrients must have unit.')
      }
      if(microNutrient.amount == undefined){
        throw new Error('Ingredient\'s microNutrients must have amount.')
      }
      if(typeof microNutrient.name !== 'string'){
        throw new Error('Ingredient\'s microNutrients name must be a string.')
      }
      if(typeof microNutrient.amount !== 'number'){
        throw new Error('Ingredient\'s microNutrients amount must be a number.')
      }
      if(typeof microNutrient.unit !== 'string'){
        throw new Error('Ingredient\'s microNutrients unit must be a string.')
      }
      if(microNutrient.unit !== 'grams' && microNutrient.unit !== 'milli' && microNutrient.unit !== 'micro'){
        throw new Error('Ingredient\'s microNutrients unit must be grams, micro and milli.')
      }
    });
    return Object.freeze({  
      getId: () => id,
      getName: () => name,
      getGroup: () => group,
      getEnergy: () => energy,
      getCarbohydrates: () => carbohydrates,
      getProtein: () => protein,
      getFat: () => fat,
      getMicroNutrients: () => microNutrients,
    });
  };
};

module.exports.buildMakeIngredient = buildMakeIngredient;