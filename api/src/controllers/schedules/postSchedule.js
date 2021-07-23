const { schedulesService } = require('../../use-cases/schedules');
const postSchedule = async ({ scheduleInfo }) => {
  const schedule = {
    name: scheduleInfo.name,
    categories: scheduleInfo.categories,
    recipes: scheduleInfo.recipes,
  }
  const newSchedule = await schedulesService.createSchedule(schedule);
  const scheduleToReturn = { ...newSchedule.getAll() }
  return { error: '', schedule: scheduleToReturn }
}

module.exports = { postSchedule }
