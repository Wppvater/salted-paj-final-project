const { schedulesService } = require('../../use-cases/schedules')
const getSchedules = async (parent, {id}) => {
  const schedules = await schedulesService.getSchedules(id);
  const schedulesToReturn = schedules.map(schedule => ({ ...schedule.getAll() }));
  return schedulesToReturn;
}

module.exports = { getSchedules }
