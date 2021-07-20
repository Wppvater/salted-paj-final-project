const { makeGetRecipes } = require('./getRecipes');
const { makeCreateRecipe } = require('./createRecipe');
const { validator } = require('../../utils');
const { Id } = require('../../id');
const recipesDb = {};
const getRecipes = makeGetRecipes({ recipesDb, validator });
const createRecipe = makeCreateRecipe({ recipesDb, validator, Id });

const recipesService = Object.freeze({
  getRecipes,
  createRecipe,
});

module.exports = { recipesService, getRecipes, createRecipe };
