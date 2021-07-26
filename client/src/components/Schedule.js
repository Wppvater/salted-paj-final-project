import React from 'react';
import DailySchedule from './DailySchedule';

const Schedule = ({scheduleData}) => {
  const numberOfDays = scheduleData.recipes.reduce((maxDay,recipe) => maxDay > recipe.day ? maxDay : recipe.day, 1);
  let days = [];
  console.log(scheduleData);
  for(let i = 1; i < numberOfDays+1; i++){
    days[i-1] = scheduleData.recipes.filter(recipe => recipe.day === i);
  }
  console.log(days);
  return (
    <section>
      {(days != []) ? days.map(day => <DailySchedule meals={day}/>): ''}
    </section>
  );
}

export default Schedule;
