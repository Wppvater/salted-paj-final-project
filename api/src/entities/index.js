const { buildMakeIngredient } = require('./ingredients');
const { buildMakeRecipe } = require('./recipes');
const { buildMakeSchedule } = require('./schedules');
const { validator } = require('../utils');
// const { Id } = require('../Id');

const makeIngredient = buildMakeIngredient({validator});
const makeRecipe = buildMakeRecipe({validator});
const makeSchedule = buildMakeSchedule({validator});

module.exports = { makeIngredient, makeRecipe, makeSchedule };