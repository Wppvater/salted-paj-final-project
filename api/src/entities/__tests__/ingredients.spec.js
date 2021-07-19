const { makeIngredient } = require('../');
const fakeIngredient = {
  id: "4123564",
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
}
describe('ingredient entity', () =>{
  test('is exported correctly', () =>{
    expect(typeof makeIngredient).toBe('function');
  });
  test('return an object', () => {
    expect(typeof makeIngredient(fakeIngredient)).toBe('object');
  })
});
