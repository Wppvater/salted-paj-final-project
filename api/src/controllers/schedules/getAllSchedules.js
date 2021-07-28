const { schedulesService } = require('../../use-cases/schedules')
const getAllSchedules = async () => {
  const schedules = await schedulesService.getAllSchedules();
  const schedulesToReturn = schedules.map(schedule => ({ ...schedule.getAll() }));
  return schedulesToReturn;
}

module.exports = { getAllSchedules }
