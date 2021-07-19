const { buildMakeIngredient } = require('./ingredients');
const { validator } = require('../utils');
// const { Id } = require('../Id');

const makeIngredient = buildMakeIngredient({validator});

module.exports = { makeIngredient };