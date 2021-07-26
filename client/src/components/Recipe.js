import React, { useState } from 'react';
import MoreRecipeInfo from './MoreRecipeInfo';

const Recipe = ({recipe}) => {
  const [moreInfoClicked, setMoreInfoClicked] = useState(false);

  return (
  <section>
    <div className="recipe__card">
      <h2 className="recipe__name">
        {recipe.name}
      </h2>
    </div>
    <p className="recipe__ingredients">
      {recipe.ingredientObjects.map(ingredient => {
        return ingredient.name + ', '
      })}
    </p>
    <p className="recipe__calories">
      {recipe.energy}
    </p>
    <div className="recipe__categories">
      Categories
    </div>
    <button className="more-info__button" onClick={() => setMoreInfoClicked(true)}>
      More info
    </button>
    <div className="recipe__more-info">
      {moreInfoClicked ? 
      <MoreRecipeInfo recipe={recipe} setMoreInfoClicked={setMoreInfoClicked}/>
      : ''}
    </div>
  </section>
);} 

export default Recipe;
