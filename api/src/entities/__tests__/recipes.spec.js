const { buildMakeRecipe } = require('../recipes');
const { validator } = require('../../utils/');
const { fakeIngredient } = require('./ingredients.spec')
const fakeRecipeInput = {
  id: '123',
  name: 'Something nice',
  instructions: ['Buy food', 'Make food', 'Eat'],
  portions: 4,
  ingredients: [{
    id: '123',
    amount: 120,
    unit: 'grams',
    grams: 120,
  }, 
  {
    id: '435',
    amount: 3,
    unit: 'dl',
    grams: 55,
  }],
  ingredientInfo: [
    {
      id: '123',
      name: "Totally real",
      group: "Meat",
      energy: 735,
      carbohydrates: 19,
      protein: 53,
      fat: 3,
      microNutrients: [{
        name: "Vitamin D",
        amount: 43,
        unit: "micro"
      },
      {
        name: "Sugar",
        amount: 21,
        unit: "grams"
      },
      {
        name: "Zinc",
        amount: 3,
        unit: "milli"
      }]
    },
    {
      id: '435',
      name: "Extremely real",
      group: "Lentils",
      energy: 751,
      carbohydrates: 35,
      protein: 4,
      fat: 30,
      microNutrients: [{
        name: "Vitamin D",
        amount: 4,
        unit: "micro"
      },
      {
        name: "Sugar",
        amount: 3,
        unit: "grams"
      },
      {
        name: "Vitamin E",
        amount: 2,
        unit: "milli"
      }]
    }
  ]
}
const fakeRecipe = {
  id: '123',
  name: 'Something nice',
  instructions: ['Buy food', 'Make food', 'Eat'],
  portions: 4,
  ingredients: [{
      id: '123',
      amount: 120,
      unit: 'grams',
      grams: 120,
    }, 
    {
      id: '435',
      amount: 3,
      unit: 'dl',
      grams: 55,
    }],
  energy: 1295.05,
  carbohydrates: 42.05,
  protein: 65.8,
  fat: 20.1,
  microNutrients: [{
    name: "Vitamin D",
    amount: 53.8,
    unit: "micro"
  },
  {
    name: "Sugar",
    amount: 26.85,
    unit: "grams"
  },
  {
    name: "Zinc",
    amount: 3.6,
    unit: "milli"
  },
  {
    name: "Vitamin E",
    amount: 1.1,
    unit: "milli"
  }]
}
describe('recipe entity', () =>{
  const makeRecipe = buildMakeRecipe({validator});
  let testRecipe = {};
  beforeEach( () => {
    testRecipe = {
      id: fakeRecipeInput.id,
      name: fakeRecipeInput.name,
      instructions: [...fakeRecipeInput.instructions],
      portions: fakeRecipeInput.portions,
      ingredients: [...fakeRecipeInput.ingredients],
      ingredientInfo: [...fakeRecipeInput.ingredientInfo]
    }
  })
  test('is exported correctly', () =>{
    expect(typeof makeRecipe).toBe('function');
  });
  test('return an object', () => {
    expect(typeof makeRecipe(testRecipe)).toBe('object');
  })
  test('throws an error if no ID is provided', () =>{
    delete testRecipe.id;
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe must have id.');
  });
  test('throws an error if no name is provided', () =>{
    delete testRecipe.name;
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe must have name and be a string.');
  });
  test('throws an error if no instructions is provided', () =>{
    delete testRecipe.instructions;
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe must have an array of instructions.');
  });
  test('throws an error if no portions is provided', () =>{
    delete testRecipe.portions;
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe must have portions.');
  });
  test('throws an error if no ingredients is provided', () =>{
    delete testRecipe.ingredients;
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe must have an array of ingredients.');
  });
  test('throws an error if no ingredientInfo is provided', () =>{
    delete testRecipe.ingredientInfo;
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe must have an array of ingredientInfo.');
  });
  test('throws an error if portions is not a positive number', () =>{
    testRecipe.portions = '5htr';
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe must have portions.');
    testRecipe.portions = 0;
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe must have a positive number of portions.');
    testRecipe.portions = 1;
    expect(() => makeRecipe(testRecipe)).not.toThrow();
  });
  test('throws an error if ingredients information are not in correct format', () =>{
    testRecipe.ingredients.push({id: 1, amount: 1, unit: "grams", grams: 100});
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe\'s ingredients must have id and be a string.');
    testRecipe.ingredients.pop();
    testRecipe.ingredients.push({id: "123", amount: 'jsja8', unit: "grams", grams: 100});
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe\'s ingredients must have amount and be a number.');
    testRecipe.ingredients.pop();
    testRecipe.ingredients.push({id: "hi", amount: 1, unit: 1, grams: 1});
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe\'s ingredients must have unit and it must be a string.');
    testRecipe.ingredients.pop();
    testRecipe.ingredients.push({id: "hi", amount: 1, unit: 'dl', grams: 'hresh'});
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe\'s ingredients must have grams and it must be a number.');
    testRecipe.ingredients.pop();
    testRecipe.ingredients.push({id: "hi", amount: 1, unit: 'litres', grams: 0});
    expect(() => makeRecipe(testRecipe)).toThrow('Recipe\'s ingredients grams must be a positive number.');
    testRecipe.ingredients.pop();
  });
  test('returns an object with correct data', () => {
    const returnedIngredient = makeRecipe(testRecipe);
    expect(returnedIngredient.getId()).toBe(fakeRecipe.id);
    expect(returnedIngredient.getName()).toBe(fakeRecipe.name);
    expect(returnedIngredient.getInstructions()).toEqual(fakeRecipe.instructions);
    expect(returnedIngredient.getPortions()).toBe(fakeRecipe.portions);
    expect(returnedIngredient.getEnergy()).toBe(fakeRecipe.energy);
    expect(returnedIngredient.getCarbohydrates()).toBe(fakeRecipe.carbohydrates);
    expect(returnedIngredient.getFat()).toBe(fakeRecipe.fat);
    expect(returnedIngredient.getProtein()).toBe(fakeRecipe.protein);
    expect(returnedIngredient.getMicroNutrients()).toEqual(fakeRecipe.microNutrients);
    expect(returnedIngredient.getIngredients()).toEqual(fakeRecipe.ingredients);
  })
});

module.exports = { fakeRecipe, fakeRecipeInput };
