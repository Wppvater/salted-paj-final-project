const { makeGetIngredients } = require('../getIngredients');
const { fakeIngredient } = require('../../../entities/__tests__/ingredients.spec');
const { validator } = require('../../../utils');
const ingredientsDb = {
  getByIds: jest.fn(ids => {
    const returnedArray = [];
    if(ids.includes("4123564")){
      returnedArray.push({...fakeIngredient });
    }
    if(ids.includes("41235643")){
      returnedArray.push({...fakeIngredient, id: "41235643"});
    }
    return returnedArray;
  })
};
const getIngredients = makeGetIngredients({ ingredientsDb, validator });

describe('the getIngredients use-case', () => {
  test('is exported correctly', () =>{
    expect(typeof getIngredients).toBe('function');
  });
  test('returns one ingredient if given 1 id', async () => {
    const returnedIngredients = await getIngredients(["4123564"]);
    const returnedIngredient = returnedIngredients[0];
    expect(returnedIngredient.getId()).toBe(fakeIngredient.id);
    expect(returnedIngredient.getName()).toBe(fakeIngredient.name);
    expect(returnedIngredient.getGroup()).toBe(fakeIngredient.group);
    expect(returnedIngredient.getEnergy()).toBe(fakeIngredient.energy);
    expect(returnedIngredient.getCarbohydrates()).toBe(fakeIngredient.carbohydrates);
    expect(returnedIngredient.getFat()).toBe(fakeIngredient.fat);
    expect(returnedIngredient.getProtein()).toBe(fakeIngredient.protein);
    expect(returnedIngredient.getMicroNutrients()).toEqual(fakeIngredient.microNutrients);
  })
  test('returns multiple ingredients if given multiple ids', async () => {
    const returnedIngredients = await getIngredients(["4123564", "41235643"]);
    expect(returnedIngredients.length).toBe(2);
    const returnedIngredient = returnedIngredients[1];
    expect(returnedIngredient.getId()).toBe("41235643");
    expect(returnedIngredient.getName()).toBe(fakeIngredient.name);
    expect(returnedIngredient.getGroup()).toBe(fakeIngredient.group);
    expect(returnedIngredient.getEnergy()).toBe(fakeIngredient.energy);
    expect(returnedIngredient.getCarbohydrates()).toBe(fakeIngredient.carbohydrates);
    expect(returnedIngredient.getFat()).toBe(fakeIngredient.fat);
    expect(returnedIngredient.getProtein()).toBe(fakeIngredient.protein);
    expect(returnedIngredient.getMicroNutrients()).toEqual(fakeIngredient.microNutrients);
  })
  test('throws an error if no id is provided or if it\'s not an array', async () => {
    try{
      let recipe = await getIngredients();
      expect(false).toBe(true);
    }
    catch(err){
      expect(err).toEqual(Error('GetIngredients needs an array of ids to function.'));
    }
    try{
      let recipe = await getIngredients('gerge');
      expect(false).toBe(true);
    }
    catch(err){
      expect(err).toEqual(Error('GetIngredients needs an array of ids to function.'));
    }
  });
  test('throws an error if id is not a string', async () => {
    try{
      let recipe = await getIngredients([123,'hert']);
      expect(false).toBe(true);
    }
    catch(err){
      expect(err).toEqual(Error('getIngredients id needs to be a string'));
    }
    try{
      let recipe = await getIngredients(['hert',123]);
      expect(false).toBe(true);
    }
    catch(err){
      expect(err).toEqual(Error('getIngredients id needs to be a string'));
    }
  });
});
