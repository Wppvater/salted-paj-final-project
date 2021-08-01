import React, { useState } from 'react';
import MoreRecipeInfo from './MoreRecipeInfo';

const Recipe = ({recipe}) => {
  const [moreInfoClicked, setMoreInfoClicked] = useState(false);
  let ingredientNameArray = [];
  recipe.ingredients.map(ingredient => ingredientNameArray.push(ingredient.name))
  return (
  <section>
    <div className="recipe__card" onClick={() => setMoreInfoClicked(true)}>
      <div className="recipe__first-line">
        <h2 className="recipe__name">
          {recipe.name}
        </h2>
        <p className="recipe__calories">
          {Math.floor(recipe.energy)} kcal
        </p>
      </div>
      <p className="recipe__ingredients">
        {ingredientNameArray.join(', ')}
      </p>
      {/* <div className="recipe__categories">
        Categories
      </div> */}
      <button className="more-info__button">
        More info
      </button>
    </div>
    <div className="recipe__more-info">
      {moreInfoClicked ? 
      <MoreRecipeInfo recipe={recipe} setMoreInfoClicked={setMoreInfoClicked}/>
      : ''}
    </div>
  </section>
);} 

export default Recipe;
