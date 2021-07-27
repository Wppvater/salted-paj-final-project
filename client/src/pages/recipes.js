import React, { useState } from "react"
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";
import CreateNewRecipe from '../components/CreateNewRecipe'
import { graphql } from 'gatsby';
// import {Query, useMutation} from 'react-apollo';

const RecipesPage = ({data}) => {
  // const [addSchedule, { data }] = useMutation(ADD_SCHEDULE);
  console.log(data.saltedpaj.getAllIngredients)
  const [clickedNewRecipeButton, setClickedNewRecipeButton] = useState(false);
  let recipes = data.saltedpaj.getAllRecipes;
  return (
    <div class="blur">
    <div class="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>Recipes Page</title>
        <SearchBar searchData = {[{display:'something',value:'1'}]} placeholder = {'Search recipes'}/>
        <ul>
          {recipes.map(recipe =><li><Recipe recipe = {recipe}/></li> )}
        </ul>
      </div>
      <button onClick={() => setClickedNewRecipeButton(true)}>New recipe</button>
      {clickedNewRecipeButton ? <CreateNewRecipe setClickedNewRecipeButton = {setClickedNewRecipeButton}
                                  ingredientsData={data.saltedpaj.getAllIngredients}/> : ''}
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
      getAllIngredients {
          carbohydrates
          energy
          fat
          group
          id
          name
          protein
          microNutrients {
            amount
            name
            unit
          }
        }
    }
  }

`
// export const pageQuery = graphql`
//   query recipeIngredientsQuery {
//       saltedpaj {
//         getAllIngredients {
//           carbohydrates
//           energy
//           fat
//           group
//           id
//           name
//           protein
//           microNutrients {
//             amount
//             name
//             unit
//           }
//         }
//       }
//   }

// `