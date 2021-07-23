const { makeSchedule } = require('../../entities');

const makeCreateSchedule = ({ schedulesDb, Id, getRecipes }) => {
  if(schedulesDb === undefined){
    throw new Error('createSchedule requires a database to function');
  }
  return async scheduleInput => {
    scheduleInput.id = Id.makeId();
    const scheduleToDb = {...scheduleInput};
    const recipeIds = scheduleInput.recipes.map(recipe => recipe.id);
    // For schedules we stored the whole recipe objects containing all info in the database, rather than just storing the ids and so on. 
    // Trying this structure out to maybe refactor Recipe and Ingredient later
    scheduleInput.recipeObjects = await getRecipes(recipeIds);
    const schedule = makeSchedule(scheduleInput);

    await schedulesDb.add(scheduleToDb);
    const dbResponses = await schedulesDb.getByIds([scheduleInput.id]);
    const updatedResponses = await Promise.all(dbResponses.map(async response => {
      const recipeIds = response.recipes.map(recipe => recipe.id);
      response.recipeObjects = await getRecipes(recipeIds);
      return response;
    }));
    const dbSchedule = updatedResponses.map(response => makeSchedule(response))[0];
    return dbSchedule;
  };
};

module.exports = { makeCreateSchedule };
