const buildMakeSchedule = ({validator}) => {
  return ({
    id,
    name,
    recipes,
    recipeObjects,
    categories,
  } = {}) => {
    validator.validateType({type:'string', data: id, errorMessage:'Schedule must have id.'})
    validator.validateType({type:'string', data: name, errorMessage:'Schedule must have name and be a string.'})
    validator.validateArray({data: recipes, errorMessage:'Schedule must have an array of recipes.'})
    validator.validateArray({data: recipeObjects, errorMessage:'Schedule must have an array of recipeObjects.'});
    recipes.forEach(recipe => {
      validator.validateType({type: 'string', data: recipe.id, errorMessage: 'Schedule\'s recipes must have id and be a string.'});
      validator.validateType({type: 'number', data: recipe.portions, errorMessage: 'Schedule\'s recipes must have portions and it must be a number.'});
      validator.validateType({type: 'number', data: recipe.day, errorMessage: 'Schedule\'s recipes must have day and be a number.'});
      validator.validateType({type: 'number', data: recipe.mealInDay, errorMessage: 'Schedule\'s recipes must have mealInDay and it must be a number.'});
    })

    return Object.freeze({ 
      getId: () => id,
      getName: () => name,
      getCategories: () => [...categories],
      getRecipes: () => [...recipes],
      getRecipeObjects: () => [...recipeObjects],
      getDbStore: () => ({
        id, name, recipes, categories
      }),
      getAll: () => ({
        id, name, recipes: [...recipes], recipeObjects: [...recipeObjects], categories: [...categories]
      })
    });
  };
};

module.exports = { buildMakeSchedule };
