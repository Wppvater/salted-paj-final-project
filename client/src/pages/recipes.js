import * as React from "react"
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";
import { graphql } from 'gatsby';

const mockRecipe = {
  name: 'Spaghetti',
  portions: 4,
  energy: 500,
  ingredients: [{
    'id':'123',
    'amount': 2,
    'unit': 'grams',
    'grams': 100,
    },
    {
      'id':'1234',
      'amount': 10,
      'unit': 'grams',
      'grams': 100,
      }
  ],
  instructions: [
    'Boil eggs and the eat'
  ],
  ingredientObjects: [
    {
      id: '123',
      name: 'egg',
      group: 'lunch',
      energy: 100,
      carbohydrates: 12,
      fat: 8,
      protein: 2
    },
    {
      id: '1234',
      name: 'butter',
      group: 'lunch',
      energy: 100,
      carbohydrates: 12,
      fat: 8,
      protein: 2
    }
  ]
}

const RecipesPage = ({data}) => {
  let recipes = data.saltedpaj.getAllRecipes;
  console.log(data.saltedpaj);
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
