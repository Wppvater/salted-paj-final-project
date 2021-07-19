const { makeRecipe } = require('../');
const { fakeIngredient } = require('./ingredients.spec')
const fakeRecipe = {
  id: '123',
  name: 'Something nice',
  instructions: ['Buy food', 'Make food', 'Eat'],
  portions: 4,
  ingredients: ['rice', 'meat', 'broccoli'],
  nutrients: []
}
describe('ingredient entity', () =>{
  let testIngredient = {};
  beforeEach( () => {
    testIngredient = {
      id: fakeIngredient.id,
      name: fakeIngredient.name,
      group: fakeIngredient.group,
      energy: fakeIngredient.energy,
      carbohydrates: fakeIngredient.carbohydrates,
      protein: fakeIngredient.protein,
      fat: fakeIngredient.fat,
      microNutrients: [...fakeIngredient.microNutrients],
    }
  })
  test('is exported correctly', () =>{
    expect(typeof makeIngredient).toBe('function');
  });
  test('return an object', () => {
    expect(typeof makeIngredient(fakeIngredient)).toBe('object');
  })
  test('throws an error if no ID is provided', () =>{
    delete testIngredient.id;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have id.');
  });
  test('throws an error if no name is provided', () =>{
    delete testIngredient.name;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have name.');
  });
  test('throws an error if no group is provided', () =>{
    delete testIngredient.group;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have group.');
  });
  test('throws an error if no energy is provided', () =>{
    delete testIngredient.energy;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have energy.');
  });
  test('throws an error if no carbohydrates is provided', () =>{
    delete testIngredient.carbohydrates;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have carbohydrates.');
  });
  test('throws an error if no protein is provided', () =>{
    delete testIngredient.protein;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have protein.');
  });
  test('throws an error if no fat is provided', () => {
    delete testIngredient.fat;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have fat.');
  });
  test('throws an error if no microNutrients is provided', () =>{
    delete testIngredient.microNutrients;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have a microNutrients array.');
  });
  test('throws an error if energy is not a positive number', () =>{
    testIngredient.energy = '5htr';
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have energy.');
    testIngredient.energy = -1;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have a positive number of energy.');
    testIngredient.energy = 0;
    expect(() => makeIngredient(testIngredient)).not.toThrow();
  });
  test('throws an error if protein is not a positive number', () =>{
    testIngredient.protein = '5htr';
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have protein.');
    testIngredient.protein = -1;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have a positive number of protein.');
    testIngredient.protein = 0;
    expect(() => makeIngredient(testIngredient)).not.toThrow();
  });
  test('throws an error if carbohydrates is not a positive number', () =>{
    testIngredient.carbohydrates = '5htr';
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have carbohydrates.');
    testIngredient.carbohydrates = -1;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have a positive number of carbohydrates.');
    testIngredient.carbohydrates = 0;
    expect(() => makeIngredient(testIngredient)).not.toThrow();
  });
  test('throws an error if fat is not a positive number', () =>{
    testIngredient.fat = '5htr';
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have fat.');
    testIngredient.fat = -1;
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have a positive number of fat.');
    testIngredient.fat = 0;
    expect(() => makeIngredient(testIngredient)).not.toThrow();
  });
  test('throws an error if microNutrients is an empty array', () =>{
    testIngredient.microNutrients = [];
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have a microNutrients array.');
    testIngredient.microNutrients = '[]';
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient must have a microNutrients array.');
  });
  test('throws an error if microNutrients information are not in correct format', () =>{
    testIngredient.microNutrients.push({name: 1, amount: 1, unit: "grams"});
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient\'s microNutrients must have name.');
    testIngredient.microNutrients.pop();
    testIngredient.microNutrients.push({name: "hi", amount: 'jsja8', unit: "grams"});
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient\'s microNutrients must have amount.');
    testIngredient.microNutrients.pop();
    testIngredient.microNutrients.push({name: "hi", amount: 1, unit: "djeush"});
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient\'s microNutrients unit must be grams, micro and milli.');
    testIngredient.microNutrients.pop();
    testIngredient.microNutrients.push({name: "hi", amount: 1, unit: 2});
    expect(() => makeIngredient(testIngredient)).toThrow('Ingredient\'s microNutrients must have unit.');
  });
  test('returns an object', () => {
    const returnedIngredient = makeIngredient(fakeIngredient);
    expect(returnedIngredient.getId()).toBe(fakeIngredient.id);
    expect(returnedIngredient.getName()).toBe(fakeIngredient.name);
    expect(returnedIngredient.getGroup()).toBe(fakeIngredient.group);
    expect(returnedIngredient.getEnergy()).toBe(fakeIngredient.energy);
    expect(returnedIngredient.getCarbohydrates()).toBe(fakeIngredient.carbohydrates);
    expect(returnedIngredient.getFat()).toBe(fakeIngredient.fat);
    expect(returnedIngredient.getProtein()).toBe(fakeIngredient.protein);
    expect(returnedIngredient.getMicroNutrients()).toEqual(fakeIngredient.microNutrients);
  })
});

module.exports = { fakeIngredient };
