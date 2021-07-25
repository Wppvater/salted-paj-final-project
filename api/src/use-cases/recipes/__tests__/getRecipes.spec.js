const { makeGetRecipes } = require('../getRecipes');
const { fakeRecipeInput, fakeRecipe } = require('../../../entities/__tests__/recipes.spec');
const { validator } = require('../../../utils');
const recipesDb = {
  getByIds: jest.fn(ids => {
    const returnedArray = [];
    if(ids.includes('123')){
      returnedArray.push({...fakeRecipeInput });
    }
    if(ids.includes("41235643")){
      returnedArray.push({...fakeRecipeInput, id: "41235643"});
    }
    return returnedArray;
  })
};
const getIngredients = jest.fn(ids => {
  const returnedArray = [];
  if(ids.includes('123')){
    returnedArray.push({
      getId: () => '123',
      getName: () => "Totally real",
      getGroup: () => "Meat",
      getEnergy: () => 735,
      getCarbohydrates: () => 19,
      getProtein: () => 53,
      getFat: () => 3,
      getMicroNutrients: () => [{
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
      }],
      getAll: () => ({
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
      }]})
      
    });
  }
  if(ids.includes('435')){
    returnedArray.push({
      getId: () => '435',
      getName: () => "Extremely real",
      getGroup: () => "Lentils",
      getEnergy: () => 751,
      getCarbohydrates: () => 35,
      getProtein: () => 4,
      getFat: () => 30,
      getMicroNutrients: () => [{
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
      }],
      getAll: () => ({
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
    });
    
  }
  return returnedArray;
});
const getRecipes = makeGetRecipes({ recipesDb, validator, getIngredients });

describe('the getRecipes use-case', () => {
  test('is exported correctly', () =>{
    expect(typeof getRecipes).toBe('function');
  });
  test('returns one recipe if given 1 id', async () => {
    const returnedRecipe = await getRecipes(["123"]);
    const returnedRecipes = returnedRecipe[0];
    expect(returnedRecipes.getId()).toBe(fakeRecipe.getId());
    expect(returnedRecipes.getName()).toBe(fakeRecipe.getName());
    expect(returnedRecipes.getInstructions()).toEqual(fakeRecipe.getInstructions());
    expect(returnedRecipes.getPortions()).toBe(fakeRecipe.getPortions());
    expect(returnedRecipes.getIngredients()).toEqual(fakeRecipe.getIngredients());
    expect(returnedRecipes.getEnergy()).toBe(fakeRecipe.getEnergy());
    expect(returnedRecipes.getCarbohydrates()).toBe(fakeRecipe.getCarbohydrates());
    expect(returnedRecipes.getFat()).toBe(fakeRecipe.getFat());
    expect(returnedRecipes.getProtein()).toBe(fakeRecipe.getProtein());
    expect(returnedRecipes.getMicroNutrients()).toEqual(fakeRecipe.getMicroNutrients());
  })
  test('returns multiple ingredients if given multiple ids', async () => {
    const returnedRecipes = await getRecipes(["123", "41235643"]);
    expect(returnedRecipes.length).toBe(2);
    const returnedRecipe = returnedRecipes[1];
    expect(returnedRecipe.getId()).toBe("41235643");
    expect(returnedRecipe.getName()).toBe(fakeRecipe.getName());
    expect(returnedRecipe.getInstructions()).toEqual(fakeRecipe.getInstructions());
    expect(returnedRecipe.getPortions()).toBe(fakeRecipe.getPortions());
    expect(returnedRecipe.getIngredients()).toEqual(fakeRecipe.getIngredients());
    expect(returnedRecipe.getEnergy()).toBe(fakeRecipe.getEnergy());
    expect(returnedRecipe.getCarbohydrates()).toBe(fakeRecipe.getCarbohydrates());
    expect(returnedRecipe.getFat()).toBe(fakeRecipe.getFat());
    expect(returnedRecipe.getProtein()).toBe(fakeRecipe.getProtein());
    expect(returnedRecipe.getMicroNutrients()).toEqual(fakeRecipe.getMicroNutrients());
  })
  test('throws an error if no id is provided or if it\'s not an array', async () => {
    try{
      let recipe = await getRecipes();
      expect(false).toBe(true);
    }
    catch(err){
      expect(err).toEqual(Error('getRecipes needs an array of ids to function.'));
    }
    try{
      let recipe = await getRecipes('gerge');
      expect(false).toBe(true);
    }
    catch(err){
      expect(err).toEqual(Error('getRecipes needs an array of ids to function.'));
    }
  });
  test('throws an error if id is not a string', async () => {
    try{
      let recipe = await getRecipes([123,'hert']);
      expect(false).toBe(true);
    }
    catch(err){
      expect(err).toEqual(Error('getRecipes id needs to be a string'));
    }
    try{
      let recipe = await getRecipes(['hert',123]);
      expect(false).toBe(true);
    }
    catch(err){
      expect(err).toEqual(Error('getRecipes id needs to be a string'));
    }
  });
  
});
