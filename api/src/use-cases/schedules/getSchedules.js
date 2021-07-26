const { makeSchedule } = require('../../entities');

const makeGetSchedules = ({ schedulesDb, getRecipes, validator }) => {
  if(schedulesDb === undefined){
    throw new Error('getAllSchedules requires a database to function');
  }
  return async ids => {
    validator.validateArray({data: ids, errorMessage: 'getRecipes needs an array of ids to function.'})
    ids.forEach(id => {
      validator.validateType({type: 'string', data: id, errorMessage:'getRecipes id needs to be a string'});
    });
    const dbResponses = await schedulesDb.getByIds(ids);
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

module.exports = { makeGetSchedules };
