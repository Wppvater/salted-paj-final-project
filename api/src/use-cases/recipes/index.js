const { makeGetRecipes } = require('./getRecipes');
const { makeGetAllRecipes } = require('./getAllRecipes');
const { makeCreateRecipe } = require('./createRecipe');
const {getIngredients} = require('../ingredients');
const {recipeConstructor} = require('./recipeConstructor');
const { validator } = require('../../utils');
const { Id } = require('../../id');
const { recipesDb } = require('../../data-access');
const getRecipes = makeGetRecipes({ recipesDb, validator, getIngredients });
const getAllRecipes = makeGetAllRecipes({ recipesDb, validator, getIngredients});
const createRecipe = makeCreateRecipe({ recipesDb, validator, Id, getIngredients, recipeConstructor });

const recipesService = Object.freeze({
  getRecipes,
  getAllRecipes,
  createRecipe,
});

module.exports = { recipesService, getRecipes, createRecipe, getAllRecipes };
