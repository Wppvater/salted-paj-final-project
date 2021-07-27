import React, { useState } from "react";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import gql from 'graphql-tag';
import {Query, useMutation} from 'react-apollo';

const PlanPage = () => {
  
  const clickMealButton = (mealState, setMealState) => {
    mealState ? setMealState(false) : setMealState(true);
  }

  const [name, setName] = useState('');
  const [days, setDays] = useState(1);
  const [portions, setPortions] = useState(1);
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
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
        */}
        <h2>
          PLAN YOUR SCHEDULE
        </h2> 
        <section class="schedule__options">
        <form className="schedule__form">
          Name
          <input className="schedule__form__name" type="test" placeholder='Schedule name' onChange={e => setName(e.target.value)} />
          Days
          <input className="schedule__form__days" type="number" placeholder='Days' onChange={e => setDays(e.target.value)} />
          Portions
          <input className="schedule__form__portions" type="number" placeholder='Portions' onChange={e => setPortions(e.target.value)} />
        </form>
        Meals in one days
        <button className="schedule__meals-in-day" onClick={() => clickMealButton(breakfast, setBreakfast)}>Breakfast</button>
        <button className="schedule__meals-in-day" onClick={() => clickMealButton(lunch, setLunch)}>Lunch</button>
        <button className="schedule__meals-in-day" onClick={() => clickMealButton(dinner, setDinner)}>Dinner</button>
        </section>

        <Query query={APOLLO_QUERY}>
          {({data, loading, error})=>{
            if (loading) return <span>Loading...</span>
            if (error) return <span>{error.message}</span>
            console.log(data);
            return <p>{data.getAllRecipes[0].name}</p>
          }}
        </Query>
        <button onClick={e => addSchedule({variables: {
                name,
                categories: [''],
                recipes: [{id:'123',portions:4,day:1,mealInDay:1},{id:'ckrevsnvo00013tri09jbdddg',portions:4,day:1,mealInDay:2}]
                }})}>Save plan</button>
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