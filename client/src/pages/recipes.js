import React, { useState } from "react"
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";
import CreateNewRecipe from '../components/CreateNewRecipe'
import { graphql } from 'gatsby';



const RecipesPage = ({data}) => {
  const [clickedNewRecipeButton, setClickedNewRecipeButton] = useState(false);
  let recipes = data.saltedpaj.getAllRecipes;
  return (
    <div class="blur">
    <div class="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>Recipes Page</title>
        <SearchBar searchData = {['something', 'something else', 'a thrid thing', 'something2','some are','trying']} placeholder = {'Search recipes'}/>
        <ul>
          {recipes.map(recipe =><li><Recipe recipe = {recipe}/></li> )}
        </ul>
      </div>
      <button onClick={() => setClickedNewRecipeButton(true)}>New recipe</button>
      {clickedNewRecipeButton ? <CreateNewRecipe setClickedNewRecipeButton = {setClickedNewRecipeButton}/> : ''}
    <Nav />
    </main>
    </div>
    </div>
  );
};

export default RecipesPage;

export const pageQuery = graphql`
  query recipesQuery {
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
