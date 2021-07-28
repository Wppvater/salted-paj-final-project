const { getAllIngredients } = require('./ingredients');
const { getAllRecipes, getRecipe, postRecipe, getRandomRecipes } = require('./recipes');
const { getAllSchedules, getSchedules, postSchedule, postScheduleRandomRecipes } = require('./schedules')

const root = {
  Query: { getAllIngredients, getAllRecipes, getAllSchedules, getSchedules, getRandomRecipes, getRecipe },
  Mutation: {
    postRecipe: (obj, args) => postRecipe(args),
    postSchedule: (obj, args) => postSchedule(args),
    postScheduleRandomRecipes: (obj, args) => postScheduleRandomRecipes(obj,args)
  }
}
module.exports = { root };
