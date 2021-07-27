import React, { useState } from "react";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import gql from 'graphql-tag';
import {Query, useMutation} from 'react-apollo';
import { navigate } from "gatsby";

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
  const [generateSchedule, { data: generateScheduleData }] = useMutation(GENERATE_SCHEDULE);
  
  const submitSchedule = () => {
    generateSchedule({variables: {
      name,
      days: Number(days),
      portions: Number(portions),
      breakfast,
      lunch,
      dinner,
      }});
      navigate("/", { replace: true })
  }

  return (
    <div className="blur">
      <div className="circle">
        <main >
          <Logo />
          <div className="main__div main__plan">
            <title>plan Page</title>
            <h2 className="plan__header">
              PLAN YOUR SCHEDULE
            </h2> 
            <section className="plan__options">
              <form className="plan__form">
                <p className="plan__headers">
                Days
                </p>
                <div class="plan__days">
                  <input type="range" min="1" max="7" className="days__slider" />
                  <ul className="days__numbers">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                  </ul>
                </div>
                <input className="plan__form__name" type="test" placeholder='Enter schedule name...' onChange={e => setName(e.target.value)} />
                {/* <input className="schedule__form__days" type="number" placeholder='Days' onChange={e => setDays(e.target.value)} /> */}
                {/* Portions
                <input className="plan__form__portions" type="number" placeholder='Portions' onChange={e => setPortions(e.target.value)} /> */}
                <p className="plan__headers">
                Portions
                </p>
                <div class="plan__days">
                  <input type="range" min="1" max="8" className="days__slider" />
                  <ul className="days__numbers">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                  </ul>
                </div>
              </form>
              <p className="plan__headers">
                Meals in one day
              </p>
              {/* <button className="plan__meals-in-day" onClick={() => clickMealButton(breakfast, setBreakfast)}>Breakfast</button> */}
              <div className="plan__buttons">
              <button className="plan__meals-in-day" onClick={() => clickMealButton(lunch, setLunch)}>Lunch</button>
              <button className="plan__meals-in-day" onClick={() => clickMealButton(dinner, setDinner)}>Dinner</button>
              </div>
            </section>

            {/* <Query query={APOLLO_QUERY}>
              {({data, loading, error})=>{
                if (loading) return <span>Loading...</span>
                if (error) return <span>{error.message}</span>
                return <p>{data.getRandomRecipes[0].name}</p>
              }}
            </Query> */}
            <button onClick={() => submitSchedule()} className="plan__save">Save Schedule</button>
          </div>
        <Nav />
        </main>
      </div>
    </div>
  );
};

export default PlanPage;

// const ADD_SCHEDULE = gql`
//   mutation($name: String!,$categories:[String]!,
//   $recipes: [ScheduleRecipeInput]!) {
//   postSchedule (scheduleInfo:{
//     name: $name
//     categories: $categories
//     recipes: $recipes
//   }) 
//   {
//     error
//     schedule {
//       id
//       name
//       categories
//       recipes {
//         portions
//         day
//       }
//     }
//   }
// }
// `;

const GENERATE_SCHEDULE = gql`
  mutation($name: String!, $categories: [String], $days: Int!, $portions: Float!, $breakfast: Boolean, $lunch: Boolean, $dinner: Boolean) {
    postScheduleRandomRecipes(scheduleInfo: {
        name: $name
        categories: $categories
        days: $days
        portions: $portions
        breakfast: $breakfast
        lunch: $lunch
        dinner: $dinner
      })
      {
        error
      }
  }
`

// const APOLLO_QUERY = gql`
//   {
//     getRandomRecipes(numOfRecipes:4) {
//         carbohydrates
//         energy
//         fat
//         id
//         instructions
//         name
//         portions
//         protein
//         ingredients {
//           amount
//           grams
//           id
//           unit
//           name
//         }
//         microNutrients {
//           amount
//           name
//           unit
//         }
//       }
//   }
// `