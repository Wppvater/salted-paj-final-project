import React from 'react';

const MoreRecipeInfo = ({recipe, setMoreInfoClicked}) => {
  return (
    <div className="recipe-info__background">
      <div className="recipe-info__content">
        <h2>{recipe.name}</h2>
        <h3>{recipe.portions} portions</h3>
        <h3>{recipe.energy} kcal</h3>
        <h3 className="recipe-info__title">Ingredients</h3>
        <div className="recipe-info__line"></div>
        <ul>
          {/* name */}
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <li key={index} className="recipe-info__ingredients">
                <span>{ingredient.name}</span>
                <span> {ingredient.amount} g</span>
              </li>
          )
        })}
        </ul>
        <p className="recipe-info__title">Instructions</p>
        <div className="recipe-info__line"></div>
        <div className="recipe-info__ingredients-list">{recipe.instructions.map((instruction,index) => {
            return (
              <div key={index}>
                <li className="recipe-info__ingredients">
                  <span>Step {index + 1}</span>
                </li>
                <li className="recipe-info__ingredients">
                  <span>{instruction}</span>
                </li>
              </div>
          )
        })}</div>
        {/* <ul>{recipe.ingredientObjects.map(ingredient => {
          return (
          <li>
          {ingredient.name}
          {ingredient.group}
          {ingredient.energy}
          {ingredient.carbohydrates}
          {ingredient.fat}
          {ingredient.protein}
        </li>
        )})}
        </ul> */}
      </div>
      <button className="recipe-info_close" onClick={() => setMoreInfoClicked(false)}>X</button>
    </div>
  )
}

export default MoreRecipeInfo;
