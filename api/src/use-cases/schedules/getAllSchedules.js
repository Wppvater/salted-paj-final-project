const { makeSchedule } = require('../../entities');

const makeGetAllSchedules = ({ schedulesDb, getRecipes }) => {
  if(schedulesDb === undefined){
    throw new Error('getAllSchedules requires a database to function');
  }
  return async () => {
    const dbResponses = await schedulesDb.getAll();
    const updatedResponses = await Promise.all(dbResponses.map(async response => {
      const recipeIds = response.recipes.map(recipe => recipe.id);
      const recipeInfo = await getRecipes(recipeIds);
      response.recipeObjects = recipeInfo.map(i => ({...i.getAll()}));
      return response;
    }));
    const schedules = await updatedResponses.map(response => makeSchedule(response));
    return schedules;
  };
};

module.exports = { makeGetAllSchedules };
