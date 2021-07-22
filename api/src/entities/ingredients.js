const buildMakeIngredient = ({validator}) => {
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
    validator.validateType({type:'string', data: id, errorMessage:'Ingredient must have id.'})
    validator.validateType({type:'string', data: name, errorMessage:'Ingredient must have name.'})
    validator.validateType({type:'string', data: group, errorMessage:'Ingredient must have group.'})
    validator.validateType({type:'number', data: energy, errorMessage:'Ingredient must have energy.'})
    validator.validateNumber({min: 0, data:energy, errorMessage: 'Ingredient must have a positive number of energy.'})
    validator.validateType({type:'number', data: carbohydrates, errorMessage: 'Ingredient must have carbohydrates.'});
    validator.validateNumber({min: 0, data:carbohydrates, errorMessage: 'Ingredient must have a positive number of carbohydrates.'})
    validator.validateType({type:'number', data: protein, errorMessage: 'Ingredient must have protein.'});
    validator.validateNumber({min: 0, data:protein, errorMessage: 'Ingredient must have a positive number of protein.'});
    validator.validateType({type:'number', data: fat, errorMessage: 'Ingredient must have fat.'});
    validator.validateNumber({min: 0, data:fat, errorMessage: 'Ingredient must have a positive number of fat.'});
    validator.validateArray({data: microNutrients, errorMessage:'Ingredient must have a microNutrients array.'});

    microNutrients.forEach(microNutrient => {
      validator.validateType({type:'string', data: microNutrient.name, errorMessage: 'Ingredient\'s microNutrients must have name.'})
      validator.validateType({type:'string', data: microNutrient.unit, errorMessage: 'Ingredient\'s microNutrients must have unit.'})
      validator.validateType({type:'number', data: microNutrient.amount, errorMessage: 'Ingredient\'s microNutrients must have amount.'});
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
      getAll: () => ({
        id, name, group, energy, carbohydrates, protein, fat, microNutrients
      })
    });
  };
};

module.exports.buildMakeIngredient = buildMakeIngredient;