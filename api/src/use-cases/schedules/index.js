const { makeGetAllSchedules } = require('./getAllSchedules');
const { makeGetSchedules } = require('./getSchedules');
const { makeCreateSchedule } = require('./createSchedule');
const { getRecipes } = require('../recipes');
const { validator } = require('../../utils');
const { Id } = require('../../id');
const { schedulesDb } = require('../../data-access');
const getAllSchedules = makeGetAllSchedules({ schedulesDb, getRecipes});
const getSchedules = makeGetSchedules({ schedulesDb, getRecipes, validator});
const createSchedule = makeCreateSchedule({ schedulesDb, Id, getRecipes});

const schedulesService = Object.freeze({
  getAllSchedules,
  getSchedules,
  createSchedule
});

module.exports = { schedulesService, getAllSchedules, createSchedule, getSchedules };
