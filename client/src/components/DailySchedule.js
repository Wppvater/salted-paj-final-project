import React from 'react';
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
const DailySchedule = ({meals, date}) => (
  <div className="daily-schedule">
    <h3 className="daily-schedule__date">{convertToWeekday(new Date(date).getDay()) }</h3>
    <div className="schedule__daily-schedule">
      {meals.some(meal => meal.mealInDay === 1) ? 
      <div className="daily-schedule__meal">
        <h3 className="daily-schedule__meal-header">Breakfast</h3>
        <ul className="daily-schedule__meal-list">
          {meals.filter(meal => meal.mealInDay === 1).map(meal => (
          <li key={meal.id+meal.day+meal.mealInDay} className="daily-schedule__meal-item">
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
          <li key={meal.id+meal.day+meal.mealInDay} className="daily-schedule__meal-item">
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
          <li key={meal.id+meal.day+meal.mealInDay} className="daily-schedule__meal-item">
            {meal.name}
          </li>))}
        </ul>
      </div> 
      :''}
    </div>
  </div>
);

export default DailySchedule;
