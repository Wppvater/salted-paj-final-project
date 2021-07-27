import * as React from "react";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import gql from 'graphql-tag';
import {Query, useMutation} from 'react-apollo';

const PlanPage = () => {
  const [addSchedule, { data }] = useMutation(ADD_SCHEDULE);
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
        <button onClick={e => addSchedule({variables: {
                name: "Dynamic plan from frontend!!",
                categories: ['Vegan', 'Vegetarian', 'Peanut-free'],
                recipes: [{id:'123',portions:4,day:1,mealInDay:1},{id:'ckrevsnvo00013tri09jbdddg',portions:4,day:1,mealInDay:2}]
                }})}>Make dynamic plan</button>
      </div>
    <Nav />
    </main>
    </div>
    </div>
  );
};

export default PlanPage;

const ADD_SCHEDULE = gql`
  mutation($name: String!,$categories:[String]!,
  $recipes: [ScheduleRecipeInput]!) {
  postSchedule (scheduleInfo:{
    name: $name
    categories: $categories
    recipes: $recipes
  }) 
  {
    error
    schedule {
      id
      name
      categories
      recipes {
        portions
        day
      }
    }
  }
}
`;

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