const { buildMakeSchedule } = require('../schedules');
const { validator } = require('../../utils/');

const fakeScheduleInput = {
  id: "987",
  name: "Quick and easy",
  recipes: [{
    id: "123",
    portions: 4,
    day: 1,
    mealInDay: 1,
  },
    {
      id: "456",
      portions: 3,
      day: 1,
      mealInDay: 2,
    }],
  recipeObjects: [{},{}],
  categories: ['Vegan']
}

describe('recipe entity', () => {
  const makeSchedule = buildMakeSchedule({validator})
  beforeEach(() => {
    testSchedule = {
      id: fakeScheduleInput.id,
      name: fakeScheduleInput.name,
      recipes: fakeScheduleInput.recipes.map(recipe => ({...recipe})),
      recipeObjects: fakeScheduleInput.recipeObjects.map(recipe => ({...recipe})),
      categories: [...fakeScheduleInput.categories]
    }
  })
  test('is exported correctly', () =>{
    expect(typeof makeSchedule).toBe('function');
  });
  test('return an object', () => {
    expect(typeof makeSchedule(testSchedule)).toBe('object');
  })
  test('throws an error if no ID is provided', () =>{
    delete testSchedule.id;
    expect(() => makeSchedule(testSchedule)).toThrow('Schedule must have id.');
  });
  test('throws an error if no name is provided', () =>{
    delete testSchedule.name;
    expect(() => makeSchedule(testSchedule)).toThrow('Schedule must have name and be a string.');
  });
  test('throws an error if no recipes is provided', () =>{
    delete testSchedule.recipes;
    expect(() => makeSchedule(testSchedule)).toThrow('Schedule must have an array of recipes.');
  });
  test('throws an error if no recipeObjects is provided', () =>{
    delete testSchedule.recipeObjects;
    expect(() => makeSchedule(testSchedule)).toThrow('Schedule must have an array of recipeObjects.');
  });
  test('throws an error if recipes is missing id', () =>{
    delete testSchedule.recipes[0].id;
    expect(() => makeSchedule(testSchedule)).toThrow('Schedule\'s recipes must have id and be a string.');
  });
  test('throws an error if recipes is missing portions', () =>{
    delete testSchedule.recipes[0].portions;
    expect(() => makeSchedule(testSchedule)).toThrow('Schedule\'s recipes must have portions and it must be a number.');
  });
  test('throws an error if recipes is missing day', () =>{
    delete testSchedule.recipes[0].day;
    expect(() => makeSchedule(testSchedule)).toThrow('Schedule\'s recipes must have day and be a number.');
  });
  test('throws an error if recipes is missing mealInDay', () =>{
    delete testSchedule.recipes[0].mealInDay;
    expect(() => makeSchedule(testSchedule)).toThrow('Schedule\'s recipes must have mealInDay and it must be a number.');
  });
})
