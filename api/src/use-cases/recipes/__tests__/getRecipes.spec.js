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
const getRecipes = makeGetRecipes({ recipesDb, validator });

describe('the getRecipes use-case', () => {
  test('is exported correctly', () =>{
    expect(typeof getRecipes).toBe('function');
  });
  test('returns one recipe if given 1 id', async () => {
    const returnedRecipe = await getRecipes(["123"]);
    const returnedRecipes = returnedRecipe[0];
    expect(returnedRecipes.getId()).toBe(fakeRecipe.id);
    expect(returnedRecipes.getName()).toBe(fakeRecipe.name);
    expect(returnedRecipes.getInstructions()).toEqual(fakeRecipe.instructions);
    expect(returnedRecipes.getPortions()).toBe(fakeRecipe.portions);
    expect(returnedRecipes.getIngredients()).toEqual(fakeRecipe.ingredients);
    expect(returnedRecipes.getEnergy()).toBe(fakeRecipe.energy);
    expect(returnedRecipes.getCarbohydrates()).toBe(fakeRecipe.carbohydrates);
    expect(returnedRecipes.getFat()).toBe(fakeRecipe.fat);
    expect(returnedRecipes.getProtein()).toBe(fakeRecipe.protein);
    expect(returnedRecipes.getMicroNutrients()).toEqual(fakeRecipe.microNutrients);
  })
  test('returns multiple ingredients if given multiple ids', async () => {
    const returnedRecipes = await getRecipes(["123", "41235643"]);
    expect(returnedRecipes.length).toBe(2);
    const returnedRecipe = returnedRecipes[1];
    expect(returnedRecipe.getId()).toBe("41235643");
    expect(returnedRecipe.getName()).toBe(fakeRecipe.name);
    expect(returnedRecipe.getInstructions()).toEqual(fakeRecipe.instructions);
    expect(returnedRecipe.getPortions()).toBe(fakeRecipe.portions);
    expect(returnedRecipe.getIngredients()).toEqual(fakeRecipe.ingredients);
    expect(returnedRecipe.getEnergy()).toBe(fakeRecipe.energy);
    expect(returnedRecipe.getCarbohydrates()).toBe(fakeRecipe.carbohydrates);
    expect(returnedRecipe.getFat()).toBe(fakeRecipe.fat);
    expect(returnedRecipe.getProtein()).toBe(fakeRecipe.protein);
    expect(returnedRecipe.getMicroNutrients()).toEqual(fakeRecipe.microNutrients);
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
