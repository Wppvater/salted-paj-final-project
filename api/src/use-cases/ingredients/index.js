// const { makeAddReview } = require('./addReview');
const { makeGetIngredients } = require('./getIngredients');
const { validator } = require('../../utils');
// const { reviewsDb } = require('../data-access');
const ingredientsDb = {};
const getIngredients = makeGetIngredients({ ingredientsDb, validator });
// const addUpvote = makeAddUpvote({ reviewsDb });

const ingredientsService = Object.freeze({
  getIngredients,
});

module.exports = { ingredientsService, getIngredients };
