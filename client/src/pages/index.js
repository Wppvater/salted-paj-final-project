import * as React from "react"
import { graphql } from 'gatsby'


const IndexPage = ({data}) => {
  let ingredients = data.saltedpaj.getAllIngredients;
  ingredients = ingredients.sort((ingredientA, ingredientB )=>{ 
    if(ingredientA.name < ingredientB.name) { return -1; }
    if(ingredientA.name > ingredientB.name) { return 1; }
    return 0;
  });

  console.log(ingredients.map(i => i.name));
  return (
    <main >
      <title>Home Page</title>
      <h1 >
        Congratulations
        
      </h1>
      <ul>
        {ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
      </ul>
    </main>
  )
}

export default IndexPage

export const pageQuery = graphql`
query MyQuery {
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