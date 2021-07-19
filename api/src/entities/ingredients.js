const buildMakeIngredient = () => {
  return ({
    id,
    productId,
    productName,
    productGroup,
    title,
    description,
    reviewer,
    upvotes,
    numberOfUpvotes,
  } = {}) => {
    // if (!productId) {
    //   console.log('Review must have a productId'); // This should be an error in reality
    // }
    // if (!description) {
    //   console.log('Review must have text in description'); // This should be an error in reality
    // }
    // if (upvotes.length !== numberOfUpvotes) {
    //   console.log('numberOfUpvotes must be the same as the length of upvotes');
    // }
    return Object.freeze({
      getId: () => id,
      getProductId: () => productId,
      getProductName: () => productName,
      getProductGroup: () => productGroup,
      getTitle: () => title,
      getDescription: () => description,
      getReviewer: () => reviewer,
      getUpvotes: () => upvotes,
      getNumberOfUpvotes: () => numberOfUpvotes,
    });
  };
};

module.exports.buildMakeIngredient = buildMakeIngredient;