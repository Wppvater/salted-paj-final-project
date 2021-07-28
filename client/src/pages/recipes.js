import React, { useState, useEffect } from 'react';
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";
import gql from 'graphql-tag';
import {Query, useQuery} from 'react-apollo';
import CreateNewRecipe from '../components/CreateNewRecipe'
import { graphql } from 'gatsby';
// import {Query, useMutation} from 'react-apollo';

const RecipesPage = ({data}) => {
  // const [addSchedule, { data }] = useMutation(ADD_SCHEDULE);
  const [clickedNewRecipeButton, setClickedNewRecipeButton] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { loading, error, data:recipesData } = useQuery(GetAllRecipesQuery);
  const [displayRecipes, setDisplayRecipes] = useState(null);
  let recipes = null;
  const filterDropdownData = () => {
    console.log(recipes)
    if(recipes){
      const newData = recipes.filter(entry => entry.name.toLowerCase().includes(searchValue.toLowerCase()));
      setDisplayRecipes(newData);
    }
  }
  const handleChange = event => {
    setSearchValue(event.target.value);
  }
  useEffect(() => {
    if(recipesData){
    recipes = recipesData.getAllRecipes;
    setDisplayRecipes(recipes);
  }
  }, [recipesData])
  useEffect(() => {
    filterDropdownData();
  }, [searchValue, setSearchValue])
  return (
    <div className="blur">
    <div className="circle">
    <main >
      <Logo />
      <div className="main__div main__recipes">
        <title>Recipes Page</title>
        <div className="searchbar recipes__searchbar">
        <input type="text" value={searchValue} onChange={handleChange} 
        placeholder={"Search recipes"} className="searchbar__input "/>

        </div>
        <ul className="recipe__body">
          {displayRecipes ? displayRecipes.map(recipe =><li key={recipe.id}><Recipe recipe = {recipe}/></li> ) : ''}
        </ul>
        <div className="recipe__container"></div>
      </div>
      <div className="recipe__new">
      <button onClick={() => setClickedNewRecipeButton(true)} className="recipe__new-button"><p className="new-button__text">+</p></button>
      <p className="recipe__new-text">New recipe</p>
      </div>
      {clickedNewRecipeButton ? <CreateNewRecipe setClickedNewRecipeButton = {setClickedNewRecipeButton}
                                  ingredientsData={data.saltedpaj.getAllIngredients}/> : ''}
    <Nav />
    </main>
    </div>
    </div>
  );
};

export default RecipesPage;

const GetAllRecipesQuery = gql`
  {
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
`

export const pageQuery = graphql`
  query recipesQuery {
    saltedpaj {
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