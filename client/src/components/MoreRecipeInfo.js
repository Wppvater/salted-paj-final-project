import React from 'react';

const MoreRecipeInfo = ({recipe, setMoreInfoClicked}) => {
  return (
    <div>
      <div>
        <button onClick={() => setMoreInfoClicked(false)}>Back</button>
      </div>
      <div>
        <h2>{recipe.name}</h2>
        <h3>{recipe.portions}</h3>
        <p>{recipe.instructions.map(instruction => instruction)}</p>
        <h3>Ingredients</h3>
        <ul>
          {/* name */}
          {recipe.ingredients.map(ingredient => {
            return (
              <li>{recipe.ingredientObjects.find(i => i.id === ingredient.id).name}  {ingredient.amount}{ingredient.unit}</li>
          )
        })}
        </ul>
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
    </div>
  )
}

export default MoreRecipeInfo;
