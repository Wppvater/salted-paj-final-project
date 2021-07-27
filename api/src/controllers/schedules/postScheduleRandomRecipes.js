const { schedulesService } = require('../../use-cases/schedules');
const { getRandomRecipes } = require('../recipes');
const postScheduleRandomRecipes = async (parent, { scheduleInfo }) => {
  let mealsPerDay = [];
  if(scheduleInfo.breakfast){
    mealsPerDay.push(1);
  }
  if(scheduleInfo.lunch){
    mealsPerDay.push(2);
  }
  if(scheduleInfo.dinner){
    mealsPerDay.push(3);
  }
  // mealsPerDay += scheduleInfo.breakfast ? 1 : 0;
  // mealsPerDay += scheduleInfo.lunch ? 1 : 0 ;
  // mealsPerDay += scheduleInfo.dinner ? 1 : 0 ;
  if (!mealsPerDay.length){
    throw new Error('There needs to be at least 1 day selected');
  }
  const randomRecipes = await getRandomRecipes(parent, {numOfRecipes: mealsPerDay.length * scheduleInfo.days});
  const recipes = randomRecipes.map((recipe, index) => ({
      id: recipe.id,
      day: Math.floor(index/mealsPerDay.length) + 1,
      mealInDay: mealsPerDay[(index % mealsPerDay.length)],
      portions: scheduleInfo.portions,
    })
  )
  const schedule = {
    name: scheduleInfo.name,
    categories: scheduleInfo.categories || ['None'],
    recipes: recipes,
  }
  const newSchedule = await schedulesService.createSchedule(schedule);
  const scheduleToReturn = { ...newSchedule.getAll() }
  return { error: '', schedule: scheduleToReturn }
}

module.exports = { postScheduleRandomRecipes }

// name: String!
//   categories: [String]!
//   days: Int!
//   portions: Float!
//   breakfast: Boolean
//   lunch: Boolean
//   dinner: Boolean