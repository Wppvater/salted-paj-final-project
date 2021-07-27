import React, { useState, useEffect } from 'react';
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";
import CreateNewRecipe from '../components/CreateNewRecipe'
import { graphql } from 'gatsby';
// import {Query, useMutation} from 'react-apollo';

const RecipesPage = ({data}) => {
  // const [addSchedule, { data }] = useMutation(ADD_SCHEDULE);
  const [clickedNewRecipeButton, setClickedNewRecipeButton] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  let recipes = data.saltedpaj.getAllRecipes;
  const [displayRecipes, setDisplayRecipes] = useState(recipes);
  const filterDropdownData = () => {
    const newData = recipes.filter(entry => entry.name.toLowerCase().includes(searchValue.toLowerCase()));
    setDisplayRecipes(newData);
  }
  const handleChange = event => {
    setSearchValue(event.target.value);
  }
  useEffect(() => {
    filterDropdownData();
  }, [searchValue, setSearchValue])
  return (
    <div className="blur">
    <div className="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>Recipes Page</title>
        <div className="searchbar">
        <input type="text" value={searchValue} onChange={handleChange} 
        placeholder={"Search recipes"} className="searchbar__input "/>

        </div>
        <ul>
          {displayRecipes.map(recipe =><li key={recipe.id}><Recipe recipe = {recipe}/></li> )}
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