const { getAllIngredients } = require('./ingredients');
const { getAllRecipes, postRecipe } = require('./recipes');
const { getAllSchedules, getSchedules, postSchedule } = require('./schedules')

const root = {
  Query: { getAllIngredients, getAllRecipes, getAllSchedules, getSchedules },
  Mutation: {
    postRecipe: (obj, args) => postRecipe(args),
    postSchedule: (obj, args) => postSchedule(args),
  }
}
module.exports = { root };
