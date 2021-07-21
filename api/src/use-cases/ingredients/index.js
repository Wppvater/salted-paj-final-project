// const { makeAddReview } = require('./addReview');
const { makeGetIngredients } = require('./getIngredients');
const { makeGetAllIngredients } = require('./getAllIngredients');
const { validator } = require('../../utils');
// const { reviewsDb } = require('../data-access');
const {ingredientsDb} = require('../../data-access');
const getIngredients = makeGetIngredients({ ingredientsDb, validator });
const getAllIngredients = makeGetAllIngredients({ ingredientsDb, validator });
// const addUpvote = makeAddUpvote({ reviewsDb });

const ingredientsService = Object.freeze({
  getIngredients, getAllIngredients,
});

module.exports = { ingredientsService, getIngredients, getAllIngredients };
