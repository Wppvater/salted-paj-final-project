const { schedulesService } = require('../../use-cases/schedules')
const getAllSchedules = async () => {
  const schedules = await schedulesService.getAllSchedules();
  const schedulesToReturn = schedules.map(schedule => ({ ...schedule.getAll() }));
  console.log(schedulesToReturn[3]);
  return schedulesToReturn;
}

module.exports = { getAllSchedules }
