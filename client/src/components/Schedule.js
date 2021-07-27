import React from 'react';
import DailySchedule from './DailySchedule';

const Schedule = ({scheduleData}) => {
  const numberOfDays = scheduleData.recipes.reduce((maxDay,recipe) => maxDay > recipe.day ? maxDay : recipe.day, 1);
  let days = [];
  for(let i = 1; i < numberOfDays+1; i++){
    days[i-1] = scheduleData.recipes.filter(recipe => recipe.day === i);
  }
  console.log(numberOfDays,days);
  console.log(scheduleData);
  return (
    <section>
      {(days != []) ? days.map((day,index) => <DailySchedule meals={day} key={index}/>): ''}
    </section>
  );
}

export default Schedule;
