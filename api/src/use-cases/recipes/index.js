const { makeGetRecipes } = require('./getRecipes');
const { makeGetAllRecipes } = require('./getAllRecipes');
const { makeCreateRecipe } = require('./createRecipe');
const {getIngredients} = require('../ingredients');
const { validator } = require('../../utils');
const { Id } = require('../../id');
const { recipesDb } = require('../../data-access');
const getRecipes = makeGetRecipes({ recipesDb, validator });
const getAllRecipes = makeGetAllRecipes({ recipesDb, validator, getIngredients});
const createRecipe = makeCreateRecipe({ recipesDb, validator, Id });

const recipesService = Object.freeze({
  getRecipes,
  getAllRecipes,
  createRecipe,
});

module.exports = { recipesService, getRecipes, createRecipe, getAllRecipes };
