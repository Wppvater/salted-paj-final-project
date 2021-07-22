import * as React from "react"
import { graphql } from 'gatsby'
import Nav from "../components/Nav";


const IndexPage = ({data}) => {
  let ingredients = data.saltedpaj.getAllIngredients;
  ingredients = ingredients.sort((ingredientA, ingredientB )=>{ 
    if(ingredientA.name < ingredientB.name) { return -1; }
    if(ingredientA.name > ingredientB.name) { return 1; }
    return 0;
  });

  // console.log(ingredients.map(i => i.name));
  return (
    <main >
      <title>Home Page</title>
      <h1 >
        Schedule
      </h1>
      <ul>
        {ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
      </ul>
    <Nav />
    </main>
  )
}

export default IndexPage

export const pageQuery = graphql`
query MyQuery3 {
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