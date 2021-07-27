import * as React from "react";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const PlanPage = () => {
  return (
    <div class="blur">
    <div class="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>plan Page</title>
        {/* <h1>
          LOGO
        </h1>
        <h2>
          Schedule
        </h2> */}
        <Query query={APOLLO_QUERY}>
          {({data, loading, error})=>{
            if (loading) return <span>Loading...</span>
            if (error) return <span>{error.message}</span>
            console.log(data);
            return <p>{data.getAllRecipes[0].name}</p>
          }}
        </Query>
      </div>
    <Nav />
    </main>
    </div>
    </div>
  );
};

export default PlanPage;

const APOLLO_QUERY = gql`
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