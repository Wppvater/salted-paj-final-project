import React, { useState } from 'react';
import gql from 'graphql-tag';
import {Query, useMutation} from 'react-apollo';
import SearchBar from './SearchBar';

const CreateNewRecipe = ({setClickedNewRecipeButton, ingredientsData}) => {
  const [name, setName] = useState('');
  const [portions, setPortions] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [recipeInstruction, setRecipeInstruction] = useState([]);
  const [addRecipe, { data:addRecipeData }] = useMutation(ADD_RECIPE);
  console.log(ingredientsData);
  const handleSubmit = event => {
    event.preventDefault();
    console.log({name: name,
      instructions:recipeInstruction,
      portions: portions,
      ingredients: ingredients,})
    addRecipe({variables:{
      name: name,
      instructions:recipeInstruction,
      portions: Number(portions),
      ingredients: ingredients,
    }});
  }
  const addIngredient = ingr => {
    console.log(ingr);
    setIngredients([...ingredients, {grams:0, unit:'grams',amount:0, id: ingr}]);
    // console.log(ingr, [...ingredients, {name:ingr, unit:'grams',amount:0, id: ingredients.length}])
  }
  const changeAmount = (amount, id) => {
    const ingredient = ingredients.find(ingredient => ingredient.id === id);
    const arr = ingredients.filter(ingredient => ingredient.id !== id);
    ingredient.amount = Number(amount);
    ingredient.grams = ingredient.amount;
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
        <SearchBar searchData = {ingredientsData.map(ingredient => ({display: ingredient.name,value:ingredient.id}))}
          placeholder = 'Search for ingredient'
          getSearchValue={addIngredient} />
          <ul>
          {ingredients.map(ingredient => {
            return (<li>
              {ingredientsData.find(ingredientData => ingredientData.id === ingredient.id).name}
              <input type="number" placeholder="Amount" onChange={e => changeAmount(e.target.value, ingredient.id)}></input>g
            </li>
          )})}
          </ul>
          <input type="text" placeholder="Instructions" onChange={e => addInstruction(e.target.value)}></input>
      <button onClick={() => setClickedNewRecipeButton(false)}>
        Cancel
      </button>
      <button onClick={(e) => {
        handleSubmit(e);
        setClickedNewRecipeButton(false);
        }}>
        Submit
      </button>
    </section>
  )
}

export default CreateNewRecipe;

const ADD_RECIPE = gql`
  mutation($name: String!,$instructions:[String]!, $portions: Float!
  $ingredients: [RecipeIngredientInput]!) {
    postRecipe (recipeInfo:{
    name: $name
    instructions: $instructions
    portions: $portions
    ingredients: $ingredients
  }) 
  {
    error
    recipe {
      id
      name
      instructions
      energy
      ingredients {
        id
        unit
        amount
        grams
      }
    }
  }
}
`;
