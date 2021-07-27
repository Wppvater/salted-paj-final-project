const {getAllSchedules} = require('./getAllSchedules');
const {getSchedules} = require('./getSchedules');
const {postSchedule} = require('./postSchedule');
const {postScheduleRandomRecipes} = require('./postScheduleRandomRecipes');

module.exports = { getAllSchedules, postSchedule, postScheduleRandomRecipes, getSchedules };