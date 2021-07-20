const { buildMakeIngredient } = require('./ingredients');
const { buildMakeRecipe } = require('./recipes');
const { validator } = require('../utils');
// const { Id } = require('../Id');

const makeIngredient = buildMakeIngredient({validator});
const makeRecipe = buildMakeRecipe({validator});

module.exports = { makeIngredient, makeRecipe };