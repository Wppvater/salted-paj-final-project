import React, { useState } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import DailySchedule from './DailySchedule';
import MoreRecipeInfo from './MoreRecipeInfo';

const Schedule = ({scheduleData}) => {
  const stringDate = scheduleData.startDate;
  const actualDate = new Date(stringDate);

  const [activeRecipe, setActiveRecipe] = useState(null);

  const numberOfDays = scheduleData.recipes.reduce((maxDay,recipe) => maxDay > recipe.day ? maxDay : recipe.day, 1);
  let days = [];
  scheduleData.recipeObjects.forEach((recipeObject,index) => scheduleData.recipes[index].name = recipeObject.name);

  for(let i = 1; i < numberOfDays+1; i++){
    days[i-1] = scheduleData.recipes.filter(recipe => recipe.day === i);
  }

  return (
    <section>
      {(days != []) ? days.map((day,index) => <DailySchedule setActiveRecipe={setActiveRecipe} meals={day} date={new Date(0).setDate(actualDate.getDate()+index)} key={index}/>): ''}
      {activeRecipe ? <div>
        <Query query={GetRecipeQuery} variables={{recipeId:activeRecipe}} >
          {({data, loading, error})=>{
            if (loading) return <span>Loading...</span>
            if (error) return <span>{error.message}</span>
            return (
              <MoreRecipeInfo recipe={data.getRecipe} setMoreInfoClicked={setActiveRecipe}/>
            )
          }}
        </Query>
      </div>:''}
    </section>
  );
}

export default Schedule;

const GetRecipeQuery = gql`
  
  query Recipe($recipeId: String!) {
    getRecipe(id:$recipeId) {
      ingredients {
        name
        amount
        grams
        id
        unit
      }
      instructions
      name
      categories
      energy
      id
      portions
    }
  }
`
