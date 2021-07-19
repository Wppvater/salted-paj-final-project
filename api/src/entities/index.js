const { buildMakeIngredient } = require('./ingredients');
// const { Id } = require('../Id');

const makeIngredient = buildMakeIngredient();

module.exports = { makeIngredient };