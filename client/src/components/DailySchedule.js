import React, { useState } from 'react';

const convertToWeekday = (day) => {
  switch(day){
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Magic day';
  }
}
const DailySchedule = ({meals, date, setActiveRecipe}) => {
  
  return (
    <div className="daily-schedule">
      <h3 className="daily-schedule__date">{convertToWeekday(new Date(date).getDay()) }</h3>
      <div className="schedule__daily-schedule">
        {meals.some(meal => meal.mealInDay === 1) ? 
        <div className="daily-schedule__meal">
          <h3 className="daily-schedule__meal-header">Breakfast</h3>
          <ul className="daily-schedule__meal-list">
            {meals.filter(meal => meal.mealInDay === 1).map(meal => (
            <li key={meal.id+meal.day+meal.mealInDay}  onClick={e => setActiveRecipe(meal.id)} className="daily-schedule__meal-item">
              {meal.name}
            </li>))}
          </ul>
        </div> 
        :''}
        {meals.some(meal => meal.mealInDay === 2) ? 
        <div className="daily-schedule__meal">
          <h3 className="daily-schedule__meal-header">Lunch</h3>
          <ul className="daily-schedule__meal-list">
            {meals.filter(meal => meal.mealInDay === 2).map(meal => (
            <li key={meal.id+meal.day+meal.mealInDay}  onClick={e => setActiveRecipe(meal.id)} className="daily-schedule__meal-item">
            {meal.name}
          </li>))}
          </ul>
        </div> 
        :''}
        {meals.some(meal => meal.mealInDay === 3) ? 
        <div className="daily-schedule__meal">
          <h3 className="daily-schedule__meal-header">Dinner</h3>
          <ul className="daily-schedule__meal-list">
            {meals.filter(meal => meal.mealInDay === 3).map(meal => (
            <li key={meal.id+meal.day+meal.mealInDay} onClick={e => setActiveRecipe(meal.id)} className="daily-schedule__meal-item">
              {meal.name}
            </li>))}
          </ul>
        </div> 
        :''}
      </div>
    </div>
  );
}
export default DailySchedule;





/* 
  const [activeWorkout, setActiveWorkout] = props.useStickyState(null);

  return (
    <div>
      <h2>Your workouts</h2>
      <ul className="workouts-page__list">{props.workouts.map((workout, index) => {
        return <li key={workout.id} id={workout.id} onClick={e => setActiveWorkout( (activeWorkout === workout.id) ? null : workout.id)} className="workouts__li">
           <h2>{workout.title}</h2>
           {(activeWorkout === workout.id) ? <Workout workout={workout.workout} workouts={props.workouts} setWorkouts={props.setWorkouts} /> : ''}
          </li>
      })}</ul>
    </div>
  );
}
*/