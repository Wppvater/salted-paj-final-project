import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import SearchBar from './SearchBar';

const CreateNewRecipe = ({setClickedNewRecipeButton}) => {
  const [name, setName] = useState('');
  const [portions, setPortions] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipeInstruction, setRecipeInstruction] = useState([]);
  
  const handleSubmit = event => {
    event.preventDefault();
  }
  const addIngredient = ingr => {
    setIngredients([...ingredients, {name:ingr, unit:'grams',amount:0, id: ingredients.length}]);
    console.log(ingr, [...ingredients, {name:ingr, unit:'grams',amount:0, id: ingredients.length}])
  }
  const changeAmount = (amount, id) => {
    const ingredient = ingredients.find(ingredient => ingredient.id === id);
    const arr = ingredients.filter(ingredient => ingredient.id !== id);
    ingredient.amount = amount;
    setIngredients([...arr,ingredient]);
  }

  const addInstruction = instruction => {
    setRecipeInstruction([instruction])
  }

  return (
    <section className="recipe__new-recipe">
      <form onSubmit={handleSubmit} className="new-recipe__form">
        <input type="text" value={name} onChange={event => setName(event.target.value)} 
        placeholder='Recipe name' className="new-recipe__input__name"/>
        <input type="number" value={portions} onChange={event => setPortions(event.target.value)} 
        placeholder='Recipe portions' className="new-recipe__input__portions"/>
      </form>
        <SearchBar searchData = {['Meatball', 'Ground meat','Bird','Chicken','Pasta','6th item']}
          placeholder = 'Search for ingredient'
          getSearchValue={addIngredient} />
          <ul>
          {ingredients.map(ingredient => {
            return (<li>
              {console.log(ingredient, 'inside li')}
              {ingredient.name}
              <input type="number" placeholder="Amount" onChange={e => changeAmount(e.target.value, ingredient.id)}></input>g
            </li>
          )})}
          </ul>
          <input type="text" placeholder="Instructions" onChange={e => addInstruction(e.target.value)}></input>
      <button onClick={() => setClickedNewRecipeButton(false)}>
        Cancel
      </button>
      <button onClick={() => setClickedNewRecipeButton(false)}>
        Submit
      </button>
    </section>
  )
}

export default CreateNewRecipe;

export const pageQuery = graphql`
  mutation recipeMutation {
    saltedpaj {
      getAllRecipes {
        carbohydrates
        energy
        fat
        id
        instructions
        name
        portions
        protein
        ingredients {
          amount
          grams
          id
          unit
          name
        }
        microNutrients {
          amount
          name
          unit
        }
      }
    }
  }

`