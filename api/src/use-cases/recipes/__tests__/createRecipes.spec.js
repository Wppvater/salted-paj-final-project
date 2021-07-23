const { makeCreateRecipe } = require('../createRecipe');
const { fakeRecipeInput, fakeRecipe } = require('../../../entities/__tests__/recipes.spec');
const { validator } = require('../../../utils');
const Id = { makeId: () => '12345'}
const recipesDb = {
  add: jest.fn(recipeObject => {
    
    return recipeObject;
  }),
  getByIds: jest.fn(ids => {
    const returnedArray = [];
    if(ids.includes('12345')){
      returnedArray.push({...fakeRecipeInput, id:'12345' });
    }
    if(ids.includes("41235643")){
      returnedArray.push({...fakeRecipeInput, id: "41235643"});
    }
    return returnedArray;
  })
};
const getIngredients = ids => {
  const returnedArray = [];
  if(ids.includes('123')){
    returnedArray.push({
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
    });
  }
  if(ids.includes('435')){
    returnedArray.push({
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
    })
  }
  return returnedArray;
}
const createRecipe = makeCreateRecipe({ recipesDb, validator, Id, getIngredients });
let testRecipeInput = {};
describe('the createRecipes use-case', () => {
  beforeEach(() => {
    testRecipeInput = {...fakeRecipeInput};
  })
  test('is exported correctly', () =>{
    expect(typeof createRecipe).toBe('function');
  });
  // test('creates and returns a correct recipe', async () => {
  //   delete testRecipeInput.id;
  //   const recipe = await createRecipe(testRecipeInput);
  //   expect(recipe.getId()).toBe('12345');
  //   expect(recipe.getName()).toBe(fakeRecipe.name);
  //   expect(recipe.getInstructions()).toEqual(fakeRecipe.instructions);
  //   expect(recipe.getPortions()).toBe(fakeRecipe.portions);
  //   expect(recipe.getIngredients()).toEqual(fakeRecipe.ingredients);
  //   expect(recipe.getEnergy()).toBe(fakeRecipe.energy);
  //   expect(recipe.getCarbohydrates()).toBe(fakeRecipe.carbohydrates);
  //   expect(recipe.getFat()).toBe(fakeRecipe.fat);
  //   expect(recipe.getProtein()).toBe(fakeRecipe.protein);
  //   expect(recipe.getMicroNutrients()).toEqual(fakeRecipe.microNutrients);
  //   expect(recipesDb.add).toHaveBeenCalledWith({...testRecipeInput});
  // })
  // test('returns one recipe if given 1 id', () => {
  //   const returnedRecipes = getRecipes(["123"])[0];

  // })
  // test('returns multiple ingredients if given multiple ids', () => {
  //   const returnedRecipes = getRecipes(["123", "41235643"]);
  //   expect(returnedRecipes.length).toBe(2);
  //   const returnedRecipe = returnedRecipes[1];
  //   expect(returnedRecipe.getId()).toBe("41235643");
  //   expect(returnedRecipe.getName()).toBe(fakeRecipe.name);
  //   expect(returnedRecipe.getInstructions()).toEqual(fakeRecipe.instructions);
  //   expect(returnedRecipe.getPortions()).toBe(fakeRecipe.portions);
  //   expect(returnedRecipe.getIngredients()).toEqual(fakeRecipe.ingredients);
  //   expect(returnedRecipe.getEnergy()).toBe(fakeRecipe.energy);
  //   expect(returnedRecipe.getCarbohydrates()).toBe(fakeRecipe.carbohydrates);
  //   expect(returnedRecipe.getFat()).toBe(fakeRecipe.fat);
  //   expect(returnedRecipe.getProtein()).toBe(fakeRecipe.protein);
  //   expect(returnedRecipe.getMicroNutrients()).toEqual(fakeRecipe.microNutrients);
  // })
  // test('throws an error if no id is provided or if it\'s not an array', () =>{
  //   expect(() => getRecipes()).toThrow('getRecipes needs an array of ids to function.');
  //   expect(() => getRecipes('gerge')).toThrow('getRecipes needs an array of ids to function.');
  // });
  // test('throws an error if id is not a string', () => {
  //   expect(() => getRecipes([123,'hert'])).toThrow('getRecipes id needs to be a string');
  //   expect(() => getRecipes(['hert',123])).toThrow('getRecipes id needs to be a string');
  // });
});
