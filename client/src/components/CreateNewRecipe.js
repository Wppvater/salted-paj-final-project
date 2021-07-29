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
      categories: ['Categories functionality not implemented']
    }});
  }
  const addIngredient = ingr => {
    // console.log(ingr);
    setIngredients([...ingredients, {grams:0, unit:'grams',amount:0, id: ingr}]);
  }
  const changeAmount = (amount, id) => {
    const ingredient = ingredients.find(ingredient => ingredient.id === id);
    // const arr = ingredients.filter(ingredient => ingredient.id !== id);
    ingredient.amount = Number(amount);
    ingredient.grams = ingredient.amount;
    // console.log(ingredients);
    // setIngredients([...arr,ingredient]);
  }

  const addInstruction = instruction => {
    setRecipeInstruction(instruction.split(/\n/))
  }
  const removeIngredient = ingrId => {
    setIngredients(ingredients.filter(ingredient => ingrId !== ingredient.id));
  }

  return (
    <section className="recipe__new-recipe">
        <div className="new-recipe__content">
        <h2>Create new recipe</h2>
        <form onSubmit={handleSubmit} className="new-recipe__form">
          <input type="text" value={name} onChange={event => setName(event.target.value)} 
          placeholder='Recipe name' className="new-recipe__input__name"/>
          <input type="number" onChange={event => setPortions(event.target.value)} 
          placeholder='Recipe portions' className="new-recipe__input__portions"/>
        </form>
          <SearchBar searchData = {ingredientsData.map(ingredient => ({display: ingredient.name,value:ingredient.id}))}
            placeholder = 'Search for ingredient'
            getSearchValue={addIngredient} />
            <ul className="new-recipe__ingredient-result">
            {ingredients.map((ingredient, index) => {
              return (
              <li className="new-recipe__ingredient-item" key={index}>
                <p className="new-recipe__ingredient-name">
                {ingredientsData.find(ingredientData => ingredientData.id === ingredient.id).name}
                </p>
                <div className="new-recipe__ingredient-input">
                  <input type="number" placeholder="Amount" onChange={e => changeAmount(e.target.value, ingredient.id)}></input>
                  <p>g</p>
                </div>
                <button className="new-recipe__ingredient-remove" onClick={e => removeIngredient(ingredient.id)}>X {/*TODO REMOVE INGREDIENT */}</button>
              </li>
            )})}
            </ul>
            <textarea className="new-recipe__instructions" rows={5} placeholder="Instructions: &#13;&#10;Step 1&#13;&#10;Step 2" onChange={e => addInstruction(e.target.value)}></textarea>
      </div>
      <div className="new-recipes__buttons">
        <button className="new-recipe__button new-recipe__cancel-button" onClick={() => setClickedNewRecipeButton(false)}>
          Cancel
        </button>
        <button className="new-recipe__button new-recipe__submit-button" onClick={(e) => {
          handleSubmit(e);
          setClickedNewRecipeButton(false);
          }}>
          Submit
        </button>
      </div>
    </section>
  )
}

export default CreateNewRecipe;

const ADD_RECIPE = gql`
  mutation($name: String!,$instructions:[String]!, $portions: Float!
  $ingredients: [RecipeIngredientInput]!, $categories: [String]!) {
    postRecipe (recipeInfo:{
    name: $name
    instructions: $instructions
    portions: $portions
    ingredients: $ingredients
    categories: $categories
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
