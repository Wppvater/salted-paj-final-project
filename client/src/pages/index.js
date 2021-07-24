import * as React from "react"
import { graphql } from 'gatsby'
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import DailySchedule from "../components/DailySchedule";
import '../styles/sass.scss';


const IndexPage = ({data}) => {
  // let ingredients = data.saltedpaj.getAllIngredients;
  // ingredients = ingredients.sort((ingredientA, ingredientB )=>{ 
  //   if(ingredientA.name < ingredientB.name) { return -1; }
  //   if(ingredientA.name > ingredientB.name) { return 1; }
  //   return 0;
  // });

  // console.log(ingredients.map(i => i.name));
  return (
    <div class="blur">
    <div class="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>Home Page</title>
        {/* <h1>
          LOGO
        </h1>
        <h2>
          Schedule
        </h2> */}
        <DailySchedule />
        <DailySchedule />
      </div>
    <Nav />
    </main>
    </div>
    </div>
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