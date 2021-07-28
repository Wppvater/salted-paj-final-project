import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import gql from 'graphql-tag';
import {Query, useMutation} from 'react-apollo';
import { navigate } from "gatsby";

const PlanPage = () => {

  useEffect(() => {
    
  }, [])
  
  const clickSelectButton = (event, buttonState, setButtonState) => {
    buttonState ? setButtonState(false) : setButtonState(true);
    event.target.classList.toggle('plan__meals-in-day_selected');
  }
  
  const [name, setName] = useState('');
  const [days, setDays] = useState(1);
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [breakfastCategory, setBreakfastCategory] = useState(false);
  const [portions, setPortions] = useState(1);
  // Set start date to be the next day
  const [startDate, setStartDate] = useState(null);
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [generateSchedule, { data: generateScheduleData }] = useMutation(GENERATE_SCHEDULE);
  
  const submitSchedule = () => {
    generateSchedule({variables: {
      name,
      days: Number(days),
      portions: Number(portions),
      startDate,
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
            <p className="plan__option__headers">
                Your schedule name
                </p>
            <input className="plan__form__name" type="test" placeholder='Enter schedule name' onChange={e => setName(e.target.value)} />
              <form className="plan__form">
                <p className="plan__option__headers">
                Days
                </p>
                <div className="plan__days">
                  <input type="range" min="1" max="7" className="days__slider" onChange={e => setDays(e.target.value)}/>
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
                {/* <input className="schedule__form__days" type="number" placeholder='Days' onChange={e => setDays(e.target.value)} /> */}
                {/* Portions
                <input className="plan__form__portions" type="number" placeholder='Portions' onChange={e => setPortions(e.target.value)} /> */}
                <p className="plan__option__headers">
                Portions
                </p>
                <div className="plan__days">
                  <input type="range" min="1" max="10" className="days__slider" onChange={e => setPortions(e.target.value)}/>
                  <ul className="days__numbers">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                  </ul>
                </div>
              </form>
              <p className="plan__option__headers">
                Start date
              </p>
                <input type="date" onChange={e => setStartDate(e.target.value)} />
              <p className="plan__option__headers">
                Meals in one day
              </p>
              {/* <button className="plan__meals-in-day" onClick={() => clickSelectButton(breakfast, setBreakfast)}>Breakfast</button> */}
              <div className="plan__buttons">
                <button className="plan__meals-in-day" onClick={event => clickSelectButton(event, breakfast, setBreakfast)}>Breakfast</button>
                <button className="plan__meals-in-day" onClick={event => clickSelectButton(event, lunch, setLunch)}>Lunch</button>
                <button className="plan__meals-in-day" onClick={event => clickSelectButton(event, dinner, setDinner)}>Dinner</button>
              </div>
              <p className="plan__option__headers">
                Categories
              </p>
              {/* <button className="plan__meals-in-day" onClick={() => clickSelectButton(breakfast, setBreakfast)}>Breakfast</button> */}
              <div className="plan__buttons">
                <button className="plan__categories" onClick={event => clickSelectButton(event, vegetarian, setVegetarian)}>Vegetarian</button>
                <button className="plan__categories" onClick={event => clickSelectButton(event, vegan, setVegan)}>Vegan</button>
                <button className="plan__categories" onClick={event => clickSelectButton(event, breakfastCategory, setBreakfastCategory)}>Breakfast</button>
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
  mutation($name: String!, $categories: [String], $days: Int!, $portions: Float!, $startDate: String $breakfast: Boolean, $lunch: Boolean, $dinner: Boolean) {
    postScheduleRandomRecipes(scheduleInfo: {
        name: $name
        categories: $categories
        days: $days
        portions: $portions
        startDate: $startDate
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